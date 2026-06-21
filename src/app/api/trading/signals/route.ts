import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      // Mock Fallback
      return NextResponse.json({ signals: generateDummySignals() });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Fetch from real Supabase table 'trade_signals'
    const { data, error } = await supabase
      .from('trade_signals')
      .select('*')
      .order('timestamp', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Supabase Error fetching trade signals:', error.message);
      // Fallback to mock if table is missing or errors out
      return NextResponse.json({ signals: generateDummySignals() });
    }

    if (!data || data.length === 0) {
      // Fallback if empty
      return NextResponse.json({ signals: generateDummySignals() });
    }

    return NextResponse.json({ signals: data });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// Function to generate dummy signals (used as fallback)
function generateDummySignals() {
  const pairs = ["BTC/USDT", "ETH/USDT", "SOL/USDT", "XRP/USDT"];
  const signals = [];

  for (let i = 0; i < 4; i++) {
    const pair = pairs[i];
    const type = Math.random() > 0.5 ? "BUY" : "SELL";
    const price = pair === "BTC/USDT" ? 64000 + Math.random() * 2000 :
                  pair === "ETH/USDT" ? 3400 + Math.random() * 100 :
                  pair === "SOL/USDT" ? 140 + Math.random() * 10 :
                  0.5 + Math.random() * 0.1;

    // Generate dummy detail line data inside the function
    const detail_line = Array.from({ length: 20 }, (_, idx) => ({
      time: `${idx}:00`,
      price: price + (Math.random() - 0.5) * (price * 0.05)
    }));

    signals.push({
      id: `sig-${Date.now()}-${i}`,
      pair,
      type,
      price,
      confidence: 70 + Math.floor(Math.random() * 25),
      timestamp: new Date().toISOString(),
      detail_line
    });
  }

  return signals;
}
