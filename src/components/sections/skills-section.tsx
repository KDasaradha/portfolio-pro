'use client';

import { Card } from "@/components/ui/card";
import {
  Server, Database, CodeXml, GitBranch, Wrench, PanelsTopLeft, Search,
  ChevronDown, ChevronUp, Cog, Cloud, BookOpen, ShieldCheck, Cpu, Paintbrush,
  DatabaseZap, ImageIcon, Link as LinkIcon, TerminalSquare, Palette, // Added Palette
  BrainCircuit, // Added BrainCircuit
  Layers, // Added Layers for Architecture
  TestTubeDiagonal, // Added TestTubeDiagonal for Testing
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  icon: React.ElementType;
  category: string;
  colorClass: string; // Tailwind color class for icon/hover
  level?: 'Proficient' | 'Experienced' | 'Familiar'; // Optional skill level indicator
}

// Refined Skills List with Levels and Better Categories
const allSkills: Skill[] = [
  // Core Languages
  { name: 'Python', icon: TerminalSquare, category: 'Languages', colorClass: 'text-blue-500 border-blue-500/30 hover:bg-blue-500/10', level: 'Proficient' },
  { name: 'JavaScript', icon: TerminalSquare, category: 'Languages', colorClass: 'text-yellow-500 border-yellow-500/30 hover:bg-yellow-500/10', level: 'Experienced' },
  { name: 'TypeScript', icon: TerminalSquare, category: 'Languages', colorClass: 'text-blue-600 border-blue-600/30 hover:bg-blue-600/10', level: 'Experienced' },
  { name: 'Java', icon: TerminalSquare, category: 'Languages', colorClass: 'text-orange-500 border-orange-500/30 hover:bg-orange-500/10', level: 'Familiar' },
  { name: 'SQL', icon: Database, category: 'Languages', colorClass: 'text-indigo-500 border-indigo-500/30 hover:bg-indigo-500/10', level: 'Proficient' },

  // Backend Frameworks & Libraries
  { name: 'FastAPI', icon: Server, category: 'Backend', colorClass: 'text-teal-500 border-teal-500/30 hover:bg-teal-500/10', level: 'Proficient' },
  { name: 'Flask', icon: Server, category: 'Backend', colorClass: 'text-gray-500 border-gray-500/30 hover:bg-gray-500/10', level: 'Experienced' },
  { name: 'SQLAlchemy', icon: Database, category: 'Backend', colorClass: 'text-red-500 border-red-500/30 hover:bg-red-500/10', level: 'Proficient' },
  { name: 'Pydantic', icon: ShieldCheck, category: 'Backend', colorClass: 'text-rose-500 border-rose-500/30 hover:bg-rose-500/10', level: 'Proficient' }, // Data validation

  // Frontend Frameworks & Libraries
  { name: 'React', icon: PanelsTopLeft, category: 'Frontend', colorClass: 'text-sky-500 border-sky-500/30 hover:bg-sky-500/10', level: 'Experienced' },
  { name: 'Next.js', icon: PanelsTopLeft, category: 'Frontend', colorClass: 'text-black dark:text-white border-gray-500/30 hover:bg-gray-500/10', level: 'Experienced' },
  { name: 'HTML5', icon: CodeXml, category: 'Frontend', colorClass: 'text-orange-600 border-orange-600/30 hover:bg-orange-600/10', level: 'Proficient' },
  { name: 'CSS3', icon: Palette, category: 'Frontend', colorClass: 'text-blue-600 border-blue-600/30 hover:bg-blue-600/10', level: 'Proficient' },
  { name: 'Tailwind CSS', icon: Palette, category: 'Frontend', colorClass: 'text-cyan-500 border-cyan-500/30 hover:bg-cyan-500/10', level: 'Proficient' },
  { name: 'Fabric.js', icon: Paintbrush, category: 'Frontend', colorClass: 'text-green-600 border-green-600/30 hover:bg-green-600/10', level: 'Experienced' },
  { name: 'GSAP', icon: Cpu, category: 'Frontend', colorClass: 'text-green-500 border-green-500/30 hover:bg-green-500/10', level: 'Experienced' }, // Animation

  // Databases
  { name: 'PostgreSQL', icon: Database, category: 'Databases', colorClass: 'text-blue-700 border-blue-700/30 hover:bg-blue-700/10', level: 'Proficient' },
  { name: 'MySQL', icon: Database, category: 'Databases', colorClass: 'text-orange-700 border-orange-700/30 hover:bg-orange-700/10', level: 'Experienced' },
  { name: 'Alembic', icon: DatabaseZap, category: 'Databases', colorClass: 'text-lime-500 border-lime-500/30 hover:bg-lime-500/10', level: 'Experienced' }, // Migrations

  // DevOps & Cloud
  { name: 'Docker', icon: Cog, category: 'DevOps & Cloud', colorClass: 'text-blue-400 border-blue-400/30 hover:bg-blue-400/10', level: 'Proficient' },
  { name: 'AWS (EC2, S3, VPC, Lambda)', icon: Cloud, category: 'DevOps & Cloud', colorClass: 'text-orange-400 border-orange-400/30 hover:bg-orange-400/10', level: 'Experienced' },
  { name: 'Nginx', icon: Server, category: 'DevOps & Cloud', colorClass: 'text-green-500 border-green-500/30 hover:bg-green-500/10', level: 'Experienced' },
  { name: 'Jenkins', icon: Cog, category: 'DevOps & Cloud', colorClass: 'text-red-600 border-red-600/30 hover:bg-red-600/10', level: 'Experienced' },
  { name: 'GitHub Actions', icon: Cog, category: 'DevOps & Cloud', colorClass: 'text-gray-700 border-gray-700/30 hover:bg-gray-700/10', level: 'Experienced' },
  { name: 'CI/CD Principles', icon: Wrench, category: 'DevOps & Cloud', colorClass: 'text-purple-500 border-purple-500/30 hover:bg-purple-500/10', level: 'Proficient' },

  // APIs & Integrations
  { name: 'RESTful APIs', icon: LinkIcon, category: 'APIs & Integrations', colorClass: 'text-indigo-500 border-indigo-500/30 hover:bg-indigo-500/10', level: 'Proficient' },
  { name: 'WebSockets', icon: LinkIcon, category: 'APIs & Integrations', colorClass: 'text-pink-500 border-pink-500/30 hover:bg-pink-500/10', level: 'Experienced' },
  { name: 'Swagger/OpenAPI', icon: BookOpen, category: 'APIs & Integrations', colorClass: 'text-green-400 border-green-400/30 hover:bg-green-400/10', level: 'Proficient' },

  // Data & Image Processing
  { name: 'Web Scraping', icon: DatabaseZap, category: 'Data & Image Processing', colorClass: 'text-cyan-500 border-cyan-500/30 hover:bg-cyan-500/10', level: 'Experienced' },
  { name: 'Pillow', icon: ImageIcon, category: 'Data & Image Processing', colorClass: 'text-purple-500 border-purple-500/30 hover:bg-purple-500/10', level: 'Experienced' },
  { name: 'OpenCV', icon: ImageIcon, category: 'Data & Image Processing', colorClass: 'text-yellow-600 border-yellow-600/30 hover:bg-yellow-600/10', level: 'Experienced' },

  // AI/ML
  { name: 'Genkit (Google AI)', icon: BrainCircuit, category: 'AI/ML', colorClass: 'text-purple-600 border-purple-600/30 hover:bg-purple-600/10', level: 'Experienced' },
  { name: 'LLM Integration', icon: BrainCircuit, category: 'AI/ML', colorClass: 'text-violet-500 border-violet-500/30 hover:bg-violet-500/10', level: 'Familiar' },

  // Tools & Methodologies
  { name: 'Git', icon: GitBranch, category: 'Tools & Methodologies', colorClass: 'text-orange-600 border-orange-600/30 hover:bg-orange-600/10', level: 'Proficient' },
  { name: 'GitHub', icon: GitBranch, category: 'Tools & Methodologies', colorClass: 'text-black dark:text-white border-gray-500/30 hover:bg-gray-500/10', level: 'Proficient' },
  { name: 'Pytest', icon: TestTubeDiagonal, category: 'Tools & Methodologies', colorClass: 'text-green-700 border-green-700/30 hover:bg-green-700/10', level: 'Experienced' }, // Testing
  { name: 'Agile/Scrum', icon: Layers, category: 'Tools & Methodologies', colorClass: 'text-blue-500 border-blue-500/30 hover:bg-blue-500/10', level: 'Experienced' }, // Methodology
  { name: 'SonarQube', icon: Wrench, category: 'Tools & Methodologies', colorClass: 'text-cyan-600 border-cyan-600/30 hover:bg-cyan-600/10', level: 'Familiar' }, // Code Quality
  { name: 'Snyk', icon: ShieldCheck, category: 'Tools & Methodologies', colorClass: 'text-purple-600 border-purple-600/30 hover:bg-purple-600/10', level: 'Familiar' }, // Security
  { name: 'MkDocs', icon: BookOpen, category: 'Tools & Methodologies', colorClass: 'text-indigo-400 border-indigo-400/30 hover:bg-indigo-400/10', level: 'Experienced' }, // Documentation
];

// Updated Categories based on refined list
const categories = ['All', 'Languages', 'Backend', 'Frontend', 'Databases', 'DevOps & Cloud', 'APIs & Integrations', 'Data & Image Processing', 'AI/ML', 'Tools & Methodologies'];

const ITEMS_PER_PAGE = 18; // Show more items initially

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const sectionRef = useRef<HTMLElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredSkills = allSkills.filter(skill =>
    (selectedCategory === 'All' || skill.category === selectedCategory) &&
    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const loadMore = () => {
    setVisibleCount(prevCount => Math.min(prevCount + ITEMS_PER_PAGE, filteredSkills.length));
  };

  const showLess = () => {
    setVisibleCount(ITEMS_PER_PAGE);
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); // Scroll to grid top
  };

   useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate section header
             gsap.from(sectionRef.current?.querySelector('h2'), {
                opacity: 0,
                y: 60,
                duration: 0.9,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none",
                }
            });

            // Animate filters (staggered fade-in)
             gsap.from(filtersRef.current?.children || [], {
                 opacity: 0,
                 y: 40,
                 duration: 0.6,
                 stagger: 0.1,
                 delay: 0.2, // Slight delay after header
                 scrollTrigger: {
                    trigger: filtersRef.current,
                    start: "top 88%", // Adjust trigger
                    toggleActions: "play none none none",
                 }
             });

        }, sectionRef);

        return () => ctx.revert();
   }, []);

    // Enhanced animation for skill cards appearance and filtering
    useEffect(() => {
        if (!gridRef.current) return;

        const cards = Array.from(gridRef.current.querySelectorAll<HTMLDivElement>('.skill-card'));
        const visibleCardsInDom = cards.slice(0, visibleCount);

        // Kill previous animations to avoid conflicts
        gsap.killTweensOf(cards);

        // Animate OUT cards that are no longer visible (either filtered out or beyond visibleCount)
        cards.forEach((card, index) => {
            const isVisible = filteredSkills.some(s => s.name === card.dataset.skillName) && index < visibleCount;
            if (!isVisible) {
                gsap.to(card, {
                    opacity: 0,
                    scale: 0.9,
                    y: 20,
                    duration: 0.3,
                    ease: 'power1.in',
                    onComplete: () => { card.style.display = 'none'; } // Hide after animation
                });
            }
        });

        // Animate IN cards that should be visible
        gsap.to(visibleCardsInDom, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.4,
            stagger: {
                amount: 0.5, // Total stagger duration for visible items
                from: 'start',
                ease: 'power2.out',
            },
            ease: 'power2.out',
            delay: 0.1, // Delay slightly for smoother transition after filtering/loading
            overwrite: true, // Ensure this animation takes precedence
            onStart: (targets) => {
                 // Ensure display is set correctly before animating in
                 (targets as unknown as HTMLDivElement[]).forEach(card => { card.style.display = 'flex'; });
             },
            onStartParams: [visibleCardsInDom], // Pass targets to onStart
        });


    }, [selectedCategory, searchTerm, visibleCount, filteredSkills]); // Dependencies


  return (
    <section ref={sectionRef} id="skills" className="bg-gradient-to-b from-secondary/15 to-background py-24 md:py-36"> {/* Adjusted padding/background */}
       <div className="absolute inset-0 opacity-[0.02] pattern-zigzag pattern-accent pattern-bg-transparent pattern-size-8"></div> {/* Subtle pattern */}
      <div className="container mx-auto px-4 z-10 relative">
        <h2
          className="text-4xl md:text-5xl font-bold mb-16 text-center gradient-text" // Increased margin
        >
          Technical Proficiency
        </h2>

        {/* Filters Container */}
        <div ref={filtersRef} className="mb-12 flex flex-col md:flex-row justify-between items-center gap-6"> {/* Increased margin */}
             {/* Search Input */}
             <div className="relative w-full md:w-80"> {/* Increased width */}
                 <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none z-10" />
                 <Input
                    type="text"
                    placeholder="Search skills (e.g., Python, AWS)..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setVisibleCount(ITEMS_PER_PAGE);
                    }}
                    className="pl-11 pr-4 py-3 border-border bg-background/70 backdrop-blur-sm focus:border-accent focus:ring-2 focus:ring-accent/50 transition-all duration-300 shadow-sm" // Enhanced styling
                 />
             </div>
             {/* Category Buttons - Scrollable */}
             <div className="w-full md:w-auto overflow-x-auto pb-2 custom-scrollbar-horizontal"> {/* Added custom scrollbar class if needed */}
                 <div className="flex flex-nowrap justify-start md:justify-center gap-2.5 min-w-max px-1"> {/* Added padding */}
                    {categories.map(category => (
                    <Button
                        key={category}
                        variant={selectedCategory === category ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => {
                            setSelectedCategory(category);
                            setVisibleCount(ITEMS_PER_PAGE);
                        }}
                        className={cn(
                            "capitalize transition-all duration-300 whitespace-nowrap px-4 py-1.5", // Increased padding
                            selectedCategory === category
                                ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-md scale-105 transform' // Enhanced active state
                                : 'border-border bg-background/60 hover:bg-accent/10 hover:border-accent/60 hover:text-accent backdrop-blur-sm'
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
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 md:gap-6" // Adjusted gap
        >
          {/* Map over filteredSkills but respect GSAP visibility control */}
          {allSkills
            .filter(skill => (selectedCategory === 'All' || skill.category === selectedCategory) && skill.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((skill) => (
              // Card Wrapper for animation targeting - Initially hidden by GSAP
              <div key={skill.name} className="skill-card opacity-0 flex" data-skill-name={skill.name} style={{ display: 'none' }}>
                  <Card className={cn(
                          "flex flex-col items-center justify-center p-5 text-center transition-all duration-300 ease-out border bg-card/75 backdrop-blur-md rounded-lg shadow-sm cursor-pointer w-full",
                          "hover:shadow-lg hover:-translate-y-1.5 hover:scale-[1.03]", // Enhanced hover effect
                          skill.colorClass // Apply category color for hover background and border hint
                      )}
                      data-cursor-interactive
                      title={`${skill.name}${skill.level ? ` (${skill.level})` : ''}`} // Add level to title attribute
                  >
                      <skill.icon className={cn("h-10 w-10 mb-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-110", skill.colorClass.split(' ')[0])} strokeWidth={1.5} />
                      <span className="text-sm font-medium text-card-foreground leading-snug">{skill.name}</span>
                      {/* Optional: Display skill level visually */}
                      {/* {skill.level && <span className="text-xs text-muted-foreground mt-1">{skill.level}</span>} */}
                  </Card>
              </div>
          ))}
        </div>

        {/* Feedback for No Results */}
        {filteredSkills.length === 0 && searchTerm && ( // Only show when searching and no results
             <p className="text-center text-muted-foreground mt-16 text-lg italic">
                 Couldn&apos;t find skills matching &quot;{searchTerm}&quot;{selectedCategory !== 'All' ? ` in ${selectedCategory}` : ''}.
            </p>
        )}

        {/* Load More / Show Less Buttons */}
        <div className="mt-16 text-center space-x-4">
            {filteredSkills.length > visibleCount && (
                <Button onClick={loadMore} variant="outline" className="group border-primary/50 hover:border-accent hover:bg-accent/10 hover:text-accent transition-all duration-300" data-cursor-interactive>
                    Show More <ChevronDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </Button>
            )}
            {visibleCount > ITEMS_PER_PAGE && filteredSkills.length > 0 && ( // Only show if more than initial are visible and there are results
                <Button onClick={showLess} variant="ghost" size="sm" className="text-muted-foreground hover:text-accent group transition-colors duration-300" data-cursor-interactive>
                    <ChevronUp className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5"/> Show Less
                </Button>
            )}
        </div>
      </div>
    </section>
  );
}
