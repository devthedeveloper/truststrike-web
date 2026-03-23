import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TrustStrike — Don't Trust Your Security. Prove It.",
  description:
    "Autonomous AI penetration testing that shows you everything. Every attack, every finding, every proof — transparent security you can verify yourself.",
  keywords: [
    "penetration testing",
    "AI security",
    "autonomous pentest",
    "vulnerability scanner",
    "application security",
    "DAST",
    "SAST",
  ],
  openGraph: {
    title: "TrustStrike — Don't Trust Your Security. Prove It.",
    description:
      "Autonomous AI agents that attack your systems like real hackers — then show you exactly how, step by step, with proof you can verify yourself.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-bg-primary text-text-primary font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
