"use client";

import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useRef } from "react";

type Props = {
  onVerify?: (token: string) => void;
};

export default function HCaptchaClient({ onVerify }: Props) {
  const ref = useRef<any>(null);
  const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY || "";

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
