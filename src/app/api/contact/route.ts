import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, source } = body;

    // 1. Save to database
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      const { error } = await supabase
        .from('contact_submissions')
        .insert([{ name, email, message, source }]);

      if (error) {
        console.error('Error saving contact submission to Supabase:', error.message);
      }
    }

    // 2. Send Telegram Notification
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken) {
       if (!chatId) {
         console.warn('⚠️ TELEGRAM_BOT_TOKEN is set, but TELEGRAM_CHAT_ID is missing. Cannot send Telegram notification.');
       } else {
         const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
         const text = `🚨 *New Contact Form Submission*\n\n*Name:* ${name}\n*Email:* ${email}\n*Source:* ${source || 'Unknown'}\n\n*Message:*\n${message}`;

         const tgRes = await fetch(telegramUrl, {
           method: 'POST',
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify({
             chat_id: chatId,
             text: text,
             parse_mode: 'Markdown'
           })
         });

         if (!tgRes.ok) {
           console.error('Failed to send Telegram message:', await tgRes.text());
         }
       }
    }

    return NextResponse.json({ message: "Contact message sent successfully" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error submitting contact form";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
