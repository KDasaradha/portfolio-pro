'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PhoneCall, Mail, Linkedin, Github, Twitter, FileText, Download, Send, Link as LinkIcon } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Refined contact details
const contactDetails = [
  { icon: Mail, text: 'kdasaradha525@gmail.com', href: 'mailto:kdasaradha525@gmail.com', label: 'Send an Email', primary: true }, // Mark primary contact
  { icon: PhoneCall, text: '+91 9032414439', href: 'tel:+919032414439', label: 'Call me', primary: false },
];

// Refined social links
const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/dasaradha-rami-reddy-kesari-b8471417b', label: 'Connect on LinkedIn', name: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/KDasaradha', label: 'Explore my code on GitHub', name: 'GitHub' },
  { icon: Twitter, href: 'https://twitter.com/k_dasaradh66626', label: 'Follow me on Twitter', name: 'Twitter' },
];


export default function ContactSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLHeadingElement>(null); // Ref for header
    const contactCard1Ref = useRef<HTMLDivElement>(null);
    const contactCard2Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate section header
             gsap.from(headerRef.current, { // Target header specifically
                opacity: 0,
                y: 60,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none",
                }
            });

             // Animate contact cards with stagger and slightly different delays
             gsap.from(contactCard1Ref.current, {
                autoAlpha: 0,
                y: 70, // Increased offset
                scale: 0.95, // Add scale effect
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: contactCard1Ref.current,
                    start: "top 88%", // Adjust trigger slightly
                    toggleActions: "play none none none",
                }
             });
              gsap.from(contactCard2Ref.current, {
                autoAlpha: 0,
                y: 70, // Increased offset
                scale: 0.95, // Add scale effect
                duration: 0.8,
                delay: 0.2, // Stagger the second card slightly
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: contactCard2Ref.current,
                    start: "top 88%", // Adjust trigger slightly
                    toggleActions: "play none none none",
                }
             });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

  return (
    <section ref={sectionRef} id="contact" className="bg-gradient-to-b from-secondary/15 to-background py-24 md:py-36 relative"> {/* Adjusted padding & background */}
      {/* Optional subtle pattern */}
      <div className="absolute inset-0 opacity-[0.025] pattern-circuit-board pattern-accent pattern-bg-transparent pattern-size-8 z-0"></div>
      {/* Ensure content container is above background elements */}
      <div className="container mx-auto px-4 md:px-6 z-10 relative">
        <h2
          ref={headerRef} // Attach ref to header
          className="text-4xl md:text-5xl font-bold mb-20 text-center gradient-text" // Increased margin
        >
          Let&apos;s Build Something Great Together
        </h2>

        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16"> {/* Increased gap */}
           {/* Contact Info Card */}
           <div ref={contactCard1Ref} className="contact-card opacity-0"> {/* Initial opacity for GSAP */}
                <Card className="h-full shadow-xl hover:shadow-2xl transition-shadow duration-300 border-t-4 border-accent bg-card/90 backdrop-blur-lg flex flex-col"> {/* Enhanced styles */}
                <CardHeader className="p-6 md:p-8"> {/* Consistent padding */}
                    <CardTitle className="text-2xl md:text-3xl font-semibold text-primary flex items-center gap-3"> {/* Adjusted size */}
                       <Send className="h-7 w-7 text-accent"/> Get In Touch
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                        Open to collaborations, opportunities, or just a chat about tech.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow p-6 md:p-8"> {/* Consistent padding */}
                    <ul className="space-y-8"> {/* Increased spacing */}
                    {contactDetails.map((detail, index) => (
                        <li key={index} className="flex items-center space-x-4 group">
                            <detail.icon className={`h-7 w-7 flex-shrink-0 transition-transform duration-300 group-hover:scale-110 ${detail.primary ? 'text-accent' : 'text-muted-foreground group-hover:text-accent'}`} strokeWidth={1.5} /> {/* Conditional coloring */}
                            <Link
                                href={detail.href}
                                className={`text-lg md:text-xl font-medium transition-colors duration-300 underline-offset-4 ${detail.primary ? 'text-foreground hover:text-accent hover:underline' : 'text-muted-foreground hover:text-accent hover:underline'}`} // Conditional styling
                                aria-label={detail.label}
                                data-cursor-interactive
                            >
                                {detail.text}
                            </Link>
                        </li>
                    ))}
                    </ul>
                </CardContent>
                {/* Footer can be added if needed for extra info */}
                {/* <CardFooter className="p-6 md:p-8 border-t mt-auto">
                    <p className="text-sm text-muted-foreground">Response times may vary.</p>
                </CardFooter> */}
                </Card>
           </div>

          {/* Social Links & Resume Card */}
           <div ref={contactCard2Ref} className="contact-card opacity-0"> {/* Initial opacity for GSAP */}
                <Card className="h-full shadow-xl hover:shadow-2xl transition-shadow duration-300 border-t-4 border-primary bg-card/90 backdrop-blur-lg flex flex-col"> {/* Enhanced styles */}
                <CardHeader className="p-6 md:p-8"> {/* Consistent padding */}
                    <CardTitle className="text-2xl md:text-3xl font-semibold text-primary flex items-center gap-3"> {/* Adjusted size */}
                       <LinkIcon className="h-7 w-7 text-primary/90"/> Connect & Download
                    </CardTitle>
                     <CardDescription className="text-base mt-2">
                         Find me on social platforms and access my resume.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow p-6 md:p-8"> {/* Consistent padding */}
                    <ul className="space-y-8 mb-10"> {/* Increased spacing & bottom margin */}
                    {socialLinks.map((link, index) => (
                        <li key={index} className="flex items-center space-x-4 group">
                            <link.icon className="h-7 w-7 text-muted-foreground flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:text-accent" strokeWidth={1.5}/>
                            <Link
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-lg md:text-xl font-medium text-muted-foreground transition-colors duration-300 group-hover:text-accent underline-offset-4 hover:underline"
                                aria-label={link.label}
                                data-cursor-interactive
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                    </ul>
                </CardContent>
                 {/* Refined Footer Buttons */}
                <CardFooter className="flex flex-col sm:flex-row gap-4 p-6 md:p-8 pt-6 border-t mt-auto bg-muted/20">
                    <Button asChild variant="default" className="flex-1 group bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 transform hover:scale-105 text-base" data-cursor-interactive>
                        <a href="/Kesari_Dasaradh_Resume.pdf" target="_blank" rel="noopener noreferrer">
                            <FileText className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-[-6deg]" /> View Resume
                        </a>
                    </Button>
                    <Button asChild variant="outline" className="flex-1 group shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 transform hover:scale-105 border-primary/50 hover:border-accent hover:text-accent bg-background/70 text-base" data-cursor-interactive>
                        <a href="/Kesari_Dasaradh_Resume.pdf" download="Kesari_Dasaradh_Resume.pdf">
                            <Download className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:translate-y-[-3px]" /> Download Resume
                        </a>
                    </Button>
                </CardFooter>
                </Card>
            </div>
        </div>
      </div>
      {/* Add pattern styles if needed */}
       <style jsx>{`
        .pattern-circuit-board { /* Example pattern */
            background-image: linear-gradient(hsl(var(--foreground) / 0.03) 1px, transparent 1px), linear-gradient(to right, hsl(var(--foreground) / 0.03) 1px, transparent 1px);
            background-size: 20px 20px;
        }
        .dark .pattern-circuit-board {
            background-image: linear-gradient(hsl(var(--foreground) / 0.05) 1px, transparent 1px), linear-gradient(to right, hsl(var(--foreground) / 0.05) 1px, transparent 1px);
        }
       `}</style>
    </section>
  );
}
