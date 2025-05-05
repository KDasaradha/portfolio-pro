import HeroSection from '@/components/sections/hero-section';
import AboutSection from '@/components/sections/about-section';
import ProjectsSection from '@/components/sections/projects-section';
import SkillsSection from '@/components/sections/skills-section';
import ContactSection from '@/components/sections/contact-section';
import PortfolioSummarizerSection from '@/components/sections/portfolio-summarizer-section';
import React from 'react'; // Import React

export default function Home() {
  return (
    // Wrap sections in a React.Fragment or a div if layout requires it
    <React.Fragment>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <PortfolioSummarizerSection />
      <ContactSection />
    </React.Fragment>
  );
}
