import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function POST(request: Request) {
  try {
    const { token } = await request.json();

    // Allow dev bypass token when dev or explicit env var is set
    const isDev = process.env.NODE_ENV === "development" || process.env.NEXT_PUBLIC_DISABLE_HCAPTCHA === "true";
    if (!token && !isDev) {
      return NextResponse.json({ error: "Missing captcha token" }, { status: 400 });
    }

    if (!isDev) {
      if (!process.env.HCAPTCHA_SECRET) {
        return NextResponse.json({ error: "HCAPTCHA_SECRET not configured" }, { status: 500 });
      }

      const params = new URLSearchParams();
      params.append("secret", process.env.HCAPTCHA_SECRET);
      params.append("response", token);

      const verifyRes = await fetch("https://hcaptcha.com/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });

      const verifyJson = await verifyRes.json();
      if (!verifyJson.success) {
        return NextResponse.json({ error: "Captcha verification failed" }, { status: 403 });
      }
    }

    // Fetch instruments from Supabase using the publishable key (server-side)
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    );

    const { data: instruments, error } = await supabase.from("instruments").select();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ instruments });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 });
  }
}
