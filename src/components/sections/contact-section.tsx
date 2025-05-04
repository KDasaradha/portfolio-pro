'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PhoneCall, Mail, Linkedin, Github, Twitter, FileText, Download, Link as LinkIcon } from 'lucide-react'; // Added FileText, Download
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const contactDetails = [
  { icon: PhoneCall, text: '+91 9032414439', href: 'tel:+919032414439', label: 'Call me' },
  { icon: Mail, text: 'kdasaradha525@gmail.com', href: 'mailto:kdasaradha525@gmail.com', label: 'Email me' },
];

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/dasaradha-rami-reddy-kesari-b8471417b', label: 'LinkedIn profile', name: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/KDasaradha', label: 'GitHub profile', name: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com/k_dasaradh66626', label: 'Twitter profile', name: 'Twitter' },
];


export default function ContactSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate section header
             gsap.from(sectionRef.current?.querySelector('h2'), {
                opacity: 0,
                y: 50,
                duration: 0.8,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                }
            });

             // Animate contact cards
             const contactCards = cardsRef.current?.children;
             if (contactCards) {
                 gsap.from(contactCards, {
                    opacity: 0,
                    y: 60,
                    duration: 0.7,
                    stagger: 0.25,
                    ease: 'power3.out',
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
    <section ref={sectionRef} id="contact" className="bg-gradient-to-b from-secondary/10 to-background">
      {/* Optional subtle pattern */}
      {/* <div className="absolute inset-0 opacity-[0.02] pattern-diagonal-lines pattern-accent pattern-bg-transparent pattern-size-4"></div> */}
      <div className="container mx-auto px-4 z-10 relative">
        <h2
          className="text-4xl font-bold mb-16 text-center gradient-text"
        >
          Let&apos;s Connect!
        </h2>

        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
           {/* Contact Info Card */}
           <div className="contact-card opacity-0"> {/* Wrapper for GSAP */}
                <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-accent bg-card/80 backdrop-blur-sm flex flex-col">
                <CardHeader>
                    <CardTitle className="text-2xl text-primary flex items-center gap-2">
                       <PhoneCall className="h-6 w-6 text-accent"/> Contact Information
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <ul className="space-y-6">
                    {contactDetails.map((detail, index) => (
                        <li key={index} className="flex items-center space-x-4 group">
                        <detail.icon className="h-6 w-6 text-accent flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                        <Link
                            href={detail.href}
                            className="text-lg font-medium text-foreground transition-colors duration-300 group-hover:text-accent underline-offset-4 hover:underline"
                            aria-label={detail.label}
                             data-cursor-interactive
                        >
                            {detail.text}
                        </Link>
                        </li>
                    ))}
                    </ul>
                </CardContent>
                </Card>
           </div>

          {/* Social Links & Resume Card */}
           <div className="contact-card opacity-0"> {/* Wrapper for GSAP */}
                <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-primary bg-card/80 backdrop-blur-sm flex flex-col">
                <CardHeader>
                    <CardTitle className="text-2xl text-primary flex items-center gap-2">
                       <LinkIcon className="h-6 w-6 text-primary/80"/> Find Me Online
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <ul className="space-y-6">
                    {socialLinks.map((link, index) => (
                        <li key={index} className="flex items-center space-x-4 group">
                        <link.icon className="h-6 w-6 text-foreground/80 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:text-accent" />
                        <Link
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-lg font-medium text-foreground transition-colors duration-300 group-hover:text-accent underline-offset-4 hover:underline"
                            aria-label={link.label}
                             data-cursor-interactive
                        >
                            {link.name}
                        </Link>
                        </li>
                    ))}
                    </ul>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-4 pt-6 border-t mt-auto"> {/* Added border and margin */}
                    <Button asChild variant="default" className="flex-1 group bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5" data-cursor-interactive>
                        <a href="/Kesari_Dasaradh_Resume.pdf" target="_blank" rel="noopener noreferrer">
                            <FileText className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-[-5deg]" /> View Resume
                        </a>
                    </Button>
                    <Button asChild variant="outline" className="flex-1 group shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 border-primary/50 hover:border-accent hover:text-accent" data-cursor-interactive>
                        <a href="/Kesari_Dasaradh_Resume.pdf" download="Kesari_Dasaradh_Resume.pdf">
                            <Download className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:translate-y-[-2px]" /> Download Resume
                        </a>
                    </Button>
                </CardFooter>
                </Card>
            </div>
        </div>
      </div>
    </section>
  );
}
