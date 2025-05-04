'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Github, ExternalLink, Info } from 'lucide-react'; // Added Info icon
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
  imageHints: string[]; // Added for better AI image generation hints
}

const projectsData: Project[] = [
  {
    id: 1,
    title: 'InstaDe (Instant Poster Generator)',
    shortDescription: 'Dynamic poster generator using web scraping, AI, and Fabric JSON.',
    longDescription: 'A dynamic poster generator utilizing web scraping to gather input data, AI-driven content prompts for creative text generation, and Fabric JSON to produce effective marketing materials on the fly. Integrated with frontend using React.js for user interaction. Features automated layout adjustments based on content.',
    images: ['https://picsum.photos/seed/instade1/400/200', 'https://picsum.photos/seed/instade2/400/200', 'https://picsum.photos/seed/instade3/400/200'],
    techStack: ['Python', 'FastAPI', 'Fabric.js', 'Pillow', 'OpenCV', 'React.js', 'AI', 'Web Scraping'],
    liveDemoUrl: 'https://develop.instade.ai/',
    githubUrl: 'https://github.com/KDasaradha/instade-placeholder', // Placeholder URL
    keyAchievement: 'Facilitated instant poster creation with dynamic content, increasing design efficiency by 60% and substantially reducing manual effort.',
    imageHints: ['social media poster', 'marketing design tool', 'ai content generation'],
  },
  {
    id: 2,
    title: 'School Management System (Advanced ERP)',
    shortDescription: 'Scalable backend for school operations with RBAC, fee processing, and chat.',
    longDescription: 'A comprehensive and scalable backend system designed to support all aspects of school operations. Features include robust user management with role-based access control (RBAC), curriculum management, fee processing and tracking, vendor coordination, and a real-time chat module for communication. Built with FastAPI and PostgreSQL, using SQLAlchemy ORM for data access and Docker for containerization.',
    images: ['https://picsum.photos/seed/schoolerp1/400/200', 'https://picsum.photos/seed/schoolerp2/400/200', 'https://picsum.photos/seed/schoolerp3/400/200'],
    techStack: ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy ORM', 'Docker', 'WebSockets', 'RBAC'],
    liveDemoUrl: 'https://myschoolitaly-app.vercel.app/',
    githubUrl: 'https://github.com/KDasaradha/school-erp-placeholder', // Placeholder URL
    keyAchievement: 'Decreased API response times by 30% through query optimization and asynchronous processing, enabling efficient scaling to support hundreds of schools.',
     imageHints: ['school dashboard', 'education software', 'erp system interface'],
  },
  {
    id: 3,
    title: 'SHOU (HRMS, Payroll & Animation Pipeline)',
    shortDescription: 'Integrated platform for HRMS, payroll, and animation production.',
    longDescription: 'An integrated platform that unifies Human Resource Management System (HRMS), payroll management, and an animation production pipeline. This system streamlines administrative operations, simplifies payroll processing, and provides real-time updates on animation project progress. Utilizes FastAPI, PostgreSQL, Docker for deployment, Jenkins for CI/CD, and Nginx as a reverse proxy.',
    images: ['https://picsum.photos/seed/shou1/400/200', 'https://picsum.photos/seed/shou2/400/200', 'https://picsum.photos/seed/shou3/400/200'],
    techStack: ['FastAPI', 'PostgreSQL', 'Docker', 'Jenkins', 'Nginx', 'Python', 'HRMS', 'Payroll'],
    liveDemoUrl: 'https://getshou.com/',
    githubUrl: 'https://github.com/KDasaradha/shou-placeholder', // Placeholder URL
    keyAchievement: 'Reduced payroll processing time by 80% and enhanced overall system efficiency by 60% through automation and streamlined workflows.',
    imageHints: ['hrms dashboard', 'payroll system', 'animation production software'],
  },
   {
    id: 4,
    title: 'AWS Full-Stack CI/CD Pipeline',
    shortDescription: 'Full-stack app (React, Next.js, FastAPI) deployed on AWS with CI/CD.',
    longDescription: 'Developing a modern full-stack application using React and Next.js for the frontend, and FastAPI for the backend API. The application is designed for deployment on AWS infrastructure (EC2, S3, VPC) and features a fully automated CI/CD pipeline using Jenkins and Docker for seamless integration and deployment. Includes monitoring and logging setup.',
    images: ['https://picsum.photos/seed/aws1/400/200', 'https://picsum.photos/seed/aws2/400/200', 'https://picsum.photos/seed/aws3/400/200'],
    techStack: ['React', 'Next.js', 'FastAPI', 'AWS', 'Docker', 'Jenkins', 'CI/CD', 'TypeScript', 'Python'],
    // liveDemoUrl: '#', // Add URL when available
    githubUrl: 'https://github.com/KDasaradha/aws-fullstack-placeholder', // Placeholder URL
    keyAchievement: 'In Progress: Building expertise in cloud infrastructure, CI/CD automation, and full-stack development practices with a focus on reliability and scalability.',
    imageHints: ['aws architecture diagram', 'ci cd pipeline visualization', 'full stack application interface'],
  },
];

const ProjectCard = ({ project }: { project: Project }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Image cycling effect on hover
  const handleMouseEnter = () => {
    if (project.images.length > 1) {
        intervalRef.current = setInterval(() => {
             setCurrentImageIndex((prevIndex) => (prevIndex + 1) % project.images.length);
        }, 1500); // Change image every 1.5 seconds
        gsap.to(imageContainerRef.current, { scale: 1.05, duration: 0.4, ease: "power2.out" }); // Subtle zoom
    }
     gsap.to(cardRef.current, { y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)", duration: 0.3 });
  };

  const handleMouseLeave = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentImageIndex(0); // Reset to first image
     gsap.to(imageContainerRef.current, { scale: 1, duration: 0.4, ease: "power2.out" });
     gsap.to(cardRef.current, { y: 0, boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)", duration: 0.3 });
  };

   useEffect(() => {
    // Clean up interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
     <div ref={cardRef} className="h-full project-card"> {/* Added class for GSAP targeting */}
        <Card
        className="h-full flex flex-col overflow-hidden transition-shadow duration-300 bg-card/80 backdrop-blur-sm border rounded-lg shadow-sm hover:shadow-lg border-border" // Simplified base styles, GSAP handles hover elevation
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        >
        <CardHeader className="p-5"> {/* Adjusted padding */}
            <CardTitle className="text-xl font-semibold text-primary">{project.title}</CardTitle>
            <CardDescription className="text-sm">{project.shortDescription}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow p-5 space-y-4"> {/* Adjusted padding */}
            <div ref={imageContainerRef} className="relative w-full h-48 overflow-hidden rounded-md mb-4 transition-transform duration-400 ease-out">
            {project.images.map((img, index) => (
                <Image
                key={`${project.id}-${index}`}
                src={img}
                alt={`${project.title} screenshot ${index + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
                data-ai-hint={project.imageHints[index % project.imageHints.length]} // Cycle through hints
                />
            ))}
            </div>
            <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 5).map((tech) => ( // Show limited badges initially
                <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
            ))}
            {project.techStack.length > 5 && <Badge variant="outline" className="text-xs">+{project.techStack.length - 5} more</Badge>}
            </div>
            <p className="text-sm text-muted-foreground pt-2"><strong>Key Achievement:</strong> {project.keyAchievement}</p>
        </CardContent>
        <CardFooter className="p-5 flex justify-between items-center border-t"> {/* Adjusted padding */}
           <Dialog>
             <DialogTrigger asChild>
               <Button variant="outline" size="sm" className="group" data-cursor-interactive>
                   <Info className="mr-2 h-4 w-4 transition-transform group-hover:rotate-[360deg] duration-500" /> Learn More
                </Button>
             </DialogTrigger>
             {/* Improved Dialog Content Styling */}
             <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col p-0">
                <DialogHeader className="p-6 border-b">
                    <DialogTitle className="text-2xl">{project.title}</DialogTitle>
                    <DialogDescription>{project.shortDescription}</DialogDescription>
                </DialogHeader>
                {/* Scrollable Content Area */}
                <div className="flex-grow overflow-y-auto p-6 space-y-6">
                    {/* Enhanced Image Viewer (Simple Carousel Example) */}
                    <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-lg mb-6 shadow-inner">
                        {project.images.map((img, index) => (
                            <Image
                            key={`modal-${project.id}-${index}`}
                            src={img}
                            alt={`${project.title} detail screenshot ${index + 1}`}
                            fill style={{ objectFit: 'cover' }}
                            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                                index === 0 ? 'opacity-100' : 'opacity-0' // Keep simple for modal, maybe add controls later
                            }`}
                            sizes="80vw"
                            loading="lazy"
                            data-ai-hint={`${project.imageHints[index % project.imageHints.length]} detail view`}
                            />
                        ))}
                        {/* Add Carousel controls here if needed */}
                    </div>

                    <p className="text-base text-foreground leading-relaxed">{project.longDescription}</p>
                    <div className="bg-secondary/50 p-4 rounded-md border border-border">
                        <p className="text-sm font-semibold text-primary mb-1">Key Achievement:</p>
                        <p className="text-sm text-muted-foreground">{project.keyAchievement}</p>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-primary mb-2">Technologies Used:</p>
                        <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                            <Badge key={`modal-tech-${tech}`} variant="secondary">{tech}</Badge>
                        ))}
                        </div>
                    </div>
                </div>
                {/* Sticky Footer */}
                <DialogFooter className="p-6 border-t bg-background/90 sticky bottom-0 flex flex-col sm:flex-row sm:justify-end gap-2">
                    {project.githubUrl && (
                    <Button variant="outline" size="sm" asChild data-cursor-interactive>
                        <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" /> GitHub
                        </Link>
                    </Button>
                    )}
                    {project.liveDemoUrl && (
                    <Button size="sm" asChild className="bg-accent text-accent-foreground hover:bg-accent/90" data-cursor-interactive>
                        <Link href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                        </Link>
                    </Button>
                    )}
                    <DialogClose asChild>
                        <Button type="button" variant="ghost" size="sm" data-cursor-interactive>
                            Close
                        </Button>
                    </DialogClose>
               </DialogFooter>
             </DialogContent>
           </Dialog>
            <div className="flex space-x-1">
                {project.githubUrl && (
                <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-foreground transition-colors" data-cursor-interactive>
                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                    <Github className="h-5 w-5" />
                    </Link>
                </Button>
                )}
                {project.liveDemoUrl && (
                <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-accent transition-colors" data-cursor-interactive>
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
                y: 50,
                duration: 0.8,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none",
                }
            });

            // Animate project cards on scroll
            const cards = gridRef.current?.querySelectorAll('.project-card');
            if (cards) {
                gsap.from(cards, {
                    opacity: 0,
                    y: 60,
                    duration: 0.7,
                    stagger: 0.2, // Stagger the animation for each card
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: "top 85%", // Start animation when grid top is 85% in view
                        end: "bottom 90%", // Optional: define an end point
                        toggleActions: "play none none none", // Play animation once
                        // scrub: true, // Uncomment for scroll-linked animation instead of tweening
                    }
                });
            }

        }, sectionRef); // Scope animations to the section

        return () => ctx.revert(); // Cleanup
    }, []);

  return (
    <section ref={sectionRef} id="projects" className="bg-secondary/10">
        {/* Optional background pattern */}
        {/* <div className="absolute inset-0 opacity-5 pattern-dots pattern-accent pattern-bg-transparent pattern-size-4 pattern-opacity-20"></div> */}
      <div className="container mx-auto px-4">
        <h2
            className="text-4xl font-bold mb-16 text-center gradient-text"
        >
            Featured Projects
        </h2>
        <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10" // Increased gap
        >
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
