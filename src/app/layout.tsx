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
import { VersionProvider } from '@/context/version-context';


export const metadata: Metadata = {
  title: 'Portfolio Pro - Kesari Dasaradh',
  description: 'Modern portfolio website for Kesari Dasaradh, showcasing advanced backend architecture and UI/UX design skills.',
  keywords: ['Kesari Dasaradh', 'Backend Architect', 'Full-Stack Developer', 'Python', 'FastAPI', 'AWS', 'Next.js', 'Portfolio Pro', 'Software Engineer', 'UI/UX Expert', 'Scalable Systems', 'Cloud Solutions', 'Modern Web Design', 'Interactive Portfolio'],
  authors: [{ name: 'Kesari Dasaradh', url: 'https://www.linkedin.com/in/dasaradha-rami-reddy-kesari-b8471417b' }],
  creator: 'Kesari Dasaradh',
  publisher: 'Kesari Dasaradh',
  openGraph: {
    title: 'Kesari Dasaradh - Backend Architect & Full-Stack Innovator | Portfolio Pro',
    description: 'Explore the cutting-edge portfolio of Kesari Dasaradh, a specialist in high-performance backend systems (Python, FastAPI, AWS) and immersive full-stack applications with modern UI/UX.',
    url: 'https://kdasaradha525.vercel.app/', 
    siteName: 'Portfolio Pro - Kesari Dasaradh',
    images: [
      {
        url: '/og-image-portfolio-pro.png', 
        width: 1200,
        height: 630,
        alt: 'Kesari Dasaradh - Portfolio Pro | Advanced Backend & Full-Stack Development',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio Pro: Kesari Dasaradh - Backend Architect & Full-Stack Developer',
    description: 'Discover innovative projects showcasing expertise in Python, FastAPI, AWS, Next.js, and building high-performance, scalable web applications with modern UI/UX. Connect with Kesari Dasaradh.',
    creator: '@k_dasaradh66626', 
    images: ['/twitter-image-portfolio-pro.png'], 
  },
  icons: {
    icon: '/favicon.ico', // Main favicon
    shortcut: '/favicon-32x32.png', // For older browsers
    apple: '/apple-touch-icon.png', // For Apple devices
  },
  manifest: '/site.webmanifest', 
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  assets: ['https://kdasaradha525.vercel.app/assets'], 
  category: 'technology portfolio software development',
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Apply font variables directly from the imported objects */}
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark" // Set dark as default
            enableSystem={true} // Allow system preference to override if not set
            disableTransitionOnChange={false} // Keep true for smoother transitions, set false if issues
        >
          <VersionProvider>
            <SmoothScrollProvider>
              <GsapProvider>
                <div className="flex flex-col min-h-screen bg-background text-foreground site-wrapper pattern-grid selection:bg-accent selection:text-accent-foreground overflow-x-hidden"> {/* Added overflow-x-hidden */}
                    <Header />
                    {/* Adjust main content padding based on header height, typically h-16 or h-20 */}
                    <main className="flex-grow pt-16 md:pt-20 relative z-10"> 
                      {children}
                    </main>
                    <Footer />
                </div>
                <Toaster />
                <CustomCursor />
                 {/* Enhanced Background Blobs - More subtle and layered */}
                 <div className="fixed inset-0 -z-20 opacity-10 dark:opacity-[0.12] overflow-hidden pointer-events-none">
                   <div 
                     className="blob opacity-50 dark:opacity-60 -z-10" 
                     style={{ 
                       animationDuration: '50s, 38s', // Slower, more varied
                       width:'clamp(300px, 75vw, 900px)', // Responsive size
                       height:'clamp(300px, 75vw, 900px)',
                       top: '5%', left: '5%', // Different positions
                       background: 'radial-gradient(circle, hsl(var(--accent)/0.12) 0%, hsl(var(--primary)/0.04) 100%)', // More subtle gradient
                       filter: 'blur(160px)' // More blur
                     }} 
                   />
                   <div 
                     className="blob opacity-40 dark:opacity-50 -z-10" 
                     style={{ 
                       animationDuration: '60s, 42s', // Slower, more varied
                       width:'clamp(250px, 65vw, 800px)', 
                       height:'clamp(250px, 65vw, 800px)',
                       top: '55%', left: '60%', // Different positions
                       background: 'radial-gradient(circle, hsl(var(--primary)/0.08) 0%, hsl(var(--accent)/0.08) 100%)',
                       filter: 'blur(170px)' 
                     }} 
                   />
                </div>
              </GsapProvider>
            </SmoothScrollProvider>
          </VersionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
