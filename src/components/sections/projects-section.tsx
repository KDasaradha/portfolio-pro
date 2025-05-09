'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Github, ExternalLink, Info, ArrowRight, Maximize2, X as CloseIcon, Code, Database, Users, Brain, Cloud, Layers } from 'lucide-react'; 
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import React from 'react'; 

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
  category: 'Web Application' | 'AI/ML' | 'ERP/Platform' | 'DevOps/Cloud';
  categoryIcon: React.ElementType; 
}

const projectsData: Project[] = [
  {
    id: 1,
    title: 'InstaDe: AI-Driven Marketing Visual Suite', 
    shortDescription: 'Automated, brand-aligned poster creation leveraging web scraping, AI content generation, and dynamic image synthesis.',
    longDescription: 'InstaDe revolutionizes marketing asset production by intelligently integrating web scraping for real-time product data, employing Genkit AI for compelling, context-aware promotional text, and utilizing a sophisticated backend with Fabric.js, Pillow, and OpenCV for dynamic, on-brand visual generation. The intuitive React frontend empowers users to instantly create targeted marketing posters, drastically reducing design time and enabling data-driven visual campaigns.',
    images: ['https://picsum.photos/seed/instade1/600/350', 'https://picsum.photos/seed/instade2/600/350', 'https://picsum.photos/seed/instade3/600/350'],
    techStack: ['Python', 'FastAPI', 'Fabric.js', 'Pillow', 'OpenCV', 'React.js', 'Genkit AI', 'Web Scraping', 'REST APIs', 'Docker', 'PostgreSQL', 'Asyncio'], 
    liveDemoUrl: 'https://develop.instade.ai/',
    keyAchievement: 'Reduced poster design lifecycle by over 60%, empowering rapid creation of data-informed marketing visuals and significantly boosting campaign agility.',
    imageHints: ['ai graphic design tool interface', 'marketing automation dashboard', 'dynamic image generation process'],
    category: 'AI/ML',
    categoryIcon: Brain, 
  },
  {
    id: 2,
    title: 'Scalable Multi-Tenant School Management ERP', 
    shortDescription: 'Comprehensive, cloud-ready ERP system for educational institutions with RBAC, payments, and real-time communication.',
    longDescription: 'Architected and delivered a robust, multi-tenant backend for a School Management ERP, designed for scalability and ease of use. Features include granular Role-Based Access Control (RBAC) for secure data access, streamlined curriculum management, integrated secure payment gateways (e.g., Stripe/Razorpay) for efficient fee processing, comprehensive vendor management modules, and a real-time notification system via WebSockets. Developed using FastAPI, PostgreSQL with SQLAlchemy ORM, and containerized with Docker for reliable deployment and simplified infrastructure management.',
    images: ['https://picsum.photos/seed/schoolerp1/600/350', 'https://picsum.photos/seed/schoolerp2/600/350', 'https://picsum.photos/seed/schoolerp3/600/350'],
    techStack: ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Docker', 'WebSockets', 'RBAC', 'Payment Gateways', 'REST APIs', 'Microservices Principles', 'Nginx'], 
    liveDemoUrl: 'https://myschoolitaly-app.vercel.app/',
    keyAchievement: 'Improved system responsiveness by 30% through optimized database query strategies (indexing, connection pooling) and implementation of asynchronous task queues (Celery).',
    imageHints: ['school administration software dashboard', 'education erp system architecture', 'student management system interface'],
    category: 'ERP/Platform',
    categoryIcon: Layers, 
  },
  {
    id: 3,
    title: 'SHOU: Integrated HRMS & Animation Workflow Platform', 
    shortDescription: 'Unified platform integrating HR management, automated payroll calculations, and animation project lifecycle tracking.',
    longDescription: 'SHOU centralizes critical business functions by seamlessly combining a Human Resource Management System (HRMS), automated payroll processing with compliance considerations, and a custom-built animation production pipeline tracker. This solution simplifies the entire employee lifecycle, automates complex payroll scenarios, and offers real-time visibility into animation project progress and resource allocation. The backend, powered by FastAPI and PostgreSQL, is deployed using Docker, with CI/CD automation handled by Jenkins and efficient traffic management via Nginx.',
    images: ['https://picsum.photos/seed/shou1/600/350', 'https://picsum.photos/seed/shou2/600/350', 'https://picsum.photos/seed/shou3/600/350'],
    techStack: ['FastAPI', 'PostgreSQL', 'Docker', 'Jenkins', 'Nginx', 'Python', 'HRMS', 'Payroll Systems', 'CI/CD', 'Project Management', 'SQLAlchemy', 'REST APIs'], 
    liveDemoUrl: 'https://getshou.com/',
    keyAchievement: 'Automated 80% of manual payroll tasks and enhanced overall administrative efficiency by 60% through streamlined workflow implementation and robust system integration.',
    imageHints: ['hrms employee dashboard', 'payroll automation system flow', 'animation project management tool'],
    category: 'ERP/Platform',
    categoryIcon: Layers, 
  },
   {
    id: 4,
    title: 'Cloud-Native Full-Stack CI/CD Pipeline on AWS', 
    shortDescription: 'End-to-end deployment automation for a React/Next.js frontend and FastAPI backend on AWS infrastructure.',
    longDescription: 'Engineered and implemented a modern, automated deployment strategy for a full-stack application. This included setting up a high-performance React/Next.js frontend and a scalable FastAPI backend API. The entire stack is deployed on AWS (EC2, S3, VPC, RDS) leveraging Docker for containerization. A fully automated CI/CD pipeline, orchestrated using Jenkins (or GitHub Actions), ensures seamless build, testing, and deployment processes. Incorporated best practices for cloud security, monitoring (CloudWatch/Prometheus), and logging.',
    images: ['https://picsum.photos/seed/aws1/600/350', 'https://picsum.photos/seed/aws2/600/350', 'https://picsum.photos/seed/aws3/600/350'],
    techStack: ['React', 'Next.js', 'TypeScript', 'FastAPI', 'Python', 'AWS (EC2, S3, VPC, RDS)', 'Docker', 'Jenkins', 'CI/CD', 'Monitoring', 'Nginx', 'CloudFormation/Terraform (IaC)'], 
    githubUrl: 'https://github.com/KDasaradha/cloud-cicd-pipeline-example',
    keyAchievement: 'Established a zero-touch, fully automated deployment pipeline, significantly reducing deployment lead times and increasing release frequency while ensuring infrastructure consistency.',
    imageHints: ['aws infrastructure architecture diagram', 'ci cd pipeline visualization schema', 'cloud deployment automation steps'],
    category: 'DevOps/Cloud',
    categoryIcon: Cloud, 
  },
];

const ProjectCard = ({ project }: { project: Project }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cardElement = cardRef.current;
    const imageElement = imageContainerRef.current?.querySelector('img');
    if (!cardElement || !imageElement) return;

    const tl = gsap.timeline({ paused: true });
    tl.to(cardElement, { y: -12, scale: 1.04, boxShadow: "0 25px 35px -10px hsla(var(--primary), 0.15), 0 12px 20px -10px hsla(var(--primary), 0.1)", duration: 0.45, ease: "power2.out" })
      .to(imageElement, { scale: 1.1, filter: 'brightness(1.05)', duration: 0.55, ease: "power2.out" }, 0);

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
        <Card className="h-full flex flex-col overflow-hidden bg-card/95 backdrop-blur-lg border rounded-xl shadow-lg hover:border-accent/70 transition-all duration-400 group">
            <CardHeader className="p-6 pb-4 relative">
                 <Badge variant="outline" className="absolute top-5 right-5 text-xs px-2.5 py-1 border-accent/50 text-accent bg-accent/10 flex items-center gap-1.5">
                   <project.categoryIcon className="h-3.5 w-3.5" /> {project.category}
                 </Badge>
                <CardTitle className="text-xl lg:text-2xl font-semibold text-primary mr-20 leading-snug">{project.title}</CardTitle>
                <CardDescription className="text-sm mt-2 text-muted-foreground leading-relaxed line-clamp-2">{project.shortDescription}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow p-6 pt-3 space-y-5">
                <div ref={imageContainerRef} className="relative w-full aspect-[16/9] overflow-hidden rounded-lg mb-5 shadow-inner border border-border/30 transition-transform duration-500 ease-out group-hover:scale-[1.01]">
                    <Image
                        src={project.images[0]}
                        alt={`${project.title} preview screenshot`}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="transition-all duration-600 ease-in-out group-hover:opacity-95"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        loading="lazy"
                        data-ai-hint={project.imageHints[0]}
                    />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 opacity-70 group-hover:opacity-40 transition-opacity duration-500"></div>
                </div>
                <div className="flex flex-wrap gap-2">
                    {(project.techStack || []).slice(0, 6).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs px-3 py-1 transition-all duration-200 hover:bg-primary/15 hover:text-primary shadow-sm">{tech}</Badge>
                    ))}
                    {project.techStack && project.techStack.length > 6 && <Badge variant="outline" className="text-xs px-3 py-1 border-dashed border-muted-foreground/50 text-muted-foreground">+{project.techStack.length - 6} more</Badge>}
                </div>
                <p className="text-sm text-muted-foreground pt-4 border-t border-border/60 leading-relaxed">
                     <strong className="font-medium text-primary/90">Key Achievement:</strong> {project.keyAchievement}
                 </p>
            </CardContent>
            <CardFooter className="p-6 pt-4 flex justify-between items-center border-t bg-muted/40 rounded-b-xl">
               <Dialog>
                 <DialogTrigger asChild>
                   <Button variant="outline" size="sm" className="group text-primary border-primary/60 hover:border-accent hover:bg-accent/10 hover:text-accent transition-all duration-300 text-sm" data-cursor-interactive>
                       Details <Maximize2 className="ml-2 h-4 w-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[15deg]" />
                    </Button>
                 </DialogTrigger>
                 <DialogContent className="sm:max-w-4xl max-h-[90vh] flex flex-col p-0 bg-card/98 backdrop-blur-xl border border-border/50 shadow-2xl rounded-xl overflow-hidden">
                    <DialogHeader className="p-6 border-b bg-muted/50 flex flex-row justify-between items-start sticky top-0 z-10">
                        <div className="flex-grow">
                            <DialogTitle className="text-2xl font-semibold text-primary mb-1">{project.title}</DialogTitle>
                            <DialogDescription className="text-base mt-1 text-muted-foreground">{project.shortDescription}</DialogDescription>
                             <Badge variant="outline" className="mt-3 text-xs px-2.5 py-1 border-accent/50 text-accent bg-accent/10 inline-flex items-center gap-1.5">
                               <project.categoryIcon className="h-3.5 w-3.5" /> {project.category}
                             </Badge>
                        </div>
                        <DialogClose asChild>
                             <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:bg-accent/10 hover:text-accent flex-shrink-0 -mt-1 -mr-1">
                                 <CloseIcon className="h-5 w-5" />
                                 <span className="sr-only">Close</span>
                             </Button>
                         </DialogClose>
                    </DialogHeader>
                    <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-10 custom-scrollbar"> 
                        <div className="relative w-full aspect-video overflow-hidden rounded-lg shadow-xl mb-8 border border-border/40 bg-muted/30">
                            <Image
                                src={project.images[0]} 
                                alt={`${project.title} detailed screenshot`}
                                fill style={{ objectFit: 'contain' }} 
                                sizes="(max-width: 1024px) 90vw, 800px"
                                loading="lazy"
                                data-ai-hint={`${project.imageHints[0]} project detail showcase`}
                                className="rounded-lg p-2 transition-transform duration-500 hover:scale-105" 
                            />
                             {project.images && project.images.length > 1 && (
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                    {project.images.map((_, index) => (
                                        <span key={index} className={`block h-2 w-2 rounded-full ${index === 0 ? 'bg-primary' : 'bg-muted-foreground/50'}`}></span>
                                    ))}
                                </div>
                             )}
                        </div>

                        <div className="prose prose-base sm:prose-lg dark:prose-invert max-w-none text-foreground leading-relaxed space-y-4">
                            <h3 className="text-xl font-semibold text-primary mb-4 border-b pb-3 border-border/60">Project Deep Dive</h3>
                            {(project.longDescription || '').split('\n').map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>

                        <div className="bg-gradient-to-r from-accent/15 to-primary/15 p-6 rounded-lg border border-accent/40 shadow-md">
                             <h4 className="text-lg font-semibold text-primary mb-2 flex items-center gap-2">
                                <Info className="h-5 w-5 text-accent"/> Key Result & Impact
                             </h4>
                            <p className="text-base text-muted-foreground leading-relaxed">{project.keyAchievement}</p>
                        </div>

                        <div>
                            <h4 className="text-lg font-semibold text-primary mb-4">Core Technologies Utilized</h4>
                            <div className="flex flex-wrap gap-3">
                            {(project.techStack || []).map((tech) => (
                                <Badge key={`modal-tech-${tech}`} variant="secondary" className="px-3.5 py-1.5 text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-default border border-transparent hover:border-primary/30 shadow-sm">{tech}</Badge>
                            ))}
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="p-5 px-6 border-t bg-muted/50 sticky bottom-0 flex flex-col sm:flex-row sm:justify-end gap-3 z-10">
                        {project.githubUrl && (
                        <Button variant="outline" size="sm" asChild className="group border-primary/50 hover:border-primary hover:bg-primary/10 transition-all duration-300 text-sm" data-cursor-interactive>
                           <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 h-4 w-4" /> GitHub <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
                           </Link>
                        </Button>
                        )}
                        {project.liveDemoUrl && (
                        <Button size="sm" asChild className="bg-gradient-to-r from-primary to-accent text-accent-foreground hover:shadow-lg group transition-all duration-300 text-sm hover:scale-[1.03] active:scale-[1.01]" data-cursor-interactive>
                           <Link href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-4 w-4" /> Live Demo <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
                           </Link>
                        </Button>
                        )}
                   </DialogFooter>
                 </DialogContent>
               </Dialog>
                <div className="flex space-x-2 items-center">
                    {project.githubUrl && (
                    <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-foreground transition-colors duration-300 transform hover:scale-115 hover:rotate-[-8deg]" data-cursor-interactive>
                        <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                          <Github className="h-5 w-5" />
                        </Link>
                    </Button>
                    )}
                    {project.liveDemoUrl && (
                    <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-accent transition-colors duration-300 transform hover:scale-115 hover:rotate-[8deg]" data-cursor-interactive>
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
    const headerRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(headerRef.current, {
                opacity: 0,
                y: 80,
                duration: 1.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reset",
                }
            });

            const cards = gridRef.current?.querySelectorAll('.project-card');
            if (cards) {
                gsap.from(cards, {
                    opacity: 0,
                    y: 90,
                    scale: 0.92,
                    duration: 1.0,
                    stagger: {
                        amount: 1.0,
                        from: "start",
                        ease: "power2.out",
                    },
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top 88%",
                        toggleActions: "play none none reset", 
                    }
                });
            }

        }, sectionRef);

        return () => ctx.revert();
    }, []);

  return (
    <section ref={sectionRef} id="projects" className="bg-gradient-to-b from-secondary/10 via-background to-secondary/10 py-32 md:py-40 relative">
       <div className="absolute inset-0 opacity-[0.02] pattern-dots pattern-accent pattern-bg-transparent pattern-size-6 z-0"></div>
      <div className="container mx-auto px-4 z-10 relative">
        <h2
            ref={headerRef}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-20 md:mb-24 text-center gradient-text tracking-tight"
        >
            Featured Projects & Case Studies
        </h2>
        <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 lg:gap-16" 
        >
          {(projectsData || []).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
       <style jsx>{`
        .pattern-dots {
            background-image: radial-gradient(hsl(var(--foreground) / 0.1) 1px, transparent 1px);
            background-size: 18px 18px; 
        }
        .dark .pattern-dots {
            background-image: radial-gradient(hsl(var(--foreground) / 0.15) 1px, transparent 1px);
        }
        .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: hsl(var(--muted) / 0.4);
            border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: hsl(var(--accent) / 0.7);
            border-radius: 10px;
            border: 2px solid hsl(var(--muted) / 0.4);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: hsl(var(--accent) / 0.9);
        }
        .custom-scrollbar {
            scrollbar-width: thin;
            scrollbar-color: hsl(var(--accent) / 0.7) hsl(var(--muted) / 0.4);
        }
       `}</style>
    </section>
  );
}
