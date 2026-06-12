import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nirmalya Das | Student Leader, AI Enthusiast & Full-Stack Builder",
  description: "Personal portfolio of Nirmalya Das, a B.Tech CSE (AIML) student at VIT Bhopal University. Club President, cybersecurity researcher, and aspiring entrepreneur.",
  keywords: ["Nirmalya Das", "Nirmalya Debidutta Das", "VIT Bhopal", "Feedbox Club", "AI Developer", "Cybersecurity", "Odia Club", "Microsoft Club", "Traynix"],
  authors: [{ name: "Nirmalya Das" }],
  openGraph: {
    title: "Nirmalya Das | Student Leader & AI-Full Stack Developer",
    description: "B.Tech CSE (AIML) student at VIT Bhopal University, President of Feedbox Club, Vice President of Odia Club, technology enthusiast.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nirmalya Das | Student Leader & AI-Full Stack Developer",
    description: "B.Tech CSE (AIML) student at VIT Bhopal University, President of Feedbox Club.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable}`} style={{ scrollBehavior: 'smooth' }}>
      <body className="min-h-screen bg-[#f8fafc] text-[#0f172a] dark:bg-[#030712] dark:text-[#f9fafb] antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
