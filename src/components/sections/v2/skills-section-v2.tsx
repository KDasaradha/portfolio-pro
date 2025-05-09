'use client';

import { Card, CardContent } from "@/components/ui/card";
import {
  Server, Database, CodeXml, GitBranch, Wrench, PanelsTopLeft, Search,
  ChevronDown, ChevronUp, Cog, Cloud, BookOpen, Cpu, Paintbrush,
  DatabaseZap, ImageIcon, TerminalSquare, Palette, BrainCircuit, Layers,
  TestTubeDiagonal, Package, Gauge, Link as LinkIconLucide, ShieldCheck, Users as UsersIcon, Filter, Star, TrendingUpIcon, Lightbulb
} from 'lucide-react';
import { useEffect, useRef, useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from "gsap/Flip";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

gsap.registerPlugin(ScrollTrigger, Flip);

interface SkillV2 {
  name: string;
  icon: React.ElementType;
  category: string;
  colorClass: string; 
  level: 'Proficient' | 'Experienced' | 'Familiar';
  years?: number;
  description?: string;
  gradient?: string; 
}

const allSkillsV2: SkillV2[] = [
    { name: 'Python', icon: TerminalSquare, category: 'Languages & Core', colorClass: 'text-blue-400 border-blue-400/60', level: 'Proficient', years: 4, description: 'Core language for backend, scripting, automation, and AI/ML integration.', gradient: 'from-blue-900/50 via-blue-950/30 to-neutral-900/20' },
    { name: 'FastAPI', icon: Server, category: 'Backend', colorClass: 'text-teal-400 border-teal-400/60', level: 'Proficient', years: 3, description: 'Building high-performance, asynchronous RESTful APIs with modern Python features.', gradient: 'from-teal-900/50 via-teal-950/30 to-neutral-900/20' },
    { name: 'SQLAlchemy', icon: DatabaseZap, category: 'Backend', colorClass: 'text-red-400 border-red-400/60', level: 'Proficient', years: 3, description: 'Advanced ORM for Python, enabling efficient database interaction and complex query construction.', gradient: 'from-red-900/50 via-red-950/30 to-neutral-900/20' },
    { name: 'PostgreSQL', icon: Database, category: 'Databases', colorClass: 'text-sky-400 border-sky-400/60', level: 'Proficient', years: 3, description: 'Robust open-source relational database with a strong focus on extensibility and SQL compliance.', gradient: 'from-sky-900/50 via-sky-950/30 to-neutral-900/20' },
    { name: 'Docker', icon: Package, category: 'DevOps & Cloud', colorClass: 'text-blue-500 border-blue-500/60', level: 'Proficient', years: 2, description: 'Containerization platform for building, shipping, and running distributed applications.', gradient: 'from-blue-800/50 via-blue-900/30 to-neutral-900/20' },
    { name: 'AWS', icon: Cloud, category: 'DevOps & Cloud', colorClass: 'text-orange-400 border-orange-400/60', level: 'Experienced', years: 2, description: 'Utilizing core AWS services (EC2, S3, RDS, Lambda, VPC) for scalable cloud infrastructure.', gradient: 'from-orange-900/50 via-orange-950/30 to-neutral-900/20' },
    { name: 'React', icon: PanelsTopLeft, category: 'Frontend', colorClass: 'text-cyan-400 border-cyan-400/60', level: 'Experienced', years: 2, description: 'JavaScript library for building dynamic, component-based user interfaces.', gradient: 'from-cyan-900/50 via-cyan-950/30 to-neutral-900/20' },
    { name: 'Next.js', icon: PanelsTopLeft, category: 'Frontend', colorClass: 'text-neutral-300 border-neutral-400/60', level: 'Experienced', years: 2, description: 'React framework for production: enabling server-side rendering, static site generation, and more.', gradient: 'from-neutral-800/50 via-neutral-900/30 to-neutral-900/20' },
    { name: 'TypeScript', icon: TerminalSquare, category: 'Languages & Core', colorClass: 'text-blue-300 border-blue-300/60', level: 'Experienced', years: 2, description: 'Superset of JavaScript adding static types for more robust and maintainable codebases.', gradient: 'from-blue-900/40 via-blue-950/20 to-neutral-900/10' },
    { name: 'CI/CD', icon: Wrench, category: 'DevOps & Cloud', colorClass: 'text-purple-400 border-purple-400/60', level: 'Proficient', description: 'Automating software delivery pipelines (GitHub Actions, Jenkins) for rapid and reliable releases.', gradient: 'from-purple-900/50 via-purple-950/30 to-neutral-900/20' },
    { name: 'RESTful APIs', icon: LinkIconLucide, category: 'Architecture & APIs', colorClass: 'text-indigo-400 border-indigo-400/60', level: 'Proficient', description: 'Designing and implementing scalable, maintainable, and secure web APIs following REST principles.', gradient: 'from-indigo-900/50 via-indigo-950/30 to-neutral-900/20' },
    { name: 'Microservices', icon: Layers, category: 'Architecture & APIs', colorClass: 'text-green-400 border-green-400/60', level: 'Experienced', description: 'Architecting applications as a suite of small, independently deployable services.', gradient: 'from-green-900/50 via-green-950/30 to-neutral-900/20' },
    { name: 'Git & GitHub', icon: GitBranch, category: 'Tools & Methodologies', colorClass: 'text-neutral-400 border-neutral-500/60', level: 'Proficient', description: 'Distributed version control system and collaborative development platform proficiency.', gradient: 'from-gray-800/50 via-gray-900/30 to-neutral-900/20' },
    { name: 'Pydantic', icon: ShieldCheck, category: 'Backend', colorClass: 'text-rose-400 border-rose-400/60', level: 'Proficient', description: 'Data validation and settings management using Python type annotations.', gradient: 'from-rose-900/50 via-rose-950/30 to-neutral-900/20' },
    { name: 'Alembic', icon: DatabaseZap, category: 'Databases', colorClass: 'text-lime-400 border-lime-400/60', level: 'Experienced', description: 'Lightweight database migration tool for use with SQLAlchemy.', gradient: 'from-lime-900/50 via-lime-950/30 to-neutral-900/20' },
    { name: 'Nginx', icon: Server, category: 'DevOps & Cloud', colorClass: 'text-emerald-400 border-emerald-400/60', level: 'Experienced', description: 'High-performance web server, reverse proxy, and load balancer.', gradient: 'from-emerald-900/50 via-emerald-950/30 to-neutral-900/20' },
    { name: 'Pytest', icon: TestTubeDiagonal, category: 'Testing & QA', colorClass: 'text-yellow-400 border-yellow-400/60', level: 'Experienced', description: 'Mature Python testing framework for writing simple and scalable test cases.', gradient: 'from-yellow-900/50 via-yellow-950/30 to-neutral-900/20' },
    { name: 'OpenAPI/Swagger', icon: BookOpen, category: 'Architecture & APIs', colorClass: 'text-green-300 border-green-300/60', level: 'Proficient', description: 'Industry-standard specification for designing, building, and documenting RESTful APIs.', gradient: 'from-green-800/40 via-green-900/20 to-neutral-900/10' },
    { name: 'Fabric.js', icon: Paintbrush, category: 'Frontend', colorClass: 'text-pink-400 border-pink-400/60', level: 'Experienced', description: 'Powerful JavaScript library for working with HTML5 canvas, providing an interactive object model.', gradient: 'from-pink-900/50 via-pink-950/30 to-neutral-900/20' },
    { name: 'Pillow', icon: ImageIcon, category: 'Data & AI', colorClass: 'text-fuchsia-400 border-fuchsia-400/60', level: 'Experienced', description: 'Fork of PIL, the Python Imaging Library, for opening, manipulating, and saving image file formats.', gradient: 'from-fuchsia-900/50 via-fuchsia-950/30 to-neutral-900/20' },
    { name: 'OpenCV', icon: ImageIcon, category: 'Data & AI', colorClass: 'text-amber-400 border-amber-400/60', level: 'Experienced', description: 'Open-source computer vision and machine learning software library.', gradient: 'from-amber-900/50 via-amber-950/30 to-neutral-900/20' },
    { name: 'Genkit AI', icon: BrainCircuit, category: 'Data & AI', colorClass: 'text-violet-400 border-violet-400/60', level: 'Experienced', description: 'Leveraging Google AI\'s Genkit for building features with generative models like Gemini.', gradient: 'from-violet-900/50 via-violet-950/30 to-neutral-900/20' },
    { name: 'System Design', icon: Layers, category: 'Architecture & APIs', colorClass: 'text-sky-300 border-sky-300/60', level: 'Experienced', description: 'Designing scalable, resilient, and maintainable software systems and architectures.', gradient: 'from-sky-800/40 via-sky-900/20 to-neutral-900/10' },
    { name: 'Agile/Scrum', icon: UsersIcon, category: 'Tools & Methodologies', colorClass: 'text-indigo-300 border-indigo-300/60', level: 'Experienced', description: 'Practicing iterative and incremental development methodologies for adaptive planning.', gradient: 'from-indigo-800/40 via-indigo-900/20 to-neutral-900/10' },
];

const categoryOrderV2 = [
  'All', 'Languages & Core', 'Backend', 'Frontend', 'Databases', 
  'DevOps & Cloud', 'Architecture & APIs', 'Data & AI', 'Testing & QA', 'Tools & Methodologies',
];
const categoriesV2 = categoryOrderV2;
const ITEMS_PER_PAGE_V2 = 20;

export default function SkillsSectionV2() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE_V2);
  const sectionRef = useRef<HTMLElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);

  const filteredSkills = useMemo(() => {
    return allSkillsV2.filter(skill =>
      (selectedCategory === 'All' || skill.category === selectedCategory) &&
      (skill.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       (skill.description && skill.description.toLowerCase().includes(searchTerm.toLowerCase())))
    ).sort((a,b) => {
        const levelOrder = { 'Proficient': 1, 'Experienced': 2, 'Familiar': 3 };
        if (levelOrder[a.level] !== levelOrder[b.level]) {
            return levelOrder[a.level] - levelOrder[b.level];
        }
        return (b.years ?? 0) - (a.years ?? 0);
    });
  }, [selectedCategory, searchTerm]);

  const loadMore = () => setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE_V2, filteredSkills.length));
  
  const showLess = () => {
    setVisibleCount(ITEMS_PER_PAGE_V2);
    const targetElement = headerRef.current || sectionRef.current;
    if (targetElement) {
        gsap.to(window, { duration: 1, scrollTo: { y: targetElement, offsetY: -80 }, ease: "power3.inOut"});
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        opacity: 0, y: 100, skewY: 3, duration: 1.2, ease: 'expo.out',
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reset" }
      });
      gsap.from(filtersRef.current?.children || [], {
        opacity: 0, y: 50, scale: 0.95, stagger: 0.08, duration: 0.8, ease: 'power2.out', delay: 0.4,
        scrollTrigger: { trigger: filtersRef.current, start: "top 85%", toggleActions: "play none none reset" }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = Array.from(gridRef.current.querySelectorAll<HTMLDivElement>('.skill-card-v2'));
    
    const state = Flip.getState(cards, {props: "opacity,transform,filter,display,order"});

    cards.forEach(card => {
      const skillName = card.dataset.skillName;
      const skillIndex = filteredSkills.findIndex(s => s.name === skillName);
      const isVisible = skillIndex !== -1 && skillIndex < visibleCount;
      
      gsap.set(card, { 
        display: isVisible ? 'flex' : 'none', 
        order: isVisible ? skillIndex : card.style.order 
      });
    });

    Flip.from(state, {
      duration: 0.7, 
      scale: true, 
      ease: "expo.out", 
      stagger: 0.04, 
      absolute: false, 
      onEnter: elements => gsap.fromTo(elements, 
        { opacity: 0, scale: 0.9, y: 30, filter: 'blur(3px)' }, 
        { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 0.6, stagger: 0.03, ease:'power2.out' }
      ),
      onLeave: elements => gsap.to(elements, 
        { opacity: 0, scale: 0.9, y: -20, filter: 'blur(3px)', duration: 0.45, ease:'power1.in' }
      )
    });
  }, [filteredSkills, visibleCount]);

  const getLevelIndicator = (level: SkillV2['level']) => {
    switch (level) {
        case 'Proficient': return { icon: Star, color: 'text-yellow-400', bgColor: 'bg-yellow-900/60 dark:bg-yellow-700/40' };
        case 'Experienced': return { icon: TrendingUpIcon, color: 'text-green-400', bgColor: 'bg-green-900/60 dark:bg-green-700/40' };
        case 'Familiar': return { icon: Lightbulb, color: 'text-sky-400', bgColor: 'bg-sky-900/60 dark:bg-sky-700/40' };
        default: return { icon: Cog, color: 'text-neutral-400', bgColor: 'bg-neutral-700/40' };
    }
  };

  return (
    <section ref={sectionRef} id="skills-v2" className="py-32 md:py-48 bg-gradient-to-br from-neutral-900 via-indigo-950 to-purple-950 text-neutral-200 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06] pattern-grid pattern-size-12 z-0" style={{
          backgroundImage: `
            linear-gradient(hsla(var(--indigo-500-hsl)/0.07) 1px, transparent 1px),
            linear-gradient(to right, hsla(var(--indigo-500-hsl)/0.07) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
      }}></div>
      <div className="container mx-auto px-4 z-10 relative">
        <h2 ref={headerRef} className="text-5xl md:text-7xl font-black mb-16 md:mb-24 text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-400 tracking-tighter drop-shadow-xl">
          My Technical Arsenal
        </h2>

        <div ref={filtersRef} className="mb-16 flex flex-col md:flex-row justify-between items-center gap-6 p-4 md:p-6 bg-neutral-800/60 backdrop-blur-xl rounded-xl border border-neutral-700/80 shadow-2xl">
          <div className="relative w-full md:flex-grow max-w-md">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-500 pointer-events-none" />
            <Input
              type="text" placeholder="Explore skills (e.g., FastAPI, Cloud, AI)..."
              value={searchTerm} onChange={e => { setSearchTerm(e.target.value); setVisibleCount(ITEMS_PER_PAGE_V2); }}
              className="pl-12 pr-4 py-3.5 text-base border-neutral-600 bg-neutral-900/80 text-neutral-100 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/60 rounded-lg transition-all shadow-lg placeholder:text-neutral-500 h-12"
              aria-label="Search skills" data-cursor-interactive
            />
          </div>
          <div className="w-full md:w-auto overflow-x-auto pb-2 custom-scrollbar-horizontal">
            <div className="flex flex-nowrap gap-3 min-w-max">
              {(categoriesV2 || []).map(category => (
                <Button
                  key={category} variant={selectedCategory === category ? "default" : "outline"}
                  size="sm" onClick={() => { setSelectedCategory(category); setVisibleCount(ITEMS_PER_PAGE_V2); setSearchTerm(''); }}
                  className={cn(
                    "capitalize transition-all duration-300 ease-out whitespace-nowrap px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold",
                    selectedCategory === category 
                        ? 'bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white shadow-xl scale-105 transform ring-2 ring-cyan-400/70'
                        : 'border-neutral-600 bg-neutral-800/70 text-neutral-300 hover:bg-neutral-700/80 hover:border-neutral-500 hover:text-white backdrop-blur-md'
                  )} data-cursor-interactive
                >
                  {category === 'All' ? <Star className="mr-2 h-4 w-4"/> : <Filter className="mr-2 h-4 w-4"/>} {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        <TooltipProvider delayDuration={100}>
            <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-8 md:gap-x-8 md:gap-y-10">
              {(allSkillsV2 || []).map((skill) => {
                const levelInfo = getLevelIndicator(skill.level);
                return (
                <div key={skill.name} className="skill-card-v2" data-skill-name={skill.name} style={{ display: 'none' }}> 
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Card className={cn(
                                "flex flex-col items-center justify-between p-6 text-center transition-all duration-350 ease-in-out border-2 bg-neutral-800/70 backdrop-blur-xl rounded-xl shadow-xl cursor-pointer w-full aspect-[5/6] group relative overflow-hidden",
                                `hover:shadow-[0_0_35px_-8px_var(--skill-color-hsl)]`,
                                skill.colorClass.replace('text-','border-').replace('/60','/80'),
                                `hover:border-${skill.colorClass.split('-')[1]}-400`
                                )}
                                style={{'--skill-color-hsl': `hsla(var(--${skill.colorClass.split('-')[1]}-400-hsl), 0.7)`} as React.CSSProperties}
                                data-cursor-interactive
                            >
                                <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-br -z-10", skill.gradient, "mix-blend-overlay group-hover:mix-blend-soft-light")}></div>
                                <div className={cn("absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-10 group-hover:opacity-20 transition-all duration-500 ease-out group-hover:scale-150", skill.gradient?.split(' ')[0].replace('from-','bg-'))}></div>

                                <CardContent className="flex flex-col items-center justify-center p-0 flex-grow space-y-4 w-full">
                                    <div className={cn(
                                        "p-4 rounded-full transition-all duration-300 ease-out",
                                        "bg-neutral-700/50 group-hover:bg-neutral-700/30",
                                        `group-hover:shadow-[0_0_20px_-5px_var(--skill-color-hsl)]`
                                      )}>
                                        <skill.icon className={cn("h-12 w-12 transition-all duration-300 ease-out group-hover:scale-110 group-hover:-rotate-[10deg]", skill.colorClass)} strokeWidth={1.5} />
                                    </div>
                                    <span className="text-lg font-bold text-neutral-50 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-neutral-200 group-hover:to-neutral-400 transition-all duration-300">{skill.name}</span>
                                    <div className={cn("flex items-center text-xs px-3 py-1 rounded-full font-medium transition-all duration-300 ease-out", levelInfo.bgColor, levelInfo.color, "group-hover:scale-105 group-hover:shadow-md")}>
                                        <levelInfo.icon className="h-4 w-4 mr-1.5" />
                                        <span>{skill.level}</span>
                                        {skill.years && <span className="ml-1 opacity-80">({skill.years}y)</span>}
                                    </div>
                                </CardContent>
                            </Card>
                        </TooltipTrigger>
                        <TooltipContent 
                            side="bottom" 
                            align="center"
                            className={cn("bg-neutral-800/95 text-neutral-100 border-neutral-700 shadow-2xl max-w-xs sm:max-w-sm p-4 rounded-lg text-sm leading-relaxed backdrop-blur-md", skill.colorClass.replace('text-','border-t-2 border-t-'))}
                        >
                           <div className="flex items-center mb-2">
                               <skill.icon className={cn("h-5 w-5 mr-2", skill.colorClass)} />
                               <p className="font-bold text-md">{skill.name} <span className={cn("text-xs font-normal", levelInfo.color)}>({skill.level}{skill.years ? `, ${skill.years} yrs` : ''})</span></p>
                           </div>
                           {skill.description && <p className="mb-1 text-neutral-300">{skill.description}</p>}
                           <p className="text-xs text-neutral-500 italic">Category: {skill.category}</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
                );
              })}
            </div>
        </TooltipProvider>

        {(filteredSkills.length === 0 && searchTerm) && (
             <div className="text-center text-neutral-500 mt-24 py-16 border-2 border-dashed border-neutral-700/70 rounded-xl bg-neutral-800/40 shadow-inner backdrop-blur-sm">
                 <Search className="h-16 w-16 mx-auto mb-6 text-neutral-600" strokeWidth={1} />
                 <p className="text-2xl mb-3 font-semibold text-neutral-300">No Skills Found Matching "{searchTerm}"</p>
                 <p className="text-md">Try a different keyword or adjust your category filter.</p>
            </div>
        )}
         {(filteredSkills.length === 0 && !searchTerm && selectedCategory !== 'All') && (
             <div className="text-center text-neutral-500 mt-24 py-16 border-2 border-dashed border-neutral-700/70 rounded-xl bg-neutral-800/40 shadow-inner backdrop-blur-sm">
                 <Filter className="h-16 w-16 mx-auto mb-6 text-neutral-600" strokeWidth={1} />
                 <p className="text-2xl mb-3 font-semibold text-neutral-300">No Skills in "{selectedCategory}"</p>
                 <p className="text-md">Try the 'All' category or use the search.</p>
            </div>
        )}

        <div className="mt-24 text-center space-x-5">
            {filteredSkills.length > visibleCount && (
                <Button onClick={loadMore} variant="outline" className="group border-neutral-600 text-neutral-200 hover:border-cyan-500 hover:bg-cyan-600/15 hover:text-cyan-300 transition-all duration-300 ease-out px-8 py-3.5 text-base rounded-lg shadow-lg hover:shadow-cyan-500/30 hover:scale-105 active:scale-100 transform" data-cursor-interactive>
                    Show More <ChevronDown className="ml-2.5 h-5 w-5 transition-transform duration-300 group-hover:translate-y-1" />
                </Button>
            )}
            {visibleCount > ITEMS_PER_PAGE_V2 && filteredSkills.length > 0 && (
                <Button onClick={showLess} variant="ghost" size="sm" className="text-neutral-400 hover:text-cyan-400 group transition-colors duration-300 ease-out text-base px-6 py-3 rounded-lg hover:bg-neutral-700/50" data-cursor-interactive>
                    <ChevronUp className="mr-2.5 h-5 w-5 transition-transform duration-300 group-hover:-translate-y-1"/> Show Less
                </Button>
            )}
        </div>
      </div>
       <style jsx>{`
        .pattern-grid {
            background-image: 
                linear-gradient(hsla(var(--indigo-500-hsl)/0.07) 1px, transparent 1px), 
                linear-gradient(to right, hsla(var(--indigo-500-hsl)/0.07) 1px, transparent 1px);
        }
        .custom-scrollbar-horizontal::-webkit-scrollbar { height: 8px; }
        .custom-scrollbar-horizontal::-webkit-scrollbar-track { background: hsl(var(--neutral-800)/0.5); border-radius: 10px; }
        .custom-scrollbar-horizontal::-webkit-scrollbar-thumb { background-color: hsl(var(--neutral-600)/0.7); border-radius: 10px; border: 2px solid hsl(var(--neutral-800)/0.5); }
        .custom-scrollbar-horizontal::-webkit-scrollbar-thumb:hover { background-color: hsl(var(--cyan-500)/0.6); }
        .custom-scrollbar-horizontal { scrollbar-width: thin; scrollbar-color: hsl(var(--neutral-600)/0.7) hsl(var(--neutral-800)/0.5); }
      `}</style>
    </section>
  );
}
