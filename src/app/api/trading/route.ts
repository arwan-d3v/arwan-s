import { NextResponse } from 'next/server';

export async function GET() {
  // In a real app, this would fetch from Supabase or external Trading API
  const mockSignals = [
    { id: "1", pair: "BTC/USD", type: "BUY", price: 65430.50, confidence: 0.92, timestamp: new Date().toISOString() },
    { id: "2", pair: "ETH/USD", type: "SELL", price: 3450.20, confidence: 0.85, timestamp: new Date(Date.now() - 60000).toISOString() },
  ];

  return NextResponse.json({
    status: 'success',
    data: mockSignals
  });
}
