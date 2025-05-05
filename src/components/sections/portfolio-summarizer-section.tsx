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
import { Loader2, Sparkles, AlertCircle, Info, Github, Copy, Check } from 'lucide-react'; // Added Copy, Check
import { generatePortfolioSummary, PortfolioSummaryInput } from '@/ai/flows/portfolio-summarizer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useToast } from "@/hooks/use-toast";

gsap.registerPlugin(ScrollTrigger);

// Schema with more professional validation messages
const formSchema = z.object({
  jobDescription: z.string()
    .min(50, { message: 'Please provide sufficient detail (min 50 characters) for effective tailoring.' })
    .max(5000, { message: 'Input exceeds maximum length (5000 characters).' }),
  userSkills: z.string()
    .min(15, { message: 'List key technical skills relevant to your target role (min 15 characters).' })
    .max(1000, { message: 'Skills list exceeds maximum length (1000 characters).' }),
  githubUsername: z.string()
    .min(1, { message: 'GitHub username is required.' })
    .regex(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i, { message: 'Invalid GitHub username format.' })
    .max(39, { message: 'GitHub username exceeds maximum length.' }),
});

export default function PortfolioSummarizerSection() {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false); // State for copy button
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null); // Ref for header
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobDescription: '',
      userSkills: 'Python, FastAPI, PostgreSQL, SQLAlchemy, Docker, Microservices, REST APIs, CI/CD, AWS (EC2, S3, Lambda), Git, Agile Methodologies, React, Next.js, TypeScript', // Updated default skills
      githubUsername: 'KDasaradha',
    },
  });

   useEffect(() => {
        const ctx = gsap.context(() => {
             // Animate section header and card container
             gsap.from([headerRef.current, cardRef.current], { // Target header and card
                opacity: 0,
                y: 80, // Increased offset
                duration: 1.1, // Longer duration
                ease: 'power3.out',
                stagger: 0.3, // Stagger header and card
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
        const resultElement = resultRef.current;
        if (!resultElement) return;

        if (summary || error || isLoading) { // Animate in if loading, summary, or error
             gsap.timeline()
                 .set(resultElement, { display: 'block', autoAlpha: 0 }) // Ensure visible before animating
                 .to(resultElement, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.1 });
        } else {
            // Animate out if none of the states are active
             gsap.to(resultElement, { autoAlpha: 0, y: 20, duration: 0.4, ease: 'power1.in', onComplete: () => {
                 if (resultElement) resultElement.style.display = 'none'; // Hide after animating out
             }});
        }
   }, [summary, error, isLoading]);


   // Reset copy button state after a delay
   useEffect(() => {
        if (isCopied) {
            const timer = setTimeout(() => {
                setIsCopied(false);
            }, 2000); // Reset after 2 seconds
            return () => clearTimeout(timer);
        }
   }, [isCopied]);


   const handleCopy = () => {
        if (summary) {
            navigator.clipboard.writeText(summary)
                .then(() => {
                    setIsCopied(true);
                    toast({
                        title: "Summary Copied!",
                        description: "The AI-generated summary is copied to your clipboard.",
                        variant: "default",
                    });
                })
                .catch(err => {
                    console.error("Failed to copy text: ", err);
                    toast({
                        title: "Copy Failed",
                        description: "Could not copy the summary to clipboard.",
                        variant: "destructive",
                    });
                });
        }
   };


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    setSummary(null);
    setIsCopied(false); // Reset copy state on new generation
    console.log("Form values submitted:", values);

    // Ensure result area is visible before scrolling
    if (resultRef.current) {
        resultRef.current.style.display = 'block';
        gsap.to(resultRef.current, { autoAlpha: 1, duration: 0.1 }); // Quick fade-in if hidden
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }


    const input: PortfolioSummaryInput = {
      jobDescription: values.jobDescription,
      userSkills: values.userSkills.split(',').map(skill => skill.trim()).filter(Boolean),
      githubUsername: values.githubUsername,
    };
    console.log("Prepared input for AI flow:", input);

    try {
      const result = await generatePortfolioSummary(input);
      console.log("Received result from AI flow:", result);

      if (result?.summary) {
          setSummary(result.summary);
          console.log("Summary set successfully.");
          toast({
            title: "✨ Summary Generated Successfully!",
            description: "Your tailored portfolio summary is ready below.",
            variant: "default",
            duration: 5000, // Show for 5 seconds
          });
          // Optionally reset only job description for convenience
          // form.resetField("jobDescription");
      } else {
          const errMsg = "The AI generated an empty or incomplete summary. Please refine your input or try again.";
          console.error(errMsg, result);
          setError(errMsg);
          toast({
            title: "⚠️ Generation Issue",
            description: errMsg,
            variant: "destructive",
          });
      }

    } catch (err) {
        // Refined Error Handling
        let displayError = 'An unexpected error occurred while generating the summary.';
        const errorMessage = err instanceof Error ? err.message.toLowerCase() : '';
        console.error("Error generating summary:", errorMessage, err);

        if (errorMessage.includes('failed to fetch') || errorMessage.includes('network error')) {
             displayError = 'Network Error: Could not connect to the AI service or GitHub. Please check your connection.';
        } else if (errorMessage.includes('github user') || errorMessage.includes('404') || errorMessage.includes('not found')) {
             displayError = `GitHub Error: Could not fetch data for user "${input.githubUsername}". Please verify the username and ensure the profile is public.`;
        } else if (errorMessage.includes('rate limit') || errorMessage.includes('429')) {
             displayError = 'API Rate Limit Exceeded: Please wait a few moments before trying again.';
        } else if (errorMessage.includes('api key') || errorMessage.includes('permission denied') || errorMessage.includes('401') || errorMessage.includes('403')) {
             displayError = 'Authentication Error: There might be an issue with the API configuration. Please contact the administrator.';
        } else if (errorMessage.includes('invalid input') || errorMessage.includes('schema validation failed')) {
             displayError = 'Input Error: The provided information might be incomplete or incorrectly formatted. Please review and resubmit.';
        } else if (errorMessage) {
             displayError = `An error occurred: ${err instanceof Error ? err.message : 'Unknown error'}`; // Show specific message if available
        }

        setError(displayError);
        toast({
            title: "❌ Summary Generation Failed",
            description: displayError,
            variant: "destructive",
        });

    } finally {
      setIsLoading(false);
      console.log("Loading state set to false.");
    }
  }

  return (
    <section ref={sectionRef} id="ai-summarizer" className="bg-gradient-to-b from-background via-secondary/20 to-background relative py-32 md:py-40"> {/* Adjusted padding */}
       {/* Enhanced Blob - Positioned differently */}
       <div className="blob opacity-20 dark:opacity-30 -z-10" style={{ top: '30%', left: '15%', width: '65vw', height: '65vw', animationDuration: '32s, 24s', filter: 'blur(130px)', background: 'radial-gradient(circle, hsl(var(--accent) / 0.25), transparent 70%)' }} />
      <div className="container mx-auto px-4 z-10 relative">
        <h2
          ref={headerRef} // Attach ref
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-16 md:mb-20 text-center gradient-text flex items-center justify-center gap-4" // Increased margin
        >
          <Sparkles className="h-9 w-9 opacity-90" /> AI Portfolio Assistant
        </h2>

        <div ref={cardRef} className="max-w-4xl mx-auto">
           <Card className="shadow-xl border border-border bg-card/90 backdrop-blur-lg overflow-hidden">
            <CardHeader className="p-6 md:p-8 border-b bg-muted/40">
              <CardTitle className="text-2xl md:text-3xl font-semibold">Generate Tailored Summary</CardTitle>
              <CardDescription className="text-base mt-2 leading-relaxed"> {/* Added leading-relaxed */}
                Leverage AI to automatically generate a concise, impactful summary highlighting relevant skills and projects based on a specific job description or networking context. Provide the details below for a personalized result.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="jobDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-medium flex items-center gap-2.5"> {/* Increased gap */}
                          <Info className="h-5 w-5 text-primary/80" /> Target Role / Context
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Paste the full job description, company information, or describe the networking opportunity (e.g., 'Senior Backend Engineer role at TechCorp focusing on Python and AWS'). More context yields a better summary."
                            className="resize-y min-h-[200px] bg-background/85 focus:border-accent focus:ring-2 focus:ring-accent/50 transition-all duration-300 text-base shadow-inner" // Enhanced styles
                            {...field}
                            aria-label="Job Description or Context Input"
                          />
                        </FormControl>
                         <FormDescription className="text-sm pt-1.5"> {/* Adjusted padding */}
                             Provide the requirements or focus area for the AI to tailor the summary effectively.
                         </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <FormField
                        control={form.control}
                        name="userSkills"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-lg font-medium">Core Technical Skills</FormLabel>
                            <FormControl>
                            <Input
                                placeholder="e.g., Python, FastAPI, AWS, Microservices, Docker..."
                                className="bg-background/85 focus:border-accent focus:ring-2 focus:ring-accent/50 transition-all duration-300 text-base shadow-inner" // Enhanced styles
                                {...field}
                                aria-label="Your Key Skills Input"
                             />
                            </FormControl>
                            <FormDescription className="text-sm pt-1.5">
                                Comma-separated list of your most relevant skills.
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
                                placeholder="Your GitHub Handle"
                                className="bg-background/85 focus:border-accent focus:ring-2 focus:ring-accent/50 transition-all duration-300 text-base shadow-inner" // Enhanced styles
                                {...field}
                                aria-label="GitHub Username Input"
                            />
                            </FormControl>
                            <FormDescription className="text-sm pt-1.5">
                                Used to fetch public repositories for analysis.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                  </div>
                  <div className="flex justify-center pt-5"> {/* Increased padding */}
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full max-w-sm transition-all duration-300 bg-gradient-to-r from-primary to-accent text-primary-foreground hover:shadow-xl hover:-translate-y-1.5 transform hover:scale-[1.03] active:scale-[1.01] text-base font-semibold py-3" // Enhanced button style & padding
                        size="lg"
                        data-cursor-interactive
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2.5 h-5 w-5 animate-spin" /> {/* Increased margin */}
                            Generating Summary...
                          </>
                        ) : (
                           <>
                            <Sparkles className="mr-2.5 h-5 w-5" /> {/* Increased margin */}
                            Generate AI Summary
                           </>
                        )}
                      </Button>
                  </div>
                </form>
              </Form>
            </CardContent>

             {/* Results Area */}
            <CardFooter className="p-6 md:p-8 border-t bg-muted/30 min-h-[200px] flex items-center justify-center"> {/* Adjusted background & min-height */}
                <div ref={resultRef} className="w-full max-w-3xl opacity-0" style={{ display: 'none' }}> {/* Centered results */}
                    {/* Loading State */}
                    {isLoading && (
                        <div className="flex flex-col items-center justify-center text-muted-foreground space-y-4 py-8 text-center">
                            <Loader2 className="h-10 w-10 animate-spin text-accent" />
                            <span className="text-lg font-medium">Crafting your personalized narrative...</span>
                            <span className="text-sm">Analyzing your profile and the requirements. This may take a moment.</span>
                        </div>
                    )}
                    {/* Error State */}
                    {error && !isLoading && (
                        <Alert variant="destructive" className="bg-destructive/10 border-destructive/40 shadow-md text-center"> {/* Centered text */}
                            <div className="flex justify-center mb-3"> {/* Center icon */}
                               <AlertCircle className="h-7 w-7" />
                            </div>
                            <AlertTitle className="font-semibold text-xl mb-2">Generation Failed</AlertTitle> {/* Larger title */}
                            <AlertDescription className="mt-1 text-base leading-relaxed">{error}</AlertDescription>
                             <Button variant="outline" size="sm" onClick={() => form.handleSubmit(onSubmit)()} className="mt-5 border-destructive/50 hover:bg-destructive/20 text-destructive hover:text-destructive">
                                Retry Generation
                             </Button>
                        </Alert>
                    )}
                    {/* Success State */}
                    {summary && !isLoading && (
                        <Card className="w-full bg-gradient-to-br from-green-50 via-white to-teal-50 dark:from-green-950/30 dark:via-background dark:to-teal-950/30 border border-green-200 dark:border-green-800/50 shadow-lg animate-fade-in">
                            <CardHeader className="pb-4 flex flex-row items-start justify-between"> {/* Adjusted padding */}
                                <div>
                                     <CardTitle className="text-xl md:text-2xl flex items-center gap-2.5 text-green-800 dark:text-green-300 font-semibold">
                                        <Sparkles className="h-6 w-6 text-current" /> AI-Generated Summary
                                     </CardTitle>
                                      <CardDescription className="text-sm text-green-700 dark:text-green-400 mt-1">Tailored based on your input.</CardDescription>
                                </div>
                                {/* Copy Button */}
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={handleCopy}
                                    className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full"
                                    aria-label="Copy summary"
                                >
                                    {isCopied ? <Check className="h-5 w-5 text-green-600" /> : <Copy className="h-5 w-5" />}
                                </Button>
                            </CardHeader>
                            <CardContent className="pt-2"> {/* Adjusted padding */}
                                <p className="text-base md:text-lg text-foreground leading-relaxed whitespace-pre-wrap p-4 bg-background/50 rounded-md border border-border/50"> {/* Added background & border */}
                                   {summary}
                                </p>
                            </CardContent>
                            <CardFooter className="text-xs text-muted-foreground pt-4 justify-center">
                                Note: Review and refine the AI-generated content before use.
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
                from { opacity: 0; transform: translateY(15px) scale(0.98); }
                to { opacity: 1; transform: translateY(0) scale(1); }
            }
            .animate-fade-in {
                animation: fadeIn 0.6s ease-out forwards;
            }
       `}</style>
    </section>
  );
}
