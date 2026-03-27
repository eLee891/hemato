import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    
    const rawPlan = paymentIntent.metadata?.plan || "individual";
    const customerEmail = paymentIntent.metadata?.customer_email || paymentIntent.receipt_email;
    const fName = paymentIntent.metadata?.first_name || "Member";
    const lName = paymentIntent.metadata?.last_name || "";

    if (rawPlan.toLowerCase() === "donation") {
      return NextResponse.json({ received: true });
    }
    
    const targetRole = `${rawPlan.toLowerCase()}_member`;

    if (customerEmail) {
      try {
        const authHeader = Buffer.from(`${process.env.WP_USER}:${process.env.WP_APP_PASSWORD}`).toString("base64");
        let userId: number | null = null;

        const userSearch = await fetch(`${process.env.WORDPRESS_URL}/wp-json/wp/v2/users?search=${customerEmail}`, {
          headers: { Authorization: `Basic ${authHeader}` },
        });
        const users = await userSearch.json();

        if (Array.isArray(users) && users.length > 0) {
          userId = users[0].id;
        } else {
          const createUserRes = await fetch(`${process.env.WORDPRESS_URL}/wp-json/wp/v2/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Basic ${authHeader}` },
            body: JSON.stringify({
              username: customerEmail,
              email: customerEmail,
              first_name: fName,
              last_name: lName,
              nickname: `${fName} ${lName}`.trim(),
              password: Math.random().toString(36).slice(-12) + "!", 
              send_user_notification: true,
              roles: ["subscriber"], 
            }),
          });

          const newUser = await createUserRes.json();
          if (createUserRes.ok) {
            userId = newUser.id;
            
            // 이메일 강제 발송 로직
            try {
              await fetch(`${process.env.WORDPRESS_URL}/wp-login.php?action=lostpassword`, {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({
                  "user_login": customerEmail,
                  "redirect_to": "",
                  "wp-submit": "Get New Password"
                }).toString(),
              });
              console.log(`✉️ Password reset request sent to wp-login for ${customerEmail}`);
            } catch (emailErr) {
              console.error("❌ Email Trigger Error:", emailErr);
            }
          }
        }

        if (userId) {
          await fetch(`${process.env.WORDPRESS_URL}/wp-json/wp/v2/users/${userId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Basic ${authHeader}` },
            body: JSON.stringify({ roles: [targetRole] }),
          });
        }
      } catch (error: any) {
        console.error("❌ Webhook Error:", error.message);
      }
    }
  }

  return NextResponse.json({ received: true });
}