import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";
import { GsapProvider } from '@/components/animations/gsap-provider';
import { SmoothScrollProvider } from '@/components/layout/smooth-scroll-provider';
import CustomCursor from '@/components/custom-cursor';
import React from 'react'; // Import React


export const metadata: Metadata = {
  title: 'Portfolio Pro - Kesari Dasaradh',
  description: 'Modern portfolio website for Kesari Dasaradh, showcasing advanced backend architecture and UI/UX design skills.', // Enhanced description
  icons: {
    icon: '/favicon.ico', // Ensure favicon exists in /public
  },
  // Consider adding Open Graph and Twitter Card metadata for social sharing
  openGraph: {
      title: 'Kesari Dasaradh - Backend Architect',
      description: 'Explore the portfolio of Kesari Dasaradh, featuring scalable backend solutions and modern UI implementations.',
      // url: 'YOUR_DEPLOYED_URL', // Add your deployed URL
      // images: [
      //   {
      //     url: '/og-image.png', // Add an Open Graph image to /public
      //     width: 1200,
      //     height: 630,
      //     alt: 'Kesari Dasaradh Portfolio Preview',
      //   },
      // ],
      locale: 'en_US',
      type: 'website',
  },
  twitter: {
      card: 'summary_large_image',
      title: 'Kesari Dasaradh - Backend Architect Portfolio',
      description: 'Showcasing expertise in Python, FastAPI, AWS, and modern frontend technologies.',
      // site: '@yourTwitterHandle', // Add your Twitter handle
      // creator: '@yourTwitterHandle',
      // images: ['/twitter-image.png'], // Add a Twitter card image to /public
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Added suppressHydrationWarning back to html tag
    <html lang="en" suppressHydrationWarning>
      {/* Apply font variables directly from the imported objects */}
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={false} // Allow smooth theme transitions
        >
          <SmoothScrollProvider>
            <GsapProvider>
              <div className="flex flex-col min-h-screen">
                  <Header />
                  {/* Ensure main has enough top padding to clear the sticky header */}
                  <main className="flex-grow pt-16">
                    {children}
                  </main>
                  {/* Add space before the footer if needed, or adjust footer margin */}
                  <Footer />
              </div>
              <Toaster />
              <CustomCursor />
            </GsapProvider>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
