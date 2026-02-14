import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Valentine's Quest ❤️ - A Gift from Soso",
  description: "A romantic 2D platformer to celebrate love. Play, solve puzzles, and discover heartfelt surprises built by Soso.",
  keywords: [
    "Valentine's Quest",
    "Valentine",
    "Romantic Game",
    "2D Platformer",
    "Love Puzzle",
    "Soso"
  ],
  authors: [{ name: "Soso" }],
  icons: {
    icon: "/images/favicon-heart.ico", // replace with a heart favicon if you have one
  },
  openGraph: {
    title: "Valentine's Quest ❤️",
    description: "A romantic 2D platformer crafted with love by Soso",
    url: "https://your-game-url.com",
    siteName: "Valentine's Quest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Valentine's Quest ❤️",
    description: "Play a heartfelt game created by Soso",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-pink-50 text-pink-900`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
