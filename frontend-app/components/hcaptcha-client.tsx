"use client";

import React, { forwardRef, useImperativeHandle, useRef } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

type Props = {
  onVerify: (token: string) => void;
  siteKey?: string;
};

export type HCaptchaRef = {
  resetCaptcha: () => void;
};

const HCaptchaClient = forwardRef<HCaptchaRef, Props>(function HCaptchaClient(
  { onVerify, siteKey },
  ref,
) {
  const captchaRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    resetCaptcha: () => captchaRef.current?.resetCaptcha(),
  }));

  return (
    <HCaptcha
      sitekey={(siteKey ?? process.env.NEXT_PUBLIC_HCAPTCHA_SITEKEY) as string}
      ref={captchaRef}
      onVerify={(token: string) => onVerify(token)}
    />
  );
});

export default HCaptchaClient;
