import HeroSection from '@/components/sections/hero-section';
import AboutSection from '@/components/sections/about-section';
import ProjectsSection from '@/components/sections/projects-section';
import SkillsSection from '@/components/sections/skills-section';
import ContactSection from '@/components/sections/contact-section'; // Ensure ContactSection is imported
import PortfolioSummarizerSection from '@/components/sections/portfolio-summarizer-section';
import React from 'react'; // Import React for Fragment

export default function Home() {
  return (
    <React.Fragment> {/* Use Fragment to wrap multiple sections */}
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <PortfolioSummarizerSection />
      <ContactSection />
    </React.Fragment>
  );
}
