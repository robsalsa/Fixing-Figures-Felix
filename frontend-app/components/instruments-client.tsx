"use client";

import { useState } from "react";
import HCaptchaClient from "./hcaptcha-client";

export default function InstrumentsClient() {
  const [loading, setLoading] = useState(false);
  const [instruments, setInstruments] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleVerify(token: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/instruments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body?.error || "Failed to fetch instruments");
      setInstruments(body.instruments || []);
    } catch (err: any) {
      setError(err?.message || String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <p>Prove you are human (hCaptcha):</p>
      <HCaptchaClient onVerify={handleVerify} />

      {loading && <div>Loading instruments…</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}

      {instruments && (
        <div style={{ marginTop: 12 }}>
          <h3>Instruments</h3>
          <pre>{JSON.stringify(instruments, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
