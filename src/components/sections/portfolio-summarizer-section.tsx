'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { generatePortfolioSummary, PortfolioSummaryInput } from '@/ai/flows/portfolio-summarizer';

const formSchema = z.object({
  jobDescription: z.string().min(20, {
    message: 'Job description must be at least 20 characters.',
  }).max(5000, { message: 'Job description cannot exceed 5000 characters.'}),
  userSkills: z.string().min(5, {
    message: 'Please list at least one skill.',
  }).max(1000, { message: 'Skills list cannot exceed 1000 characters.'}),
  githubUsername: z.string().min(1, {
    message: 'GitHub username is required.',
  }).regex(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i, { message: 'Invalid GitHub username format.'}),
});

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function PortfolioSummarizerSection() {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobDescription: '',
      userSkills: 'Python, FastAPI, PostgreSQL, SQLAlchemy, Docker, Git, RESTful APIs, Microservices', // Pre-fill common skills
      githubUsername: 'KDasaradha', // Pre-fill GitHub username
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setSummary(null);

    const input: PortfolioSummaryInput = {
      jobDescription: values.jobDescription,
      userSkills: values.userSkills.split(',').map(skill => skill.trim()).filter(skill => skill !== ''),
      githubUsername: values.githubUsername,
    };

    try {
      const result = await generatePortfolioSummary(input);
      setSummary(result.summary);
    } catch (err) {
      console.error("Error generating summary:", err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred while generating the summary.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section id="ai-summarizer" className="bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold mb-12 text-center gradient-text"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          ✨ AI-Powered Portfolio Summary
        </motion.h2>

        <motion.div
          className="max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <Card>
            <CardHeader>
              <CardTitle>Generate a Tailored Summary</CardTitle>
              <CardDescription>
                Paste a job description or describe a networking opportunity, verify your skills and GitHub username, and let AI craft a personalized summary highlighting relevant projects.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="jobDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Job Description / Opportunity Details</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Paste the job description or networking context here..."
                            className="resize-y min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="userSkills"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Skills (comma-separated)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Python, FastAPI, React, AWS" {...field} />
                        </FormControl>
                        <FormDescription>
                          List your key technical skills.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="githubUsername"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>GitHub Username</FormLabel>
                        <FormControl>
                          <Input placeholder="Your GitHub username" {...field} />
                        </FormControl>
                         <FormDescription>
                           Used to fetch your public repositories.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                       <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Summary
                       </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>

             {error && (
                <CardFooter>
                    <Alert variant="destructive" className="w-full">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                </CardFooter>
             )}

             {summary && !isLoading && (
                <CardFooter>
                    <Card className="w-full bg-primary/5 border-primary/20">
                         <CardHeader>
                             <CardTitle className="text-lg flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-accent" /> Generated Summary
                             </CardTitle>
                         </CardHeader>
                         <CardContent>
                            <p className="text-sm text-foreground whitespace-pre-line">{summary}</p>
                         </CardContent>
                    </Card>
                </CardFooter>
             )}
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
