'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PhoneCall, Mail, Linkedin, Github, Twitter, FileText, Download, Send, ArrowUpRight, Link2, MapPin, MessageSquare } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from "@/lib/utils";
import React from 'react';

gsap.registerPlugin(ScrollTrigger);

const contactDetails = [
  { icon: Mail, text: 'kdasaradha525@gmail.com', href: 'mailto:kdasaradha525@gmail.com', label: 'Send an Email', primary: true, highlight: true },
  { icon: PhoneCall, text: '+91 9032414439', href: 'tel:+919032414439', label: 'Call me (India)', primary: false },
  { icon: MapPin, text: 'Prakasam, AP, India', href: '#', label: 'Location', primary: false, highlight: false },
];

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/dasaradha-rami-reddy-kesari-b8471417b', label: 'Connect professionally on LinkedIn', name: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/KDasaradha', label: 'Explore my code repositories on GitHub', name: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com/k_dasaradh66626', label: 'Follow my thoughts and updates on Twitter', name: 'Twitter' },
];

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const contactCard1Ref = useRef<HTMLDivElement>(null);
  const contactCard2Ref = useRef<HTMLDivElement>(null);
  

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 80, 
        duration: 1.2, 
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 88%", 
          toggleActions: "play none none none",
        }
      });

      const cards = [contactCard1Ref.current, contactCard2Ref.current].filter(Boolean);
      if (cards.length > 0) {
        gsap.from(cards, {
          autoAlpha: 0,
          y: 90, 
          scale: 0.92, 
          duration: 1.1, 
          ease: 'power3.out',
          stagger: 0.3, 
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%", 
            toggleActions: "play none none none",
          }
        });
      }
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="bg-gradient-to-b from-secondary/10 via-background to-secondary/10 py-32 md:py-40 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pattern-circuit-board pattern-accent pattern-bg-transparent pattern-size-12 z-0"></div> 
      
      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full filter blur-[120px] opacity-30 animate-blob-morph-slow -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-2/5 h-2/5 bg-gradient-to-tl from-accent/15 to-primary/5 rounded-full filter blur-[100px] opacity-25 animate-blob-spin-slow-reverse -z-10"></div>


      <div className="container mx-auto px-4 z-10 relative">
        <h2
          ref={headerRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-20 md:mb-24 text-center gradient-text tracking-tight"
        >
          Let's Connect & Build Together
        </h2>

        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch"> 
          <div ref={contactCard1Ref} className="will-change-transform">
            <Card className="h-full shadow-xl hover:shadow-2xl transition-all duration-400 border-t-4 border-accent bg-card/90 backdrop-blur-lg flex flex-col rounded-xl group hover:-translate-y-2.5"> 
              <CardHeader className="p-7 md:p-9">
                <CardTitle className="text-2xl md:text-3xl font-semibold text-primary flex items-center gap-3.5">
                  <Send className="h-7 w-7 text-accent transition-transform duration-500 group-hover:rotate-[20deg] group-hover:scale-110" /> 
                  Get In Touch
                </CardTitle>
                <CardDescription className="text-base md:text-lg mt-3 text-muted-foreground leading-relaxed">
                  I'm actively seeking new challenges and collaborations. Whether you have a project in mind, a question, or just want to discuss technology, feel free to reach out.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow p-7 md:p-9 pt-0">
                <ul className="space-y-9"> 
                  {(contactDetails || []).map((detail, index) => (
                    <li key={index} className="flex items-center space-x-5 group/item"> 
                      <detail.icon className={cn(
                        "h-8 w-8 flex-shrink-0 transition-all duration-300 group-hover/item:scale-110 group-hover/item:-rotate-[8deg]", 
                        detail.primary ? 'text-accent' : 'text-muted-foreground group-hover/item:text-accent'
                      )} strokeWidth={1.5} />
                      <Link
                        href={detail.href}
                        className={cn(
                          "text-lg md:text-xl font-medium transition-colors duration-300 group-hover/item:underline underline-offset-4 decoration-accent/70", 
                          detail.highlight ? 'text-accent font-semibold hover:text-accent/80' : (detail.primary ? 'text-foreground hover:text-accent' : 'text-muted-foreground hover:text-accent')
                        )}
                        aria-label={detail.label}
                        data-cursor-interactive={detail.href !== '#'} // Only interactive if it's a real link
                      >
                        {detail.text}
                      </Link>
                      {detail.primary && <ArrowUpRight className="h-5 w-5 text-accent opacity-0 group-hover/item:opacity-100 transition-all duration-300 group-hover/item:translate-x-1 group-hover/item:-translate-y-1 ml-1.5" />} 
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="p-7 md:p-9 border-t mt-auto bg-muted/30 rounded-b-xl"> 
                <p className="text-sm text-muted-foreground">Usual Response Time: Within 1-2 business days.</p>
              </CardFooter>
            </Card>
          </div>
          <div ref={contactCard2Ref} className="will-change-transform">
            <Card className="h-full shadow-xl hover:shadow-2xl transition-all duration-400 border-t-4 border-primary bg-card/90 backdrop-blur-lg flex flex-col rounded-xl group hover:-translate-y-2.5"> 
              <CardHeader className="p-7 md:p-9">
                <CardTitle className="text-2xl md:text-3xl font-semibold text-primary flex items-center gap-3.5">
                  <Link2 className="h-7 w-7 text-primary/90 transition-transform duration-500 group-hover:rotate-[10deg] group-hover:scale-110" /> 
                  Connect & Download
                </CardTitle>
                <CardDescription className="text-base md:text-lg mt-3 text-muted-foreground leading-relaxed">
                  Find me on various platforms or download my resume for a comprehensive overview of my skills and experience.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow p-7 md:p-9 pt-0">
                <h3 className="text-lg font-semibold text-primary mb-5">Online Profiles:</h3> 
                <ul className="space-y-9 mb-12"> 
                  {(socialLinks || []).map((link, index) => (
                    <li key={index} className="flex items-center space-x-5 group/item">
                      <link.icon className="h-8 w-8 text-muted-foreground flex-shrink-0 transition-all duration-300 group-hover/item:scale-110 group-hover/item:text-accent group-hover/item:rotate-[6deg]" strokeWidth={1.5} /> 
                      <Link
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg md:text-xl font-medium text-muted-foreground transition-colors duration-300 group-hover/item:text-accent group-hover/item:underline underline-offset-4 decoration-accent/70 flex items-center gap-1.5" 
                        aria-label={link.label}
                        data-cursor-interactive
                      >
                        {link.name}
                        <ArrowUpRight className="h-5 w-5 opacity-0 group-hover/item:opacity-100 transition-all duration-300 group-hover/item:translate-x-1 group-hover/item:-translate-y-1" /> 
                      </Link>
                    </li>
                  ))}
                </ul>
                <h3 className="text-lg font-semibold text-primary mb-5 pt-6 border-t">My Resume:</h3> 
                 <div className="flex flex-col sm:flex-row gap-5 mt-2">
                    <Button asChild variant="default" className="flex-1 group bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 transform hover:scale-[1.03] active:scale-[1.01] text-base py-3.5" data-cursor-interactive>
                      <a href="/Kesari_Dasaradh_Resume.pdf" target="_blank" rel="noopener noreferrer">
                        <FileText className="mr-2.5 h-5 w-5 transition-transform duration-400 group-hover:rotate-[-10deg] group-hover:scale-105" /> View Resume (PDF)
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="flex-1 group shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1.5 transform hover:scale-[1.03] active:scale-[1.01] border-primary/60 hover:border-accent hover:text-accent bg-background/80 backdrop-blur-sm text-base py-3.5" data-cursor-interactive>
                      <a href="/Kesari_Dasaradh_Resume.pdf" download="Kesari_Dasaradh_Resume.pdf">
                         <Download className="mr-2.5 h-5 w-5 transition-transform duration-400 group-hover:translate-y-[-5px] group-hover:scale-105" /> Download Resume
                      </a>
                    </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <style jsx>{`
        .pattern-circuit-board { 
            background-image: linear-gradient(hsl(var(--foreground) / 0.02) 1px, transparent 1px), linear-gradient(to right, hsl(var(--foreground) / 0.02) 1px, transparent 1px);
            background-size: 28px 28px; 
        }
        .dark .pattern-circuit-board {
            background-image: linear-gradient(hsl(var(--foreground) / 0.04) 1px, transparent 1px), linear-gradient(to right, hsl(var(--foreground) / 0.04) 1px, transparent 1px);
        }
        
        @keyframes blob-morph-slow {
          0%, 100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
          25% { border-radius: 60% 40% 30% 70% / 60% 70% 30% 40%; }
          50% { border-radius: 50% 50% 50% 50% / 40% 60% 40% 60%; }
          75% { border-radius: 40% 60% 70% 30% / 70% 40% 60% 30%; }
        }
        .animate-blob-morph-slow {
          animation: blob-morph-slow 28s ease-in-out infinite alternate;
        }
        @keyframes blob-spin-slow-reverse {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(-360deg); }
        }
        .animate-blob-spin-slow-reverse {
          animation: blob-spin-slow-reverse 40s linear infinite;
        }
       `}</style>
    </section>
  );
}
