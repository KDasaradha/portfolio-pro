
import type { Metadata, Viewport } from 'next'; // Added Viewport
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


// Enhanced Metadata
export const metadata: Metadata = {
  title: 'Portfolio Pro - Kesari Dasaradh | Backend Architect & Full-Stack Developer',
  description: 'Discover the advanced portfolio of Kesari Dasaradh, a Backend Architect and Full-Stack Developer specializing in Python, FastAPI, AWS, Next.js, and modern UI/UX. Explore innovative projects showcasing scalable backend systems and immersive user experiences.',
  keywords: ['Kesari Dasaradh', 'Backend Architect', 'Full-Stack Developer', 'Python Developer', 'FastAPI Expert', 'AWS Solutions', 'Next.js Developer', 'Portfolio Pro', 'Software Engineer', 'UI/UX Design', 'Scalable Systems', 'Cloud Architecture', 'Modern Web Applications', 'Interactive Portfolio', 'DevOps', 'CI/CD', 'API Design'],
  authors: [{ name: 'Kesari Dasaradh', url: 'https://www.linkedin.com/in/dasaradha-rami-reddy-kesari-b8471417b/' }],
  creator: 'Kesari Dasaradh',
  publisher: 'Kesari Dasaradh',
  openGraph: {
    title: 'Kesari Dasaradh - Portfolio Pro | Advanced Backend & Full-Stack Solutions',
    description: 'Dive into the portfolio of Kesari Dasaradh, showcasing expertise in high-performance backend systems (Python, FastAPI, AWS) and engaging full-stack applications with cutting-edge UI/UX.',
    url: 'https://kdasaradha525.vercel.app/', // Replace with your actual deployed URL
    siteName: 'Portfolio Pro - Kesari Dasaradh',
    images: [
      {
        url: '/og-image-portfolio-pro-v2.png', // Replace with actual OG image URL
        width: 1200,
        height: 630,
        alt: 'Kesari Dasaradh - Portfolio Pro | Backend Architecture & Full-Stack Development Showcase',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio Pro: Kesari Dasaradh - Architecting Next-Gen Web Solutions',
    description: 'Explore innovative projects by Kesari Dasaradh, focusing on Python, FastAPI, AWS, Next.js, and building high-performance, scalable web applications with compelling UI/UX.',
    creator: '@k_dasaradh66626', // Replace with your Twitter handle
    images: ['/twitter-image-portfolio-pro-v2.png'], // Replace with actual Twitter image URL
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
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
  assets: ['https://kdasaradha525.vercel.app/assets'], // Replace with your actual asset URL base
  category: 'technology portfolio software development backend full-stack',
};

// Viewport Configuration
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F0F2F5' }, // Light gray
    { media: '(prefers-color-scheme: dark)', color: '#24292F' },  // Dark navy blue
  ],
  colorScheme: 'dark light', // Supports both color schemes
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false} // Changed to false to simplify initial theme
            disableTransitionOnChange={false}
        >
          <VersionProvider>
            <SmoothScrollProvider>
              <GsapProvider>
                <div className="flex flex-col min-h-screen bg-background text-foreground site-wrapper pattern-grid selection:bg-accent selection:text-accent-foreground overflow-x-hidden">
                    <Header />
                    <main className="flex-grow pt-16 md:pt-20 relative z-10">
                      {children}
                    </main>
                    <Footer />
                </div>
                <Toaster />
                <CustomCursor />
                 <div className="fixed inset-0 -z-20 opacity-10 dark:opacity-[0.12] overflow-hidden pointer-events-none">
                   <div
                     className="blob opacity-50 dark:opacity-60 -z-10"
                     style={{
                       animationDuration: '50s, 38s',
                       width:'clamp(300px, 75vw, 900px)',
                       height:'clamp(300px, 75vw, 900px)',
                       top: '5%', left: '5%',
                       background: 'radial-gradient(circle, hsl(var(--accent)/0.12) 0%, hsl(var(--primary)/0.04) 100%)',
                       filter: 'blur(160px)'
                     }}
                   />
                   <div
                     className="blob opacity-40 dark:opacity-50 -z-10"
                     style={{
                       animationDuration: '60s, 42s',
                       width:'clamp(250px, 65vw, 800px)',
                       height:'clamp(250px, 65vw, 800px)',
                       top: '55%', left: '60%',
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
