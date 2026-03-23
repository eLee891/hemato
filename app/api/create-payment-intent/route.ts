import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { amount, membershipType, email, firstName, lastName } = await req.json();

    // 1. 이메일 형식 및 완성도 검증 (서버 측 안전장치)
    // 이메일 끝자리가 .com, .net 처럼 최소 2글자 이상으로 끝나야 통과됨
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    
    if (!email || !emailRegex.test(email)) {
      console.error(`⚠️ Rejected incomplete email: ${email}`);
      return NextResponse.json(
        { error: "Invalid or incomplete email address." }, 
        { status: 400 }
      );
    }

    // 2. Stripe PaymentIntent 생성
    // 사용자가 'Proceed to Payment' 버튼을 눌렀을 때만 호출되므로 이 시점의 데이터는 정확합니다.
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        plan: membershipType || "individual",
        customer_email: email, // 워드프레스 유저 생성용 아이디
        first_name: firstName || "",
        last_name: lastName || "",
      },
      // Stripe 영수증 발송용 이메일
      receipt_email: email, 
    });

    console.log(`✅ PaymentIntent Created for: ${email}`);

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error: any) {
    console.error("❌ Stripe API Error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}