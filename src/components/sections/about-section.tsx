'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"; // Added CardDescription
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, BookOpen, Target, TrendingUp, Link as LinkIconLucide, Cloud, Layers, TestTubeDiagonal, ShieldCheck, Users, BrainCircuit } from 'lucide-react'; // Added Users, BrainCircuit
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

// Enhanced Timeline Content
const timeline = [
  { year: "2021", title: "Foundation: Python & Problem Solving", description: "Built a strong programming foundation in Python, focusing on algorithmic thinking and developing a passion for elegant, logical solutions.", technologies: "Python Core, Data Structures" },
  { year: "2022", title: "Internship: Java, OOP & Web Basics", description: "Applied Java and OOP principles within a corporate environment (Wipro), gaining practical experience with enterprise codebases and foundational web technologies.", technologies: "Java, OOP, HTML, CSS, Data Structures" },
  { year: "2023", title: "Backend Specialization: APIs & Automation", description: "Developed and deployed production Flask/FastAPI applications at Karyahub, mastering API design (REST), web scraping, and backend automation.", technologies: "Python, Flask, FastAPI, REST APIs" },
  { year: "2024", title: "Advanced Systems: Image Processing & Security", description: "Engineered complex features involving dynamic image generation (Pillow/OpenCV), interactive frontend integration (Fabric.js), asynchronous programming, JWT security, and ORM optimization.", technologies: "FastAPI, Pillow, OpenCV, Fabric.js, Asyncio, JWT, SQLAlchemy" },
  { year: "2025", title: "Cloud & Scalability: Microservices & DevOps", description: "Architecting and deploying scalable applications using microservices, containerization (Docker), CI/CD pipelines (GitHub Actions, Jenkins), and AWS cloud services. Integrating full-stack solutions with React/Next.js.", technologies: "Docker, CI/CD, AWS, React, Next.js, Microservices" },
];

// Enhanced Philosophy Points
const philosophyPoints = [
  { icon: Layers, title: "Scalable Architecture", description: "Designing systems with modularity and clear separation of concerns (SOLID) for future growth and maintainability." },
  { icon: ShieldCheck, title: "Security by Design", description: "Integrating security best practices (OWASP) throughout the SDLC, from data validation to secure deployment configurations." },
  { icon: TrendingUp, title: "Performance Optimization", description: "Employing profiling, efficient database interactions (query optimization, indexing), and asynchronous processing for optimal performance." },
  { icon: LinkIconLucide, title: "API-First Development", description: "Creating well-documented, versioned, and intuitive APIs (OpenAPI) that enable seamless integration and developer productivity." },
  { icon: Cloud, title: "Cloud-Native Principles", description: "Leveraging cloud infrastructure (AWS/GCP) for elasticity, resilience, and cost-effectiveness, utilizing services like Lambda, EC2, S3." },
  { icon: BrainCircuit, title: "Pragmatic Innovation", description: "Applying modern technologies and patterns thoughtfully, balancing cutting-edge solutions with stability and practical needs." },
  { icon: Users, title: "Collaborative Mindset", description: "Fostering clear communication, knowledge sharing, and effective teamwork within Agile/Scrum environments." },
];

// Refined Learning Goals
const learningGoals = [
  "Deepening expertise in Serverless Architectures & Event-Driven Systems (AWS Lambda, SQS, EventBridge).",
  "Mastering advanced database patterns (e.g., CQRS, sharding) and NoSQL solutions.",
  "Implementing robust monitoring and observability strategies (Prometheus, Grafana, ELK Stack).",
  "Exploring Infrastructure as Code (IaC) with Terraform for automated provisioning.",
  "Contributing to open-source projects in the Python/backend ecosystem.",
];

// Refined Why Work With Me
const whyWorkWithMe = [
    "Proven track record in designing, building, and deploying reliable, high-performance backend systems.",
    "Dedicated to writing clean, maintainable, and well-tested code following industry best practices.",
    "Strong problem-solving skills with a proactive approach to identifying and resolving technical challenges.",
    "Excellent collaborator experienced in cross-functional Agile teams, bridging technical and non-technical communication.",
    "Continuous learner committed to staying current with emerging technologies and driving innovation.",
];


export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const timelineRef = useRef<HTMLOListElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLHeadingElement>(null);
    const introRef = useRef<HTMLParagraphElement>(null); // Ref for intro paragraph

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate section header and intro paragraph
            gsap.from([headerRef.current, introRef.current], { // Target both header and intro
                opacity: 0,
                y: 60, // Increased offset
                duration: 0.9, // Increased duration
                stagger: 0.2, // Stagger the animations
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%", // Trigger a bit earlier
                    toggleActions: "play none none none",
                }
            });

            // Animate timeline items
            const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item');
            if (timelineItems) {
                gsap.from(timelineItems, {
                    opacity: 0,
                    x: -70, // Increased offset
                    duration: 0.8, // Increased duration
                    stagger: 0.3, // Increased stagger
                    scrollTrigger: {
                        trigger: timelineRef.current,
                        start: "top 70%", // Trigger earlier
                        toggleActions: "play none none none",
                    }
                });
            }

            // Animate cards on the right
            const rightCards = cardsRef.current?.querySelectorAll('.animate-card');
             if (rightCards) {
                gsap.from(rightCards, {
                    opacity: 0,
                    y: 70, // Increased offset
                    scale: 0.95, // Add scale effect
                    duration: 0.9, // Increased duration
                    stagger: 0.35, // Increased stagger
                    scrollTrigger: {
                        trigger: cardsRef.current,
                        start: "top 75%", // Trigger a bit earlier
                        toggleActions: "play none none none",
                    }
                });
             }

        }, sectionRef);

        return () => ctx.revert();
    }, []);


  return (
    <section ref={sectionRef} id="about" className="bg-gradient-to-b from-background to-secondary/25 py-32 md:py-40"> {/* Adjusted padding & background */}
      <div className="container mx-auto px-4 md:px-6">
        <h2
          ref={headerRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center gradient-text" /* Adjusted margin */
        >
          Crafting Digital Foundations
        </h2>
        {/* Added Introductory Paragraph */}
        <p ref={introRef} className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-center mb-20 md:mb-28 leading-relaxed">
            Driven by a passion for building robust and efficient systems, I specialize in backend development with a focus on scalability, security, and performance. My journey involves continuous learning and applying modern technologies to solve complex problems.
        </p>


        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20"> {/* Increased gap */}
          {/* Timeline on the left */}
          <div className="lg:col-span-2">
             {/* Enhanced Timeline Card */}
             <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-accent bg-card/90 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-semibold">My Technical Evolution</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">Key milestones in my development journey.</CardDescription> {/* Added description */}
              </CardHeader>
              <CardContent>
                <ol ref={timelineRef} className="relative border-l-2 border-accent/50 ml-3 space-y-14"> {/* Increased spacing & adjusted border */}
                  {timeline.map((item, index) => (
                    <li key={index} className="ml-12 group timeline-item"> {/* Increased margin */}
                       {/* Enhanced Year Marker */}
                       <span className={cn(
                           "absolute -left-3.5 -top-1", // Adjusted positioning
                           "flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-accent to-primary ring-8 ring-background text-accent-foreground font-bold text-sm transition-all duration-400 group-hover:scale-110 group-hover:shadow-lg shadow-md"
                       )}>
                         '{item.year.substring(2)} {/* Added apostrophe */}
                       </span>
                       {/* Enhanced Timeline Item Content Box */}
                       <div className="p-6 rounded-lg border border-border bg-background/70 transition-all duration-300 group-hover:border-accent/70 group-hover:shadow-lg group-hover:-translate-y-1.5 transform backdrop-blur-sm will-change-transform">
                           <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                           <p className="text-sm text-muted-foreground mb-3.5 leading-relaxed">{item.description}</p>
                           <p className="text-xs font-medium text-muted-foreground/80">
                            <strong className="text-primary/90">Key Tech:</strong> {item.technologies}
                           </p>
                       </div>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>

          {/* Cards on the right */}
          <div ref={cardsRef} className="lg:col-span-3 space-y-12 p-2 md:p-6"> {/* Increased spacing */}
            {/* Philosophy Card */}
            <Card className="animate-card shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-primary bg-card/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">🚀 Core Development Philosophy</CardTitle>
                <CardDescription className="text-sm text-muted-foreground mt-1">Principles guiding my approach to software engineering.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-7"> {/* Increased spacing */}
                  {philosophyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-5"> {/* Increased gap */}
                       <point.icon className="h-8 w-8 text-accent mt-0 flex-shrink-0" strokeWidth={1.5} /> {/* Slightly larger icon */}
                       <div>
                        <h3 className="font-semibold text-lg text-primary mb-1.5">{point.title}</h3> {/* Adjusted spacing */}
                        <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
                       </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Learning Goals Card */}
            <Card className="animate-card shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/90 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">💡 Continuous Growth Areas</CardTitle>
                    <CardDescription className="text-sm text-muted-foreground mt-1">Actively expanding my knowledge in:</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4"> {/* Increased spacing */}
                    {learningGoals.map((goal, index) => (
                         <li key={index} className="flex items-center gap-3 text-muted-foreground">
                           <span className="text-accent font-bold text-lg">&rarr;</span> <span className="flex-1 text-sm leading-relaxed">{goal}</span> {/* Adjusted size & leading */}
                         </li>
                    ))}
                    </ul>
                </CardContent>
            </Card>

            {/* Why Work With Me Card */}
             <Card className="animate-card shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/90 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">🤝 What I Bring to the Table</CardTitle>
                     <CardDescription className="text-sm text-muted-foreground mt-1">Key strengths and contributions.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4"> {/* Increased spacing */}
                    {whyWorkWithMe.map((reason, index) => (
                         <li key={index} className="flex items-start gap-3.5 text-muted-foreground"> {/* Increased gap */}
                            <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" strokeWidth={2}/> {/* Adjusted icon & margin */}
                            <span className="text-sm leading-relaxed">{reason}</span> {/* Adjusted size & leading */}
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
