import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const defaultUrl = process.env.NEXT_PUBLIC_SITE_URL || 
  process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:3000`;

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: {
    template: "%s | Figure Fixing Felix",
    default: "Figure Fixing Felix - Action Figure Repair Tutorials & Guides"
  },
  description: "Learn how to fix loose, stiff, and broken parts on your action figures. Free community-driven tutorials for Amazing Yamaguchi, Revoltech, and other collectible figures.",
  keywords: ["action figure repair", "figure fixing", "revoltech repair", "amazing yamaguchi", "loose joints", "broken parts", "figure maintenance", "toy repair"],
  authors: [{ name: "Figure Fixing Felix" }],
  creator: "Figure Fixing Felix",
  publisher: "Figure Fixing Felix",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: defaultUrl,
    siteName: "Figure Fixing Felix",
    title: "Figure Fixing Felix - Action Figure Repair Tutorials",
    description: "Learn how to fix loose, stiff, and broken parts on your action figures with our free community-driven tutorials.",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Figure Fixing Felix",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Figure Fixing Felix - Action Figure Repair Tutorials",
    description: "Learn how to fix loose, stiff, and broken parts on your action figures.",
    images: ["/assets/twitter-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: 'NiarNh3UCDYMH7wELHZuH6u95_H3971yxDrOwNq5A3M',
    // Add these when you set up other tools
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
