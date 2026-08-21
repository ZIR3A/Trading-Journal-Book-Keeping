import { Inter, Playfair_Display, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://trading-journal-book-keeping.vercel.app'),
  title: {
    template: '%s — Trading Journal',
    default: 'Trading Journal App — Professional trade tracking',
  },
  description: 'Professional trading journal and performance-analysis application for active traders.',
  openGraph: {
    title: 'Trading Journal App',
    description: 'Professional trading journal and performance-analysis application for active traders.',
    url: 'https://trading-journal-book-keeping.vercel.app',
    siteName: 'Trading Journal',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { AuthProvider } from "@/lib/auth/auth-context";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${sourceSerif.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
