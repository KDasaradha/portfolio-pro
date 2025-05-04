'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Github, ExternalLink, Info, ArrowRight, Maximize2 } from 'lucide-react'; // Added ArrowRight, Maximize2
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  shortDescription: string;
  longDescription: string;
  images: string[];
  techStack: string[];
  liveDemoUrl?: string;
  githubUrl?: string;
  keyAchievement: string;
  imageHints: string[];
}

// Updated Projects Data with refined content
const projectsData: Project[] = [
  {
    id: 1,
    title: 'InstaDe: AI-Powered Poster Generator',
    shortDescription: 'Web scraping, AI content generation, and Fabric.js for instant marketing visuals.',
    longDescription: 'InstaDe automates marketing material creation. It leverages web scraping for data input, utilizes AI prompts for compelling text generation, and employs Fabric.js to dynamically render professional posters. The system integrates seamlessly with a React frontend, enabling users to generate targeted visuals instantly, significantly reducing design time and effort.',
    images: ['https://picsum.photos/seed/instade1/600/300', 'https://picsum.photos/seed/instade2/600/300', 'https://picsum.photos/seed/instade3/600/300'],
    techStack: ['Python', 'FastAPI', 'Fabric.js', 'Pillow', 'OpenCV', 'React.js', 'Genkit AI', 'Web Scraping', 'REST APIs'],
    liveDemoUrl: 'https://develop.instade.ai/',
    githubUrl: 'https://github.com/KDasaradha/instade-placeholder', // Placeholder URL
    keyAchievement: 'Reduced poster creation time by over 60%, enabling rapid generation of dynamic and contextually relevant marketing content.',
    imageHints: ['social media poster design', 'marketing automation tool ui', 'ai graphic design'],
  },
  {
    id: 2,
    title: 'Scalable School Management ERP',
    shortDescription: 'Comprehensive backend for school operations with RBAC, payments, and real-time chat.',
    longDescription: 'A robust and scalable ERP backend built to streamline school administration. Features include fine-grained RBAC user management, curriculum scheduling, secure fee processing via integration with payment gateways, vendor management, and a real-time WebSocket-based chat module for enhanced communication. Developed with FastAPI, PostgreSQL (SQLAlchemy ORM), and containerized using Docker for reliable deployment.',
    images: ['https://picsum.photos/seed/schoolerp1/600/300', 'https://picsum.photos/seed/schoolerp2/600/300', 'https://picsum.photos/seed/schoolerp3/600/300'],
    techStack: ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Docker', 'WebSockets', 'RBAC', 'Payment Gateway Integration'],
    liveDemoUrl: 'https://myschoolitaly-app.vercel.app/',
    githubUrl: 'https://github.com/KDasaradha/school-erp-placeholder', // Placeholder URL
    keyAchievement: 'Achieved a 30% reduction in API latency through query optimization and asynchronous task handling, supporting seamless operation across multiple institutions.',
     imageHints: ['school administration dashboard', 'education software interface', 'erp system modules'],
  },
  {
    id: 3,
    title: 'SHOU: Integrated HRMS & Animation Platform',
    shortDescription: 'Unified HR, payroll, and animation pipeline management system.',
    longDescription: 'SHOU provides a centralized platform combining HRMS, automated payroll processing, and an animation production pipeline tracker. It streamlines employee management, simplifies complex payroll calculations, and offers real-time visibility into animation project status. The backend relies on FastAPI and PostgreSQL, deployed via Docker, with Jenkins managing CI/CD and Nginx serving as a reverse proxy.',
    images: ['https://picsum.photos/seed/shou1/600/300', 'https://picsum.photos/seed/shou2/600/300', 'https://picsum.photos/seed/shou3/600/300'],
    techStack: ['FastAPI', 'PostgreSQL', 'Docker', 'Jenkins', 'Nginx', 'Python', 'HRMS', 'Payroll Systems', 'CI/CD'],
    liveDemoUrl: 'https://getshou.com/',
    githubUrl: 'https://github.com/KDasaradha/shou-placeholder', // Placeholder URL
    keyAchievement: 'Automated payroll reduced processing time by 80% and improved overall administrative efficiency by 60% through workflow optimization.',
    imageHints: ['hrms employee dashboard', 'payroll calculation interface', 'animation project tracking'],
  },
   {
    id: 4,
    title: 'Cloud-Native Full-Stack CI/CD Pipeline',
    shortDescription: 'React/Next.js & FastAPI app deployed on AWS with automated Jenkins/Docker pipeline.',
    longDescription: 'A modern full-stack application featuring a React/Next.js frontend for optimal performance and SEO, and a FastAPI backend API. Designed for cloud-native deployment on AWS (EC2, S3, VPC), incorporating a fully automated CI/CD pipeline using Jenkins and Docker for containerization. Emphasizes monitoring, logging, and scalable infrastructure practices.',
    images: ['https://picsum.photos/seed/aws1/600/300', 'https://picsum.photos/seed/aws2/600/300', 'https://picsum.photos/seed/aws3/600/300'],
    techStack: ['React', 'Next.js', 'TypeScript', 'FastAPI', 'Python', 'AWS (EC2, S3, VPC)', 'Docker', 'Jenkins', 'CI/CD', 'Monitoring'],
    // liveDemoUrl: '#', // Add URL when available
    githubUrl: 'https://github.com/KDasaradha/aws-fullstack-placeholder', // Placeholder URL
    keyAchievement: 'Successfully implemented end-to-end CI/CD automation, demonstrating proficiency in cloud infrastructure setup, containerization, and modern full-stack development practices.',
    imageHints: ['aws deployment architecture', 'ci cd pipeline stages', 'modern web application ui'],
  },
];

// Enhanced Project Card Component
const ProjectCard = ({ project }: { project: Project }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cardElement = cardRef.current;
    const imageElement = imageContainerRef.current;
    if (!cardElement || !imageElement) return;

    // Enhanced hover animation using GSAP
    const tl = gsap.timeline({ paused: true });
    tl.to(cardElement, { y: -8, scale: 1.02, boxShadow: "0 15px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)", duration: 0.4, ease: "power2.out" })
      .to(imageElement, { scale: 1.05, duration: 0.4, ease: "power2.out" }, 0); // Animate image simultaneously

    const handleMouseEnter = () => tl.play();
    const handleMouseLeave = () => tl.reverse();

    cardElement.addEventListener('mouseenter', handleMouseEnter);
    cardElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cardElement.removeEventListener('mouseenter', handleMouseEnter);
      cardElement.removeEventListener('mouseleave', handleMouseLeave);
      tl.kill(); // Kill timeline on unmount
    };
  }, []);

  return (
     // Wrapper div for GSAP targeting and layout
     <div ref={cardRef} className="h-full project-card transform transition-transform duration-300">
        <Card
            className="h-full flex flex-col overflow-hidden bg-card/85 backdrop-blur-md border rounded-lg shadow-md border-border transition-shadow duration-300" // Base styles
        >
            <CardHeader className="p-5 pb-3"> {/* Adjusted padding */}
                <CardTitle className="text-xl font-semibold text-primary">{project.title}</CardTitle>
                <CardDescription className="text-sm mt-1">{project.shortDescription}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow p-5 space-y-4">
                {/* Image container with aspect ratio */}
                <div ref={imageContainerRef} className="relative w-full aspect-video overflow-hidden rounded-md mb-4 shadow-inner transform transition-transform duration-400 ease-out">
                    <Image
                        src={project.images[0]} // Show first image initially
                        alt={`${project.title} preview`}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="transition-opacity duration-700 ease-in-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading="lazy"
                        data-ai-hint={project.imageHints[0]}
                    />
                     {/* Subtle overlay */}
                     <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-50 group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                <div className="flex flex-wrap gap-1.5"> {/* Smaller gap */}
                    {project.techStack.slice(0, 6).map((tech) => ( // Show more badges
                        <Badge key={tech} variant="secondary" className="text-xs px-2 py-0.5">{tech}</Badge> // Slightly smaller badges
                    ))}
                    {project.techStack.length > 6 && <Badge variant="outline" className="text-xs px-2 py-0.5">+{project.techStack.length - 6} more</Badge>}
                </div>
                <p className="text-sm text-muted-foreground pt-2"><strong>Key Achievement:</strong> {project.keyAchievement}</p>
            </CardContent>
            <CardFooter className="p-5 flex justify-between items-center border-t bg-muted/20"> {/* Subtle background */}
               {/* Improved Modal Trigger Button */}
               <Dialog>
                 <DialogTrigger asChild>
                   <Button variant="outline" size="sm" className="group text-primary border-primary/40 hover:border-accent hover:bg-accent/10 hover:text-accent transition-all duration-300" data-cursor-interactive>
                       Details <Info className="ml-2 h-4 w-4 transition-transform group-hover:rotate-[360deg] duration-700" />
                    </Button>
                 </DialogTrigger>
                 {/* Refined Dialog Content */}
                 <DialogContent className="sm:max-w-3xl max-h-[90vh] flex flex-col p-0 bg-card/95 backdrop-blur-lg border-border">
                    <DialogHeader className="p-6 border-b bg-muted/30">
                        <DialogTitle className="text-2xl font-semibold text-primary">{project.title}</DialogTitle>
                        <DialogDescription className="text-base mt-1">{project.shortDescription}</DialogDescription>
                    </DialogHeader>
                    {/* Scrollable Content Area */}
                    <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar"> {/* Add custom scrollbar class if needed */}
                        {/* Simple Image Viewer */}
                        <div className="relative w-full aspect-video overflow-hidden rounded-lg shadow-lg mb-6 border border-border">
                            <Image
                                src={project.images[0]} // Display primary image prominently
                                alt={`${project.title} detail screenshot`}
                                fill style={{ objectFit: 'cover' }}
                                sizes="(max-width: 1024px) 90vw, 800px"
                                loading="lazy"
                                data-ai-hint={`${project.imageHints[0]} detailed view project showcase`}
                                className="rounded-lg"
                            />
                        </div>

                        <div className="prose prose-sm dark:prose-invert max-w-none text-foreground leading-relaxed"> {/* Use prose for better text formatting */}
                            <h3 className="text-lg font-semibold text-primary mb-2">Project Overview</h3>
                            <p>{project.longDescription}</p>
                        </div>

                        <div className="bg-secondary/40 p-4 rounded-lg border border-border shadow-sm">
                             <h4 className="text-md font-semibold text-primary mb-1.5">Key Achievement</h4>
                            <p className="text-sm text-muted-foreground">{project.keyAchievement}</p>
                        </div>

                        <div>
                            <h4 className="text-md font-semibold text-primary mb-2">Technologies Used</h4>
                            <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech) => (
                                <Badge key={`modal-tech-${tech}`} variant="secondary" className="transition-transform hover:scale-105">{tech}</Badge>
                            ))}
                            </div>
                        </div>
                    </div>
                    {/* Sticky Footer with refined buttons */}
                    <DialogFooter className="p-4 px-6 border-t bg-background/90 sticky bottom-0 flex flex-col sm:flex-row sm:justify-end gap-3">
                        {project.githubUrl && (
                        <Button variant="outline" size="sm" asChild className="group border-primary/40 hover:border-primary hover:bg-primary/5 transition-all" data-cursor-interactive>
                            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" /> GitHub <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:translate-x-1" />
                            </Link>
                        </Button>
                        )}
                        {project.liveDemoUrl && (
                        <Button size="sm" asChild className="bg-gradient-to-r from-primary to-accent text-accent-foreground hover:shadow-md group transition-all" data-cursor-interactive>
                            <Link href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" /> Live Demo <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:translate-x-1" />
                            </Link>
                        </Button>
                        )}
                         <DialogClose asChild>
                            <Button type="button" variant="ghost" size="sm" className="text-muted-foreground hover:text-primary transition-colors" data-cursor-interactive>
                                Close
                            </Button>
                         </DialogClose>
                   </DialogFooter>
                 </DialogContent>
               </Dialog>
                <div className="flex space-x-1 items-center">
                    {project.githubUrl && (
                    <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-foreground transition-colors duration-300 transform hover:scale-110" data-cursor-interactive>
                        <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                        <Github className="h-5 w-5" />
                        </Link>
                    </Button>
                    )}
                    {project.liveDemoUrl && (
                    <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-accent transition-colors duration-300 transform hover:scale-110" data-cursor-interactive>
                        <Link href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                        <ExternalLink className="h-5 w-5" />
                        </Link>
                    </Button>
                    )}
                </div>
            </CardFooter>
        </Card>
     </div>
  );
};


export default function ProjectsSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate section header
             gsap.from(sectionRef.current?.querySelector('h2'), {
                opacity: 0,
                y: 60, // Increased offset
                duration: 0.9, // Slightly longer duration
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%", // Adjusted trigger point
                    toggleActions: "play none none none",
                }
            });

            // Animate project cards on scroll with refined stagger
            const cards = gridRef.current?.querySelectorAll('.project-card');
            if (cards) {
                gsap.from(cards, {
                    opacity: 0,
                    y: 70, // Increased offset
                    scale: 0.95, // Add subtle scale animation
                    duration: 0.8, // Longer duration
                    stagger: {
                        amount: 0.6, // Total stagger duration
                        from: "start", // Stagger from the start
                        ease: "power2.out",
                    },
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top 88%", // Adjust trigger point slightly
                        toggleActions: "play none none none",
                    }
                });
            }

        }, sectionRef); // Scope animations to the section

        return () => ctx.revert(); // Cleanup
    }, []);

  return (
    <section ref={sectionRef} id="projects" className="bg-secondary/15 py-24 md:py-36"> {/* Adjusted background and padding */}
      <div className="container mx-auto px-4">
        <h2
            className="text-4xl md:text-5xl font-bold mb-20 text-center gradient-text" // Increased margin
        >
            Selected Works & Case Studies
        </h2>
        <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12" // Increased gap
        >
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
