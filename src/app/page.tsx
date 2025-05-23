'use client'; 

import React from 'react';
import { useVersion } from '@/context/version-context';

// V1 Sections
import HeroSection from '@/components/sections/hero-section';
import AboutSection from '@/components/sections/about-section';
import ProjectsSection from '@/components/sections/projects-section';
import SkillsSection from '@/components/sections/skills-section';
import ContactSection from '@/components/sections/contact-section';
import PortfolioSummarizerSection from '@/components/sections/portfolio-summarizer-section';

// V2 Sections
import HeroSectionV2 from '@/components/sections/v2/hero-section-v2';
import AboutSectionV2 from '@/components/sections/v2/about-section-v2';
import ProjectsSectionV2 from '@/components/sections/v2/projects-section-v2';
import SkillsSectionV2 from '@/components/sections/v2/skills-section-v2';
import PortfolioSummarizerSectionV2 from '@/components/sections/v2/portfolio-summarizer-section-v2';
import ContactSectionV2 from '@/components/sections/v2/contact-section-v2';


export default function Home() {
  const { version } = useVersion();

  if (version === 'v2') {
    return (
      <React.Fragment>
        {/* Ensure V2 sections have IDs like 'home-v2', 'about-v2', etc. if navItemsV2 expects them */}
        <HeroSectionV2 /> 
        <AboutSectionV2 />
        <ProjectsSectionV2 />
        <SkillsSectionV2 />
        <PortfolioSummarizerSectionV2 />
        <ContactSectionV2 />
      </React.Fragment>
    );
  }

  // Default to V1
  // V1 sections should have IDs like 'home', 'about', etc.
  return (
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
