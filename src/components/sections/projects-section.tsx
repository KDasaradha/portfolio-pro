'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Github, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

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
}

const projectsData: Project[] = [
  {
    id: 1,
    title: 'InstaDe (Instant Poster Generator)',
    shortDescription: 'Dynamic poster generator using web scraping, AI, and Fabric JSON.',
    longDescription: 'A dynamic poster generator utilizing web scraping to gather input data, AI-driven content prompts for creative text generation, and Fabric JSON to produce effective marketing materials on the fly. Integrated with frontend using React.js for user interaction.',
    images: ['https://picsum.photos/seed/instade1/400/200', 'https://picsum.photos/seed/instade2/400/200', 'https://picsum.photos/seed/instade3/400/200'],
    techStack: ['Python', 'FastAPI', 'Fabric.js', 'Pillow', 'OpenCV', 'React.js', 'AI'],
    liveDemoUrl: 'https://develop.instade.ai/',
    githubUrl: 'https://github.com/KDasaradha/instade-placeholder', // Placeholder URL
    keyAchievement: 'Facilitated instant poster creation with dynamic content, increasing design efficiency by 60% and substantially reducing manual effort.',
  },
  {
    id: 2,
    title: 'School Management System (Advanced ERP)',
    shortDescription: 'Scalable backend for school operations with RBAC, fee processing, and chat.',
    longDescription: 'A comprehensive and scalable backend system designed to support all aspects of school operations. Features include robust user management with role-based access control (RBAC), curriculum management, fee processing and tracking, vendor coordination, and a real-time chat module for communication. Built with FastAPI and PostgreSQL, using SQLAlchemy ORM for data access and Docker for containerization.',
    images: ['https://picsum.photos/seed/schoolerp1/400/200', 'https://picsum.photos/seed/schoolerp2/400/200', 'https://picsum.photos/seed/schoolerp3/400/200'],
    techStack: ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy ORM', 'Docker', 'WebSockets'],
    liveDemoUrl: 'https://myschoolitaly-app.vercel.app/',
    githubUrl: 'https://github.com/KDasaradha/school-erp-placeholder', // Placeholder URL
    keyAchievement: 'Decreased API response times by 30% through query optimization and asynchronous processing, enabling efficient scaling to support hundreds of schools.',
  },
  {
    id: 3,
    title: 'SHOU (HRMS, Payroll & Animation Pipeline)',
    shortDescription: 'Integrated platform for HRMS, payroll, and animation production.',
    longDescription: 'An integrated platform that unifies Human Resource Management System (HRMS), payroll management, and an animation production pipeline. This system streamlines administrative operations, simplifies payroll processing, and provides real-time updates on animation project progress. Utilizes FastAPI, PostgreSQL, Docker for deployment, Jenkins for CI/CD, and Nginx as a reverse proxy.',
    images: ['https://picsum.photos/seed/shou1/400/200', 'https://picsum.photos/seed/shou2/400/200', 'https://picsum.photos/seed/shou3/400/200'],
    techStack: ['FastAPI', 'PostgreSQL', 'Docker', 'Jenkins', 'Nginx', 'Python'],
    liveDemoUrl: 'https://getshou.com/',
    githubUrl: 'https://github.com/KDasaradha/shou-placeholder', // Placeholder URL
    keyAchievement: 'Reduced payroll processing time by 80% and enhanced overall system efficiency by 60% through automation and streamlined workflows.',
  },
   {
    id: 4,
    title: 'AWS Full-Stack CI/CD Pipeline',
    shortDescription: 'Full-stack app (React, Next.js, FastAPI) deployed on AWS with CI/CD.',
    longDescription: 'Developing a modern full-stack application using React and Next.js for the frontend, and FastAPI for the backend API. The application is designed for deployment on AWS infrastructure (EC2, S3, VPC) and features a fully automated CI/CD pipeline using Jenkins and Docker for seamless integration and deployment.',
    images: ['https://picsum.photos/seed/aws1/400/200', 'https://picsum.photos/seed/aws2/400/200', 'https://picsum.photos/seed/aws3/400/200'],
    techStack: ['React', 'Next.js', 'FastAPI', 'AWS (EC2, S3, VPC)', 'Docker', 'Jenkins', 'Python', 'TypeScript'],
    // liveDemoUrl: '#', // Add URL when available
    githubUrl: 'https://github.com/KDasaradha/aws-fullstack-placeholder', // Placeholder URL
    keyAchievement: 'In Progress: Building expertise in cloud infrastructure, CI/CD automation, and full-stack development practices.',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};


const ProjectCard = ({ project }: { project: Project }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleMouseEnter = () => {
    // Could add image cycling on hover if desired
  };

  const handleMouseLeave = () => {
    setCurrentImageIndex(0); // Reset to first image on leave
  };

  return (
     <motion.div variants={cardVariants} className="h-full">
        <Card
        className="h-full flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg border-t-4 border-accent"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        >
        <CardHeader>
            <CardTitle className="text-xl font-semibold">{project.title}</CardTitle>
            <CardDescription>{project.shortDescription}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow space-y-4">
            <div className="relative w-full h-48 overflow-hidden rounded-md mb-4">
            {project.images.map((img, index) => (
                <Image
                key={index}
                src={img}
                alt={`${project.title} screenshot ${index + 1}`}
                fill // Use fill for responsive images within the container
                style={{ objectFit: 'cover' }} // Ensure image covers the area
                className={`transition-opacity duration-500 ${
                    index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
                loading="lazy"
                data-ai-hint={`project screenshot ${project.title}`}
                />
            ))}
            {/* Optional: Add image navigation dots/arrows */}
            </div>
            <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
                <Badge key={tech} variant="secondary">{tech}</Badge>
            ))}
            </div>
            <p className="text-sm text-muted-foreground"><strong>Key Achievement:</strong> {project.keyAchievement}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center pt-4">
           <Dialog>
             <DialogTrigger asChild>
               <Button variant="outline" size="sm">Learn More</Button>
             </DialogTrigger>
             <DialogContent className="sm:max-w-[600px]">
               <DialogHeader>
                 <DialogTitle>{project.title}</DialogTitle>
                 <DialogDescription>{project.shortDescription}</DialogDescription>
               </DialogHeader>
               <div className="my-4 max-h-[60vh] overflow-y-auto pr-4">
                 <div className="relative w-full h-64 overflow-hidden rounded-lg mb-4">
                    {project.images.map((img, index) => (
                        <Image
                        key={index}
                        src={img}
                        alt={`${project.title} screenshot ${index + 1}`}
                        fill style={{ objectFit: 'cover' }}
                        className={`transition-opacity duration-500 ${
                            index === 0 ? 'opacity-100' : 'opacity-0' // Show first image initially
                        }`}
                        loading="lazy"
                        data-ai-hint={`project screenshot ${project.title} detail`}
                        />
                    ))}
                 </div>
                 <p className="text-sm text-foreground mb-4">{project.longDescription}</p>
                 <p className="text-sm text-muted-foreground mb-4"><strong>Key Achievement:</strong> {project.keyAchievement}</p>
                 <div className="flex flex-wrap gap-2">
                   {project.techStack.map((tech) => (
                     <Badge key={tech} variant="secondary">{tech}</Badge>
                   ))}
                 </div>
               </div>
               <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-2">
                 {project.githubUrl && (
                   <Button variant="outline" size="sm" asChild>
                     <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                       <Github className="mr-2 h-4 w-4" /> GitHub
                     </Link>
                   </Button>
                 )}
                 {project.liveDemoUrl && (
                   <Button size="sm" asChild>
                     <Link href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                       <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                     </Link>
                   </Button>
                 )}
                  <DialogClose asChild>
                    <Button type="button" variant="secondary" size="sm">
                        Close
                    </Button>
                 </DialogClose>
               </DialogFooter>
             </DialogContent>
           </Dialog>
            <div className="flex space-x-2">
                {project.githubUrl && (
                <Button variant="ghost" size="icon" asChild>
                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                    <Github className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
                    </Link>
                </Button>
                )}
                {project.liveDemoUrl && (
                <Button variant="ghost" size="icon" asChild>
                    <Link href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                    <ExternalLink className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
                    </Link>
                </Button>
                )}
            </div>
        </CardFooter>
        </Card>
     </motion.div>
  );
};


export default function ProjectsSection() {
  return (
    <section id="projects">
      <div className="container mx-auto px-4">
        <motion.h2
            className="text-3xl font-bold mb-12 text-center gradient-text"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
        >
            Featured Projects
        </motion.h2>
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }} // Adjust amount as needed
            variants={sectionVariants}
        >
          {projectsData.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
