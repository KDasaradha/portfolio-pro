'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2 } from 'lucide-react'; // Use a different check icon

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  { year: "2021", title: "🚀 Embarked on Python Journey", description: "Initiated my coding career by mastering Python fundamentals, igniting a passion for problem-solving and innovation.", technologies: "Python" },
  { year: "2022", title: "💼 Wipro Internship: Java & OOP", description: "Gained hands-on experience in Java and Object-Oriented Programming during my internship at Wipro, while also exploring Python OOP, data structures, HTML, and CSS.", technologies: "Java, Python" },
  { year: "2023", title: "🔍 Karyahub Solutions Internship: API & Web Scraping", description: "Developed foundational projects using Python and Flask, delved into web scraping with third-party APIs, and advanced my skills with FastAPI by building user and project management modules.", technologies: "Python, FastAPI, Web Scraping" },
  { year: "2024", title: "🖼️ Advanced Backend & Frontend Integration", description: "Enhanced my expertise by leveraging image processing libraries like Pillow and OpenCV for dynamic design generation, implementing Fabric.js for interactive frontend rendering, and mastering asynchronous programming with FastAPI—including JWT security and efficient database management.", technologies: "Python, FastAPI, Pillow, OpenCV, Fabric.js" },
  { year: "2025", title: "☁️ Microservices, CI/CD & Cloud Integration", description: "Expanding my skillset with microservices architecture, containerization using Docker, and CI/CD pipelines via GitHub Actions and Jenkins. Currently exploring AWS Cloud services for scalable deployments and enhancing full-stack capabilities with React and Next.js.", technologies: "Docker, CI/CD, AWS, React, Next.js" },
];

const philosophyPoints = [
  { title: "Foundations Over Frameworks", description: "Architecting systems to outlast technology trends, prioritizing clean abstractions and SOLID principles for maintainability and future migration." },
  { title: "Security as Default State", description: "Integrating security throughout the SDLC, enforcing least-privilege, encrypted data flows, and zero-trust architectures." },
  { title: "Performance with Purpose", description: "Optimizing judiciously through algorithmic improvements, strategic indexing, and real-world load testing." },
  { title: "APIs as Collaboration Contracts", description: "Designing clear, versioned, and well-documented interfaces (OpenAPI/Swagger) for sustainable system integration." },
  { title: "Cloud-Native, Cost-Conscious", description: "Leveraging serverless and cloud services (AWS/GCP) to balance scalability with operational costs effectively." },
  { title: "Learning Through Teaching", description: "Solidifying knowledge by documenting processes, mentoring, and contributing to shared knowledge repositories." },
];

const learningGoals = [
  "Advanced AWS Cloud services for scalable backend deployments",
  "Modern React patterns for dynamic, interactive user interfaces",
  "Next.js for optimized server-side rendering and static site generation",
  "Comprehensive system design and microservices architecture",
  "CI/CD pipeline optimization with contemporary DevOps tools",
];

const whyWorkWithMe = [
    "Expertise in designing and implementing scalable, secure, and maintainable architectures.",
    "A steadfast commitment to delivering high-quality, clean code and embracing continuous improvement.",
    "Proven ability to excel in collaborative, Agile environments with cross-functional teams.",
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
                    start: "top 80%", // Trigger when 80% of the section top enters viewport
                    toggleActions: "play none none none",
                }
            });

            // Animate timeline items
            const timelineItems = timelineRef.current?.querySelectorAll('li');
            if (timelineItems) {
                gsap.from(timelineItems, {
                    opacity: 0,
                    x: -50,
                    duration: 0.6,
                    stagger: 0.2,
                    scrollTrigger: {
                        trigger: timelineRef.current,
                        start: "top 70%",
                        toggleActions: "play none none none",
                    }
                });
                 // Pin the timeline while scrolling through its items (optional, can be complex)
                // ScrollTrigger.create({
                //     trigger: timelineRef.current,
                //     start: "top 20%",
                //     end: "bottom 80%", // Adjust as needed
                //     pin: true,
                //     pinSpacing: false,
                // });
            }


            // Animate cards on the right
            const rightCards = cardsRef.current?.querySelectorAll('.animate-card');
             if (rightCards) {
                gsap.from(rightCards, {
                    opacity: 0,
                    y: 50,
                    duration: 0.7,
                    stagger: 0.25,
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
    <section ref={sectionRef} id="about" className="bg-gradient-to-b from-background to-secondary/10">
      {/* Optional decorative SVG background */}
      {/* <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full opacity-5" style={{zIndex: -1}}>...</svg> */}
      <div className="container mx-auto px-6 lg:px-12">
        <h2
          className="text-4xl font-bold mb-16 text-center gradient-text"
        >
          About Me
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12"> {/* Adjusted grid columns */}
          {/* Timeline on the left (takes 2 cols on large screens) */}
          <div className="lg:col-span-2">
             <Card className="h-full shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-accent bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl">My Journey</CardTitle>
                 <CardDescription>From Python enthusiast to backend specialist.</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Enhanced Timeline */}
                <ol ref={timelineRef} className="relative border-l-2 border-accent/50 ml-4 space-y-10">
                  {timeline.map((item, index) => (
                    <li key={index} className="ml-8 group"> {/* Increased margin */}
                       <span className="absolute -left-[1.1rem] flex h-8 w-8 items-center justify-center rounded-full bg-accent ring-4 ring-background text-accent-foreground font-semibold text-xs transition-transform duration-300 group-hover:scale-110">
                         {item.year.substring(2)} {/* Show last 2 digits */}
                       </span>
                       <div className="p-4 rounded-lg border border-border bg-background/50 transition-all duration-300 group-hover:border-accent/50 group-hover:shadow-sm">
                           <h3 className="text-lg font-semibold text-foreground mb-1">{item.title}</h3>
                           <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                           <p className="text-xs text-muted-foreground/80"><strong>Tech:</strong> {item.technologies}</p>
                       </div>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </div>

          {/* Cards on the right (takes 3 cols on large screens) */}
          <div ref={cardsRef} className="lg:col-span-3 space-y-8">
            <Card className="animate-card shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-primary bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl">🚀 My Development Philosophy</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-5">
                  {philosophyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                       <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                       <div>
                        <h3 className="font-semibold text-lg text-primary mb-1">{point.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
                       </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="animate-card shadow-md hover:shadow-lg transition-shadow duration-300 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-xl">💡 What I&apos;m Currently Learning</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                    {learningGoals.map((goal, index) => (
                         <li key={index} className="flex items-center gap-2 text-muted-foreground">
                           <span className="text-accent font-bold">&rarr;</span> {goal}
                         </li>
                    ))}
                    </ul>
                </CardContent>
            </Card>

             <Card className="animate-card shadow-md hover:shadow-lg transition-shadow duration-300 bg-card/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-xl">🤝 Why Work With Me?</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                    {whyWorkWithMe.map((reason, index) => (
                         <li key={index} className="flex items-start gap-2 text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-accent mt-1 flex-shrink-0"/>
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
