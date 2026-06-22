import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { getActiveTheme, setActiveTheme } from "@/lib/theme-service";
import { themes } from "@/lib/themes";

export async function GET() {
  try {
    const theme = await getActiveTheme();
    return NextResponse.json({ theme });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch theme";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { themeId } = await request.json();
    if (!themeId || !themes[themeId]) {
      return NextResponse.json({ error: "Invalid themeId" }, { status: 400 });
    }

    // Auth verification: check if user is admin/superadmin
    let isAdmin = false;

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      // Mock Mode: check cookie
      const cookieStore = cookies();
      const mockEmail = cookieStore.get("mock_user_email")?.value;
      if (mockEmail === "admin@arwan.space") {
        isAdmin = true;
      }
    } else {
      // Production Mode: check Supabase user role
      const cookieStore = cookies();
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            get(name: string) {
              return cookieStore.get(name)?.value;
            },
            set(name: string, value: string, options: CookieOptions) {
              cookieStore.set({ name, value, ...options });
            },
            remove(name: string, options: CookieOptions) {
              cookieStore.set({ name, value: "", ...options });
            },
          },
        }
      );

      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        if (profile?.role === "superadmin") {
          isAdmin = true;
        }
      }
    }

    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized: Superadmin access required" }, { status: 403 });
    }

    const success = await setActiveTheme(themeId);
    if (!success) {
      return NextResponse.json({ error: "Failed to set theme" }, { status: 500 });
    }

    return NextResponse.json({ success: true, theme: themes[themeId] });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
