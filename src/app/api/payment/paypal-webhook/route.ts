import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // In a real implementation, we would verify the webhook signature here
    // using PayPal-Transmission-Id, PayPal-Transmission-Sig, etc.

    const { event_type, resource } = body;

    console.log(`PayPal Webhook Received - Event Type: ${event_type}`);

    if (event_type === 'PAYMENT.CAPTURE.COMPLETED') {
      console.log(`Payment successful for order: ${resource.id}`);
      // Implement Supabase update logic here using resource details
      // e.g., UPDATE subscriptions SET status = 'active'
    } else if (event_type === 'PAYMENT.CAPTURE.DENIED' || event_type === 'PAYMENT.CAPTURE.REFUNDED') {
       console.log('Payment canceled or refunded');
       // Update to canceled
    }

    return NextResponse.json({ status: 'ok', received: true });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
