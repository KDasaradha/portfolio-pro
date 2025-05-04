'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Server,
  Database,
  CodeXml,
  GitBranch,
  Wrench,
  PanelsTopLeft,
  Search,
  ChevronDown,
  Cog,
  Cloud,
  BookOpen,
  ShieldCheck,
  Cpu,
  Paintbrush,
  DatabaseZap, // For Data Processing
  Image as ImageIcon, // For Image Processing
  Link as LinkIcon, // For Integration
  TerminalSquare, // For Programming Languages
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Skill {
  name: string;
  icon: React.ElementType;
  category: string;
  colorClass: string; // Tailwind color class for the icon
}

const allSkills: Skill[] = [
  // Programming Languages
  { name: 'Python', icon: TerminalSquare, category: 'Programming Languages', colorClass: 'text-blue-500' },
  { name: 'Java', icon: TerminalSquare, category: 'Programming Languages', colorClass: 'text-orange-500' },
  { name: 'JavaScript', icon: TerminalSquare, category: 'Programming Languages', colorClass: 'text-yellow-500' },
  // Backend
  { name: 'FastAPI', icon: Server, category: 'Backend', colorClass: 'text-teal-500' },
  { name: 'Flask', icon: Server, category: 'Backend', colorClass: 'text-gray-500' },
  { name: 'SQLAlchemy', icon: Database, category: 'Backend', colorClass: 'text-red-500' },
  // Frontend
  { name: 'React', icon: PanelsTopLeft, category: 'Frontend', colorClass: 'text-sky-500' },
  { name: 'Next.js', icon: PanelsTopLeft, category: 'Frontend', colorClass: 'text-black dark:text-white' },
  { name: 'HTML', icon: CodeXml, category: 'Frontend', colorClass: 'text-orange-600' },
  { name: 'CSS', icon: Paintbrush, category: 'Frontend', colorClass: 'text-blue-600' },
  { name: 'Fabric.js', icon: Paintbrush, category: 'Frontend', colorClass: 'text-green-600' },
  // Image Processing
  { name: 'Pillow', icon: ImageIcon, category: 'Image Processing', colorClass: 'text-purple-500' },
  { name: 'OpenCV', icon: ImageIcon, category: 'Image Processing', colorClass: 'text-yellow-600' },
  // Data Processing
  { name: 'Web Scraping (BeautifulSoup)', icon: DatabaseZap, category: 'Data Processing', colorClass: 'text-cyan-500' },
  // Integration
  { name: 'RESTful APIs', icon: LinkIcon, category: 'Integration', colorClass: 'text-indigo-500' },
  { name: 'WebSockets', icon: LinkIcon, category: 'Integration', colorClass: 'text-pink-500' },
  // Database
  { name: 'PostgreSQL', icon: Database, category: 'Database', colorClass: 'text-blue-700' },
  { name: 'MySQL', icon: Database, category: 'Database', colorClass: 'text-orange-700' },
  { name: 'Alembic', icon: Database, category: 'Database', colorClass: 'text-lime-500' },
  { name: 'Pydantic', icon: ShieldCheck, category: 'Database', colorClass: 'text-rose-500' }, // Data validation often related to DB
  // DevOps
  { name: 'Docker', icon: Cog, category: 'DevOps', colorClass: 'text-blue-400' },
  { name: 'Nginx', icon: Server, category: 'DevOps', colorClass: 'text-green-500' },
  { name: 'Jenkins', icon: Cog, category: 'DevOps', colorClass: 'text-red-600' },
  { name: 'GitHub Actions', icon: Cog, category: 'DevOps', colorClass: 'text-gray-700' },
  // Version Control
  { name: 'Git', icon: GitBranch, category: 'Version Control', colorClass: 'text-orange-600' },
  { name: 'GitHub', icon: GitBranch, category: 'Version Control', colorClass: 'text-black dark:text-white' },
  // Cloud
  { name: 'AWS (EC2, S3, VPC)', icon: Cloud, category: 'Cloud', colorClass: 'text-orange-400' },
  // Documentation
  { name: 'MkDocs', icon: BookOpen, category: 'Documentation', colorClass: 'text-indigo-400' },
  { name: 'Swagger/OpenAPI', icon: BookOpen, category: 'Documentation', colorClass: 'text-green-400' },
  // Tools
  { name: 'SonarQube', icon: Wrench, category: 'Tools', colorClass: 'text-cyan-600' },
  { name: 'Snyk', icon: ShieldCheck, category: 'Tools', colorClass: 'text-purple-600' },
  { name: 'Pytest', icon: TerminalSquare, category: 'Tools', colorClass: 'text-green-700' },
];

const categories = ['All', ...Array.from(new Set(allSkills.map(skill => skill.category)))];

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const skillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

const ITEMS_PER_PAGE = 12;

export default function SkillsSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const filteredSkills = allSkills.filter(skill =>
    (selectedCategory === 'All' || skill.category === selectedCategory) &&
    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const loadMore = () => {
    setVisibleCount(prevCount => prevCount + ITEMS_PER_PAGE);
  };

  const showLess = () => {
    setVisibleCount(ITEMS_PER_PAGE);
  };


  return (
    <section id="skills" className="bg-secondary/10">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center gradient-text"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          Tech Stack & Skills
        </motion.h2>

        <motion.div
            className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={sectionVariants}
        >
             <div className="relative w-full sm:w-64">
                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                 <Input
                    type="text"
                    placeholder="Search skills..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                 />
             </div>
             <div className="flex flex-wrap justify-center gap-2">
                {categories.map(category => (
                <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                        setSelectedCategory(category);
                        setVisibleCount(ITEMS_PER_PAGE); // Reset visible count on category change
                    }}
                    className="capitalize"
                >
                    {category}
                </Button>
                ))}
             </div>
        </motion.div>


        <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4"
            initial="hidden"
            animate="visible"
            variants={sectionVariants} // Use stagger for the grid container
        >
          {filteredSkills.slice(0, visibleCount).map((skill) => (
            <motion.div key={skill.name} variants={skillVariants}>
              <Card className="flex flex-col items-center p-4 text-center transition-transform duration-200 hover:scale-105 cursor-pointer bg-card">
                <skill.icon className={`h-10 w-10 mb-2 ${skill.colorClass}`} strokeWidth={1.5} />
                <span className="text-sm font-medium text-card-foreground">{skill.name}</span>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredSkills.length === 0 && (
             <p className="text-center text-muted-foreground mt-8">No skills found matching your criteria.</p>
        )}

        {filteredSkills.length > visibleCount && (
          <div className="mt-8 text-center">
            <Button onClick={loadMore} variant="outline">
              Show More <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
         {visibleCount > ITEMS_PER_PAGE && filteredSkills.length > ITEMS_PER_PAGE && (
            <div className="mt-4 text-center">
                <Button onClick={showLess} variant="ghost" size="sm">
                Show Less
                </Button>
            </div>
        )}
      </div>
    </section>
  );
}
