import type { Metadata } from "next";
import { DM_Serif_Display, Public_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { site } from "@/content/site";
import { SITE_URL } from "@/lib/api";

const sans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
});

const serif = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dm-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description: site.bio,
  authors: [{ name: site.name }],
  keywords: [
    "full stack developer",
    "Next.js developer",
    "TypeScript",
    "MERN stack",
    "Bengaluru",
    site.name,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.bio,
    images: [{ url: "/profile.jpg", width: 1250, height: 1250, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.bio,
    images: ["/profile.jpg"],
    creator: "@sagar_bj01",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
