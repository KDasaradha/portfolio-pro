'use client';

import { Card, CardContent } from "@/components/ui/card";
import {
  Server, Database, CodeXml, GitBranch, Wrench, PanelsTopLeft, Search,
  ChevronDown, ChevronUp, Cog, Cloud, BookOpen, Cpu, Paintbrush,
  DatabaseZap, ImageIcon, TerminalSquare, Palette, BrainCircuit, Layers,
  TestTubeDiagonal, Package, Gauge, Link as LinkIconLucide, ShieldCheck, Users as UsersIcon, Filter, Star, TrendingUpIcon
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
  colorClass: string; // For icon and border accents
  level: 'Proficient' | 'Experienced' | 'Familiar';
  years?: number;
  description?: string;
  gradient?: string; // For card background gradient
}

// V1 Data (can be imported or redefined if V2 needs different structuring)
const allSkillsV2: SkillV2[] = [
    { name: 'Python', icon: TerminalSquare, category: 'Languages & Core', colorClass: 'text-blue-400 border-blue-400/50', level: 'Proficient', years: 4, description: 'Primary language for backend, scripting, and automation.', gradient: 'from-blue-900/30 to-blue-800/10' },
    { name: 'FastAPI', icon: Server, category: 'Backend', colorClass: 'text-teal-400 border-teal-400/50', level: 'Proficient', years: 3, description: 'High-performance asynchronous API development.', gradient: 'from-teal-900/30 to-teal-800/10' },
    { name: 'SQLAlchemy', icon: DatabaseZap, category: 'Backend', colorClass: 'text-red-400 border-red-400/50', level: 'Proficient', years: 3, description: 'Efficient ORM for database interactions.', gradient: 'from-red-900/30 to-red-800/10' },
    { name: 'PostgreSQL', icon: Database, category: 'Databases', colorClass: 'text-sky-400 border-sky-400/50', level: 'Proficient', years: 3, description: 'Robust relational database management.', gradient: 'from-sky-900/30 to-sky-800/10' },
    { name: 'Docker', icon: Package, category: 'DevOps & Cloud', colorClass: 'text-blue-500 border-blue-500/50', level: 'Proficient', years: 2, description: 'Containerization for consistent deployments.', gradient: 'from-blue-800/30 to-blue-700/10' },
    { name: 'AWS', icon: Cloud, category: 'DevOps & Cloud', colorClass: 'text-orange-400 border-orange-400/50', level: 'Experienced', years: 2, description: 'Core AWS services (EC2, S3, RDS, Lambda).', gradient: 'from-orange-900/30 to-orange-800/10' },
    { name: 'React', icon: PanelsTopLeft, category: 'Frontend', colorClass: 'text-cyan-400 border-cyan-400/50', level: 'Experienced', years: 2, description: 'Building dynamic user interfaces.', gradient: 'from-cyan-900/30 to-cyan-800/10' },
    { name: 'Next.js', icon: PanelsTopLeft, category: 'Frontend', colorClass: 'text-neutral-300 border-neutral-400/50', level: 'Experienced', years: 2, description: 'Server-rendered React applications.', gradient: 'from-neutral-800/30 to-neutral-700/10' },
    { name: 'TypeScript', icon: TerminalSquare, category: 'Languages & Core', colorClass: 'text-blue-300 border-blue-300/50', level: 'Experienced', years: 2, description: 'Static typing for robust JavaScript.', gradient: 'from-blue-900/20 to-blue-800/5' },
    { name: 'CI/CD', icon: Wrench, category: 'DevOps & Cloud', colorClass: 'text-purple-400 border-purple-400/50', level: 'Proficient', description: 'Automated build, test, and deployment pipelines.', gradient: 'from-purple-900/30 to-purple-800/10' },
    { name: 'RESTful APIs', icon: LinkIconLucide, category: 'Architecture & APIs', colorClass: 'text-indigo-400 border-indigo-400/50', level: 'Proficient', description: 'Designing scalable web APIs.', gradient: 'from-indigo-900/30 to-indigo-800/10' },
    { name: 'Microservices', icon: Layers, category: 'Architecture & APIs', colorClass: 'text-green-400 border-green-400/50', level: 'Experienced', description: 'Building modular, independent services.', gradient: 'from-green-900/30 to-green-800/10' },
    { name: 'Git & GitHub', icon: GitBranch, category: 'Tools & Methodologies', colorClass: 'text-neutral-400 border-neutral-500/50', level: 'Proficient', description: 'Version control and collaborative workflows.', gradient: 'from-gray-800/30 to-gray-700/10' },
    { name: 'Pydantic', icon: ShieldCheck, category: 'Backend', colorClass: 'text-rose-400 border-rose-400/50', level: 'Proficient', description: 'Data validation and settings management.', gradient: 'from-rose-900/30 to-rose-800/10' },
    { name: 'Alembic', icon: DatabaseZap, category: 'Databases', colorClass: 'text-lime-400 border-lime-400/50', level: 'Experienced', description: 'Database schema migrations.', gradient: 'from-lime-900/30 to-lime-800/10' },
    { name: 'Nginx', icon: Server, category: 'DevOps & Cloud', colorClass: 'text-emerald-400 border-emerald-400/50', level: 'Experienced', description: 'Web server and reverse proxy.', gradient: 'from-emerald-900/30 to-emerald-800/10' },
    { name: 'Pytest', icon: TestTubeDiagonal, category: 'Testing & QA', colorClass: 'text-yellow-400 border-yellow-400/50', level: 'Experienced', description: 'Python testing framework.', gradient: 'from-yellow-900/30 to-yellow-800/10' },
    { name: 'OpenAPI/Swagger', icon: BookOpen, category: 'Architecture & APIs', colorClass: 'text-green-300 border-green-300/50', level: 'Proficient', description: 'API documentation standard.', gradient: 'from-green-800/20 to-green-700/5' },
    { name: 'Fabric.js', icon: Paintbrush, category: 'Frontend', colorClass: 'text-pink-400 border-pink-400/50', level: 'Experienced', description: 'Interactive canvas library.', gradient: 'from-pink-900/30 to-pink-800/10' },
    { name: 'Pillow', icon: ImageIcon, category: 'Data & AI', colorClass: 'text-fuchsia-400 border-fuchsia-400/50', level: 'Experienced', description: 'Image processing library.', gradient: 'from-fuchsia-900/30 to-fuchsia-800/10' },
    { name: 'OpenCV', icon: ImageIcon, category: 'Data & AI', colorClass: 'text-amber-400 border-amber-400/50', level: 'Experienced', description: 'Computer vision library.', gradient: 'from-amber-900/30 to-amber-800/10' },
    { name: 'Genkit AI', icon: BrainCircuit, category: 'Data & AI', colorClass: 'text-violet-400 border-violet-400/50', level: 'Experienced', description: 'Google AI generative models.', gradient: 'from-violet-900/30 to-violet-800/10' },
];


const categoryOrderV2 = [
  'All', 'Languages & Core', 'Backend', 'Frontend', 'Databases', 
  'DevOps & Cloud', 'Architecture & APIs', 'Data & AI', 'Testing & QA', 'Tools & Methodologies',
];
const categoriesV2 = categoryOrderV2;
const ITEMS_PER_PAGE_V2 = 18;

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
    ).sort((a,b) => { // Prioritize Proficient, then Experienced
        const levelOrder = { 'Proficient': 1, 'Experienced': 2, 'Familiar': 3 };
        return levelOrder[a.level] - levelOrder[b.level];
    });
  }, [selectedCategory, searchTerm]);

  const loadMore = () => setVisibleCount(prev => Math.min(prev + ITEMS_PER_PAGE_V2, filteredSkills.length));
  const showLess = () => {
    setVisibleCount(ITEMS_PER_PAGE_V2);
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        opacity: 0, y: 80, scale: 0.9, duration: 1, ease: 'expo.out',
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reset" }
      });
      gsap.from(filtersRef.current?.children || [], {
        opacity: 0, y: 40, stagger: 0.1, duration: 0.7, ease: 'power2.out', delay: 0.3,
        scrollTrigger: { trigger: filtersRef.current, start: "top 85%", toggleActions: "play none none reset" }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!gridRef.current) return;
    const cards = Array.from(gridRef.current.querySelectorAll<HTMLDivElement>('.skill-card-v2'));
    const state = Flip.getState(cards, {props: "opacity,transform"});

    cards.forEach(card => {
      const skillName = card.dataset.skillName;
      const skillIndex = filteredSkills.findIndex(s => s.name === skillName);
      const isVisible = skillIndex !== -1 && skillIndex < visibleCount;
      
      if (isVisible) {
        card.style.display = 'flex'; // Ensure it's 'flex' for proper layout
        gsap.set(card, { order: skillIndex });
      } else {
        card.style.display = 'none';
      }
    });

    Flip.from(state, {
      duration: 0.7, scale: true, ease: "expo.out", stagger: 0.04, absolute: true,
      onEnter: elements => gsap.fromTo(elements, { opacity: 0, scale: 0.8, y: 30, rotateX:-30 }, { opacity: 1, scale: 1, y: 0, rotateX:0, duration: 0.6, stagger: 0.03, ease:'power2.out' }),
      onLeave: elements => gsap.to(elements, { opacity: 0, scale: 0.8, y: -30, rotateX:30, duration: 0.5, ease:'power2.in' })
    });
  }, [filteredSkills, visibleCount]);

  return (
    <section ref={sectionRef} id="skills-v2" className="py-32 md:py-48 bg-gradient-to-br from-neutral-900 via-indigo-950 to-purple-950 text-neutral-200 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.04] pattern-dots pattern-size-8 z-0"></div>
      <div className="container mx-auto px-4 z-10 relative">
        <h2 ref={headerRef} className="text-5xl md:text-7xl font-black mb-16 md:mb-24 text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-400 to-sky-400 tracking-tighter drop-shadow-lg">
          My Technical Arsenal
        </h2>

        <div ref={filtersRef} className="mb-14 flex flex-col md:flex-row justify-between items-center gap-5 md:gap-8 p-4 bg-neutral-800/30 backdrop-blur-lg rounded-xl border border-neutral-700 shadow-xl">
          <div className="relative w-full md:flex-grow">
            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400 pointer-events-none" />
            <Input
              type="text" placeholder="Explore skills (e.g., FastAPI, Cloud, AI)..."
              value={searchTerm} onChange={e => { setSearchTerm(e.target.value); setVisibleCount(ITEMS_PER_PAGE_V2); }}
              className="pl-11 pr-4 py-3 text-base border-neutral-600 bg-neutral-900/70 text-neutral-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 rounded-lg transition-all shadow-md placeholder:text-neutral-500"
              aria-label="Search skills" data-cursor-interactive
            />
          </div>
          <div className="w-full md:w-auto overflow-x-auto pb-1 custom-scrollbar-horizontal">
            <div className="flex flex-nowrap gap-2.5 min-w-max">
              {categoriesV2.map(category => (
                <Button
                  key={category} variant={selectedCategory === category ? "default" : "outline"}
                  size="sm" onClick={() => { setSelectedCategory(category); setVisibleCount(ITEMS_PER_PAGE_V2); setSearchTerm(''); }}
                  className={cn(
                    "capitalize transition-all duration-300 whitespace-nowrap px-4 py-2 rounded-md text-xs sm:text-sm font-medium",
                    selectedCategory === category ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg scale-105 transform ring-2 ring-cyan-400/60'
                                             : 'border-neutral-600 bg-neutral-800/60 text-neutral-300 hover:bg-neutral-700/70 hover:border-neutral-500 hover:text-neutral-100 backdrop-blur-sm'
                  )} data-cursor-interactive
                >
                  {category === 'All' ? <Star className="mr-1.5 h-3.5 w-3.5"/> : <Filter className="mr-1.5 h-3.5 w-3.5"/>} {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        <TooltipProvider delayDuration={200}>
            <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-8">
              {allSkillsV2.map((skill) => (
                <div key={skill.name} className="skill-card-v2 opacity-0" data-skill-name={skill.name} style={{display: 'none'}}> {/* Initial hide for GSAP */}
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Card className={cn(
                                "flex flex-col items-center justify-between p-5 text-center transition-all duration-350 ease-out border-2 bg-neutral-800/40 backdrop-blur-lg rounded-xl shadow-lg cursor-pointer w-full aspect-[4/5] group relative overflow-hidden",
                                `hover:shadow-[0_0_25px_-5px_var(--skill-color)]`,
                                skill.colorClass.replace('text-','border-').replace('/50','/70'), // Use border color from colorClass
                                `hover:border-${skill.colorClass.split('-')[1]}-400/80`
                                )}
                                style={{'--skill-color': `hsl(var(--${skill.colorClass.split('-')[1]}-400))`} as React.CSSProperties}
                                data-cursor-interactive
                            >
                                <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br -z-10", skill.gradient)}></div>
                                <CardContent className="flex flex-col items-center justify-center p-0 flex-grow space-y-3">
                                    <div className={cn("p-3 rounded-full bg-neutral-700/30 group-hover:bg-opacity-50 transition-all duration-300", `group-hover:shadow-[0_0_15px_-3px_var(--skill-color)]`)}>
                                        <skill.icon className={cn("h-10 w-10 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6", skill.colorClass)} strokeWidth={1.5} />
                                    </div>
                                    <span className="text-md font-semibold text-neutral-100 leading-tight">{skill.name}</span>
                                    <div className="flex items-center text-xs text-neutral-400 group-hover:text-neutral-200 transition-colors">
                                        {skill.level === 'Proficient' && <Star className="h-3.5 w-3.5 mr-1 text-yellow-400 group-hover:text-yellow-300" />}
                                        {skill.level === 'Experienced' && <TrendingUpIcon className="h-3.5 w-3.5 mr-1 text-green-400 group-hover:text-green-300" />}
                                        {skill.level === 'Familiar' && <Cog className="h-3.5 w-3.5 mr-1 text-sky-400 group-hover:text-sky-300" />}
                                        <span>{skill.level}</span>
                                        {skill.years && <span className="ml-1.5">({skill.years} yrs)</span>}
                                    </div>
                                </CardContent>
                                <p className="text-[0.65rem] text-neutral-500 group-hover:text-neutral-400 transition-colors mt-2 line-clamp-2 px-1 h-8 leading-tight">
                                    {skill.description || skill.category}
                                </p>
                            </Card>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="bg-neutral-800 text-neutral-200 border-neutral-700 shadow-xl max-w-xs p-3 rounded-lg text-xs leading-relaxed">
                           <p className="font-semibold mb-1">{skill.name} <span className="text-neutral-400">({skill.level})</span></p>
                           {skill.description && <p className="mb-1">{skill.description}</p>}
                           <p className="text-neutral-500">Category: {skill.category}</p>
                           {skill.years && <p className="text-neutral-500">Experience: {skill.years} years</p>}
                        </TooltipContent>
                    </Tooltip>
                </div>
              ))}
            </div>
        </TooltipProvider>

        {filteredSkills.length === 0 && (
             <div className="text-center text-neutral-400 mt-20 py-12 border-2 border-dashed border-neutral-700 rounded-xl bg-neutral-800/20 shadow-inner">
                 <p className="text-xl mb-3 font-semibold">No Skills Found</p>
                 <p className="text-sm">Adjust your search or filter to discover more.</p>
            </div>
        )}

        <div className="mt-20 text-center space-x-4">
            {filteredSkills.length > visibleCount && (
                <Button onClick={loadMore} variant="outline" className="group border-neutral-600 text-neutral-300 hover:border-cyan-500 hover:bg-cyan-500/10 hover:text-cyan-300 transition-all duration-300 px-7 py-3 text-base rounded-lg shadow-md" data-cursor-interactive>
                    Show More <ChevronDown className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-0.5" />
                </Button>
            )}
            {visibleCount > ITEMS_PER_PAGE_V2 && filteredSkills.length > 0 && (
                <Button onClick={showLess} variant="ghost" size="sm" className="text-neutral-400 hover:text-cyan-400 group transition-colors duration-300 text-base px-5 py-2.5 rounded-lg" data-cursor-interactive>
                    <ChevronUp className="mr-2 h-5 w-5 transition-transform group-hover:-translate-y-0.5"/> Show Less
                </Button>
            )}
        </div>
      </div>
      <style jsx>{`
        .pattern-dots {
            background-image: radial-gradient(hsl(var(--foreground)/0.1) 0.8px, transparent 0.8px);
        }
        .custom-scrollbar-horizontal::-webkit-scrollbar { height: 6px; }
        .custom-scrollbar-horizontal::-webkit-scrollbar-track { background: hsl(var(--muted) / 0.15); border-radius: 10px; }
        .custom-scrollbar-horizontal::-webkit-scrollbar-thumb { background-color: hsl(var(--accent) / 0.3); border-radius: 10px; border: 1px solid hsl(var(--muted) / 0.15); }
        .custom-scrollbar-horizontal::-webkit-scrollbar-thumb:hover { background-color: hsl(var(--accent) / 0.5); }
        .custom-scrollbar-horizontal { scrollbar-width: thin; scrollbar-color: hsl(var(--accent) / 0.3) hsl(var(--muted) / 0.15); }
      `}</style>
    </section>
  );
}
