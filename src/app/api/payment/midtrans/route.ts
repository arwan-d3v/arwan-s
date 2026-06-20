import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { plan_id, billing_cycle, user_email } = body;

    if (!process.env.MIDTRANS_SERVER_KEY) {
      // Mock Fallback
      return NextResponse.json({
        redirect_url: `/dashboard?mock_payment=success&provider=midtrans&plan=${plan_id}`,
        token: "mock-snap-token-123"
      });
    }

    // Native fetch to Midtrans Snap API
    const authString = Buffer.from(process.env.MIDTRANS_SERVER_KEY + ':').toString('base64');

    // Determine amount based on plan
    let amount = 0;
    if (plan_id === 'student') amount = billing_cycle === 'monthly' ? 45000 : 435000;
    if (plan_id === 'pro') amount = billing_cycle === 'monthly' ? 150000 : 1440000;
    if (plan_id === 'company') amount = billing_cycle === 'monthly' ? 450000 : 4320000;

    const response = await fetch('https://app.sandbox.midtrans.com/snap/v1/transactions', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Basic ${authString}`
      },
      body: JSON.stringify({
        transaction_details: {
          order_id: `ORDER-${Date.now()}-${Math.random().toString(36).substring(7)}`,
          gross_amount: amount
        },
        customer_details: {
          email: user_email || 'customer@arwan.space'
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error_messages ? errorData.error_messages[0] : 'Failed to create Midtrans transaction');
    }

    const data = await response.json();

    return NextResponse.json({
      redirect_url: data.redirect_url,
      token: data.token
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
