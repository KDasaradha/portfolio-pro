'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Github, ExternalLink, Info, ArrowRight, Maximize2, X as CloseIcon, Code, Database, Users, Brain, Cloud, Layers, Play, Eye } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from "@/lib/utils";
import React from 'react';

gsap.registerPlugin(ScrollTrigger);

// V1 Data (can be imported or redefined if V2 needs different structuring)
interface ProjectV2 {
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
  mainImageColor?: string; // For gradient overlay
}

const projectsDataV2: ProjectV2[] = [
  {
    id: 1,
    title: 'InstaDe: AI-Driven Marketing Visual Suite',
    shortDescription: 'Automated, brand-aligned poster creation leveraging web scraping, AI content generation, and dynamic image synthesis.',
    longDescription: 'InstaDe revolutionizes marketing asset production by intelligently integrating web scraping for real-time product data, employing Genkit AI for compelling, context-aware promotional text, and utilizing a sophisticated backend with Fabric.js, Pillow, and OpenCV for dynamic, on-brand visual generation. The intuitive React frontend empowers users to instantly create targeted marketing posters, drastically reducing design time and enabling data-driven visual campaigns.',
    images: ['https://picsum.photos/seed/instadev2_1/800/450', 'https://picsum.photos/seed/instadev2_2/800/450', 'https://picsum.photos/seed/instadev2_3/800/450'],
    techStack: ['Python', 'FastAPI', 'Fabric.js', 'Pillow', 'OpenCV', 'React.js', 'Genkit AI', 'Web Scraping', 'REST APIs', 'Docker', 'PostgreSQL', 'Asyncio', 'GSAP'],
    liveDemoUrl: 'https://develop.instade.ai/',
    keyAchievement: 'Reduced poster design lifecycle by over 60%, empowering rapid creation of data-informed marketing visuals and significantly boosting campaign agility.',
    imageHints: ['ai marketing tool dashboard', 'generative design interface', 'automated visual content workflow'],
    category: 'AI/ML',
    categoryIcon: Brain,
    mainImageColor: 'from-purple-500',
  },
  {
    id: 2,
    title: 'Scalable Multi-Tenant School Management ERP',
    shortDescription: 'Comprehensive, cloud-ready ERP system for educational institutions with RBAC, payments, and real-time communication.',
    longDescription: 'Architected and delivered a robust, multi-tenant backend for a School Management ERP, designed for scalability and ease of use. Features include granular Role-Based Access Control (RBAC) for secure data access, streamlined curriculum management, integrated secure payment gateways (e.g., Stripe/Razorpay) for efficient fee processing, comprehensive vendor management modules, and a real-time notification system via WebSockets. Developed using FastAPI, PostgreSQL with SQLAlchemy ORM, and containerized with Docker for reliable deployment and simplified infrastructure management.',
    images: ['https://picsum.photos/seed/schoolerpv2_1/800/450', 'https://picsum.photos/seed/schoolerpv2_2/800/450', 'https://picsum.photos/seed/schoolerpv2_3/800/450'],
    techStack: ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'Docker', 'WebSockets', 'RBAC', 'Payment Gateways', 'REST APIs', 'Microservices Principles', 'Nginx', 'Celery'],
    liveDemoUrl: 'https://myschoolitaly-app.vercel.app/',
    keyAchievement: 'Improved system responsiveness by 30% through optimized database query strategies (indexing, connection pooling) and implementation of asynchronous task queues (Celery).',
    imageHints: ['education erp dashboard analytics', 'school admin software interface', 'student information system modern ui'],
    category: 'ERP/Platform',
    categoryIcon: Layers,
    mainImageColor: 'from-blue-500',
  },
  {
    id: 3,
    title: 'SHOU: Integrated HRMS & Animation Workflow Platform',
    shortDescription: 'Unified platform integrating HR management, automated payroll calculations, and animation project lifecycle tracking.',
    longDescription: 'SHOU centralizes critical business functions by seamlessly combining a Human Resource Management System (HRMS), automated payroll processing with compliance considerations, and a custom-built animation production pipeline tracker. This solution simplifies the entire employee lifecycle, automates complex payroll scenarios, and offers real-time visibility into animation project progress and resource allocation. The backend, powered by FastAPI and PostgreSQL, is deployed using Docker, with CI/CD automation handled by Jenkins and efficient traffic management via Nginx.',
    images: ['https://picsum.photos/seed/shouv2_1/800/450', 'https://picsum.photos/seed/shouv2_2/800/450', 'https://picsum.photos/seed/shouv2_3/800/450'],
    techStack: ['FastAPI', 'PostgreSQL', 'Docker', 'Jenkins', 'Nginx', 'Python', 'HRMS', 'Payroll Systems', 'CI/CD', 'Project Management', 'SQLAlchemy', 'REST APIs'],
    liveDemoUrl: 'https://getshou.com/',
    keyAchievement: 'Automated 80% of manual payroll tasks and enhanced overall administrative efficiency by 60% through streamlined workflow implementation and robust system integration.',
    imageHints: ['hr management system ui', 'animation production tracker dashboard', 'integrated business platform interface'],
    category: 'ERP/Platform',
    categoryIcon: Layers,
    mainImageColor: 'from-teal-500',
  },
   {
    id: 4,
    title: 'Cloud-Native Full-Stack CI/CD Pipeline on AWS',
    shortDescription: 'End-to-end deployment automation for a React/Next.js frontend and FastAPI backend on AWS infrastructure.',
    longDescription: 'Engineered and implemented a modern, automated deployment strategy for a full-stack application. This included setting up a high-performance React/Next.js frontend and a scalable FastAPI backend API. The entire stack is deployed on AWS (EC2, S3, VPC, RDS) leveraging Docker for containerization. A fully automated CI/CD pipeline, orchestrated using Jenkins (or GitHub Actions), ensures seamless build, testing, and deployment processes. Incorporated best practices for cloud security, monitoring (CloudWatch/Prometheus), and logging.',
    images: ['https://picsum.photos/seed/awscicdv2_1/800/450', 'https://picsum.photos/seed/awscicdv2_2/800/450', 'https://picsum.photos/seed/awscicdv2_3/800/450'],
    techStack: ['React', 'Next.js', 'TypeScript', 'FastAPI', 'Python', 'AWS (EC2, S3, VPC, RDS)', 'Docker', 'Jenkins', 'CI/CD', 'Monitoring', 'Nginx', 'CloudFormation/Terraform'],
    githubUrl: 'https://github.com/KDasaradha/cloud-cicd-pipeline-example',
    keyAchievement: 'Established a zero-touch, fully automated deployment pipeline, significantly reducing deployment lead times and increasing release frequency while ensuring infrastructure consistency.',
    imageHints: ['aws architecture diagram modern', 'devops pipeline visualization', 'cloud automation dashboard'],
    category: 'DevOps/Cloud',
    categoryIcon: Cloud,
    mainImageColor: 'from-orange-500',
  },
];

const ProjectCardV2 = ({ project }: { project: ProjectV2 }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cardElement = cardRef.current;
    if (!cardElement) return;

    gsap.fromTo(cardElement,
        { opacity: 0, y: 70, scale: 0.9 },
        {
            opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: {
                trigger: cardElement,
                start: "top 90%",
                toggleActions: "play none none none",
            }
        }
    );
    
    // Parallax effect for image on card hover
    const imageElement = imageWrapperRef.current?.querySelector('img');
    if (imageElement) {
      const parallaxTl = gsap.timeline({ paused: true });
      parallaxTl.to(imageElement, { scale: 1.15, duration: 0.5, ease: 'power2.out' });

      cardElement.addEventListener('mouseenter', () => parallaxTl.play());
      cardElement.addEventListener('mouseleave', () => parallaxTl.reverse());
      
      return () => {
        cardElement.removeEventListener('mouseenter', () => parallaxTl.play());
        cardElement.removeEventListener('mouseleave', () => parallaxTl.reverse());
        parallaxTl.kill();
      }
    }

  }, []);

  return (
     <div ref={cardRef} className="project-card-v2 h-full opacity-0"> {/* Start with opacity 0 for GSAP */}
        <Card className={cn(
            "h-full flex flex-col overflow-hidden bg-neutral-800/50 border border-neutral-700 backdrop-blur-xl shadow-2xl rounded-2xl transition-all duration-400 group",
            `hover:border-${project.mainImageColor?.replace('from-','')}/70 hover:shadow-[0_0_30px_-10px_var(--tw-shadow-color)]`,
            project.mainImageColor?.replace('from-','shadow-') // For hover shadow color
          )}
          style={{'--tw-shadow-color': project.mainImageColor ? `hsl(var(--${project.mainImageColor.split('-')[1]}-500))` : 'hsl(var(--primary))'} as React.CSSProperties}
        >
            <div ref={imageWrapperRef} className="relative w-full aspect-[16/9] overflow-hidden cursor-pointer">
                <Image
                    src={project.images[0]}
                    alt={`${project.title} primary showcase`}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="transition-all duration-500 ease-in-out group-hover:opacity-90"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                    data-ai-hint={project.imageHints[0]}
                />
                <div className={cn(
                    "absolute inset-0 bg-gradient-to-t to-transparent opacity-50 group-hover:opacity-30 transition-opacity duration-500",
                    project.mainImageColor || "from-black/70"
                )}></div>
                <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-black/50 text-neutral-200 border-neutral-600 text-xs px-3 py-1.5 flex items-center gap-1.5 backdrop-blur-sm">
                       <project.categoryIcon className="h-4 w-4" /> {project.category}
                    </Badge>
                </div>
                 <div className="absolute bottom-0 left-0 p-4 transition-transform duration-500 ease-out group-hover:translate-y-[-8px]">
                     <Dialog>
                         <DialogTrigger asChild>
                             <Button variant="ghost" size="sm" className="bg-black/40 text-white hover:bg-black/70 backdrop-blur-md rounded-full text-xs px-4 py-2 group/button" data-cursor-interactive>
                                 <Eye className="mr-2 h-3.5 w-3.5 transition-transform duration-300 group-hover/button:scale-110" /> Quick View
                             </Button>
                         </DialogTrigger>
                         {/* DialogContent identical to V1 for brevity, can be customized for V2 */}
                         <DialogContent className="sm:max-w-4xl max-h-[90vh] flex flex-col p-0 bg-neutral-900/95 backdrop-blur-2xl border border-neutral-700 shadow-2xl rounded-xl overflow-hidden text-neutral-200">
                            <DialogHeader className="p-6 border-b border-neutral-700/80 flex flex-row justify-between items-start sticky top-0 z-10 bg-neutral-900/80">
                                <div>
                                    <DialogTitle className="text-2xl font-semibold text-neutral-100 mb-1">{project.title}</DialogTitle>
                                    <DialogDescription className="text-base mt-1 text-neutral-400">{project.shortDescription}</DialogDescription>
                                     <Badge variant="outline" className="mt-3 text-xs px-2.5 py-1 border-accent/50 text-accent bg-accent/10 inline-flex items-center gap-1.5">
                                       <project.categoryIcon className="h-3.5 w-3.5" /> {project.category}
                                     </Badge>
                                </div>
                                <DialogClose asChild>
                                     <Button variant="ghost" size="icon" className="rounded-full text-neutral-400 hover:bg-neutral-700/50 hover:text-neutral-100 flex-shrink-0 -mt-1 -mr-1">
                                         <CloseIcon className="h-5 w-5" />
                                     </Button>
                                 </DialogClose>
                            </DialogHeader>
                            <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar-v2">
                                <div className="relative w-full aspect-video overflow-hidden rounded-lg shadow-xl mb-6 border border-neutral-700 bg-neutral-800/50">
                                    <Image src={project.images[0]} alt={`${project.title} detail`} fill style={{ objectFit: 'contain' }} className="rounded-lg p-1" data-ai-hint={`${project.imageHints[0]} detail modal`} />
                                </div>
                                <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-neutral-300 leading-relaxed space-y-3" dangerouslySetInnerHTML={{ __html: project.longDescription.replace(/\n/g, '<br />') }} />
                                <div className={cn("bg-gradient-to-r p-5 rounded-lg border shadow-md", project.mainImageColor, "to-transparent border-neutral-700")}>
                                     <h4 className="text-lg font-semibold text-neutral-100 mb-1.5 flex items-center gap-2">
                                        <Info className="h-5 w-5"/> Key Result & Impact
                                     </h4>
                                    <p className="text-sm text-neutral-200 leading-relaxed">{project.keyAchievement}</p>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-neutral-100 mb-3">Core Technologies</h4>
                                    <div className="flex flex-wrap gap-2.5">
                                    {project.techStack.map((tech) => (
                                        <Badge key={`modal-tech-v2-${tech}`} variant="secondary" className="bg-neutral-700/60 text-neutral-300 border-neutral-600 hover:bg-neutral-600/80 px-3 py-1 text-xs">{tech}</Badge>
                                    ))}
                                    </div>
                                </div>
                            </div>
                            <DialogFooter className="p-5 px-6 border-t border-neutral-700/80 bg-neutral-900/80 sticky bottom-0 flex flex-col sm:flex-row sm:justify-end gap-3 z-10">
                                {project.githubUrl && (
                                <Button variant="outline" size="sm" asChild className="border-neutral-600 text-neutral-300 hover:border-neutral-400 hover:bg-neutral-700/50 group" data-cursor-interactive>
                                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                                        <Github className="mr-2 h-4 w-4" /> GitHub <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                                    </Link>
                                </Button>
                                )}
                                {project.liveDemoUrl && (
                                <Button size="sm" asChild className={cn("text-white hover:opacity-90 group", project.mainImageColor ? `bg-${project.mainImageColor.split('-')[1]}-600 hover:bg-${project.mainImageColor.split('-')[1]}-500` : 'bg-purple-600 hover:bg-purple-500')} data-cursor-interactive>
                                    <Link href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="mr-2 h-4 w-4" /> Live Demo <ArrowRight className="ml-auto h-4 w-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                                    </Link>
                                </Button>
                                )}
                           </DialogFooter>
                         </DialogContent>
                     </Dialog>
                 </div>
            </div>
            <CardContent className="flex-grow p-6 space-y-4">
                <CardTitle className="text-xl lg:text-2xl font-bold text-neutral-100 leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">{project.title}</CardTitle>
                <CardDescription className="text-sm text-neutral-300/80 leading-relaxed line-clamp-3">{project.shortDescription}</CardDescription>
                
                <div className="flex flex-wrap gap-2 pt-2">
                    {project.techStack.slice(0, 5).map((tech) => ( // Show fewer initially
                        <Badge key={tech} variant="secondary" className="bg-neutral-700/50 text-neutral-300 border-neutral-600/70 text-[0.7rem] px-2.5 py-1 transition-all duration-200 hover:bg-neutral-600/70">{tech}</Badge>
                    ))}
                    {project.techStack.length > 5 && <Badge variant="outline" className="text-[0.7rem] px-2.5 py-1 border-dashed border-neutral-600 text-neutral-400">+{project.techStack.length - 5} more</Badge>}
                </div>
            </CardContent>
            <CardFooter className="p-6 pt-4 flex justify-end items-center border-t border-neutral-700/70">
                <div className="flex space-x-3 items-center">
                    {project.githubUrl && (
                    <Button variant="ghost" size="icon" asChild className="text-neutral-400 hover:text-neutral-100 transition-colors duration-300 transform hover:scale-125" data-cursor-interactive>
                        <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                          <Github className="h-5 w-5" />
                        </Link>
                    </Button>
                    )}
                    {project.liveDemoUrl && (
                    <Button variant="ghost" size="icon" asChild className="text-neutral-400 hover:text-purple-400 transition-colors duration-300 transform hover:scale-125" data-cursor-interactive>
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


export default function ProjectsSectionV2() {
    const sectionRef = useRef<HTMLElement>(null);
    const headerRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(headerRef.current, {
                opacity: 0, y: 100, skewY: 3, duration: 1.2, ease: 'power4.out',
                scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reset" }
            });
            // Individual card animations are handled within ProjectCardV2
        }, sectionRef);
        return () => ctx.revert();
    }, []);

  return (
    <section ref={sectionRef} id="projects-v2" className="py-32 md:py-48 bg-gradient-to-b from-blue-950 via-indigo-950 to-neutral-900 text-neutral-100 relative overflow-hidden">
       <div className="absolute inset-0 opacity-[0.03] pattern-circuit-board pattern-size-10 z-0"></div>
      <div className="container mx-auto px-4 z-10 relative">
        <h2
            ref={headerRef}
            className="text-5xl md:text-7xl font-black mb-20 md:mb-28 text-center bg-clip-text text-transparent bg-gradient-to-br from-sky-400 via-cyan-300 to-emerald-400 tracking-tighter drop-shadow-lg"
        >
            Innovations & Implementations
        </h2>
        <div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-12"
        >
          {projectsDataV2.map((project) => (
            <ProjectCardV2 key={project.id} project={project} />
          ))}
        </div>
      </div>
       <style jsx>{`
        .pattern-circuit-board {
            background-image: linear-gradient(hsl(var(--foreground)/0.04) 0.5px, transparent 0.5px), linear-gradient(to right, hsl(var(--foreground)/0.04) 0.5px, transparent 0.5px);
        }
        .custom-scrollbar-v2::-webkit-scrollbar {
            width: 10px;
        }
        .custom-scrollbar-v2::-webkit-scrollbar-track {
            background: hsl(var(--muted) / 0.15);
            border-radius: 10px;
        }
        .custom-scrollbar-v2::-webkit-scrollbar-thumb {
            background-color: hsl(var(--accent) / 0.4);
            border-radius: 10px;
            border: 2px solid hsl(var(--muted) / 0.15);
        }
        .custom-scrollbar-v2::-webkit-scrollbar-thumb:hover {
            background-color: hsl(var(--accent) / 0.6);
        }
        .custom-scrollbar-v2 {
            scrollbar-width: thin;
            scrollbar-color: hsl(var(--accent) / 0.4) hsl(var(--muted) / 0.15);
        }
       `}</style>
    </section>
  );
}
