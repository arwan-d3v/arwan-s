import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, source } = body;

    // 1. Save to database (mock fallback bypasses this)
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      // await supabase.from('contact_submissions').insert([{ name, email, message, source }]);
    }

    // 2. Send Telegram Notification
    if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
      const telegramUrl = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;
      const text = `🚨 *New Contact Form Submission*\n\n*Name:* ${name}\n*Email:* ${email}\n*Source:* ${source || 'Unknown'}\n\n*Message:*\n${message}`;

      await fetch(telegramUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: process.env.TELEGRAM_CHAT_ID,
          text: text,
          parse_mode: 'Markdown'
        })
      });
    }

    return NextResponse.json({ message: "Contact message sent successfully" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error submitting contact form";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
