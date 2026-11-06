import type { Metadata, Viewport } from "next";
import { Montserrat, Plus_Jakarta_Sans } from "next/font/google";
import type { ReactNode } from "react";

import { IntroProvider } from "@/components/providers/IntroProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { siteConfig } from "@/lib/site";
import "./globals.css";

/* RIZOMA DS: Plus Jakarta Sans (Display/Heading) + Montserrat (Label/Paragraph). Variáveis: qualquer peso. */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.organization.name, url: siteConfig.organization.url }],
  creator: siteConfig.organization.name,
  publisher: siteConfig.organization.name,
  category: "technology",
  alternates: { canonical: "/" },
  // A imagem vem de app/opengraph-image.tsx (Next.js injeta og:image com dimensões e alt).
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/",
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  // Sem twitter:image explícito o X usa a og:image.
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR" className={`${jakarta.variable} ${montserrat.variable}`}>
      <body>
        <IntroProvider>
          {children}
          <CustomCursor />
        </IntroProvider>
      </body>
    </html>
  );
}
