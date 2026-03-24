import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { 
      amount, 
      membershipType, // Original variable name
      email, 
      firstName, 
      lastName,
      items,          // New Shop items
      type            // New Shop type
    } = await req.json();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // This ensures your WordPress 'plan' is never empty
    const planValue = membershipType || type || "individual";

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        // --- EXACT ORIGINAL KEYS FOR WORDPRESS ---
        plan: planValue,           
        customer_email: email,
        first_name: firstName || "",
        last_name: lastName || "",
        
        // --- EXTRA SHOP DATA (WordPress will ignore these) ---
        order_type: type || "membership",
        items_ordered: items ? items.join(", ") : ""
      },
      receipt_email: email, 
    });

    console.log(`✅ PaymentIntent Created: ${planValue} for ${email}`);

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    console.error("❌ Stripe API Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}