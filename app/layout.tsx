import type { Metadata, Viewport } from "next";
import { Fraunces, Instrument_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import PwaRegister from "@/components/PwaRegister";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});
const body = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const description =
  "List your tasks and how long each takes. Daychain chains them into a schedule for your whole day.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Daychain: plan your whole day",
    template: "%s · Daychain",
  },
  description,
  applicationName: "Daychain",
  appleWebApp: { capable: true, title: "Daychain", statusBarStyle: "black" },
  openGraph: {
    title: "Daychain",
    description,
    type: "website",
    siteName: "Daychain",
  },
  twitter: { card: "summary_large_image", title: "Daychain", description },
};

export const viewport: Viewport = {
  themeColor: "#14151f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen font-sans antialiased">
        {children}
        <PwaRegister />
        <Analytics />
      </body>
    </html>
  );
}
