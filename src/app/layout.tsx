import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans'; // Import from geist/font/sans
import { GeistMono } from 'geist/font/mono'; // Import from geist/font/mono
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import { GsapProvider } from '@/components/animations/gsap-provider'; // Import GSAP Provider
import { SmoothScrollProvider } from '@/components/layout/smooth-scroll-provider'; // Import Smooth Scroll Provider
import CustomCursor from '@/components/custom-cursor'; // Import Custom Cursor

export const metadata: Metadata = {
  title: 'Portfolio Pro - Kesari Dasaradh',
  description: 'Modern portfolio website for Kesari Dasaradh, showcasing backend development skills and modern UI/UX.',
  icons: { // Add favicon link
    icon: '/favicon.ico',
  },
  // Add Open Graph and Twitter Card metadata later if needed
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Apply font variables directly from the imported objects */}
      {/* Add suppressHydrationWarning to body to mitigate extension-related hydration errors */}
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          <SmoothScrollProvider> {/* Wrap with SmoothScrollProvider */}
            <GsapProvider> {/* Wrap with GsapProvider */}
              <div className="flex flex-col min-h-screen">
                  <Header />
                  <main className="flex-grow">{children}</main>
                  <Footer />
              </div>
              <Toaster />
              <CustomCursor /> {/* Add Custom Cursor */}
            </GsapProvider>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
