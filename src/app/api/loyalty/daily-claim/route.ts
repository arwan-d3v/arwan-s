import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // In a real app we would use user_id from body
    await request.json();

    const gifts = [
       { id: "pdf_export", name: "1 Free PDF Export", points: 0 },
       { id: "extra_conversion", name: "2 Extra Conversions", points: 0 },
       { id: "bonus_points", name: "1 Bonus Breath Point", points: 1 }
    ];

    // Pick a random gift
    const randomGift = gifts[Math.floor(Math.random() * gifts.length)];

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      // Mock Fallback
      return NextResponse.json({
        message: 'Mock: Daily gift claimed',
        gift: randomGift
      });
    }

    // In a real implementation:
    // 1. Fetch profile.last_daily_claim
    // 2. Check if last_daily_claim is before today (in user timezone or UTC)
    // 3. If valid, update last_daily_claim to NOW(), update points/inventory based on randomGift

    return NextResponse.json({
      message: 'Daily gift claimed successfully',
      gift: randomGift
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
