import type { Metadata } from "next";
import { Archivo_Narrow } from "next/font/google";
import { Analytics } from "@/components/seo/analytics";
import { OrganizationSchema, WebSiteSchema } from "@/components/seo/schema";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import "./globals.css";

const archivoNarrow = Archivo_Narrow({
  variable: "--font-archivo-narrow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Premium Online Coaching`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Precision online fitness coaching for high-performing professionals. Personalized strength, nutrition, and accountability.",
  keywords: [
    "online fitness coaching",
    "online personal trainer",
    "weight loss coaching",
    "nutrition coaching",
    "strength training",
    "accountability coaching",
    "habit coaching",
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
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${archivoNarrow.variable} antialiased`}>
        <OrganizationSchema />
        <WebSiteSchema />
        <Analytics />
        {children}
      </body>
    </html>
  );
}
