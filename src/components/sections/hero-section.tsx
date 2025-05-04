'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="home" className="relative overflow-hidden bg-secondary/30 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="block">Kesari Dasaradh</span>
              <span className="block text-accent">Backend Developer</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Junior Backend Developer with 1.7+ years crafting high-performance APIs using Python, FastAPI & PostgreSQL. Passionate about microservices, security, and elegant solutions.
            </p>
             <p className="text-sm text-primary">🌟 Currently Learning: AWS Cloud, React, Next.js</p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              <Button asChild size="lg" className="group">
                <Link href="#projects">
                  View My Work <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
               <Button asChild variant="outline" size="lg">
                 {/* Use a placeholder path, will be replaced later */}
                 <a href="/Kesari_Dasaradh_Resume.pdf" download="Kesari_Dasaradh_Resume.pdf">
                    Download Resume
                 </a>
               </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center"
          >
            <Image
              src="https://picsum.photos/400/400"
              alt="Kesari Dasaradh profile picture"
              width={400}
              height={400}
              className="rounded-full border-4 border-accent shadow-lg"
              data-ai-hint="professional developer portrait"
              priority // Load the hero image faster
            />
          </motion.div>
        </div>
      </div>
      {/* Optional: Add subtle background elements if desired */}
      {/* <div className="absolute inset-0 -z-10 opacity-10"> ... </div> */}
    </section>
  );
}
