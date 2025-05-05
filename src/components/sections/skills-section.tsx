'use client';

import { Card, CardContent } from "@/components/ui/card"; // Only need Card and CardContent
import {
  Server, Database, CodeXml, GitBranch, Wrench, PanelsTopLeft, Search,
  ChevronDown, ChevronUp, Cog, Cloud, BookOpen, Cpu, Paintbrush,
  DatabaseZap, ImageIcon, TerminalSquare, Palette, BrainCircuit, Layers,
  TestTubeDiagonal, Package, Gauge, Link as LinkIcon, ShieldCheck, Users2 as Users // Renamed Users to Users2 to avoid conflict if needed, or check lucide-react docs
} from 'lucide-react';
import { useEffect, useRef, useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from "@/lib/utils";
import { Flip } from "gsap/Flip"; // Import Flip plugin

gsap.registerPlugin(ScrollTrigger, Flip); // Register Flip plugin

interface Skill {
  name: string;
  icon: React.ElementType;
  category: string;
  colorClass: string; // Tailwind color class for icon/hover hint
  level: 'Proficient' | 'Experienced' | 'Familiar'; // Skill proficiency level
  years?: number; // Optional: Years of experience
  description?: string; // Optional: Short description
}

// Enhanced and Re-categorized Skills List with refined descriptions
const allSkills: Skill[] = [
    // Core Languages & Paradigms
    { name: 'Python', icon: TerminalSquare, category: 'Languages & Core', colorClass: 'text-blue-500 border-blue-500/30 hover:bg-blue-500/10', level: 'Proficient', years: 4, description: 'Primary language for backend development, scripting, and automation.' },
    { name: 'SQL', icon: Database, category: 'Languages & Core', colorClass: 'text-indigo-500 border-indigo-500/30 hover:bg-indigo-500/10', level: 'Proficient', years: 3, description: 'Designing schemas, writing complex queries, and optimizing database performance.' },
    { name: 'JavaScript (ES6+)', icon: TerminalSquare, category: 'Languages & Core', colorClass: 'text-yellow-500 border-yellow-500/30 hover:bg-yellow-500/10', level: 'Experienced', years: 3, description: 'Frontend interactivity and asynchronous operations.' },
    { name: 'TypeScript', icon: TerminalSquare, category: 'Languages & Core', colorClass: 'text-blue-600 border-blue-600/30 hover:bg-blue-600/10', level: 'Experienced', years: 2, description: 'Enhancing JavaScript with static typing for robust applications.' },
    { name: 'OOP Principles', icon: Layers, category: 'Languages & Core', colorClass: 'text-purple-500 border-purple-500/30 hover:bg-purple-500/10', level: 'Proficient', description: 'Applying object-oriented concepts for modular and maintainable code.'},
    { name: 'Java', icon: TerminalSquare, category: 'Languages & Core', colorClass: 'text-orange-500 border-orange-500/30 hover:bg-orange-500/10', level: 'Familiar', years: 1, description: 'Foundation in enterprise-level development from internship experience.' },

    // Backend Frameworks & Libraries
    { name: 'FastAPI', icon: Server, category: 'Backend', colorClass: 'text-teal-500 border-teal-500/30 hover:bg-teal-500/10', level: 'Proficient', years: 3, description: 'Building high-performance, asynchronous APIs with modern Python features.' },
    { name: 'SQLAlchemy (ORM)', icon: DatabaseZap, category: 'Backend', colorClass: 'text-red-500 border-red-500/30 hover:bg-red-500/10', level: 'Proficient', years: 3, description: 'Efficient database interaction and object-relational mapping.' },
    { name: 'Pydantic', icon: ShieldCheck, category: 'Backend', colorClass: 'text-rose-500 border-rose-500/30 hover:bg-rose-500/10', level: 'Proficient', description: 'Data validation and settings management in Python applications.' },
    { name: 'Flask', icon: Server, category: 'Backend', colorClass: 'text-gray-500 border-gray-500/30 hover:bg-gray-500/10', level: 'Experienced', years: 2, description: 'Developing web applications and microservices with a lightweight framework.' },
    { name: 'Celery', icon: Cpu, category: 'Backend', colorClass: 'text-green-600 border-green-600/30 hover:bg-green-600/10', level: 'Experienced', description: 'Implementing distributed task queues for background processing.' },
    { name: 'Asyncio', icon: Cpu, category: 'Backend', colorClass: 'text-indigo-600 border-indigo-600/30 hover:bg-indigo-600/10', level: 'Experienced', description: 'Writing concurrent code using async/await syntax in Python.' },

    // Frontend Technologies
    { name: 'React', icon: PanelsTopLeft, category: 'Frontend', colorClass: 'text-sky-500 border-sky-500/30 hover:bg-sky-500/10', level: 'Experienced', years: 2, description: 'Building dynamic and interactive user interfaces.' },
    { name: 'Next.js', icon: PanelsTopLeft, category: 'Frontend', colorClass: 'text-black dark:text-white border-gray-500/30 hover:bg-gray-500/10', level: 'Experienced', years: 2, description: 'Developing server-rendered React applications with enhanced performance.' },
    { name: 'HTML5', icon: CodeXml, category: 'Frontend', colorClass: 'text-orange-600 border-orange-600/30 hover:bg-orange-600/10', level: 'Proficient', description: 'Structuring web content semantically.' },
    { name: 'CSS3', icon: Palette, category: 'Frontend', colorClass: 'text-blue-600 border-blue-600/30 hover:bg-blue-600/10', level: 'Proficient', description: 'Styling web applications with modern CSS features.' },
    { name: 'Tailwind CSS', icon: Palette, category: 'Frontend', colorClass: 'text-cyan-500 border-cyan-500/30 hover:bg-cyan-500/10', level: 'Proficient', description: 'Utility-first CSS framework for rapid UI development.' },
    { name: 'Shadcn/ui', icon: PanelsTopLeft, category: 'Frontend', colorClass: 'text-gray-700 dark:text-gray-300 border-gray-500/30 hover:bg-gray-500/10', level: 'Proficient', description: 'Building accessible and reusable UI components.' },
    { name: 'Fabric.js', icon: Paintbrush, category: 'Frontend', colorClass: 'text-green-600 border-green-600/30 hover:bg-green-600/10', level: 'Experienced', description: 'Interactive object model on top of HTML5 canvas.' },
    { name: 'GSAP', icon: Cpu, category: 'Frontend', colorClass: 'text-green-500 border-green-500/30 hover:bg-green-500/10', level: 'Experienced', description: 'Creating high-performance animations for the web.' },

    // Databases & Data Management
    { name: 'PostgreSQL', icon: Database, category: 'Databases', colorClass: 'text-blue-700 border-blue-700/30 hover:bg-blue-700/10', level: 'Proficient', years: 3, description: 'Robust relational database management for complex applications.' },
    { name: 'MySQL', icon: Database, category: 'Databases', colorClass: 'text-orange-700 border-orange-700/30 hover:bg-orange-700/10', level: 'Experienced', years: 2, description: 'Widely-used relational database for various web applications.' },
    { name: 'Alembic', icon: DatabaseZap, category: 'Databases', colorClass: 'text-lime-500 border-lime-500/30 hover:bg-lime-500/10', level: 'Experienced', description: 'Handling database schema migrations in SQLAlchemy.' },
    { name: 'Redis', icon: DatabaseZap, category: 'Databases', colorClass: 'text-red-600 border-red-600/30 hover:bg-red-600/10', level: 'Familiar', description: 'In-memory data structure store for caching and message brokering.' },

    // DevOps, Cloud & Infrastructure
    { name: 'Docker', icon: Package, category: 'DevOps & Cloud', colorClass: 'text-blue-400 border-blue-400/30 hover:bg-blue-400/10', level: 'Proficient', years: 2, description: 'Containerizing applications for consistent deployment environments.' },
    { name: 'AWS (EC2, S3, VPC, RDS, Lambda)', icon: Cloud, category: 'DevOps & Cloud', colorClass: 'text-orange-400 border-orange-400/30 hover:bg-orange-400/10', level: 'Experienced', years: 2, description: 'Utilizing core AWS services for scalable cloud infrastructure.' },
    { name: 'CI/CD Pipelines', icon: Wrench, category: 'DevOps & Cloud', colorClass: 'text-purple-500 border-purple-500/30 hover:bg-purple-500/10', level: 'Proficient', description: 'Automating build, test, and deployment processes.' },
    { name: 'Nginx', icon: Server, category: 'DevOps & Cloud', colorClass: 'text-green-500 border-green-500/30 hover:bg-green-500/10', level: 'Experienced', description: 'High-performance web server and reverse proxy.' },
    { name: 'Jenkins', icon: Cog, category: 'DevOps & Cloud', colorClass: 'text-gray-600 border-gray-600/30 hover:bg-gray-600/10', level: 'Experienced', description: 'Automation server for CI/CD and other development tasks.' },
    { name: 'GitHub Actions', icon: Cog, category: 'DevOps & Cloud', colorClass: 'text-black dark:text-white border-gray-700/30 hover:bg-gray-700/10', level: 'Experienced', description: 'Automating workflows directly within GitHub repositories.' },
    { name: 'Terraform', icon: Layers, category: 'DevOps & Cloud', colorClass: 'text-purple-600 border-purple-600/30 hover:bg-purple-600/10', level: 'Familiar', description: 'Infrastructure as Code tool for managing cloud resources.' },

    // APIs, Architecture & Design Patterns
    { name: 'RESTful APIs', icon: LinkIcon, category: 'Architecture & APIs', colorClass: 'text-indigo-500 border-indigo-500/30 hover:bg-indigo-500/10', level: 'Proficient', description: 'Designing and implementing scalable and maintainable web APIs.' },
    { name: 'Microservices Architecture', icon: Layers, category: 'Architecture & APIs', colorClass: 'text-cyan-600 border-cyan-600/30 hover:bg-cyan-600/10', level: 'Experienced', description: 'Building applications as a suite of small, independent services.' },
    { name: 'Design Patterns (SOLID, etc.)', icon: Layers, category: 'Architecture & APIs', colorClass: 'text-blue-500 border-blue-500/30 hover:bg-blue-500/10', level: 'Experienced', description: 'Applying established solutions to common software design problems.' },
    { name: 'WebSockets', icon: LinkIcon, category: 'Architecture & APIs', colorClass: 'text-pink-500 border-pink-500/30 hover:bg-pink-500/10', level: 'Experienced', description: 'Enabling real-time, bidirectional communication channels.' },
    { name: 'Swagger/OpenAPI', icon: BookOpen, category: 'Architecture & APIs', colorClass: 'text-green-400 border-green-400/30 hover:bg-green-400/10', level: 'Proficient', description: 'Standard for documenting and describing RESTful APIs.' },
    { name: 'JWT Authentication', icon: ShieldCheck, category: 'Architecture & APIs', colorClass: 'text-red-400 border-red-400/30 hover:bg-red-400/10', level: 'Proficient', description: 'Implementing secure token-based authentication mechanisms.'},

    // Data Processing & AI/ML
    { name: 'Web Scraping (Requests, BeautifulSoup)', icon: DatabaseZap, category: 'Data & AI', colorClass: 'text-cyan-500 border-cyan-500/30 hover:bg-cyan-500/10', level: 'Experienced', description: 'Extracting data from websites for analysis and integration.' },
    { name: 'Pillow', icon: ImageIcon, category: 'Data & AI', colorClass: 'text-purple-500 border-purple-500/30 hover:bg-purple-500/10', level: 'Experienced', description: 'Python Imaging Library for image manipulation tasks.' },
    { name: 'OpenCV', icon: ImageIcon, category: 'Data & AI', colorClass: 'text-yellow-600 border-yellow-600/30 hover:bg-yellow-600/10', level: 'Experienced', description: 'Library for real-time computer vision and image processing.' },
    { name: 'Genkit (Google AI)', icon: BrainCircuit, category: 'Data & AI', colorClass: 'text-purple-600 border-purple-600/30 hover:bg-purple-600/10', level: 'Experienced', description: 'Developing AI-powered features using Google\'s generative models.' },
    { name: 'LLM Integration (Gemini)', icon: BrainCircuit, category: 'Data & AI', colorClass: 'text-violet-500 border-violet-500/30 hover:bg-violet-500/10', level: 'Familiar', description: 'Integrating large language models for various application features.' },

    // Testing & Quality Assurance
    { name: 'Pytest', icon: TestTubeDiagonal, category: 'Testing & QA', colorClass: 'text-green-700 border-green-700/30 hover:bg-green-700/10', level: 'Experienced', description: 'Writing effective unit and integration tests for Python code.' },
    { name: 'Unit Testing', icon: TestTubeDiagonal, category: 'Testing & QA', colorClass: 'text-lime-600 border-lime-600/30 hover:bg-lime-600/10', level: 'Proficient', description: 'Verifying individual components of the software work correctly.' },
    { name: 'Integration Testing', icon: TestTubeDiagonal, category: 'Testing & QA', colorClass: 'text-emerald-600 border-emerald-600/30 hover:bg-emerald-600/10', level: 'Experienced', description: 'Testing the interaction between different software modules.' },
    { name: 'Code Quality Tools (SonarQube)', icon: Wrench, category: 'Testing & QA', colorClass: 'text-cyan-600 border-cyan-600/30 hover:bg-cyan-600/10', level: 'Familiar', description: 'Using static analysis tools to improve code quality and find bugs.' },
    { name: 'Security Scanning (Snyk)', icon: ShieldCheck, category: 'Testing & QA', colorClass: 'text-purple-600 border-purple-600/30 hover:bg-purple-600/10', level: 'Familiar', description: 'Identifying security vulnerabilities in code and dependencies.' },

    // Tools & Methodologies
    { name: 'Git & GitHub', icon: GitBranch, category: 'Tools & Methodologies', colorClass: 'text-black dark:text-white border-gray-500/30 hover:bg-gray-500/10', level: 'Proficient', description: 'Version control and collaborative development workflow.' },
    { name: 'Agile/Scrum', icon: Users, category: 'Tools & Methodologies', colorClass: 'text-blue-500 border-blue-500/30 hover:bg-blue-500/10', level: 'Experienced', description: 'Working effectively in iterative and collaborative development environments.' },
    { name: 'Jira/Confluence', icon: Wrench, category: 'Tools & Methodologies', colorClass: 'text-blue-600 border-blue-600/30 hover:bg-blue-600/10', level: 'Experienced', description: 'Project tracking, issue management, and documentation.' },
    { name: 'MkDocs', icon: BookOpen, category: 'Tools & Methodologies', colorClass: 'text-indigo-400 border-indigo-400/30 hover:bg-indigo-400/10', level: 'Experienced', description: 'Generating project documentation from Markdown files.' },
    { name: 'Performance Monitoring (Basic)', icon: Gauge, category: 'Tools & Methodologies', colorClass: 'text-orange-500 border-orange-500/30 hover:bg-orange-500/10', level: 'Familiar', description: 'Understanding and analyzing application performance metrics.' },
];


// Define explicit order for categories
const categoryOrder = [
  'All',
  'Languages & Core',
  'Backend',
  'Frontend',
  'Databases',
  'DevOps & Cloud',
  'Architecture & APIs',
  'Data & AI',
  'Testing & QA',
  'Tools & Methodologies',
];

// Derive categories from the ordered list
const categories = categoryOrder;

const ITEMS_PER_PAGE = 24; // Increased items per page

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const sectionRef = useRef<HTMLElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null); // Ref for header

  // Memoize filtered skills for performance
  const filteredSkills = useMemo(() => {
    return allSkills.filter(skill =>
      (selectedCategory === 'All' || skill.category === selectedCategory) &&
      skill.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [selectedCategory, searchTerm]);

  const loadMore = () => {
    setVisibleCount(prevCount => Math.min(prevCount + ITEMS_PER_PAGE, filteredSkills.length));
  };

  const showLess = () => {
    setVisibleCount(ITEMS_PER_PAGE);
    // Smooth scroll towards the top of the grid, slightly offset
    const gridTop = gridRef.current?.offsetTop;
    if (gridTop) {
      gsap.to(window, { duration: 0.8, scrollTo: { y: gridTop - 100, autoKill: false }, ease: 'power2.inOut' });
    }
  };

   useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate section header
             gsap.from(headerRef.current, {
                opacity: 0,
                y: 70,
                duration: 1.0,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reset", // Play once on enter
                }
            });

            // Animate filters (staggered fade-in)
             gsap.from(filtersRef.current?.children || [], {
                 opacity: 0,
                 y: 50,
                 duration: 0.7,
                 stagger: 0.12,
                 delay: 0.3,
                 ease: 'power2.out',
                 scrollTrigger: {
                    trigger: filtersRef.current,
                    start: "top 88%",
                    toggleActions: "play none none reset", // Play once on enter
                 }
             });

        }, sectionRef);

        return () => ctx.revert();
   }, []);

    // GSAP animation for skill cards appearance, filtering, and reordering
    useEffect(() => {
        if (!gridRef.current) return;

        const cards = Array.from(gridRef.current.querySelectorAll<HTMLDivElement>('.skill-card'));

        // Use FLIP animation technique for smooth transitions during filtering/loading
        const state = Flip.getState(cards); // Get initial state

        // Update visibility and order based on filteredSkills and visibleCount
        cards.forEach(card => {
            const skillName = card.dataset.skillName;
            const skillIndex = filteredSkills.findIndex(s => s.name === skillName);
            const isVisible = skillIndex !== -1 && skillIndex < visibleCount;

            // Apply initial hide/show (GSAP will handle the animation)
            gsap.set(card, { display: isVisible ? 'flex' : 'none' });
             if (isVisible) {
                 gsap.set(card, { order: skillIndex }); // Ensure correct order
             }
        });

        Flip.from(state, {
            duration: 0.6,
            scale: true,
            ease: "power2.out",
            stagger: 0.05,
            absolute: true,
             onEnter: elements => gsap.fromTo(elements, {opacity: 0, scale: 0.9, y: 20}, {opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.04}),
             onLeave: elements => gsap.to(elements, {opacity: 0, scale: 0.9, y: -20, duration: 0.4})
        });

    }, [filteredSkills, visibleCount]); // Depend on filteredSkills and visibleCount


  return (
    <section ref={sectionRef} id="skills" className="bg-gradient-to-b from-secondary/15 via-background to-secondary/15 py-32 md:py-40 relative overflow-hidden">
       <div className="absolute inset-0 opacity-[0.025] pattern-circuit-board pattern-accent pattern-bg-transparent pattern-size-8 z-0"></div>
      <div className="container mx-auto px-4 z-10 relative">
        <h2
          ref={headerRef}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-16 md:mb-20 text-center gradient-text"
        >
          Technical Proficiency & Toolkit
        </h2>

        {/* Filters Container */}
        <div ref={filtersRef} className="mb-14 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
             {/* Search Input */}
             <div className="relative w-full md:w-96">
                 <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none z-10" />
                 <Input
                    type="text"
                    placeholder="Search skills (e.g., Python, AWS)..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setVisibleCount(ITEMS_PER_PAGE);
                    }}
                    className="pl-12 pr-4 py-3 text-base border-border bg-background/80 backdrop-blur-sm focus:border-accent focus:ring-2 focus:ring-accent/50 transition-all duration-300 shadow-sm rounded-full"
                    aria-label="Search skills"
                    data-cursor-interactive
                 />
             </div>
             {/* Category Buttons - Scrollable */}
             <div className="w-full md:w-auto overflow-x-auto pb-2.5 custom-scrollbar-horizontal">
                 <div className="flex flex-nowrap justify-start md:justify-center gap-3 min-w-max px-1">
                    {categories.map(category => (
                    <Button
                        key={category}
                        variant={selectedCategory === category ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => {
                            setSelectedCategory(category);
                            setVisibleCount(ITEMS_PER_PAGE);
                            setSearchTerm('');
                        }}
                        className={cn(
                            "capitalize transition-all duration-300 whitespace-nowrap px-4 py-2 rounded-full text-sm",
                            selectedCategory === category
                                ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-md scale-105 transform ring-2 ring-accent/50'
                                : 'border-border bg-background/70 hover:bg-accent/10 hover:border-accent/70 hover:text-accent backdrop-blur-sm'
                        )}
                         data-cursor-interactive
                    >
                        {category}
                    </Button>
                    ))}
                 </div>
             </div>
        </div>

        {/* Skills Grid */}
        <div
            ref={gridRef}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-7"
        >
          {/* Render all skills initially, visibility controlled by GSAP */}
          {allSkills.map((skill) => (
              <div key={skill.name} className="skill-card flex" data-skill-name={skill.name}>
                  <Card className={cn(
                          "flex flex-col items-center justify-center p-5 text-center transition-all duration-300 ease-out border bg-card/85 backdrop-blur-lg rounded-xl shadow-sm cursor-pointer w-full aspect-square group", // Reduced padding slightly
                          "hover:shadow-xl hover:-translate-y-2 hover:scale-[1.04]",
                          "border-transparent hover:border-accent/60",
                          skill.colorClass // Apply category color hint for background/border on hover
                      )}
                      data-cursor-interactive
                      title={`${skill.name} - ${skill.level}${skill.years ? ` (${skill.years} yrs)` : ''}${skill.description ? `\n${skill.description}` : ''}`} // Enhanced tooltip
                  >
                      <CardContent className="flex flex-col items-center justify-center p-0 flex-grow">
                           <skill.icon className={cn("h-10 w-10 sm:h-11 w-11 mb-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110", skill.colorClass.split(' ')[0])} strokeWidth={1.5} />
                          <span className="text-sm sm:text-[0.95rem] font-medium text-card-foreground leading-tight line-clamp-2">{skill.name}</span> {/* Allow two lines */}
                           {/* Level Indicator */}
                           <span className={cn(
                               "text-xs mt-1.5 px-1.5 py-0.5 rounded opacity-90",
                               skill.level === 'Proficient' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' :
                               skill.level === 'Experienced' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' :
                               'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                           )}>
                               {skill.level}
                           </span>
                      </CardContent>
                  </Card>
              </div>
          ))}
        </div>

        {/* Feedback for No Results */}
        {filteredSkills.length === 0 && (
             <div className="text-center text-muted-foreground mt-20 py-10 border border-dashed border-border/50 rounded-lg bg-muted/20">
                 <p className="text-lg mb-2">No skills found matching your criteria.</p>
                 {searchTerm && <p className="text-sm">Try refining your search term "{searchTerm}" or changing the category.</p>}
                 {!searchTerm && selectedCategory !== 'All' && <p className="text-sm">Try the 'All' category or searching.</p>}
            </div>
        )}

        {/* Load More / Show Less Buttons */}
        <div className="mt-20 text-center space-x-5">
            {filteredSkills.length > visibleCount && (
                <Button onClick={loadMore} variant="outline" className="group border-primary/60 hover:border-accent hover:bg-accent/10 hover:text-accent transition-all duration-300 px-6 py-3 text-base" data-cursor-interactive>
                    Load More <ChevronDown className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5" />
                </Button>
            )}
            {visibleCount > ITEMS_PER_PAGE && filteredSkills.length > 0 && (
                <Button onClick={showLess} variant="ghost" size="sm" className="text-muted-foreground hover:text-accent group transition-colors duration-300 text-base px-4 py-2" data-cursor-interactive>
                    <ChevronUp className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5"/> Show Less
                </Button>
            )}
        </div>
      </div>
       {/* Add pattern style */}
       <style jsx>{`
        .pattern-circuit-board {
            background-image: linear-gradient(hsl(var(--foreground) / 0.03) 1px, transparent 1px), linear-gradient(to right, hsl(var(--foreground) / 0.03) 1px, transparent 1px);
            background-size: 24px 24px;
        }
        .dark .pattern-circuit-board {
            background-image: linear-gradient(hsl(var(--foreground) / 0.05) 1px, transparent 1px), linear-gradient(to right, hsl(var(--foreground) / 0.05) 1px, transparent 1px);
        }
        .custom-scrollbar-horizontal::-webkit-scrollbar {
            height: 6px; /* Adjust height */
        }
        .custom-scrollbar-horizontal::-webkit-scrollbar-track {
            background: hsl(var(--muted) / 0.5); /* Track background */
            border-radius: 10px;
        }
        .custom-scrollbar-horizontal::-webkit-scrollbar-thumb {
            background: hsl(var(--accent) / 0.6); /* Thumb color */
            border-radius: 10px;
            border: 1px solid hsl(var(--muted) / 0.5); /* Creates padding around thumb */
        }
        .custom-scrollbar-horizontal::-webkit-scrollbar-thumb:hover {
            background: hsl(var(--accent) / 0.8); /* Thumb hover color */
        }
        /* Firefox scrollbar */
        .custom-scrollbar-horizontal {
           scrollbar-width: thin;
           scrollbar-color: hsl(var(--accent) / 0.6) hsl(var(--muted) / 0.5);
        }
       `}</style>
    </section>
  );
}
