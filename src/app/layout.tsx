import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans'; // Import from geist/font/sans
import { GeistMono } from 'geist/font/mono'; // Import from geist/font/mono
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";

// Correct way to initialize Geist fonts
const geistSans = GeistSans({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = GeistMono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Portfolio Pro - Kesari Dasaradh',
  description: 'Modern portfolio website for Kesari Dasaradh, showcasing backend development skills.',
  // Add Open Graph and Twitter Card metadata later if needed
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Apply font variables to the body */}
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
            </div>
            <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
