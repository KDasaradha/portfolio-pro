import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com/KDasaradha', icon: Github },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/dasaradha-rami-reddy-kesari-b8471417b', icon: Linkedin },
  { name: 'Twitter', href: 'https://twitter.com/k_dasaradh66626', icon: Twitter },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background py-6">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Kesari Dasaradh. All rights reserved.
        </p>
        <div className="flex gap-4">
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <link.icon className="h-5 w-5" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
