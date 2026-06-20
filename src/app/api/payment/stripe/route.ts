import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { plan_id, billing_cycle } = body;

    if (!process.env.STRIPE_SECRET_KEY) {
      // Mock Fallback
      return NextResponse.json({
        url: `/dashboard?mock_payment=success&provider=stripe&plan=${plan_id}`
      });
    }

    // Determine amount based on plan (in cents)
    let amount = 0;
    if (plan_id === 'student') amount = billing_cycle === 'monthly' ? 300 : 2900;
    if (plan_id === 'pro') amount = billing_cycle === 'monthly' ? 1000 : 9600;
    if (plan_id === 'company') amount = billing_cycle === 'monthly' ? 3000 : 28800;

    const origin = request.headers.get('origin') || 'http://localhost:3000';

    // Native fetch to Stripe API
    const params = new URLSearchParams({
      'success_url': `${origin}/dashboard?payment=success&provider=stripe`,
      'cancel_url': `${origin}/dashboard/upgrade?payment=cancelled`,
      'payment_method_types[0]': 'card',
      'mode': 'payment',
      'line_items[0][price_data][currency]': 'usd',
      'line_items[0][price_data][product_data][name]': `Arwan'space ${plan_id.toUpperCase()} Plan (${billing_cycle})`,
      'line_items[0][price_data][unit_amount]': amount.toString(),
      'line_items[0][quantity]': '1',
    });

    const response = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to create Stripe session');
    }

    const data = await response.json();

    return NextResponse.json({
      url: data.url
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
