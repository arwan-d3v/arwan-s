import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // In a real implementation, we would verify the signature here
    // using Stripe SDK: stripe.webhooks.constructEvent(body, signature, endpointSecret);

    const { type, data } = body;

    console.log(`Stripe Webhook Received - Event Type: ${type}`);

    if (type === 'checkout.session.completed') {
      const session = data.object;
      console.log(`Payment successful for session: ${session.id}`);
      // Implement Supabase update logic here using session details
      // e.g., UPDATE subscriptions SET status = 'active'
    } else if (type === 'payment_intent.payment_failed') {
       console.log('Payment failed');
       // Update to canceled
    }

    return NextResponse.json({ status: 'ok', received: true });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
