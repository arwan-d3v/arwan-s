import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // In a real implementation, we would verify the signature here
    // using crypto and the Midtrans Server Key

    const { order_id, transaction_status } = body;

    console.log(`Midtrans Webhook Received: ${order_id} - Status: ${transaction_status}`);

    if (transaction_status === 'settlement' || transaction_status === 'capture') {
      // Update subscription in Supabase
      // e.g., UPDATE subscriptions SET status = 'active', current_period_end = NOW() + INTERVAL '1 month' WHERE order_id = order_id
    } else if (transaction_status === 'cancel' || transaction_status === 'expire' || transaction_status === 'deny') {
       // Update to canceled
    }

    return NextResponse.json({ status: 'ok' });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
