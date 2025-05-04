'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, BookOpen, Target, TrendingUp, ShieldCheck, Link as LinkIcon, Cloud, Layers, TestTubeDiagonal } from 'lucide-react'; // Added missing imports

gsap.registerPlugin(ScrollTrigger);

// Refined Timeline Content
const timeline = [
  { year: "2021", title: "Ignition: Python Fundamentals", description: "Embarked on my programming journey, building a solid foundation in Python and discovering a passion for crafting logical solutions.", technologies: "Python Core" },
  { year: "2022", title: "Wipro Internship: Java & OOP Principles", description: "Applied Java and OOP concepts in a professional setting, while deepening my understanding of data structures and foundational web tech (HTML, CSS).", technologies: "Java, OOP, Data Structures" },
  { year: "2023", title: "Karyahub: API Development & Web Scraping", description: "Built foundational Flask projects, mastered web scraping techniques, and transitioned to FastAPI, developing key user/project management features.", technologies: "Python, Flask, FastAPI, APIs" },
  { year: "2024", title: "Advanced Backend & Image Processing", description: "Engineered dynamic image generation using Pillow/OpenCV, integrated frontend interactivity with Fabric.js, and mastered asynchronous FastAPI, JWT security, and efficient ORM usage.", technologies: "FastAPI, Pillow, OpenCV, Fabric.js, Asyncio, JWT, SQLAlchemy" },
  { year: "2025", title: "Cloud, Microservices & Full-Stack Integration", description: "Expanding into microservices, containerization (Docker), CI/CD (GitHub Actions, Jenkins), and AWS cloud deployment. Enhancing full-stack proficiency with React and Next.js.", technologies: "Docker, CI/CD, AWS, React, Next.js, Microservices" },
];

// Refined Philosophy Points
const philosophyPoints = [
  { icon: Target, title: "Robust Foundations", description: "Architecting resilient systems with clean abstractions and SOLID principles for longevity and adaptability." },
  { icon: ShieldCheck, title: "Security-First Mindset", description: "Embedding security throughout the development lifecycle, prioritizing least privilege and data protection." },
  { icon: TrendingUp, title: "Pragmatic Performance", description: "Optimizing strategically through algorithmic refinement, efficient data access, and real-world testing." },
  { icon: LinkIcon, title: "Collaborative APIs", description: "Designing clear, versioned, and documented APIs (OpenAPI) for seamless system integration." },
  { icon: Cloud, title: "Cloud-Native Efficiency", description: "Leveraging cloud services (AWS/GCP) effectively, balancing scalability with cost-consciousness." },
  { icon: BookOpen, title: "Continuous Learning", description: "Actively seeking knowledge, mentoring others, and contributing to a culture of shared understanding." },
];

// Refined Learning Goals
const learningGoals = [
  "Mastering Serverless Architectures on AWS (Lambda, API Gateway, DynamoDB)",
  "Advanced State Management & Performance Optimization in React/Next.js",
  "Deep Dive into Microservices Communication Patterns (Events, Queues)",
  "Implementing Infrastructure as Code (IaC) with Terraform/CloudFormation",
  "Exploring Advanced Database Design and Optimization Techniques",
];

// Refined Why Work With Me
const whyWorkWithMe = [
    "Proven ability to design and deliver scalable, secure, and maintainable backend systems.",
    "A strong commitment to writing high-quality, tested code and adhering to best practices.",
    "Collaborative team player experienced in Agile methodologies and cross-functional teamwork.",
    "Proactive problem-solver with a continuous improvement mindset.",
];


export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const timelineRef = useRef<HTMLOListElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

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

            // Animate timeline items with slight delay and stagger
            const timelineItems = timelineRef.current?.querySelectorAll('li');
            if (timelineItems) {
                gsap.from(timelineItems, {
                    opacity: 0,
                    x: -60, // Slightly more offset
                    duration: 0.7,
                    stagger: 0.25, // Slightly increased stagger
                    scrollTrigger: {
                        trigger: timelineRef.current,
                        start: "top 75%", // Trigger a bit earlier
                        toggleActions: "play none none none",
                    }
                });
            }

            // Animate cards on the right with stagger
            const rightCards = cardsRef.current?.querySelectorAll('.animate-card');
             if (rightCards) {
                gsap.from(rightCards, {
                    opacity: 0,
                    y: 60, // Slightly more offset
                    duration: 0.8,
                    stagger: 0.3, // Increased stagger for more pronounced effect
                    scrollTrigger: {
                        trigger: cardsRef.current,
                        start: "top 75%",
                        toggleActions: "play none none none",
                    }
                });
             }

        }, sectionRef); // Scope animations

        return () => ctx.revert(); // Cleanup
    }, []);


  return (
    <section ref={sectionRef} id="about" className="bg-gradient-to-b from-background to-secondary/20 py-24 md:py-36"> {/* Increased padding */}
      <div className="container mx-auto px-4 md:px-6"> {/* Standardized padding */}
        <h2
          className="text-4xl md:text-5xl font-bold mb-20 text-center gradient-text" /* Increased margin */
        >
          My Developer Journey
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16"> {/* Increased gap */}
          {/* Timeline on the left */}
          <div className="lg:col-span-2">
             <Card className="h-full shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-accent bg-card/85 backdrop-blur-md"> {/* Enhanced shadow and blur */}
              <CardHeader className="pb-4"> {/* Adjusted padding */}
                <CardTitle className="text-2xl font-semibold">Evolution & Milestones</CardTitle>
                 <CardDescription>Tracing my path from code enthusiast to backend specialist.</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Enhanced Timeline */}
                <ol ref={timelineRef} className="relative border-l-2 border-accent/60 ml-4 space-y-12"> {/* Increased spacing */}
                  {timeline.map((item, index) => (
                    <li key={index} className="ml-10 group"> {/* Increased margin */}
                       {/* Animated Timeline Dot */}
                       <span className="absolute -left-[1.25rem] flex h-9 w-9 items-center justify-center rounded-full bg-accent ring-8 ring-background text-accent-foreground font-semibold text-sm transition-transform duration-300 group-hover:scale-110 shadow-md"> {/* Enhanced dot style */}
                         {item.year.substring(2)}
                       </span>
                       {/* Timeline Item Card */}
                       <div className="p-5 rounded-lg border border-border bg-background/60 transition-all duration-300 group-hover:border-accent/60 group-hover:shadow-lg group-hover:-translate-y-1 transform backdrop-blur-sm"> {/* Enhanced item style */}
                           <h3 className="text-lg font-semibold text-foreground mb-1.5">{item.title}</h3>
                           <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{item.description}</p>
                           <p className="text-xs font-medium text-muted-foreground/90">
                            <strong className="text-primary/80">Key Tech:</strong> {item.technologies}
                           </p>
                       </div>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>

          {/* Cards on the right */}
          <div ref={cardsRef} className="lg:col-span-3 space-y-10"> {/* Increased spacing */}
            {/* Philosophy Card */}
            <Card className="animate-card shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-primary bg-card/85 backdrop-blur-md"> {/* Enhanced shadow and blur */}
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">🚀 My Core Principles</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-6"> {/* Increased spacing */}
                  {philosophyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-4"> {/* Increased gap */}
                       <point.icon className="h-7 w-7 text-accent mt-0.5 flex-shrink-0" strokeWidth={1.5} /> {/* Adjusted icon size */}
                       <div>
                        <h3 className="font-semibold text-lg text-primary mb-1">{point.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
                       </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Learning Goals Card */}
            <Card className="animate-card shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/85 backdrop-blur-md"> {/* Enhanced shadow and blur */}
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">💡 Current Learning Focus</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3"> {/* Increased spacing */}
                    {learningGoals.map((goal, index) => (
                         <li key={index} className="flex items-center gap-2.5 text-muted-foreground"> {/* Increased gap */}
                           <span className="text-accent font-bold text-lg">&rarr;</span> <span className="flex-1">{goal}</span>
                         </li>
                    ))}
                    </ul>
                </CardContent>
            </Card>

            {/* Why Work With Me Card */}
             <Card className="animate-card shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card/85 backdrop-blur-md"> {/* Enhanced shadow and blur */}
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">🤝 Value Proposition</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3"> {/* Increased spacing */}
                    {whyWorkWithMe.map((reason, index) => (
                         <li key={index} className="flex items-start gap-3 text-muted-foreground"> {/* Increased gap */}
                            <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0"/> {/* Adjusted icon size */}
                            <span>{reason}</span>
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
