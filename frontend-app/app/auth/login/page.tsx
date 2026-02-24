import { LoginForm } from "@/components/login-form";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
      <div className="w-full max-w-sm mt-4 text-center text-sm text-gray-600">
          IF YOU DO NOT WISH TO SIGN IN please{' '}
          <Link href="/auth/skip" className="underline font-medium text-primary">
            press here
          </Link>
          {' '}to continue as a guest.
      </div>
    </div>
  );
}
