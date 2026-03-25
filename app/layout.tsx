import "./globals.css";
import { Inter, Outfit } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata = {
  title: "Viral Lab | Free AI Video to Reel Converter",
  description: "Transform long-form YouTube and MP4 videos into viral 9:16 reels for TikTok, Instagram, and Shorts using AI emotion analysis and auto-captioning. 100% Free.",
  keywords: ["AI Reel Maker", "Video to Reel", "Viral Video Converter", "TikTok AI Editor", "Instagram Reels AI", "Free Short Form Video Tool"],
  openGraph: {
    title: "Viral Lab | Transmute Video into Viral Gold",
    description: "The world's most advanced AI-powered reel maker. From long-form to high-retention short gems in seconds.",
    url: "https://cwazyk.vercel.app/",
    siteName: "Viral Lab",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Viral Lab | AI Reel Maker",
    description: "Convert video to viral reels for free.",
    creator: "@kabirzaa",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body>{children}</body>
    </html>
  );
}
