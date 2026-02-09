import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import HCaptchaClient from "@/components/hcaptcha-client";

async function InstrumentsData() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    // only redirect/authenticate for this route
    redirect("/auth/login");
  }

  const { data: instruments } = await supabase.from("instruments").select();
  return (
    <div>
      <pre>{JSON.stringify(instruments, null, 2)}</pre>
      <div style={{ marginTop: 16 }}>
        <p>Prove you are human (demo hCaptcha):</p>
        <HCaptchaClient onVerify={(token) => console.log("Received token in client prop:", token)} />
      </div>
    </div>
  );
}

export default function Instruments() {
  return (
    <Suspense fallback={<div>Loading instruments...</div>}>
      <InstrumentsData />
    </Suspense>
  );
}