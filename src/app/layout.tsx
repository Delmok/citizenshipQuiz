import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import Script from 'next/script'
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Canadian Citizenship Quiz - Citizen Quiz",
  description: "Created by - Jesse Martin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <head>
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9722437436108814"
        crossOrigin="anonymous"/>
        </head>
        <body className={inter.className}>{children}</body>
        <GoogleAnalytics gaId="G-2YWB4L05HV" />
        <GoogleTagManager gtmId="GTM-TLQW6HXG" />
    </html>
  );
}
