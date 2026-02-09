"use client";

import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useRef, useEffect } from "react";

type Props = {
  onVerify?: (token: string) => void;
};

export default function HCaptchaClient({ onVerify }: Props) {
  const ref = useRef<any>(null);
  const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY || "";
  const isDev =
    process.env.NODE_ENV === "development" ||
    process.env.NEXT_PUBLIC_DISABLE_HCAPTCHA === "true";

  useEffect(() => {
    if (isDev) {
      console.log("hCaptcha disabled (dev). Auto-verifying with dev-bypass token.");
      onVerify?.("dev-bypass");
    }
  }, [isDev, onVerify]);

  if (isDev) {
    return <div />;
  }

  return (
    <div>
      <HCaptcha
        ref={ref}
        sitekey={siteKey}
        onVerify={(token: string) => {
          console.log("hCaptcha token:", token);
          onVerify?.(token);
        }}
      />
    </div>
  );
}
