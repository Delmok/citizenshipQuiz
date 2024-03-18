import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google';
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
    <body className={inter.className}>{children}</body>
    <GoogleAnalytics gaId="G-2YWB4L05HV" />
    </html>
  );
}
