import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature') || '';

  let event: Stripe.Event;

  if (process.env.STRIPE_SECRET_KEY) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2026-05-27.dahlia',
    });

    if (process.env.STRIPE_WEBHOOK_SECRET) {
      try {
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        console.error(`⚠️ Webhook signature verification failed. ${errorMessage}`);
        return NextResponse.json({ error: errorMessage }, { status: 400 });
      }
    } else {
      console.warn('⚠️ STRIPE_WEBHOOK_SECRET not found, bypassing signature verification.');
      event = JSON.parse(body);
    }
  } else {
    // If no stripe secret, just parse body
    event = JSON.parse(body);
  }

  const { type, data } = event;
  console.log(`Stripe Webhook Received - Event Type: ${type}`);

  try {
    if (type === 'checkout.session.completed') {
      const session = data.object as Stripe.Checkout.Session;
      console.log(`Payment successful for session: ${session.id}`);

      const userEmail = session.customer_email || session.customer_details?.email;
      const metadata = session.metadata; // Expecting metadata like plan_id, etc.

      if (userEmail && process.env.NEXT_PUBLIC_SUPABASE_URL) {
        // Use service role for webhooks as they run in the background
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

        if (supabaseKey) {
          const supabase = createClient(supabaseUrl, supabaseKey);

          // Find user by email
          const { data: userProfile, error: userError } = await supabase
            .from('profiles')
            .select('id')
            .eq('email', userEmail)
            .single();

          if (userError) {
            console.error('Error finding user for webhook update:', userError.message);
          } else if (userProfile) {
            const userId = userProfile.id;
            const planId = metadata?.plan_id || 'pro'; // Default to pro if not specified

            // 1. Update subscription status
            const { error: subError } = await supabase
              .from('subscriptions')
              .upsert({
                user_id: userId,
                plan_id: planId,
                status: 'active',
                provider: 'stripe',
                current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // Roughly +1 month
                updated_at: new Date().toISOString()
              }, { onConflict: 'user_id' });

            if (subError) console.error('Error updating subscription:', subError.message);

            // 2. Update profiles role based on plan
            let role = 'member';
            if (planId === 'pro' || planId === 'company') role = 'pro';

            const { error: profileError } = await supabase
              .from('profiles')
              .update({ role: role })
              .eq('id', userId);

            if (profileError) console.error('Error updating profile role:', profileError.message);
          }
        }
      }
    } else if (type === 'payment_intent.payment_failed') {
       console.log('Payment failed');
       // We would potentially mark subscription as unpaid/canceled here
       // using similar logic as above if we pass enough metadata.
    }

    return NextResponse.json({ status: 'ok', received: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
