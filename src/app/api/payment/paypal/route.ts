import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { plan_id, billing_cycle } = body;

    if (!process.env.PAYPAL_SECRET || !process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID) {
      // Mock Fallback
      return NextResponse.json({
        approval_url: `/dashboard?mock_payment=success&provider=paypal&plan=${plan_id}`
      });
    }

    // Determine amount based on plan
    let amount = 0;
    if (plan_id === 'student') amount = billing_cycle === 'monthly' ? 3 : 29;
    if (plan_id === 'pro') amount = billing_cycle === 'monthly' ? 10 : 96;
    if (plan_id === 'company') amount = billing_cycle === 'monthly' ? 30 : 288;

    const origin = request.headers.get('origin') || 'http://localhost:3000';

    // 1. Get Access Token
    const authString = Buffer.from(`${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`).toString('base64');
    const tokenResponse = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${authString}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials'
    });

    if (!tokenResponse.ok) {
       throw new Error('Failed to get PayPal access token');
    }
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // 2. Create Order
    const orderResponse = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'USD',
            value: amount.toString()
          },
          description: `Arwan'space ${plan_id.toUpperCase()} Plan`
        }],
        application_context: {
          return_url: `${origin}/dashboard?payment=success&provider=paypal`,
          cancel_url: `${origin}/dashboard/upgrade?payment=cancelled`
        }
      })
    });

    if (!orderResponse.ok) {
      throw new Error('Failed to create PayPal order');
    }

    const orderData = await orderResponse.json();
    const approvalLink = orderData.links.find((link: { rel: string, href: string }) => link.rel === 'approve');

    return NextResponse.json({
      approval_url: approvalLink ? approvalLink.href : null
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
