import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { ThemeProvider } from "@/components/theme-provider";
import { profile } from "@/lib/portfolio";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: `${profile.fullName} | ${profile.role}`,
    template: `%s | ${profile.fullName}`
  },
  description:
    "Portfólio profissional de desenvolvedora Back-End .NET com foco em C#, ASP.NET Core, APIs REST, bancos de dados relacionais e arquitetura de software.",
  keywords: [
    "Back-End Developer",
    ".NET",
    "C#",
    "ASP.NET Core",
    "APIs REST",
    "Clean Architecture",
    "SQL",
    "React",
    "TypeScript"
  ],
  authors: [{ name: profile.fullName }],
  creator: profile.fullName,
  openGraph: {
    title: `${profile.fullName} | ${profile.role}`,
    description:
      "Desenvolvedora focada em C#, ASP.NET Core, APIs REST, bancos de dados relacionais e arquitetura de software.",
    ...(siteUrl ? { url: siteUrl } : {}),
    siteName: `${profile.fullName} Portfolio`,
    images: ["/opengraph-image"],
    locale: "pt_BR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image"],
    title: `${profile.fullName} | ${profile.role}`,
    description:
      "Portfólio profissional com foco em Back-End .NET, arquitetura e APIs."
  },
  ...(siteUrl ? { alternates: { canonical: siteUrl } } : {})
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
