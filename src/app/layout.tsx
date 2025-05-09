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
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png', 
    shortcut: '/favicon-32x32.png',
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
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark" 
            enableSystem
            disableTransitionOnChange={false} 
        >
          <VersionProvider>
            <SmoothScrollProvider>
              <GsapProvider>
                <div className="flex flex-col min-h-screen bg-background text-foreground site-wrapper pattern-grid selection:bg-accent selection:text-accent-foreground">
                    <Header />
                    <main className="flex-grow pt-20 md:pt-24 lg:pt-28 relative z-10"> 
                      {children}
                    </main>
                    <Footer />
                </div>
                <Toaster />
                <CustomCursor />
                <div className="fixed inset-0 -z-20 opacity-10 dark:opacity-[0.15] overflow-hidden">
                   <div className="blob opacity-50 dark:opacity-60 -z-10" style={{ animationDuration: '45s, 35s', width:'70vw', height:'70vw', top: '10%', left: '10%', background: 'radial-gradient(circle, hsl(var(--accent)/0.15) 0%, hsl(var(--primary)/0.05) 100%)', filter: 'blur(150px)'}} />
                   <div className="blob opacity-40 dark:opacity-50 -z-10" style={{ animationDuration: '55s, 40s', width:'60vw', height:'60vw', top: '60%', left: '50%', background: 'radial-gradient(circle, hsl(var(--primary)/0.1) 0%, hsl(var(--accent)/0.1) 100%)', filter: 'blur(160px)'}} />
                </div>
              </GsapProvider>
            </SmoothScrollProvider>
          </VersionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
