import { NextResponse } from 'next/server';

export async function GET() {
  const mockNotifications = [
    { id: "1", title: "Subscription Expiring", message: "Your Pro plan will expire in 3 days. Please renew to keep your features.", type: "warning", is_read: false, created_at: new Date().toISOString() },
    { id: "2", title: "New Trading Signal", message: "BTC/USD BUY signal detected with 92% confidence.", type: "info", is_read: false, created_at: new Date(Date.now() - 3600000).toISOString() },
    { id: "3", title: "Tier Upgraded", message: "Congratulations! You have been upgraded to the Master tier.", type: "success", is_read: true, created_at: new Date(Date.now() - 86400000).toISOString() }
  ];

  return NextResponse.json({ data: mockNotifications });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // { user_id, title, message, type }
    // Save to database

    return NextResponse.json({ message: "Notification created successfully", data: body });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Error creating notification";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
