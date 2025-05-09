'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, Layers, ShieldCheck, TrendingUp, Link as LinkIconLucide, Cloud, BrainCircuit, Users, UserCheck, Lightbulb, Code2, Briefcase } from 'lucide-react';
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

// V1 Data (can be imported or redefined if V2 needs different structuring)
const timelineV2 = [
  { year: "2021", title: "Genesis: Python & Algorithmic Thinking", description: "Forged a robust Python foundation, mastering data structures and algorithms, igniting a passion for elegant, high-performance code.", technologies: "Python Core, Data Structures, Problem Solving" },
  { year: "2022", title: "Catalyst: Java, OOP & Web Fundamentals", description: "Internship at Wipro: Applied Java and OOP in an enterprise context, gaining hands-on experience with large-scale codebases and foundational web tech.", technologies: "Java, OOP, HTML, CSS, JavaScript Basics" },
  { year: "2023", title: "Apex: Backend Mastery & API Orchestration", description: "Karyahub: Architected and deployed production-grade Flask/FastAPI applications, specializing in RESTful API design, web scraping, and backend automation.", technologies: "Python, Flask, FastAPI, REST APIs, Web Scraping" },
  { year: "2024", title: "Nexus: Advanced Systems & Security Engineering", description: "Engineered intricate features involving dynamic image processing (Pillow/OpenCV), interactive frontends (Fabric.js), asynchronous programming, JWT/OAuth2 security, and ORM optimization.", technologies: "FastAPI, Pillow, OpenCV, Fabric.js, Asyncio, JWT, OAuth2, SQLAlchemy" },
  { year: "2025+", title: "Horizon: Cloud-Native & Full-Stack Innovation", description: "Spearheading scalable microservices, containerization (Docker), CI/CD (GitHub Actions, Jenkins), and AWS cloud solutions. Integrating end-to-end systems with React/Next.js.", technologies: "Docker, Kubernetes, CI/CD, AWS, React, Next.js, Microservices, Serverless" },
];

const philosophyPointsV2 = [
  { icon: Layers, title: "Architectural Integrity", description: "Building resilient, modular systems (SOLID, Microservices) designed for adaptability and long-term evolution." },
  { icon: ShieldCheck, title: "Proactive Security", description: "Embedding security (OWASP Top 10, Threat Modeling) throughout the SDLC, from design to deployment." },
  { icon: TrendingUp, title: "Performance by Design", description: "Systematically optimizing for speed and efficiency via profiling, advanced caching, and asynchronous patterns." },
  { icon: LinkIconLucide, title: "API-Centric Development", description: "Crafting well-documented, versioned, and intuitive APIs (OpenAPI, GraphQL) that empower seamless integrations." },
  { icon: Cloud, title: "Cloud-Native Excellence", description: "Leveraging AWS/GCP for elastic, fault-tolerant, and cost-efficient infrastructures (Serverless, IaC with Terraform)." },
  { icon: BrainCircuit, title: "Pragmatic Innovation", description: "Strategically applying cutting-edge tech and AI to solve real-world problems, ensuring stability and practical value." },
  { icon: Users, title: "Synergistic Collaboration", description: "Championing transparent communication, knowledge democratization, and Agile/Scrum practices for high-performing teams." },
];

const learningGoalsV2 = [
  "Mastering Distributed Systems Design & Event-Driven Architectures (Kafka, RabbitMQ).",
  "Deepening expertise in Advanced Database Optimization, NoSQL (MongoDB, DynamoDB), and Data Warehousing.",
  "Implementing comprehensive Observability stacks (Prometheus, Grafana, OpenTelemetry).",
  "Advancing skills in Infrastructure as Code (Terraform, Pulumi) and GitOps methodologies.",
  "Exploring Quantum Computing applications and advanced AI/ML model deployment strategies.",
];

const whyWorkWithMeV2 = [
    "Visionary architect transforming complex requirements into elegant, high-impact backend solutions.",
    "Dedicated to pioneering clean, test-driven, and maintainable code adhering to the highest industry standards.",
    "Strategic problem-solver with an innate ability to dissect challenges and engineer innovative, efficient outcomes.",
    "Exceptional communicator and collaborator, adept at leading cross-functional Agile teams and mentoring peers.",
    "Relentless innovator and lifelong learner, committed to mastering emerging technologies and driving transformative change.",
];


export default function AboutSectionV2() {
    const sectionRef = useRef<HTMLElement>(null);
    const introContainerRef = useRef<HTMLDivElement>(null);
    const timelineContainerRef = useRef<HTMLDivElement>(null);
    const philosophyContainerRef = useRef<HTMLDivElement>(null);
    const goalsContainerRef = useRef<HTMLDivElement>(null);
    const whyWorkContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Intro Animation
            gsap.from(introContainerRef.current, {
                opacity: 0, y: 50, duration: 1, ease: 'power3.out',
                scrollTrigger: { trigger: introContainerRef.current, start: "top 85%", toggleActions: "play none none none" }
            });

            // Timeline Horizontal Scroll Animation
            const timelineItems = timelineContainerRef.current?.querySelectorAll(".timeline-item-v2");
            if (timelineItems && timelineItems.length > 0) {
                gsap.from(timelineItems, {
                    opacity: 0, x: -100, stagger: 0.3, duration: 0.8, ease: 'power2.out',
                    scrollTrigger: {
                        trigger: timelineContainerRef.current,
                        start: "top 75%",
                        // scrub: 1, // Optional: makes it scrub with scroll
                        toggleActions: "play none none none"
                    }
                });
                 // Optional: Parallax scroll effect for the horizontal timeline container itself
                gsap.to(timelineContainerRef.current, {
                    xPercent: -30 * (timelineItems.length > 3 ? (timelineItems.length-3) : 0), // Adjust multiplier based on item width and count
                    ease: "none",
                    scrollTrigger: {
                        trigger: timelineContainerRef.current,
                        start: "top center",
                        end: "bottom top+=100",
                        scrub: 1.5,
                        invalidateOnRefresh: true, // Important for responsive
                    },
                });
            }

            // Staggered Card Animations for Philosophy, Goals, Why Work
            const cardContainers = [philosophyContainerRef.current, goalsContainerRef.current, whyWorkContainerRef.current];
            cardContainers.forEach((container, index) => {
                if (container) {
                    gsap.from(container.querySelectorAll('.animate-card-v2'), {
                        opacity: 0, y: 60, scale: 0.95, stagger: 0.2, duration: 0.9, ease: 'power3.out',
                        scrollTrigger: {
                            trigger: container,
                            start: "top 80%",
                            toggleActions: "play none none none",
                            delay: index * 0.1 // Slight delay between sections
                        }
                    });
                }
            });

        }, sectionRef);
        return () => ctx.revert();
    }, []);

  return (
    <section ref={sectionRef} id="about-v2" className="py-32 md:py-48 bg-gradient-to-b from-gray-900 via-purple-950 to-blue-950 text-neutral-200 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pattern-grid pattern-size-16 z-0"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div ref={introContainerRef} className="text-center mb-24 md:mb-32">
          <h2 className="text-5xl md:text-7xl font-black mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 leading-tight tracking-tighter">
            My Developer Odyssey
          </h2>
          <p className="text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            I am a results-driven Backend Architect with a profound passion for Python, FastAPI, and cloud-native architectures. My journey is one of continuous evolution, transforming complex challenges into elegant, high-performance, and scalable digital solutions. I thrive on clean code, robust system design, and seamless API orchestration.
          </p>
        </div>

        {/* V2 Timeline - Horizontal Scroll Concept */}
        <div className="mb-24 md:mb-32">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 text-neutral-100 tracking-tight">Chronicles of Innovation</h3>
            <div ref={timelineContainerRef} className="flex overflow-x-auto space-x-8 pb-8 custom-scrollbar-horizontal snaps-inline">
                {timelineV2.map((item, index) => (
                    <div key={index} className="timeline-item-v2 flex-shrink-0 w-[320px] md:w-[380px] snap-center">
                        <Card className="h-full bg-white/5 border border-purple-400/30 backdrop-blur-md shadow-xl hover:shadow-purple-500/30 transition-all duration-400 group rounded-xl overflow-hidden hover:-translate-y-2">
                            <CardHeader className="p-6 border-b border-purple-400/20">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-3xl font-extrabold text-purple-400">{item.year}</span>
                                    <Briefcase className="h-8 w-8 text-purple-400/70 group-hover:text-purple-400 transition-colors" />
                                </div>
                                <CardTitle className="text-xl font-semibold text-neutral-100 leading-snug">{item.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-6">
                                <p className="text-sm text-neutral-300 mb-4 leading-relaxed">{item.description}</p>
                                <p className="text-xs font-medium text-purple-300/80">
                                    <strong className="text-purple-300">Core Stack:</strong> {item.technologies}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-12 items-start">
          {/* Philosophy Card */}
          <div ref={philosophyContainerRef}>
            <Card className="animate-card-v2 h-full bg-white/5 border border-pink-400/30 backdrop-blur-md shadow-xl hover:shadow-pink-500/30 transition-all duration-400 rounded-xl group hover:-translate-y-2">
              <CardHeader className="p-7">
                <CardTitle className="text-2xl font-bold flex items-center gap-3 text-pink-400">
                  <Lightbulb className="h-7 w-7"/> Guiding Principles
                </CardTitle>
                <CardDescription className="text-sm text-neutral-400 mt-1">My core tenets for software craftsmanship.</CardDescription>
              </CardHeader>
              <CardContent className="p-7">
                <ul className="space-y-5">
                  {philosophyPointsV2.map((point, index) => (
                    <li key={index} className="flex items-start gap-4">
                       <point.icon className="h-6 w-6 text-pink-400 mt-0.5 flex-shrink-0" strokeWidth={1.75} />
                       <div>
                        <h4 className="font-semibold text-md text-neutral-100 mb-1">{point.title}</h4>
                        <p className="text-xs text-neutral-300 leading-relaxed">{point.description}</p>
                       </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Goals & Why Work With Me in a 2-column layout on medium up */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
            {/* Learning Goals Card */}
            <div ref={goalsContainerRef}>
                <Card className="animate-card-v2 h-full bg-white/5 border border-orange-400/30 backdrop-blur-md shadow-xl hover:shadow-orange-500/30 transition-all duration-400 rounded-xl group hover:-translate-y-2">
                    <CardHeader className="p-7">
                        <CardTitle className="text-2xl font-bold flex items-center gap-3 text-orange-400">
                            <Code2 className="h-7 w-7"/> Future Endeavors
                        </CardTitle>
                        <CardDescription className="text-sm text-neutral-400 mt-1">Areas of active exploration and growth.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-7">
                        <ul className="space-y-4">
                        {learningGoalsV2.map((goal, index) => (
                             <li key={index} className="flex items-start gap-3 text-sm text-neutral-300">
                               <span className="text-orange-400 font-bold">&bull;</span> <span className="flex-1 leading-relaxed">{goal}</span>
                             </li>
                        ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>

            {/* Why Work With Me Card */}
            <div ref={whyWorkContainerRef}>
                 <Card className="animate-card-v2 h-full bg-white/5 border border-teal-400/30 backdrop-blur-md shadow-xl hover:shadow-teal-500/30 transition-all duration-400 rounded-xl group hover:-translate-y-2">
                    <CardHeader className="p-7">
                        <CardTitle className="text-2xl font-bold flex items-center gap-3 text-teal-400">
                            <UserCheck className="h-7 w-7"/> My Value Proposition
                        </CardTitle>
                         <CardDescription className="text-sm text-neutral-400 mt-1">What I bring to your team and projects.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-7">
                        <ul className="space-y-4">
                        {whyWorkWithMeV2.map((reason, index) => (
                             <li key={index} className="flex items-start gap-3.5 text-sm text-neutral-300">
                                <CheckCircle2 className="h-5 w-5 text-teal-400 mt-0.5 flex-shrink-0" strokeWidth={2}/>
                                <span className="leading-relaxed">{reason}</span>
                             </li>
                        ))}
                        </ul>
                    </CardContent>
                 </Card>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .custom-scrollbar-horizontal::-webkit-scrollbar {
            height: 8px;
        }
        .custom-scrollbar-horizontal::-webkit-scrollbar-track {
            background: hsl(var(--muted) / 0.2);
            border-radius: 10px;
        }
        .custom-scrollbar-horizontal::-webkit-scrollbar-thumb {
            background-color: hsl(var(--accent) / 0.5);
            border-radius: 10px;
            border: 2px solid hsl(var(--muted) / 0.2);
        }
        .custom-scrollbar-horizontal::-webkit-scrollbar-thumb:hover {
            background-color: hsl(var(--accent) / 0.7);
        }
        .custom-scrollbar-horizontal {
           scrollbar-width: thin;
           scrollbar-color: hsl(var(--accent) / 0.5) hsl(var(--muted) / 0.2);
        }
        .snaps-inline {
          scroll-snap-type: inline mandatory;
        }
        .snap-center {
          scroll-snap-align: center;
        }
        .pattern-grid {
            background-image: 
                linear-gradient(hsl(var(--foreground)/0.05) 1px, transparent 1px), 
                linear-gradient(to right, hsl(var(--foreground)/0.05) 1px, transparent 1px);
        }
      `}</style>
    </section>
  );
}
