import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

async function verifySuperadmin() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return false;
  
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return cookieStore.get(name)?.value; },
        set(name: string, value: string, options: CookieOptions) { cookieStore.set({ name, value, ...options }); },
        remove(name: string, options: CookieOptions) { cookieStore.set({ name, value: "", ...options }); },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  return profile?.role === "superadmin";
}

export async function GET() {
  try {
    if (!(await verifySuperadmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase.from("theme_configs").select("*").order("sort_order");
    
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ themes: data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!(await verifySuperadmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const body = await request.json();
    
    // Convert camelCase to snake_case for DB
    const dbPayload = {
      id: body.id,
      name: body.name,
      edition_label: body.editionLabel,
      accent_name: body.accentName,
      video_background: body.videoPath,
      video_portrait: body.videoPortraitPath,
      focal_point: body.focalPoint,
      palette: body.palette,
      category: "public",
      layout_id: "classic",
      active: true,
      updated_at: new Date().toISOString()
    };

    const { error } = await supabase.from("theme_configs").upsert(dbPayload);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    if (!(await verifySuperadmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    if (["zenitsu", "gojo", "igris"].includes(id)) {
      return NextResponse.json({ error: "Cannot delete built-in system themes" }, { status: 403 });
    }

    const { error } = await supabase.from("theme_configs").delete().eq("id", id);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
