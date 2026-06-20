import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
});

export const metadata: Metadata = {
  title: "Arwan'space — Your Professional Hub & Digital Ecosystem",
  description:
    "Personal branding, interactive resume, services showcase, and a member ecosystem. Powered by Thunder Breathing.",
  keywords: [
    "Arwan'space",
    "personal branding",
    "resume builder",
    "portfolio",
    "digital ecosystem",
  ],
  openGraph: {
    title: "Arwan'space — Your Professional Hub & Digital Ecosystem",
    description: "Personal branding, interactive resume, services showcase, and a member ecosystem. Powered by Thunder Breathing.",
    url: 'https://arwan.space',
    siteName: "Arwan'space",
    locale: 'en_US',
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: "#08070a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${grotesk.variable} bg-background antialiased`}
    >
      <body className="font-sans">{children}</body>
    </html>
  );
}
