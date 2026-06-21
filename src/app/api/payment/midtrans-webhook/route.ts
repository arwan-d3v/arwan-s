import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const serverKey = process.env.MIDTRANS_SERVER_KEY || '';

    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status
    } = body;

    // Verify Signature Key
    if (serverKey) {
      const payload = `${order_id}${status_code}${gross_amount}${serverKey}`;
      const expectedSignature = crypto.createHash('sha512').update(payload).digest('hex');

      if (signature_key !== expectedSignature) {
        console.error('⚠️ Midtrans Webhook signature verification failed.');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 403 });
      }
    } else {
      console.warn('⚠️ MIDTRANS_SERVER_KEY not found, bypassing signature verification.');
    }

    console.log(`Midtrans Webhook Received: ${order_id} - Status: ${transaction_status}`);

    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
      );

      if (transaction_status === 'settlement' || transaction_status === 'capture') {
        const { data: subData } = await supabase
          .from('subscriptions')
          .select('user_id, plan_id')
          .eq('provider', 'midtrans')
          .limit(1)
          .single();

        if (subData) {
          const userId = subData.user_id;
          const planId = subData.plan_id || 'pro';

          await supabase
            .from('subscriptions')
            .update({
              status: 'active',
              current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
              updated_at: new Date().toISOString()
            })
            .eq('user_id', userId);

          let role = 'member';
          if (planId === 'pro' || planId === 'company') role = 'pro';

          await supabase
            .from('profiles')
            .update({ role: role })
            .eq('id', userId);
        }
      } else if (transaction_status === 'cancel' || transaction_status === 'expire' || transaction_status === 'deny') {
        console.log(`Midtrans payment canceled/expired for ${order_id}`);
      }
    }

    return NextResponse.json({ status: 'ok' });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
