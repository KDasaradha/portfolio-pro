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
import { Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { generatePortfolioSummary, PortfolioSummaryInput } from '@/ai/flows/portfolio-summarizer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

export default function PortfolioSummarizerSection() {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null); // Ref for the result card

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobDescription: '',
      userSkills: 'Python, FastAPI, PostgreSQL, SQLAlchemy, Docker, Git, RESTful APIs, Microservices, AWS, React, Next.js', // Updated default skills
      githubUsername: 'KDasaradha', // Pre-fill GitHub username
    },
  });

   useEffect(() => {
        const ctx = gsap.context(() => {
             // Animate section header and card
             gsap.from([sectionRef.current?.querySelector('h2'), cardRef.current], {
                opacity: 0,
                y: 60,
                duration: 0.9,
                ease: 'power3.out',
                stagger: 0.2, // Stagger header and card animation
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%", // Adjust trigger point if needed
                    toggleActions: "play none none none",
                    // markers: process.env.NODE_ENV === 'development', // Add markers for debugging this specific trigger
                }
            });

        }, sectionRef);

        return () => ctx.revert();
   }, []);

    // Animation for result/error appearance
   useEffect(() => {
    if (summary || error) {
        // Ensure the result container is visible before animating
        gsap.set(resultRef.current, { autoAlpha: 1, display: 'block' }); // Use autoAlpha for opacity and visibility
        gsap.fromTo(resultRef.current,
            { y: 20 }, // Start slightly lower
            { y: 0, duration: 0.5, ease: 'power2.out' }
        );
    } else {
         // Hide result container if no summary or error
         gsap.set(resultRef.current, { autoAlpha: 0, y: 20, display: 'none' });
    }
   }, [summary, error]);


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setSummary(null);
    console.log("Form values submitted:", values); // Log form values

    const input: PortfolioSummaryInput = {
      jobDescription: values.jobDescription,
      userSkills: values.userSkills.split(',').map(skill => skill.trim()).filter(skill => skill !== ''),
      githubUsername: values.githubUsername,
    };
    console.log("Prepared input for AI flow:", input); // Log prepared input

    try {
      const result = await generatePortfolioSummary(input);
      console.log("Received result from AI flow:", result); // Log the full result

      if (result && result.summary) {
          setSummary(result.summary);
          console.log("Summary set successfully.");
          form.reset({ // Optionally reset parts of the form keeping defaults
               ...form.getValues(), // Keep current values
               jobDescription: "" // Only reset job description
           });
      } else {
          console.error("Received empty or invalid summary:", result);
          setError("AI failed to generate a valid summary. Please try again.");
      }


    } catch (err) {
      console.error("Error generating summary:", err); // Log the raw error
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Error: ${errorMessage}`); // Set a generic error message initially
      // Provide more specific feedback based on error content
      if (errorMessage.includes('fetch') || errorMessage.includes('network')) {
           setError('Could not connect to the AI service or GitHub. Please check your network connection and try again.');
      } else if (errorMessage.includes('GitHub user') || errorMessage.includes('GitHub repos')) {
           setError(`Could not fetch data for GitHub user "${input.githubUsername}". Please ensure the username is correct and the profile/repositories are public.`);
      } else if (errorMessage.includes('rate limit')) {
           setError('API rate limit exceeded. Please try again later.');
      }
       else {
           setError(`An unexpected error occurred while generating the summary. Details: ${errorMessage}`);
      }
      console.log("Error state set:", error); // Log the error state
    } finally {
      setIsLoading(false);
      console.log("Loading state set to false.");
    }
  }

  return (
    // Ensure section has visibility initially if GSAP handles the fade-in
    <section ref={sectionRef} id="ai-summarizer" className="bg-gradient-to-b from-background to-secondary/10 relative"> {/* Added relative */}
       {/* Animated Blob for subtle background effect */}
       <div className="blob opacity-20 dark:opacity-30 -z-10" style={{ top: '30%', left: '70%', width: '50vw', height: '50vw', animationDuration: '25s, 18s' }} />
      <div className="container mx-auto px-4 z-10 relative">
        <h2
          className="text-4xl font-bold mb-12 text-center gradient-text flex items-center justify-center gap-3"
        >
          <Sparkles className="h-8 w-8 opacity-80" /> AI Portfolio Summary
        </h2>

        {/* Removed opacity-0, GSAP handles initial state */}
        <div
          ref={cardRef}
          className="max-w-3xl mx-auto"
        >
           <Card className="shadow-lg border border-border bg-card/80 backdrop-blur-sm overflow-hidden">
            <CardHeader className="p-6 border-b bg-muted/30">
              <CardTitle className="text-2xl">Generate a Tailored Summary</CardTitle>
              <CardDescription>
                Paste a job description or context, verify your skills & GitHub, and let AI craft a personalized summary.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="jobDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-base font-medium">Job Description / Context</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Paste the target job description or describe the networking opportunity here..."
                            className="resize-y min-h-[150px] bg-background focus:border-accent focus:ring-accent/50 transition-colors"
                            {...field}
                            data-cursor-interactive
                            suppressHydrationWarning
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                     <FormField
                        control={form.control}
                        name="userSkills"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-base font-medium">Your Skills</FormLabel>
                            <FormControl>
                            <Input
                                placeholder="Comma-separated skills..."
                                className="bg-background focus:border-accent focus:ring-accent/50 transition-colors"
                                {...field}
                                data-cursor-interactive
                                suppressHydrationWarning
                             />
                            </FormControl>
                            <FormDescription className="text-xs">
                            Key technical skills.
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
                            <FormLabel className="text-base font-medium">GitHub Username</FormLabel>
                            <FormControl>
                            <Input
                                placeholder="e.g., KDasaradha"
                                className="bg-background focus:border-accent focus:ring-accent/50 transition-colors"
                                {...field}
                                data-cursor-interactive
                                suppressHydrationWarning
                            />
                            </FormControl>
                            <FormDescription className="text-xs">
                            Fetches public repositories.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full sm:w-auto transition-all duration-300 bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-lg hover:-translate-y-0.5"
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
                        Generate Summary
                       </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>

             {/* Results Area */}
            <CardFooter className="p-6 border-t bg-muted/10">
                {/* The ref is now on the direct child div */}
                {/* Use autoAlpha for GSAP control, initially hidden */}
                <div ref={resultRef} className="w-full" style={{ autoAlpha: 0, display: 'none' }}>
                    {isLoading && (
                        <div className="flex items-center justify-center text-muted-foreground">
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            <span>Generating summary...</span>
                        </div>
                    )}
                    {error && !isLoading && (
                        <Alert variant="destructive" className="bg-destructive/10 border-destructive/30">
                            <AlertCircle className="h-5 w-5" />
                            <AlertTitle className="font-semibold">Generation Failed</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    {summary && !isLoading && (
                        <Card className="w-full bg-gradient-to-br from-accent/10 via-background to-accent/5 border border-accent/20 shadow-inner">
                            <CardHeader>
                                <CardTitle className="text-xl flex items-center gap-2 text-primary">
                                    <Sparkles className="h-5 w-5 text-accent" /> AI Generated Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {/* Use whitespace-pre-line to respect newlines from AI */}
                                <p className="text-base text-foreground leading-relaxed whitespace-pre-line">{summary}</p>
                            </CardContent>
                        </Card>
                    )}
                 </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
