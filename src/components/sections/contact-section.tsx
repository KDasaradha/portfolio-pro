'use client';

import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PhoneCall, Mail, Linkedin, Github, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

const contactDetails = [
  { icon: PhoneCall, text: '+91 9032414439', href: 'tel:+919032414439', label: 'Call me' },
  { icon: Mail, text: 'kdasaradha525@gmail.com', href: 'mailto:kdasaradha525@gmail.com', label: 'Email me' },
];

const socialLinks = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/dasaradha-rami-reddy-kesari-b8471417b', label: 'LinkedIn profile' },
  { icon: Github, href: 'https://github.com/KDasaradha', label: 'GitHub profile' },
  { icon: Twitter, href: 'https://twitter.com/k_dasaradh66626', label: 'Twitter profile' },
];

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const cardVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } },
};
const cardVariantsRight = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } },
};

export default function ContactSection() {
  return (
    <section id="contact" className="bg-background">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center gradient-text"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          Let's Connect!
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariants}
          >
            <Card className="h-full border-accent border-t-4 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-5">
                  {contactDetails.map((detail, index) => (
                    <li key={index} className="flex items-center space-x-4">
                      <detail.icon className="h-6 w-6 text-accent" />
                      <Link href={detail.href} className="text-lg font-medium text-foreground transition-colors hover:text-accent" aria-label={detail.label}>
                        {detail.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={cardVariantsRight}
          >
            <Card className="h-full border-primary border-t-4 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">Find Me Online</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-5">
                  {socialLinks.map((link, index) => (
                    <li key={index} className="flex items-center space-x-4">
                      <link.icon className="h-6 w-6 text-foreground/80" />
                      <Link
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg font-medium text-foreground transition-colors hover:text-accent"
                        aria-label={link.label}
                      >
                         {link.label.split(' ')[0]} {/* Display only the name */}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
               <CardFooter className="flex flex-wrap gap-4 mt-2">
                 {/* Ensure the PDF file exists in the public folder */}
                 <Button asChild variant="default" className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90">
                    <a href="/Kesari_Dasaradh_Resume.pdf" target="_blank" rel="noopener noreferrer">
                        View Resume
                    </a>
                 </Button>
                 <Button asChild variant="outline">
                    <a href="/Kesari_Dasaradh_Resume.pdf" download="Kesari_Dasaradh_Resume.pdf">
                        Download Resume
                    </a>
                 </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
