import { redirect } from "next/navigation";
// import {Analytics} from "@vercel/analytics/next"


export default function RootPage() {
  // Redirect to English homepage by default
  redirect("/en");
}
