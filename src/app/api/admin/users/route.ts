import { NextResponse } from 'next/server';

export async function GET() {
  // In a real app, this would query Supabase for users and verify admin role
  const mockUsers = [
    { id: "u1", email: "user1@example.com", role: "public", plan: "Pro" },
    { id: "u2", email: "admin@arwan.space", role: "superadmin", plan: "Company" },
  ];

  return NextResponse.json({
    status: 'success',
    data: mockUsers
  });
}
