import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@/components/seo/analytics";
import { OrganizationSchema, WebSiteSchema } from "@/components/seo/schema";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Premium Online Coaching`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Online fitness and weight loss coaching for busy parents starting from zero. Simple 30-minute programs, weekly check-ins, and a coach in your corner.",
  keywords: [
    "online fitness coaching for busy parents",
    "beginner online personal trainer",
    "weight loss coaching for parents",
    "nutrition coaching",
    "online personal training",
    "accountability coaching",
    "Cooper Fitness",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    images: [
      {
        url: "/evanactionweb.png",
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.svg",
  },
  verification: {
    google: "5Oq9WSk9Auhu7o2ced-gX-wSpCMU248n7Oao5HQasc4",
  },
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased`}>
        <OrganizationSchema campaign={process.env.FOUNDING_HOMEPAGE_ENABLED === "true"} />
        <WebSiteSchema />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
