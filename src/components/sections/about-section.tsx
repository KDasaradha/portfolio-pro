'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, BookOpen, Target, TrendingUp, Link as LinkIconLucide, Cloud, Layers, TestTubeDiagonal, ShieldCheck, Users, BrainCircuit } from 'lucide-react';
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  { year: "2021", title: "Foundation: Python & Problem Solving", description: "Forged a robust Python foundation, mastering data structures and algorithms, sparking a passion for elegant, high-performance solutions.", technologies: "Python Core, Data Structures, Algorithmic Thinking" },
  { year: "2022", title: "Internship: Java, OOP & Web Fundamentals", description: "Applied Java and OOP principles in an enterprise setting (Wipro), gaining hands-on experience with large-scale codebases and core web technologies.", technologies: "Java, OOP, HTML, CSS, JavaScript Basics, SQL" },
  { year: "2023", title: "Backend Specialization: APIs & Automation", description: "Engineered and deployed production-grade Flask/FastAPI applications at Karyahub, mastering RESTful API design, web scraping, and backend automation.", technologies: "Python, Flask, FastAPI, REST APIs, Web Scraping, PostgreSQL" },
  { year: "2024", title: "Advanced Systems: Image Processing & Security", description: "Developed complex features including dynamic image generation (Pillow/OpenCV), interactive frontend elements (Fabric.js), asynchronous programming, JWT/OAuth2 security, and ORM optimization (SQLAlchemy).", technologies: "FastAPI, Pillow, OpenCV, Fabric.js, Asyncio, JWT, OAuth2, SQLAlchemy" },
  { year: "2025+", title: "Cloud & Scalability: Microservices & DevOps", description: "Architecting and deploying scalable applications using microservices, containerization (Docker), CI/CD pipelines (GitHub Actions, Jenkins), and AWS. Integrating full-stack solutions with React/Next.js.", technologies: "Docker, Kubernetes (learning), CI/CD, AWS (EC2, S3, RDS, Lambda), React, Next.js, Microservices, Serverless" },
];

const philosophyPoints = [
  { icon: Layers, title: "Architectural Excellence", description: "Designing resilient, modular systems (SOLID, Microservices) for adaptability and long-term maintainability." },
  { icon: ShieldCheck, title: "Security-First Mindset", description: "Integrating security best practices (OWASP Top 10, Threat Modeling) throughout the SDLC, from design to deployment." },
  { icon: TrendingUp, title: "Performance Optimization", description: "Employing profiling, efficient database interactions (query optimization, indexing), and asynchronous processing for optimal system performance." },
  { icon: LinkIconLucide, title: "API-Centric Design", description: "Creating well-documented, versioned, and intuitive APIs (OpenAPI, GraphQL exploration) that enable seamless integration and developer productivity." },
  { icon: Cloud, title: "Cloud-Native Proficiency", description: "Leveraging cloud infrastructure (AWS/GCP) for elasticity, resilience, and cost-effectiveness, utilizing services like Lambda, EC2, S3, and serverless paradigms." },
  { icon: BrainCircuit, title: "Pragmatic Innovation", description: "Applying modern technologies and AI-driven patterns thoughtfully, balancing cutting-edge solutions with stability and practical business needs." },
  { icon: Users, title: "Collaborative Synergy", description: "Fostering transparent communication, knowledge sharing, and effective teamwork within Agile/Scrum environments to achieve collective goals." },
];

const learningGoals = [
  "Deepening expertise in Distributed Systems Design & Event-Driven Architectures (e.g., Kafka, RabbitMQ).",
  "Mastering advanced NoSQL solutions (e.g., MongoDB, DynamoDB) and data warehousing patterns.",
  "Implementing robust monitoring, observability, and alerting strategies (Prometheus, Grafana, ELK Stack).",
  "Advancing skills in Infrastructure as Code (IaC) with Terraform for automated, reproducible environments.",
  "Exploring advanced AI/ML model deployment techniques and MLOps practices.",
];

const whyWorkWithMe = [
    "Proven ability to translate complex business requirements into high-performance, scalable backend systems.",
    "Dedicated to writing clean, maintainable, and thoroughly tested code following industry best practices (TDD/BDD).",
    "Strategic problem-solver with a proactive approach to identifying, analyzing, and resolving technical challenges efficiently.",
    "Exceptional collaborator and communicator, experienced in leading and mentoring within cross-functional Agile teams.",
    "A continuous learner and innovator, committed to staying at the forefront of technology and driving impactful solutions.",
];


export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const timelineRef = useRef<HTMLOListElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLHeadingElement>(null);
    const introRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from([headerRef.current, introRef.current], {
                opacity: 0, y: 70, duration: 1, stagger: 0.25, ease: 'power3.out',
                scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reset" }
            });

            const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item');
            if (timelineItems) {
                gsap.from(timelineItems, {
                    opacity: 0, x: -80, duration: 0.9, stagger: 0.35, ease: 'power2.out',
                    scrollTrigger: { trigger: timelineRef.current, start: "top 75%", toggleActions: "play none none reset" }
                });
            }

            const rightCards = cardsRef.current?.querySelectorAll('.animate-card');
             if (rightCards) {
                gsap.from(rightCards, {
                    opacity: 0, y: 80, scale: 0.96, duration: 1, stagger: 0.4, ease: 'power3.out',
                    scrollTrigger: { trigger: cardsRef.current, start: "top 80%", toggleActions: "play none none reset" }
                });
             }
        }, sectionRef);
        return () => ctx.revert();
    }, []);

  return (
    <section ref={sectionRef} id="about" className="bg-gradient-to-b from-background to-secondary/30 py-24 md:py-32 lg:py-40">
      <div className="container mx-auto px-4 md:px-6">
        <h2 ref={headerRef} className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-center gradient-text tracking-tight">
          Crafting Digital Foundations
        </h2>
        <p ref={introRef} className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto text-center mb-16 md:mb-24 leading-relaxed">
            Driven by a passion for building robust, efficient, and scalable systems, I specialize in backend architecture and development. My journey is one of continuous learning, applying modern technologies and best practices to solve complex engineering problems and deliver tangible business value.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          <div className="lg:col-span-2">
             <Card className="h-full shadow-xl hover:shadow-2xl transition-shadow duration-300 border-l-4 border-accent bg-card/90 backdrop-blur-md">
              <CardHeader className="pb-5">
                <CardTitle className="text-2xl md:text-3xl font-semibold">My Technical Evolution</CardTitle>
                <CardDescription className="text-sm md:text-base text-muted-foreground mt-1.5">Key milestones shaping my expertise.</CardDescription>
              </CardHeader>
              <CardContent>
                <ol ref={timelineRef} className="relative border-l-2 border-accent/60 ml-2 md:ml-3 space-y-12 md:space-y-16">
                  {(timeline || []).map((item, index) => (
                    <li key={index} className="ml-8 md:ml-10 lg:ml-12 group timeline-item">
                       <span className={cn(
                           "absolute -left-[1.1rem] md:-left-5 -top-1.5", 
                           "flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent to-primary/80 ring-4 md:ring-[6px] ring-background text-accent-foreground font-bold text-xs md:text-sm transition-all duration-400 group-hover:scale-110 group-hover:shadow-lg shadow-md"
                       )}>
                         '{item.year.substring(2)}
                       </span>
                       <div className="p-5 md:p-6 rounded-lg border border-border/80 bg-background/80 transition-all duration-300 group-hover:border-accent/80 group-hover:shadow-xl group-hover:-translate-y-2 transform backdrop-blur-sm will-change-transform">
                           <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2.5">{item.title}</h3>
                           <p className="text-sm md:text-base text-muted-foreground mb-4 leading-relaxed">{item.description}</p>
                           <p className="text-xs md:text-sm font-medium text-muted-foreground/90">
                            <strong className="text-primary/95">Key Tech:</strong> {item.technologies}
                           </p>
                       </div>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>

          <div ref={cardsRef} className="lg:col-span-3 space-y-10 md:space-y-12 p-1 md:p-4">
            <Card className="animate-card shadow-xl hover:shadow-2xl transition-shadow duration-300 border-t-4 border-primary bg-card/90 backdrop-blur-md">
              <CardHeader className="p-5 md:p-7">
                <CardTitle className="text-2xl md:text-3xl font-semibold">🚀 Core Development Philosophy</CardTitle>
                <CardDescription className="text-sm md:text-base text-muted-foreground mt-1.5">Guiding principles for impactful software engineering.</CardDescription>
              </CardHeader>
              <CardContent className="p-5 md:p-7">
                <ul className="space-y-6">
                  {(philosophyPoints || []).map((point, index) => (
                    <li key={index} className="flex items-start gap-4 md:gap-5">
                       <point.icon className="h-7 w-7 md:h-8 md:w-8 text-accent mt-0.5 flex-shrink-0" strokeWidth={1.75} />
                       <div>
                        <h3 className="font-semibold text-md md:text-lg text-primary mb-1.5">{point.title}</h3>
                        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{point.description}</p>
                       </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="animate-card shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-card/90 backdrop-blur-md">
                <CardHeader className="p-5 md:p-7">
                    <CardTitle className="text-xl md:text-2xl font-semibold">💡 Continuous Growth & Learning</CardTitle>
                    <CardDescription className="text-sm md:text-base text-muted-foreground mt-1.5">Actively expanding knowledge in:</CardDescription>
                </CardHeader>
                <CardContent className="p-5 md:p-7">
                    <ul className="space-y-3.5 md:space-y-4">
                    {(learningGoals || []).map((goal, index) => (
                         <li key={index} className="flex items-center gap-2.5 md:gap-3 text-muted-foreground">
                           <span className="text-accent font-bold text-md md:text-lg">&rarr;</span> <span className="flex-1 text-sm md:text-base leading-relaxed">{goal}</span>
                         </li>
                    ))}
                    </ul>
                </CardContent>
            </Card>

             <Card className="animate-card shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-card/90 backdrop-blur-md">
                <CardHeader className="p-5 md:p-7">
                    <CardTitle className="text-xl md:text-2xl font-semibold">🤝 Value Proposition</CardTitle>
                     <CardDescription className="text-sm md:text-base text-muted-foreground mt-1.5">Key strengths I bring to your team/project.</CardDescription>
                </CardHeader>
                <CardContent className="p-5 md:p-7">
                    <ul className="space-y-3.5 md:space-y-4">
                    {(whyWorkWithMe || []).map((reason, index) => (
                         <li key={index} className="flex items-start gap-3 md:gap-3.5 text-muted-foreground">
                            <CheckCircle2 className="h-5 w-5 md:h-6 md:w-6 text-accent mt-0.5 md:mt-1 flex-shrink-0" strokeWidth={2}/>
                            <span className="text-sm md:text-base leading-relaxed">{reason}</span>
                         </li>
                    ))}
                    </ul>
                </CardContent>
             </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
