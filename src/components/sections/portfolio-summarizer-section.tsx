'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Sparkles, AlertCircle, Info, Github } from 'lucide-react'; // Added Info, Github
import { generatePortfolioSummary, PortfolioSummaryInput } from '@/ai/flows/portfolio-summarizer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useToast } from "@/hooks/use-toast"; // Import useToast

gsap.registerPlugin(ScrollTrigger);

// Adjusted schema for better validation messages
const formSchema = z.object({
  jobDescription: z.string()
    .min(30, { message: 'Please provide more details (at least 30 characters).' })
    .max(5000, { message: 'Job description is too long (max 5000 characters).' }),
  userSkills: z.string()
    .min(10, { message: 'Please list relevant skills (at least 10 characters).' })
    .max(1000, { message: 'Skills list is too long (max 1000 characters).' }),
  githubUsername: z.string()
    .min(1, { message: 'GitHub username is required.' })
    .regex(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i, { message: 'Invalid GitHub username format.' })
    .max(39, { message: 'GitHub username is too long.' }),
});

export default function PortfolioSummarizerSection() {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast(); // Initialize toast

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobDescription: '',
      userSkills: 'Python, FastAPI, PostgreSQL, SQLAlchemy, Docker, Git, RESTful APIs, Microservices Architecture, AWS (EC2, S3, Lambda), React, Next.js, CI/CD, Agile Methodologies', // Comprehensive default skills
      githubUsername: 'KDasaradha', // Pre-fill
    },
  });

   useEffect(() => {
        const ctx = gsap.context(() => {
             // Animate section header and card container
             gsap.from([sectionRef.current?.querySelector('h2'), cardRef.current], {
                opacity: 0,
                y: 70, // Increased offset
                duration: 1, // Longer duration
                ease: 'power3.out',
                stagger: 0.25, // Stagger header and card
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none",
                }
            });

        }, sectionRef);

        return () => ctx.revert();
   }, []);

   // Animation for result/error appearance
   useEffect(() => {
        if (summary || error) {
            gsap.fromTo(resultRef.current,
                { autoAlpha: 0, y: 30 },
                { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.1, display: 'block' }
            );
        } else {
            // Hide instantly if no summary or error
            gsap.set(resultRef.current, { autoAlpha: 0, display: 'none' });
        }
   }, [summary, error]);


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setSummary(null);
    console.log("Form values submitted:", values);

    // Scroll to results area smoothly
    resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

    const input: PortfolioSummaryInput = {
      jobDescription: values.jobDescription,
      userSkills: values.userSkills.split(',').map(skill => skill.trim()).filter(Boolean), // Filter empty strings
      githubUsername: values.githubUsername,
    };
    console.log("Prepared input for AI flow:", input);

    try {
      const result = await generatePortfolioSummary(input);
      console.log("Received result from AI flow:", result);

      if (result?.summary) {
          setSummary(result.summary);
          console.log("Summary set successfully.");
          toast({ // Success toast
            title: "Summary Generated!",
            description: "Your personalized portfolio summary is ready.",
            variant: "default", // Use 'default' or a custom success variant
          });
          // Optionally reset only job description
          form.resetField("jobDescription");
      } else {
          const errMsg = "AI failed to generate a valid summary. The response might be empty or incomplete.";
          console.error(errMsg, result);
          setError(errMsg);
          toast({ // Error toast
            title: "Generation Failed",
            description: errMsg,
            variant: "destructive",
          });
      }

    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
        console.error("Error generating summary:", errorMessage, err);

        let displayError = `An unexpected error occurred: ${errorMessage}`;
        if (errorMessage.includes('fetch') || errorMessage.includes('network') || errorMessage.includes('503')) {
             displayError = 'Could not connect to the AI service or GitHub. Please check your network connection or try again later.';
        } else if (errorMessage.includes('GitHub user') || errorMessage.includes('404') || errorMessage.includes('Not Found')) {
             displayError = `Could not fetch data for GitHub user "${input.githubUsername}". Please ensure the username is correct and the profile/repositories are public.`;
        } else if (errorMessage.includes('rate limit') || errorMessage.includes('429')) {
             displayError = 'API rate limit reached. Please wait a moment and try again.';
        } else if (errorMessage.includes('invalid input') || errorMessage.includes('schema')) {
             displayError = 'There seems to be an issue with the provided input. Please review the fields and try again.';
        }

        setError(displayError);
        toast({ // Error toast
            title: "Generation Failed",
            description: displayError,
            variant: "destructive",
        });

    } finally {
      setIsLoading(false);
      console.log("Loading state set to false.");
    }
  }

  return (
    <section ref={sectionRef} id="ai-summarizer" className="bg-gradient-to-b from-background via-secondary/15 to-background relative py-24 md:py-36"> {/* Adjusted padding */}
       {/* Enhanced Blob */}
       <div className="blob opacity-25 dark:opacity-35 -z-10" style={{ top: '40%', left: '65%', width: '60vw', height: '60vw', animationDuration: '28s, 20s', filter: 'blur(110px)' }} />
      <div className="container mx-auto px-4 z-10 relative">
        <h2
          className="text-4xl md:text-5xl font-bold mb-16 text-center gradient-text flex items-center justify-center gap-4" // Increased margin
        >
          <Sparkles className="h-8 w-8 opacity-90" /> AI-Powered Portfolio Summary
        </h2>

        <div ref={cardRef} className="max-w-4xl mx-auto"> {/* Increased max-width */}
           <Card className="shadow-xl border border-border bg-card/85 backdrop-blur-md overflow-hidden">
            <CardHeader className="p-6 md:p-8 border-b bg-muted/40"> {/* Increased padding */}
              <CardTitle className="text-2xl md:text-3xl font-semibold">Craft Your Narrative</CardTitle> {/* Adjusted size */}
              <CardDescription className="text-base mt-2"> {/* Adjusted size */}
                Leverage AI to generate a concise, impactful summary tailored to specific job roles or networking opportunities by providing context, your skills, and GitHub profile.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8"> {/* Increased padding */}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8"> {/* Increased spacing */}
                  <FormField
                    control={form.control}
                    name="jobDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-medium flex items-center gap-2">
                          <Info className="h-5 w-5 text-primary/80" /> Job Description / Context
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Paste the full job description, company details, or describe the context (e.g., 'Networking event for fintech startups focusing on backend roles'). More detail yields better results."
                            className="resize-y min-h-[180px] bg-background/80 focus:border-accent focus:ring-2 focus:ring-accent/50 transition-all duration-300 text-base" // Adjusted styles
                            {...field}
                            data-cursor-interactive
                          />
                        </FormControl>
                         <FormDescription className="text-sm pt-1">
                             Provide the target role's requirements or the event's focus.
                         </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> {/* Increased gap */}
                     <FormField
                        control={form.control}
                        name="userSkills"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg font-medium">Your Key Skills</FormLabel>
                            <FormControl>
                            <Input
                                placeholder="e.g., Python, FastAPI, AWS, Microservices..."
                                className="bg-background/80 focus:border-accent focus:ring-2 focus:ring-accent/50 transition-all duration-300 text-base" // Adjusted styles
                                {...field}
                                data-cursor-interactive
                             />
                            </FormControl>
                            <FormDescription className="text-sm pt-1">
                                Comma-separated list of your most relevant technical skills.
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
                            <FormLabel className="text-lg font-medium flex items-center gap-2">
                                <Github className="h-5 w-5 text-primary/80" /> GitHub Username
                            </FormLabel>
                            <FormControl>
                            <Input
                                placeholder="Your GitHub handle"
                                className="bg-background/80 focus:border-accent focus:ring-2 focus:ring-accent/50 transition-all duration-300 text-base" // Adjusted styles
                                {...field}
                                data-cursor-interactive
                            />
                            </FormControl>
                            <FormDescription className="text-sm pt-1">
                                Used to fetch public repositories for context.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                  </div>
                  <div className="flex justify-center pt-4"> {/* Centered button */}
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full max-w-xs transition-all duration-300 bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-xl hover:-translate-y-1 transform hover:scale-105 text-base font-semibold" // Enhanced button style
                        size="lg"
                        data-cursor-interactive
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Generating...
                          </>
                        ) : (
                           <>
                            <Sparkles className="mr-2 h-5 w-5" />
                            Generate AI Summary
                           </>
                        )}
                      </Button>
                  </div>
                </form>
              </Form>
            </CardContent>

             {/* Results Area */}
            <CardFooter className="p-6 md:p-8 border-t bg-muted/20 min-h-[150px]"> {/* Increased padding and min-height */}
                <div ref={resultRef} className="w-full opacity-0" style={{ display: 'none' }}>
                    {/* Loading State */}
                    {isLoading && (
                        <div className="flex flex-col items-center justify-center text-muted-foreground space-y-3 py-6">
                            <Loader2 className="h-8 w-8 animate-spin text-accent" />
                            <span className="text-lg font-medium">Generating your personalized summary...</span>
                            <span className="text-sm">This may take a moment.</span>
                        </div>
                    )}
                    {/* Error State */}
                    {error && !isLoading && (
                        <Alert variant="destructive" className="bg-destructive/10 border-destructive/40 shadow-md">
                            <AlertCircle className="h-5 w-5" />
                            <AlertTitle className="font-semibold text-lg">Generation Failed</AlertTitle>
                            <AlertDescription className="mt-1 text-base">{error}</AlertDescription>
                             {/* Optionally add a retry button */}
                             {/* <Button variant="outline" size="sm" onClick={() => form.handleSubmit(onSubmit)()} className="mt-4">Retry</Button> */}
                        </Alert>
                    )}
                    {/* Success State */}
                    {summary && !isLoading && (
                        <Card className="w-full bg-gradient-to-br from-accent/5 via-background to-accent/10 border border-accent/30 shadow-lg animate-fade-in"> {/* Added animation class */}
                            <CardHeader className="pb-3">
                                <CardTitle className="text-xl md:text-2xl flex items-center gap-2 text-primary font-semibold">
                                    <Sparkles className="h-6 w-6 text-accent" /> Your AI-Generated Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {/* Use whitespace-pre-wrap for better formatting control */}
                                <p className="text-base md:text-lg text-foreground leading-relaxed whitespace-pre-wrap">{summary}</p>
                            </CardContent>
                            <CardFooter className="text-xs text-muted-foreground pt-4">
                                Note: AI-generated content. Review and refine as needed.
                            </CardFooter>
                        </Card>
                    )}
                 </div>
            </CardFooter>
          </Card>
        </div>
      </div>
       {/* Add fade-in animation style */}
       <style jsx>{`
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in {
                animation: fadeIn 0.5s ease-out forwards;
            }
       `}</style>
    </section>
  );
}
