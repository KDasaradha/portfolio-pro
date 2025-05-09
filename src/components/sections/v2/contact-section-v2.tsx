'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PhoneCall, Mail, Linkedin, Github, Twitter, FileText, Download, Send, ArrowUpRight, Link2 as LinkIcon, MapPin, MessageCircle } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from "@/lib/utils";
import React from 'react';

gsap.registerPlugin(ScrollTrigger);

const contactDetailsV2 = [
  { icon: Mail, text: 'kdasaradha525@gmail.com', href: 'mailto:kdasaradha525@gmail.com', label: 'Email Me', type: 'Primary Contact' },
  { icon: PhoneCall, text: '+91 9032414439', href: 'tel:+919032414439', label: 'Call (India)', type: 'Secondary Contact' },
  { icon: MapPin, text: 'Prakasam, Andhra Pradesh, India', href: '#', label: 'Location', type: 'Location Info' },
];

const socialLinksV2 = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/dasaradha-rami-reddy-kesari-b8471417b', name: 'LinkedIn', color: 'hover:text-sky-400' },
  { icon: Github, href: 'https://github.com/KDasaradha', name: 'GitHub', color: 'hover:text-neutral-300' },
  { icon: Twitter, href: 'https://twitter.com/k_dasaradh66626', name: 'Twitter', color: 'hover:text-blue-400' },
];

export default function ContactSectionV2() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        opacity: 0, y: 100, skewY: 2, duration: 1.2, ease: 'expo.out',
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reset" }
      });
      
      const elementsToAnimate = contentRef.current?.querySelectorAll('.animate-contact-item');
      if (elementsToAnimate) {
          gsap.from(elementsToAnimate, {
            opacity: 0, y: 70, scale: 0.9, duration: 1, ease: 'power3.out', stagger: 0.2,
            scrollTrigger: { trigger: contentRef.current, start: "top 85%", toggleActions: "play none none reset" }
          });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact-v2" className="py-32 md:py-48 bg-gradient-to-br from-neutral-900 via-blue-950 to-purple-950 text-neutral-200 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05] pattern-grid pattern-size-20 z-0"></div>
      <div className="container mx-auto px-4 z-10 relative">
        <h2
          ref={headerRef}
          className="text-5xl md:text-7xl font-black mb-20 md:mb-28 text-center bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 tracking-tighter drop-shadow-lg"
        >
          Let's Innovate Together
        </h2>

        <div ref={contentRef} className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-12">
          <div className="lg:col-span-2 animate-contact-item">
            <Card className="h-full bg-neutral-800/50 border border-neutral-700 backdrop-blur-xl shadow-2xl rounded-2xl p-8 md:p-10 group hover:border-teal-500/60 transition-all duration-400 hover:shadow-teal-500/20">
              <CardHeader className="p-0 mb-8">
                <CardTitle className="text-3xl md:text-4xl font-bold text-neutral-100 flex items-center gap-3.5">
                  <MessageCircle className="h-9 w-9 text-teal-400 transition-transform duration-500 group-hover:rotate-[15deg] group-hover:scale-110" />
                  Reach Out & Connect
                </CardTitle>
                <CardDescription className="text-base md:text-lg mt-3 text-neutral-400 leading-relaxed">
                  I'm always excited about new challenges, collaborations, and discussions on technology. Feel free to connect—I typically respond within 1-2 business days.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-8">
                {(contactDetailsV2 || []).map((detail) => (
                  <div key={detail.text} className="flex items-start space-x-5 group/item">
                    <div className="mt-1 p-3 bg-teal-500/10 border border-teal-500/30 rounded-lg group-hover/item:scale-105 group-hover/item:shadow-lg group-hover/item:bg-teal-500/20 transition-all duration-300">
                         <detail.icon className="h-6 w-6 text-teal-400 flex-shrink-0" strokeWidth={1.75} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-neutral-400 group-hover/item:text-teal-300 transition-colors">{detail.type}</h4>
                      <Link
                        href={detail.href}
                        className={cn(
                          "text-lg md:text-xl font-medium text-neutral-100 transition-colors duration-300 group-hover/item:text-teal-300",
                          detail.href !== '#' && "hover:underline underline-offset-4 decoration-teal-500/70"
                        )}
                        aria-label={detail.label}
                        data-cursor-interactive={detail.href !== '#'}
                      >
                        {detail.text}
                        {detail.href !== '#' && <ArrowUpRight className="inline-block ml-1.5 h-4 w-4 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5" />}
                      </Link>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="animate-contact-item">
            <Card className="h-full bg-neutral-800/50 border border-neutral-700 backdrop-blur-xl shadow-2xl rounded-2xl p-8 md:p-10 group hover:border-purple-500/60 transition-all duration-400 hover:shadow-purple-500/20">
              <CardHeader className="p-0 mb-8">
                <CardTitle className="text-3xl md:text-4xl font-bold text-neutral-100 flex items-center gap-3.5">
                  <LinkIcon className="h-9 w-9 text-purple-400 transition-transform duration-500 group-hover:rotate-[-10deg] group-hover:scale-110" />
                  Digital Presence
                </CardTitle>
                 <CardDescription className="text-base md:text-lg mt-3 text-neutral-400 leading-relaxed">
                  Explore my work and connect on various platforms, or download my resume.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-300 mb-5">Social Profiles:</h3>
                  <div className="flex flex-wrap gap-5">
                    {(socialLinksV2 || []).map((link) => (
                      <Link
                        key={link.name} href={link.href} target="_blank" rel="noopener noreferrer"
                        aria-label={`My ${link.name} profile`} data-cursor-interactive
                        className={cn("p-3 bg-neutral-700/50 border border-neutral-600 rounded-lg text-neutral-400 transition-all duration-300 transform hover:scale-110 hover:border-purple-500/50", link.color)}
                      >
                        <link.icon className="h-7 w-7" />
                      </Link>
                    ))}
                  </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-neutral-300 mb-5 pt-6 border-t border-neutral-700">My Resume:</h3>
                    <div className="flex flex-col gap-4">
                        <Button asChild size="lg" className="w-full group bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg hover:shadow-xl hover:-translate-y-1 transform hover:scale-105 transition-all duration-300 text-base py-3.5 rounded-lg" data-cursor-interactive>
                          <a href="/Kesari_Dasaradh_Resume.pdf" target="_blank" rel="noopener noreferrer">
                            <FileText className="mr-2.5 h-5 w-5 transition-transform duration-300 group-hover:rotate-[-5deg]" /> View Resume (PDF)
                          </a>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="w-full group bg-neutral-700/30 border-neutral-600 text-neutral-300 hover:border-purple-400/70 hover:text-purple-300 hover:bg-purple-500/10 backdrop-blur-sm shadow-md hover:-translate-y-1 transform hover:scale-105 transition-all duration-300 text-base py-3.5 rounded-lg" data-cursor-interactive>
                          <a href="/Kesari_Dasaradh_Resume.pdf" download="Kesari_Dasaradh_Resume_V2.pdf">
                             <Download className="mr-2.5 h-5 w-5 transition-transform duration-300 group-hover:translate-y-[-3px]" /> Download Resume
                          </a>
                        </Button>
                    </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <style jsx>{`
        .pattern-grid {
             background-image: 
                linear-gradient(hsl(var(--foreground)/0.03) 1px, transparent 1px), 
                linear-gradient(to right, hsl(var(--foreground)/0.03) 1px, transparent 1px);
        }
      `}</style>
    </section>
  );
}
