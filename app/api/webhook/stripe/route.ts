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
    
    // 1. 데이터 추출
    const plan = paymentIntent.metadata?.plan || "contributor";
    const customerEmail = paymentIntent.metadata?.customer_email || paymentIntent.receipt_email;
    const fName = paymentIntent.metadata?.first_name || "Member";
    const lName = paymentIntent.metadata?.last_name || "";

    // ⭐ [핵심 추가] 기부(Donation)인 경우 워드프레스 로직 실행 안 함
    if (plan.toLowerCase() === "donation") {
      console.log("❤️ Donation received. Skipping WordPress user creation.");
      return NextResponse.json({ received: true });
    }
    
    // 💡 멤버십 역할 이름 지정
    const targetRole = plan.toLowerCase().includes("contributor") ? "contributor_member" : `${plan.toLowerCase()}_member`;

    if (customerEmail) {
      try {
        const authHeader = Buffer.from(`${process.env.WP_USER}:${process.env.WP_APP_PASSWORD}`).toString("base64");
        let userId: number | null = null;

        // 2. 기존 유저 확인
        const userSearch = await fetch(`${process.env.WORDPRESS_URL}/wp-json/wp/v2/users?search=${customerEmail}`, {
          headers: { Authorization: `Basic ${authHeader}` },
        });
        const users = await userSearch.json();

        if (Array.isArray(users) && users.length > 0) {
          userId = users[0].id;
          console.log(`👤 Existing user found: ${userId}`);
        } else {
          // 3. 신규 유저 생성
          console.log(`🆕 Creating membership user: ${customerEmail}`);
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
              roles: ["subscriber"], 
            }),
          });

          const newUser = await createUserRes.json();
          if (createUserRes.ok) {
            userId = newUser.id;
          }
        }

        // 4. 멤버십 역할 부여
        if (userId) {
          await fetch(`${process.env.WORDPRESS_URL}/wp-json/wp/v2/users/${userId}`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Basic ${authHeader}` },
            body: JSON.stringify({ roles: [targetRole] }),
          });
          console.log(`✅ Membership finalized for ${customerEmail}`);
        }
      } catch (error: any) {
        console.error("❌ Webhook Error:", error.message);
      }
    }
  }

  return NextResponse.json({ received: true });
}