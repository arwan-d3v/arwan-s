import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Mock Mode fallback
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      console.log('Using mock auth mode for email:', email);

      const role = email === 'admin@arwan.space' ? 'superadmin' : 'public';

      // Set a dummy cookie to represent the mock session
      cookies().set('mock_user_email', email, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax'
      });

      return NextResponse.json({
        message: 'Mock login successful',
        email,
        role
      });
    }

    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      // In a real app we might want to register them automatically if they don't exist
      // Since this is mock-first design, let's try to sign them up if login fails
      // as a fallback if the error is "Invalid login credentials"
      if (error.message.includes('Invalid login credentials')) {
         const { error: signUpError } = await supabase.auth.signUp({
           email,
           password
         });

         if (signUpError) {
           return NextResponse.json({ error: signUpError.message }, { status: 400 });
         }

         // Trigger should have created profile, return user details
         const role = email === 'admin@arwan.space' ? 'superadmin' : 'public';
         return NextResponse.json({
            message: 'Signed up successfully',
            role
         });
      }

      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Fetch profile to get role
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single();

    const role = profile?.role || (email === 'admin@arwan.space' ? 'superadmin' : 'public');

    return NextResponse.json({
      message: 'Login successful',
      role
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
