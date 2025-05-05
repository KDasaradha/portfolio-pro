'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PhoneCall, Mail, Linkedin, Github, Twitter, FileText, Download, Send, ArrowUpRight, Link2 as LinkIcon } from 'lucide-react'; // Renamed Link to Link2 to avoid naming conflict
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from "@/lib/utils"; // Import cn utility

gsap.registerPlugin(ScrollTrigger);

// Professional Contact Details
const contactDetails = [
  { icon: Mail, text: 'kdasaradha525@gmail.com', href: 'mailto:kdasaradha525@gmail.com', label: 'Send an Email', primary: true },
  { icon: PhoneCall, text: '+91 9032414439', href: 'tel:+919032414439', label: 'Call me (India)', primary: false }, // Added location hint
];

// Professional Social Links
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
            // Animate section header
             gsap.from(headerRef.current, {
                opacity: 0,
                y: 70, // Increased offset
                duration: 1.0, // Increased duration
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reset", // Play once, reset on leave back
                }
            });

             // Animate contact cards with stagger and more pronounced effect
             gsap.from([contactCard1Ref.current, contactCard2Ref.current], { // Target both cards
                autoAlpha: 0,
                y: 80, // Increased offset
                scale: 0.94, // More scale effect
                duration: 0.9,
                ease: 'power3.out',
                stagger: 0.25, // Stagger the cards
                scrollTrigger: {
                    trigger: cardsRef.current, // Trigger based on the container
                    start: "top 88%", // Adjust trigger slightly
                    toggleActions: "play none none reset", // Play once, reset on leave back
                }
             });

        }, sectionRef);

        return () => ctx.revert();
    }, []); // Removed refs from dependencies as they don't change

  return (
    <section ref={sectionRef} id="contact" className="bg-gradient-to-b from-secondary/15 via-background to-secondary/15 py-32 md:py-40 relative overflow-hidden"> {/* Adjusted padding & background, added overflow hidden */}
      {/* Optional subtle pattern */}
      <div className="absolute inset-0 opacity-[0.025] pattern-grid pattern-accent pattern-bg-transparent pattern-size-10 z-0"></div>
      {/* Content container */}
      <div className="container mx-auto px-4 z-10 relative">
        <h2
          ref={headerRef} // Attach ref
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-20 md:mb-24 text-center gradient-text" // Increased margin
        >
          Let's Connect & Collaborate
        </h2>

        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"> {/* Increased gap */}
           {/* Contact Info Card */}
           <div ref={contactCard1Ref} className="will-change-transform"> {/* Added will-change */}
                <Card className="h-full shadow-xl hover:shadow-2xl transition-all duration-400 border-t-4 border-accent bg-card/90 backdrop-blur-lg flex flex-col rounded-xl group hover:-translate-y-2"> {/* Enhanced styles & group */}
                <CardHeader className="p-7 md:p-9"> {/* Consistent padding */}
                    <CardTitle className="text-2xl md:text-3xl font-semibold text-primary flex items-center gap-3.5"> {/* Adjusted size & gap */}
                       <Send className="h-7 w-7 text-accent transition-transform duration-500 group-hover:rotate-[15deg]" /> Get In Touch {/* Hover effect */}
                    </CardTitle>
                    <CardDescription className="text-base md:text-lg mt-2.5 text-muted-foreground leading-relaxed"> {/* Adjusted size & spacing */}
                        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Let's build something amazing together!
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow p-7 md:p-9 pt-0"> {/* Consistent padding, removed top padding */}
                    <ul className="space-y-9"> {/* Increased spacing */}
                    {contactDetails.map((detail, index) => (
                        <li key={index} className="flex items-center space-x-5 group/item"> {/* Increased spacing & added item group */}
                            <detail.icon className={cn(
                                "h-8 w-8 flex-shrink-0 transition-all duration-300 group-hover/item:scale-110 group-hover/item:-rotate-[8deg]", // Enhanced icon hover
                                detail.primary ? 'text-accent' : 'text-muted-foreground group-hover/item:text-accent'
                            )} strokeWidth={1.5} />
                            <Link
                                href={detail.href}
                                className={cn(
                                     "text-lg md:text-xl font-medium transition-colors duration-300 group-hover/item:underline underline-offset-4", // Underline on hover
                                     detail.primary ? 'text-foreground hover:text-accent' : 'text-muted-foreground hover:text-accent'
                                )}
                                aria-label={detail.label}
                                data-cursor-interactive
                            >
                                {detail.text}
                            </Link>
                             {detail.primary && <ArrowUpRight className="h-5 w-5 text-accent opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 ml-1" />} {/* Arrow on primary hover */}
                        </li>
                    ))}
                    </ul>
                </CardContent>
                <CardFooter className="p-7 md:p-9 border-t mt-auto bg-muted/20">
                    <p className="text-sm text-muted-foreground">Response Time: Typically within 24-48 hours.</p>
                </CardFooter>
                </Card>
           </div>

          {/* Social Links & Resume Card */}
           <div ref={contactCard2Ref} className="will-change-transform"> {/* Added will-change */}
                <Card className="h-full shadow-xl hover:shadow-2xl transition-all duration-400 border-t-4 border-primary bg-card/90 backdrop-blur-lg flex flex-col rounded-xl group hover:-translate-y-2"> {/* Enhanced styles & group */}
                <CardHeader className="p-7 md:p-9"> {/* Consistent padding */}
                    <CardTitle className="text-2xl md:text-3xl font-semibold text-primary flex items-center gap-3.5"> {/* Adjusted size & gap */}
                       <LinkIcon className="h-7 w-7 text-primary/90 transition-transform duration-500 group-hover:rotate-[8deg]"/> Connect Online & Resources {/* Hover effect */}
                    </CardTitle>
                     <CardDescription className="text-base md:text-lg mt-2.5 text-muted-foreground leading-relaxed"> {/* Adjusted size & spacing */}
                         Explore my professional presence online and download my resume for a detailed overview of my experience.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow p-7 md:p-9 pt-0"> {/* Consistent padding, removed top padding */}
                    <ul className="space-y-9 mb-12"> {/* Increased spacing & bottom margin */}
                    {socialLinks.map((link, index) => (
                        <li key={index} className="flex items-center space-x-5 group/item"> {/* Increased spacing & added item group */}
                            <link.icon className="h-8 w-8 text-muted-foreground flex-shrink-0 transition-all duration-300 group-hover/item:scale-110 group-hover/item:text-accent group-hover/item:rotate-[5deg]" strokeWidth={1.5}/> {/* Enhanced icon hover */}
                            <Link
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-lg md:text-xl font-medium text-muted-foreground transition-colors duration-300 group-hover/item:text-accent group-hover/item:underline underline-offset-4 flex items-center gap-1.5" // Underline on hover, flex for arrow
                                aria-label={link.label}
                                data-cursor-interactive
                            >
                                {link.name}
                                <ArrowUpRight className="h-5 w-5 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" /> {/* Arrow on hover */}
                            </Link>
                        </li>
                    ))}
                    </ul>
                </CardContent>
                 {/* Refined Footer Buttons */}
                <CardFooter className="flex flex-col sm:flex-row gap-5 p-7 md:p-9 pt-7 border-t mt-auto bg-muted/30 rounded-b-xl"> {/* Adjusted padding & gap, rounded bottom */}
                    <Button asChild variant="default" className="flex-1 group bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 transform hover:scale-[1.02] active:scale-[1.00] text-base py-3" data-cursor-interactive> {/* Enhanced style */}
                        <a href="/Kesari_Dasaradh_Resume.pdf" target="_blank" rel="noopener noreferrer">
                            <FileText className="mr-2.5 h-5 w-5 transition-transform duration-400 group-hover:rotate-[-8deg]" /> View Resume (PDF)
                        </a>
                    </Button>
                    <Button asChild variant="outline" className="flex-1 group shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1.5 transform hover:scale-[1.02] active:scale-[1.00] border-primary/50 hover:border-accent hover:text-accent bg-background/80 backdrop-blur-sm text-base py-3" data-cursor-interactive> {/* Enhanced style */}
                        <a href="/Kesari_Dasaradh_Resume.pdf" download="Kesari_Dasaradh_Resume.pdf">
                            <Download className="mr-2.5 h-5 w-5 transition-transform duration-400 group-hover:translate-y-[-4px]" /> Download Resume
                        </a>
                    </Button>
                </CardFooter>
                </Card>
            </div>
        </div>
      </div>
      {/* Add pattern styles */}
       <style jsx>{`
        .pattern-grid {
            background-image: linear-gradient(hsl(var(--foreground) / 0.03) 1px, transparent 1px), linear-gradient(to right, hsl(var(--foreground) / 0.03) 1px, transparent 1px);
            background-size: 40px 40px; /* Larger grid */
        }
        .dark .pattern-grid {
            background-image: linear-gradient(hsl(var(--foreground) / 0.05) 1px, transparent 1px), linear-gradient(to right, hsl(var(--foreground) / 0.05) 1px, transparent 1px);
        }
       `}</style>
    </section>
  );
}
