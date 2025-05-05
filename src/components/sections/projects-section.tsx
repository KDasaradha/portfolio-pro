'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Github, ExternalLink, Info, ArrowRight, Maximize2, X as CloseIcon } from 'lucide-react'; // Added CloseIcon
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils'; // Import cn utility

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
  category: 'Web Application' | 'AI/ML' | 'ERP/Platform' | 'DevOps/Cloud'; // Added category
}

// Enhanced Projects Data with Categories and Professional Descriptions
const projectsData: Project[] = [
  {
    id: 1,
    title: 'InstaDe: AI-Powered Marketing Visual Generator',
    shortDescription: 'Automated poster creation via web scraping, AI text generation, and dynamic image rendering.',
    longDescription: 'InstaDe streamlines marketing material creation by integrating web scraping for product data, leveraging Genkit AI for compelling promotional text, and utilizing Fabric.js with Pillow/OpenCV for dynamic, branded poster generation. The system features a user-friendly React frontend allowing instant creation of targeted visuals, significantly reducing design overhead.',
    images: ['https://picsum.photos/seed/instade1/600/350', 'https://picsum.photos/seed/instade2/600/350', 'https://picsum.photos/seed/instade3/600/350'], // Adjusted image ratio
    techStack: ['Python', 'FastAPI', 'Fabric.js', 'Pillow', 'OpenCV', 'React.js', 'Genkit AI', 'Web Scraping', 'REST APIs', 'Docker'],
    liveDemoUrl: 'https://develop.instade.ai/',
    // githubUrl: 'https://github.com/KDasaradha/instade-backend', // Replace placeholder
    keyAchievement: 'Achieved a >60% reduction in poster design time, enabling rapid, data-driven marketing content generation.',
    imageHints: ['ai graphic design tool', 'marketing automation ui', 'dynamic image generation'],
    category: 'AI/ML',
  },
  {
    id: 2,
    title: 'Scalable School Management ERP Backend',
    shortDescription: 'Comprehensive ERP system for educational institutions featuring RBAC, payments, and real-time features.',
    longDescription: 'Architected and developed a robust, multi-tenant ERP backend designed to streamline school administration. Key features include granular Role-Based Access Control (RBAC), curriculum management, secure payment gateway integration for fee processing, vendor management, and a real-time communication module using WebSockets. Built with FastAPI and PostgreSQL (SQLAlchemy ORM), containerized with Docker for efficient deployment.',
    images: ['https://picsum.photos/seed/schoolerp1/600/350', 'https://picsum.photos/seed/schoolerp2/600/350', 'https://picsum.photos/seed/schoolerp3/600/350'],
    techStack: ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Docker', 'WebSockets', 'RBAC', 'Payment Gateways', 'REST APIs'],
    liveDemoUrl: 'https://myschoolitaly-app.vercel.app/',
    // githubUrl: 'https://github.com/KDasaradha/school-erp-backend', // Replace placeholder
    keyAchievement: 'Optimized database queries and implemented asynchronous task processing, resulting in a 30% reduction in API latency and enhanced system responsiveness.',
     imageHints: ['school administration software', 'education erp dashboard', 'student management system'],
    category: 'ERP/Platform',
  },
  {
    id: 3,
    title: 'SHOU: Integrated HRMS & Animation Production Platform',
    shortDescription: 'Unified platform for HR management, automated payroll, and animation project tracking.',
    longDescription: 'SHOU centralizes core business operations by integrating Human Resource Management (HRMS), automated payroll processing, and a bespoke animation production pipeline tracker. It simplifies employee lifecycle management, automates complex payroll calculations, and provides real-time visibility into animation project milestones. Backend built with FastAPI and PostgreSQL, deployed via Docker, with CI/CD managed by Jenkins and Nginx as a reverse proxy.',
    images: ['https://picsum.photos/seed/shou1/600/350', 'https://picsum.photos/seed/shou2/600/350', 'https://picsum.photos/seed/shou3/600/350'],
    techStack: ['FastAPI', 'PostgreSQL', 'Docker', 'Jenkins', 'Nginx', 'Python', 'HRMS', 'Payroll Systems', 'CI/CD', 'Project Management'],
    liveDemoUrl: 'https://getshou.com/',
    // githubUrl: 'https://github.com/KDasaradha/shou-platform', // Replace placeholder
    keyAchievement: 'Streamlined payroll processing, reducing manual effort by 80% and improving overall administrative efficiency by 60% through workflow automation.',
    imageHints: ['hrms dashboard interface', 'payroll automation software', 'animation production pipeline'],
    category: 'ERP/Platform',
  },
   {
    id: 4,
    title: 'Cloud-Native Full-Stack CI/CD Pipeline Implementation',
    shortDescription: 'Deployed a React/Next.js & FastAPI application on AWS with a fully automated CI/CD workflow.',
    longDescription: 'Designed and implemented a modern full-stack application deployment strategy. Features a performant React/Next.js frontend and a scalable FastAPI backend API. Deployed on AWS infrastructure (EC2, S3, VPC) utilizing containerization (Docker) and a fully automated CI/CD pipeline orchestrated by Jenkins. Incorporated best practices for monitoring, logging, and infrastructure security.',
    images: ['https://picsum.photos/seed/aws1/600/350', 'https://picsum.photos/seed/aws2/600/350', 'https://picsum.photos/seed/aws3/600/350'],
    techStack: ['React', 'Next.js', 'TypeScript', 'FastAPI', 'Python', 'AWS (EC2, S3, VPC)', 'Docker', 'Jenkins', 'CI/CD', 'Monitoring', 'Nginx'],
    // liveDemoUrl: '#',
    githubUrl: 'https://github.com/KDasaradha/cloud-cicd-pipeline-example', // Replace placeholder
    keyAchievement: 'Successfully established an end-to-end automated deployment pipeline, reducing deployment time and ensuring consistent, reliable releases.',
    imageHints: ['aws architecture diagram', 'ci cd pipeline visualization', 'cloud deployment process'],
    category: 'DevOps/Cloud',
  },
];

// Enhanced Project Card Component
const ProjectCard = ({ project }: { project: Project }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cardElement = cardRef.current;
    const imageElement = imageContainerRef.current?.querySelector('img'); // Target img inside container
    if (!cardElement || !imageElement) return;

    // Enhanced hover animation with GSAP
    const tl = gsap.timeline({ paused: true });
    tl.to(cardElement, { y: -10, scale: 1.03, boxShadow: "0 20px 30px -8px rgba(0, 0, 0, 0.15), 0 10px 15px -8px rgba(0, 0, 0, 0.1)", duration: 0.4, ease: "power2.out" }) // Enhanced shadow
      .to(imageElement, { scale: 1.08, duration: 0.5, ease: "power2.out" }, 0); // Slightly more image scale

    const handleMouseEnter = () => tl.play();
    const handleMouseLeave = () => tl.reverse();

    cardElement.addEventListener('mouseenter', handleMouseEnter);
    cardElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cardElement.removeEventListener('mouseenter', handleMouseEnter);
      cardElement.removeEventListener('mouseleave', handleMouseLeave);
      tl.kill();
    };
  }, []);

  return (
     <div ref={cardRef} className="h-full project-card transform transition-transform duration-300 will-change-transform">
        <Card className="h-full flex flex-col overflow-hidden bg-card/90 backdrop-blur-lg border rounded-lg shadow-md hover:border-accent/50 transition-all duration-300 group"> {/* Added group class */}
            <CardHeader className="p-5 pb-3 relative">
                 {/* Category Badge */}
                <Badge variant="outline" className="absolute top-4 right-4 text-xs px-2 py-0.5 border-accent/50 text-accent bg-accent/10">{project.category}</Badge>
                <CardTitle className="text-xl font-semibold text-primary mr-16">{project.title}</CardTitle> {/* Added margin-right */}
                <CardDescription className="text-sm mt-1.5 text-muted-foreground">{project.shortDescription}</CardDescription> {/* Adjusted spacing */}
            </CardHeader>
            <CardContent className="flex-grow p-5 pt-2 space-y-5"> {/* Adjusted padding & spacing */}
                {/* Image container with aspect ratio */}
                <div ref={imageContainerRef} className="relative w-full aspect-[16/9] overflow-hidden rounded-md mb-5 shadow-inner transition-transform duration-400 ease-out"> {/* Adjusted aspect ratio & margin */}
                    <Image
                        src={project.images[0]}
                        alt={`${project.title} preview screenshot`}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="transition-all duration-500 ease-in-out group-hover:opacity-90" // Group hover effect
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading="lazy"
                        data-ai-hint={project.imageHints[0]}
                    />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-400"></div>
                </div>
                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 5).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs px-2.5 py-1 transition-colors hover:bg-primary/10 hover:text-primary">{tech}</Badge> // Enhanced badges
                    ))}
                    {project.techStack.length > 5 && <Badge variant="outline" className="text-xs px-2.5 py-1">+{project.techStack.length - 5} more</Badge>}
                </div>
                 {/* Key Achievement */}
                <p className="text-sm text-muted-foreground pt-3 border-t border-border/50"> {/* Added border top */}
                     <strong className="font-medium text-primary">Key Achievement:</strong> {project.keyAchievement}
                 </p>
            </CardContent>
            <CardFooter className="p-5 flex justify-between items-center border-t bg-muted/30"> {/* Subtle background */}
               {/* Details Modal Trigger */}
               <Dialog>
                 <DialogTrigger asChild>
                   <Button variant="outline" size="sm" className="group text-primary border-primary/50 hover:border-accent hover:bg-accent/10 hover:text-accent transition-all duration-300 text-sm" data-cursor-interactive>
                       View Details <Maximize2 className="ml-2 h-4 w-4 transition-transform duration-500 group-hover:scale-110" />
                    </Button>
                 </DialogTrigger>
                 {/* Enhanced Dialog Content */}
                 <DialogContent className="sm:max-w-4xl max-h-[90vh] flex flex-col p-0 bg-card/95 backdrop-blur-lg border-border shadow-xl rounded-lg overflow-hidden"> {/* Adjusted width & styles */}
                    <DialogHeader className="p-6 border-b bg-muted/40 flex flex-row justify-between items-center">
                        <div>
                            <DialogTitle className="text-2xl font-semibold text-primary">{project.title}</DialogTitle>
                            <DialogDescription className="text-base mt-1.5 text-muted-foreground">{project.shortDescription}</DialogDescription>
                        </div>
                        <DialogClose asChild>
                             <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:bg-accent/10 hover:text-accent">
                                 <CloseIcon className="h-5 w-5" />
                                 <span className="sr-only">Close</span>
                             </Button>
                         </DialogClose>
                    </DialogHeader>
                    {/* Scrollable Content Area */}
                    <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar"> {/* Adjusted padding & spacing */}
                        {/* Enhanced Image Viewer/Carousel Placeholder */}
                        <div className="relative w-full aspect-video overflow-hidden rounded-lg shadow-lg mb-8 border border-border bg-muted/20">
                            {/* Basic Image - Replace with a carousel component later if needed */}
                            <Image
                                src={project.images[0]}
                                alt={`${project.title} detailed screenshot`}
                                fill style={{ objectFit: 'contain' }} // Use contain for better detail visibility
                                sizes="(max-width: 1024px) 90vw, 800px"
                                loading="lazy"
                                data-ai-hint={`${project.imageHints[0]} project detail showcase`}
                                className="rounded-lg p-2" // Add padding around image
                            />
                             {/* Add simple navigation dots/arrows if implementing carousel */}
                        </div>

                        {/* Project Overview */}
                        <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-foreground leading-relaxed space-y-3">
                            <h3 className="text-xl font-semibold text-primary mb-3 border-b pb-2 border-border/50">Project Overview</h3>
                            <p>{project.longDescription}</p>
                        </div>

                        {/* Key Achievement Highlight */}
                        <div className="bg-gradient-to-r from-accent/10 to-primary/10 p-5 rounded-lg border border-accent/30 shadow-sm">
                             <h4 className="text-lg font-semibold text-primary mb-2">Key Achievement</h4>
                            <p className="text-base text-muted-foreground leading-relaxed">{project.keyAchievement}</p>
                        </div>

                        {/* Technologies Section */}
                        <div>
                            <h4 className="text-lg font-semibold text-primary mb-3">Technologies Used</h4>
                            <div className="flex flex-wrap gap-2.5">
                            {project.techStack.map((tech) => (
                                <Badge key={`modal-tech-${tech}`} variant="secondary" className="px-3 py-1 text-sm transition-transform hover:scale-105 hover:shadow-md cursor-default">{tech}</Badge>
                            ))}
                            </div>
                        </div>
                    </div>
                    {/* Sticky Footer with enhanced buttons */}
                    <DialogFooter className="p-5 px-6 border-t bg-background/90 sticky bottom-0 flex flex-col sm:flex-row sm:justify-end gap-3">
                        {project.githubUrl && (
                        <Button variant="outline" size="sm" asChild className="group border-primary/40 hover:border-primary hover:bg-primary/5 transition-all duration-300 text-sm" data-cursor-interactive>
                            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" /> GitHub Repo <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
                            </Link>
                        </Button>
                        )}
                        {project.liveDemoUrl && (
                        <Button size="sm" asChild className="bg-gradient-to-r from-primary to-accent text-accent-foreground hover:shadow-lg group transition-all duration-300 text-sm hover:scale-[1.02] active:scale-[1.00]" data-cursor-interactive>
                            <Link href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" /> Live Demo <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
                            </Link>
                        </Button>
                        )}
                         {/* Removed redundant close button, using header close */}
                   </DialogFooter>
                 </DialogContent>
               </Dialog>
                {/* Quick Links */}
                <div className="flex space-x-1 items-center">
                    {project.githubUrl && (
                    <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-foreground transition-colors duration-300 transform hover:scale-110 hover:rotate-[-5deg]" data-cursor-interactive>
                        <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                        <Github className="h-5 w-5" />
                        </Link>
                    </Button>
                    )}
                    {project.liveDemoUrl && (
                    <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-accent transition-colors duration-300 transform hover:scale-110 hover:rotate-[5deg]" data-cursor-interactive>
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
    const headerRef = useRef<HTMLHeadingElement>(null); // Ref for header

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate section header
             gsap.from(headerRef.current, { // Target header specifically
                opacity: 0,
                y: 70, // Increased offset
                duration: 1.0, // Increased duration
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none",
                }
            });

            // Animate project cards on scroll
            const cards = gridRef.current?.querySelectorAll('.project-card');
            if (cards) {
                gsap.from(cards, {
                    opacity: 0,
                    y: 80, // Increased offset
                    scale: 0.93, // Slightly more scale effect
                    duration: 0.9, // Longer duration
                    stagger: {
                        amount: 0.8, // Increased total stagger duration
                        from: "start",
                        ease: "power2.out",
                    },
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top 88%",
                        toggleActions: "play none none none",
                        once: true, // Only animate once
                    }
                });
            }

        }, sectionRef);

        return () => ctx.revert();
    }, []);

  return (
    <section ref={sectionRef} id="projects" className="bg-gradient-to-b from-secondary/10 to-background py-32 md:py-40"> {/* Adjusted background and padding */}
       {/* Subtle background pattern */}
       <div className="absolute inset-0 opacity-[0.02] pattern-dots pattern-accent pattern-bg-transparent pattern-size-6 z-0"></div>
      <div className="container mx-auto px-4 z-10 relative">
        <h2
            ref={headerRef} // Attach ref
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-20 md:mb-24 text-center gradient-text" // Increased margin
        >
            Featured Projects & Case Studies
        </h2>
        <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 lg:gap-14" // Increased gap
        >
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
      {/* Add pattern style */}
       <style jsx>{`
        .pattern-dots {
            background-image: radial-gradient(hsl(var(--foreground) / 0.1) 1px, transparent 1px);
            background-size: 16px 16px;
        }
        .dark .pattern-dots {
            background-image: radial-gradient(hsl(var(--foreground) / 0.15) 1px, transparent 1px);
        }
       `}</style>
    </section>
  );
}
