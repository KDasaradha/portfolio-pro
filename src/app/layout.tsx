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
import React from 'react'; 


// Enhanced Metadata for SEO and Social Sharing
export const metadata: Metadata = {
  title: 'Portfolio Pro - Kesari Dasaradh | Backend Architect & Full-Stack Developer', // More descriptive title
  description: 'Explore the professional portfolio of Kesari Dasaradh, a skilled Backend Architect and Full-Stack Developer specializing in Python, FastAPI, AWS, Next.js, and modern UI/UX solutions. Discover innovative projects and technical expertise.', // Keyword-rich description
  keywords: ['Kesari Dasaradh', 'Backend Architect', 'Full-Stack Developer', 'Python', 'FastAPI', 'AWS', 'Next.js', 'Portfolio', 'Software Engineer', 'UI/UX', 'Scalable Systems'], // Added keywords
  authors: [{ name: 'Kesari Dasaradh' }],
  creator: 'Kesari Dasaradh',
  publisher: 'Kesari Dasaradh',
  openGraph: {
    title: 'Kesari Dasaradh - Expert Backend Architect & Full-Stack Developer',
    description: 'Dive into Kesari Dasaradh\'s portfolio: showcasing cutting-edge backend systems, dynamic full-stack applications, and proficiency in Python, FastAPI, AWS, and Next.js.',
    url: 'https://www.kesaridasaradh.com', // Replace with your actual deployed URL
    siteName: 'Portfolio Pro - Kesari Dasaradh',
    images: [
      {
        url: '/og-image.png', // Create and add an appealing OG image (e.g., 1200x630) to /public
        width: 1200,
        height: 630,
        alt: 'Kesari Dasaradh - Portfolio Preview | Backend & Full-Stack Development',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kesari Dasaradh - Backend Architect & Full-Stack Developer Portfolio',
    description: 'Showcasing expertise in Python, FastAPI, AWS, Next.js, and building high-performance, scalable web applications. Connect with Kesari Dasaradh.',
    creator: '@k_dasaradh66626', // Your Twitter handle
    // images: ['/twitter-image.png'], // Create and add a Twitter-specific image (e.g., 1200x675) to /public
  },
  icons: {
    icon: '/favicon.ico', // Standard favicon
    apple: '/apple-touch-icon.png', // For Apple devices (add to /public)
    shortcut: '/favicon.ico',
  },
  // Optional: Add more specific metadata like robots, manifest, etc.
  // robots: { index: true, follow: true },
  // manifest: '/site.webmanifest', // If you have a web app manifest
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Apply font variables directly from the imported objects */}
      <body 
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}
        suppressHydrationWarning={true}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange={false} 
        >
          <SmoothScrollProvider>
            <GsapProvider>
              {/* Enhanced Page Structure with a clear "site-wrapper" for potential global styles or effects */}
              <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300 ease-in-out site-wrapper">
                  <Header />
                  <main className="flex-grow pt-16 md:pt-20 lg:pt-24 relative z-10"> {/* Adjusted top padding for header */}
                    {children}
                  </main>
                  <Footer />
              </div>
              <Toaster />
              <CustomCursor />
              {/* Subtle background pattern/effect container - OPTIONAL */}
              {/* <div className="fixed inset-0 -z-10 opacity-5 pattern-dots dark:opacity-[0.07]"></div> */}
            </GsapProvider>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}