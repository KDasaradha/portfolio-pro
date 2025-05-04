'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from 'framer-motion';

const timeline = [
  { year: "2021", title: "🚀 Embarked on Python Journey", description: "Initiated my coding career by mastering Python fundamentals, igniting a passion for problem-solving and innovation.", technologies: "Python" },
  { year: "2022", title: "💼 Wipro Internship: Java & OOP", description: "Gained hands-on experience in Java and Object-Oriented Programming during my internship at Wipro, while also exploring Python OOP, data structures, HTML, and CSS.", technologies: "Java, Python" },
  { year: "2023", title: "🔍 Karyahub Solutions Internship: API & Web Scraping", description: "Developed foundational projects using Python and Flask, delved into web scraping with third-party APIs, and advanced my skills with FastAPI by building user and project management modules.", technologies: "Python, FastAPI, Web Scraping" },
  { year: "2024", title: "🖼️ Advanced Backend & Frontend Integration", description: "Enhanced my expertise by leveraging image processing libraries like Pillow and OpenCV for dynamic design generation, implementing Fabric.js for interactive frontend rendering, and mastering asynchronous programming with FastAPI—including JWT security and efficient database management.", technologies: "Python, FastAPI, Pillow, OpenCV, Fabric.js" },
  { year: "2025", title: "☁️ Microservices, CI/CD & Cloud Integration", description: "Expanding my skillset with microservices architecture, containerization using Docker, and CI/CD pipelines via GitHub Actions and Jenkins. Currently exploring AWS Cloud services for scalable deployments and enhancing full-stack capabilities with React and Next.js.", technologies: "Docker, CI/CD, AWS, React, Next.js" },
];

const philosophyPoints = [
  { title: "Foundations Over Frameworks", description: "I architect systems to outlast technology trends. While proficient with modern tools like FastAPI, React, and AWS, I prioritize clean abstractions and SOLID principles that enable painless technology migration. Every line of code is written with future maintainers in mind." },
  { title: "Security as Default State", description: "From parameterized queries to automated vulnerability scanning, I bake security into the SDLC—never treat it as an afterthought. My implementations enforce least-privilege access, encrypted data flows, and zero-trust architectures, even in rapid development cycles." },
  { title: "Performance with Purpose", description: "I optimize judiciously—70% of speed gains typically come from algorithmic improvements, not language nuances. My approach combines Big O analysis during design, strategic indexing for databases, and load testing against real-world scenarios rather than synthetic benchmarks." },
  { title: "APIs as Collaboration Contracts", description: "Whether building microservices or REST endpoints, I design interfaces as collaborative agreements between systems. Versioning, comprehensive documentation (OpenAPI/Swagger), and backward compatibility are non-negotiable for sustainable integration." },
  { title: "Cloud-Native, Cost-Conscious", description: "Serverless functions aren’t just buzzwords—they’re tools for balancing scalability with operational costs. I architect AWS/GCP solutions where infrastructure costs scale linearly with business growth, using reserved instances and auto-scaling groups to eliminate waste." },
  { title: "Learning Through Teaching", description: "My mastery of technologies like Docker or Kafka solidifies when I document processes or mentor team members. I maintain personal knowledge repositories and actively contribute to internal wikis—because understanding something well enough to explain it reveals hidden complexities." },
];

const learningGoals = [
  "Advanced AWS Cloud services for scalable backend deployments",
  "Modern React patterns for dynamic, interactive user interfaces",
  "Next.js for optimized server-side rendering and static site generation",
  "Comprehensive system design and microservices architecture",
  "CI/CD pipeline optimization with contemporary DevOps tools",
];

const whyWorkWithMe = [
    "Expertise in designing and implementing scalable, secure, and maintainable architectures.",
    "A steadfast commitment to delivering high-quality, clean code and embracing continuous improvement.",
    "Proven ability to excel in collaborative, Agile environments with cross-functional teams.",
]

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function AboutSection() {
  return (
    <section id="about" className="bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.h2
          className="text-4xl font-bold mb-12 text-center gradient-text"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          About Me
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={sectionVariants}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle>My Journey</CardTitle>
                 <CardDescription>A progressive evolution from a Python enthusiast to a seasoned backend specialist.</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="relative border-l border-muted-foreground/20 dark:border-muted-foreground/30 ml-4">
                  {timeline.map((item, index) => (
                    <li key={index} className="mb-10 ml-6">
                      <span className="absolute -left-[0.6rem] flex h-3 w-3 items-center justify-center rounded-full bg-accent ring-8 ring-background" />
                      <time className="mb-1 block text-sm font-normal leading-none text-muted-foreground">
                        {item.year}
                      </time>
                      <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                      <p className="mb-2 text-base font-normal text-muted-foreground">{item.description}</p>
                      <p className="text-sm text-muted-foreground"><strong>Technologies:</strong> {item.technologies}</p>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={sectionVariants}
            className="space-y-8"
          >
            <Card>
              <CardHeader>
                <CardTitle>🚀 My Development Philosophy</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-6">
                  {philosophyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                       <span className="text-xl text-accent mt-1">✅</span>
                       <div>
                        <h3 className="font-semibold text-lg text-primary">{point.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{point.description}</p>
                       </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>What I&apos;m Currently Learning</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {learningGoals.map((goal, index) => (
                        <li key={index}>{goal}</li>
                    ))}
                    </ul>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle>Why Work With Me?</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {whyWorkWithMe.map((reason, index) => (
                        <li key={index}>{reason}</li>
                    ))}
                    </ul>
                </CardContent>
             </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
