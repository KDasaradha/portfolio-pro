'use client';

import { Card } from "@/components/ui/card"; // Only Card needed
import {
  Server, Database, CodeXml, GitBranch, Wrench, PanelsTopLeft, Search,
  ChevronDown, ChevronUp, Cog, Cloud, BookOpen, ShieldCheck, Cpu, Paintbrush,
  DatabaseZap, Image as ImageIcon, Link as LinkIcon, TerminalSquare, Palette, // Added Palette for Frontend/Design
  BrainCircuit, // Added BrainCircuit for AI/ML
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from "@/lib/utils"; // Import cn for conditional classes

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  icon: React.ElementType;
  category: string;
  colorClass: string; // Tailwind color class for the icon and hover effect
}

const allSkills: Skill[] = [
  // Programming Languages
  { name: 'Python', icon: TerminalSquare, category: 'Languages', colorClass: 'text-blue-500 border-blue-500/30 hover:bg-blue-500/10' },
  { name: 'Java', icon: TerminalSquare, category: 'Languages', colorClass: 'text-orange-500 border-orange-500/30 hover:bg-orange-500/10' },
  { name: 'JavaScript', icon: TerminalSquare, category: 'Languages', colorClass: 'text-yellow-500 border-yellow-500/30 hover:bg-yellow-500/10' },
  { name: 'TypeScript', icon: TerminalSquare, category: 'Languages', colorClass: 'text-blue-600 border-blue-600/30 hover:bg-blue-600/10' },
  // Backend
  { name: 'FastAPI', icon: Server, category: 'Backend', colorClass: 'text-teal-500 border-teal-500/30 hover:bg-teal-500/10' },
  { name: 'Flask', icon: Server, category: 'Backend', colorClass: 'text-gray-500 border-gray-500/30 hover:bg-gray-500/10' },
  { name: 'SQLAlchemy', icon: Database, category: 'Backend', colorClass: 'text-red-500 border-red-500/30 hover:bg-red-500/10' },
  // Frontend
  { name: 'React', icon: PanelsTopLeft, category: 'Frontend', colorClass: 'text-sky-500 border-sky-500/30 hover:bg-sky-500/10' },
  { name: 'Next.js', icon: PanelsTopLeft, category: 'Frontend', colorClass: 'text-black dark:text-white border-gray-500/30 hover:bg-gray-500/10' },
  { name: 'HTML', icon: CodeXml, category: 'Frontend', colorClass: 'text-orange-600 border-orange-600/30 hover:bg-orange-600/10' },
  { name: 'CSS', icon: Palette, category: 'Frontend', colorClass: 'text-blue-600 border-blue-600/30 hover:bg-blue-600/10' },
  { name: 'Fabric.js', icon: Paintbrush, category: 'Frontend', colorClass: 'text-green-600 border-green-600/30 hover:bg-green-600/10' },
  { name: 'Tailwind CSS', icon: Palette, category: 'Frontend', colorClass: 'text-cyan-500 border-cyan-500/30 hover:bg-cyan-500/10' },
  { name: 'GSAP', icon: Cpu, category: 'Frontend', colorClass: 'text-green-500 border-green-500/30 hover:bg-green-500/10' }, // Animation library
  // Image Processing
  { name: 'Pillow', icon: ImageIcon, category: 'Image Processing', colorClass: 'text-purple-500 border-purple-500/30 hover:bg-purple-500/10' },
  { name: 'OpenCV', icon: ImageIcon, category: 'Image Processing', colorClass: 'text-yellow-600 border-yellow-600/30 hover:bg-yellow-600/10' },
  // Data Processing
  { name: 'Web Scraping', icon: DatabaseZap, category: 'Data', colorClass: 'text-cyan-500 border-cyan-500/30 hover:bg-cyan-500/10' }, // Changed category
  // Integration & APIs
  { name: 'RESTful APIs', icon: LinkIcon, category: 'APIs', colorClass: 'text-indigo-500 border-indigo-500/30 hover:bg-indigo-500/10' }, // Changed category
  { name: 'WebSockets', icon: LinkIcon, category: 'APIs', colorClass: 'text-pink-500 border-pink-500/30 hover:bg-pink-500/10' }, // Changed category
   { name: 'Genkit (AI)', icon: BrainCircuit, category: 'AI/ML', colorClass: 'text-purple-600 border-purple-600/30 hover:bg-purple-600/10' },
  // Database
  { name: 'PostgreSQL', icon: Database, category: 'Database', colorClass: 'text-blue-700 border-blue-700/30 hover:bg-blue-700/10' },
  { name: 'MySQL', icon: Database, category: 'Database', colorClass: 'text-orange-700 border-orange-700/30 hover:bg-orange-700/10' },
  { name: 'Alembic', icon: Database, category: 'Database', colorClass: 'text-lime-500 border-lime-500/30 hover:bg-lime-500/10' },
  { name: 'Pydantic', icon: ShieldCheck, category: 'Database', colorClass: 'text-rose-500 border-rose-500/30 hover:bg-rose-500/10' }, // Data validation
  // DevOps & Cloud
  { name: 'Docker', icon: Cog, category: 'DevOps', colorClass: 'text-blue-400 border-blue-400/30 hover:bg-blue-400/10' },
  { name: 'Nginx', icon: Server, category: 'DevOps', colorClass: 'text-green-500 border-green-500/30 hover:bg-green-500/10' },
  { name: 'Jenkins', icon: Cog, category: 'DevOps', colorClass: 'text-red-600 border-red-600/30 hover:bg-red-600/10' },
  { name: 'GitHub Actions', icon: Cog, category: 'DevOps', colorClass: 'text-gray-700 border-gray-700/30 hover:bg-gray-700/10' },
  { name: 'AWS (EC2, S3, VPC)', icon: Cloud, category: 'Cloud', colorClass: 'text-orange-400 border-orange-400/30 hover:bg-orange-400/10' },
  // Version Control
  { name: 'Git', icon: GitBranch, category: 'Tools', colorClass: 'text-orange-600 border-orange-600/30 hover:bg-orange-600/10' }, // Grouped under Tools
  { name: 'GitHub', icon: GitBranch, category: 'Tools', colorClass: 'text-black dark:text-white border-gray-500/30 hover:bg-gray-500/10' }, // Grouped under Tools
  // Documentation & Testing
  { name: 'MkDocs', icon: BookOpen, category: 'Tools', colorClass: 'text-indigo-400 border-indigo-400/30 hover:bg-indigo-400/10' },
  { name: 'Swagger/OpenAPI', icon: BookOpen, category: 'Tools', colorClass: 'text-green-400 border-green-400/30 hover:bg-green-400/10' },
  { name: 'Pytest', icon: TerminalSquare, category: 'Tools', colorClass: 'text-green-700 border-green-700/30 hover:bg-green-700/10' },
  // Quality & Security
  { name: 'SonarQube', icon: Wrench, category: 'Tools', colorClass: 'text-cyan-600 border-cyan-600/30 hover:bg-cyan-600/10' },
  { name: 'Snyk', icon: ShieldCheck, category: 'Tools', colorClass: 'text-purple-600 border-purple-600/30 hover:bg-purple-600/10' },
];

// Refined categories based on the above list
const categories = ['All', 'Languages', 'Backend', 'Frontend', 'Database', 'DevOps', 'Cloud', 'AI/ML', 'APIs', 'Data', 'Image Processing', 'Tools'];

const ITEMS_PER_PAGE = 16; // Adjusted initial items

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const sectionRef = useRef<HTMLElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const skillsTl = useRef<gsap.core.Timeline | null>(null); // Timeline ref for managing animations

  const filteredSkills = allSkills.filter(skill =>
    (selectedCategory === 'All' || skill.category === selectedCategory) &&
    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const loadMore = () => {
    setVisibleCount(prevCount => Math.min(prevCount + ITEMS_PER_PAGE, filteredSkills.length));
  };

  const showLess = () => {
    setVisibleCount(ITEMS_PER_PAGE);
    // Optional: Scroll back to the top of the grid smoothly
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

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

            // Animate filters
             gsap.from(filtersRef.current?.children || [], {
                 opacity: 0,
                 y: 30,
                 duration: 0.5,
                 stagger: 0.1,
                 scrollTrigger: {
                    trigger: filtersRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none",
                 }
             });

            // Animate initial skill cards load
             skillsTl.current = gsap.timeline({
                scrollTrigger: {
                    trigger: gridRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none",
                }
             }).from(gridRef.current?.querySelectorAll('.skill-card') || [], {
                 opacity: 0,
                 scale: 0.8,
                 y: 40,
                 duration: 0.4,
                 stagger: 0.08, // Faster stagger
             });

        }, sectionRef);

        return () => ctx.revert();
   }, []);

    // Handle animations when filter/search/visibleCount changes
    useEffect(() => {
        if (!gridRef.current) return;

        const cards = gridRef.current.querySelectorAll<HTMLDivElement>('.skill-card');
        const visibleCards = Array.from(cards).slice(0, visibleCount);
        const hiddenCards = Array.from(cards).slice(visibleCount);

        // Kill previous animations on the grid items before starting new ones
        gsap.killTweensOf(cards);

        // Animate disappearance of cards that are no longer visible due to filtering/search
        gsap.to(cards, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            stagger: 0.05,
            display: 'none', // Hide them after animation
            overwrite: true, // Overwrite existing animations on these elements
            filter: (index, target) => !visibleCards.includes(target) // Only animate elements NOT in visibleCards
        });

        // Animate appearance of newly visible cards
        gsap.to(visibleCards, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.08,
            display: 'flex', // Make sure they are visible
            overwrite: true, // Overwrite existing animations
            delay: 0.2 // Small delay to ensure hiding animation completes
        });

    }, [selectedCategory, searchTerm, visibleCount, filteredSkills]); // Rerun effect when these change


  return (
    <section ref={sectionRef} id="skills" className="bg-gradient-to-b from-secondary/10 to-background">
       {/* Subtle background pattern */}
       <div className="absolute inset-0 opacity-[0.03] pattern-cross pattern-accent pattern-bg-transparent pattern-size-6"></div>
      <div className="container mx-auto px-4 z-10 relative">
        <h2
          className="text-4xl font-bold mb-12 text-center gradient-text"
        >
          Tech Stack & Skills
        </h2>

        {/* Filters Container */}
        <div ref={filtersRef} className="mb-10 flex flex-col md:flex-row justify-between items-center gap-6">
             {/* Search Input */}
             <div className="relative w-full md:w-72">
                 <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
                 <Input
                    type="text"
                    placeholder="Search skills..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setVisibleCount(ITEMS_PER_PAGE); // Reset count on search
                    }}
                    className="pl-11 pr-4 py-2.5 border-border focus:border-accent focus:ring-accent/50 transition-colors" // Enhanced styling
                 />
             </div>
             {/* Category Buttons - Scrollable on smaller screens */}
             <div className="w-full md:w-auto overflow-x-auto pb-2">
                 <div className="flex flex-nowrap justify-start md:justify-center gap-2 min-w-max">
                    {categories.map(category => (
                    <Button
                        key={category}
                        variant={selectedCategory === category ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => {
                            setSelectedCategory(category);
                            setVisibleCount(ITEMS_PER_PAGE); // Reset visible count
                        }}
                        className={cn(
                            "capitalize transition-all duration-200 whitespace-nowrap",
                            selectedCategory === category
                                ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-md'
                                : 'border-border hover:bg-accent/10 hover:border-accent/50'
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
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5" // Adjusted grid columns and gap
        >
          {filteredSkills.map((skill, index) => (
            // Card Wrapper for animation targeting
            <div key={skill.name} className="skill-card opacity-0" style={{ display: index < visibleCount ? 'block' : 'none' }}>
                <Card className={cn(
                        "flex flex-col items-center p-4 text-center transition-all duration-300 ease-out border bg-card/70 backdrop-blur-sm rounded-lg shadow-sm cursor-pointer",
                        "hover:shadow-md hover:-translate-y-1", // Hover effect
                        skill.colorClass // Apply category color for hover background and border hint
                    )}
                     data-cursor-interactive
                >
                    <skill.icon className={cn("h-10 w-10 mb-3 flex-shrink-0 transition-colors", skill.colorClass.split(' ')[0])} strokeWidth={1.5} /> {/* Use only text color for icon */}
                    <span className="text-sm font-medium text-card-foreground">{skill.name}</span>
                </Card>
            </div>
          ))}
        </div>

        {/* Feedback for No Results */}
        {filteredSkills.length === 0 && (
             <p className="text-center text-muted-foreground mt-12 text-lg">
                 No skills found matching "{searchTerm}" {selectedCategory !== 'All' ? `in ${selectedCategory}` : ''}.
            </p>
        )}

        {/* Load More / Show Less Buttons */}
        <div className="mt-12 text-center space-x-4">
            {filteredSkills.length > visibleCount && (
                <Button onClick={loadMore} variant="outline" className="group" data-cursor-interactive>
                    Show More <ChevronDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                </Button>
            )}
            {visibleCount > ITEMS_PER_PAGE && (
                <Button onClick={showLess} variant="ghost" size="sm" className="text-muted-foreground hover:text-accent group" data-cursor-interactive>
                    <ChevronUp className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5"/> Show Less
                </Button>
            )}
        </div>
      </div>
    </section>
  );
}
