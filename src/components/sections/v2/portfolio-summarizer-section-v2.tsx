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
import { Loader2, Sparkles, AlertTriangle, Info, Github, Copy, CheckCircle, MessageSquareDashed } from 'lucide-react';
import { generatePortfolioSummary, PortfolioSummaryInput } from '@/ai/flows/portfolio-summarizer';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const formSchemaV2 = z.object({
  jobDescription: z.string()
    .min(30, { message: 'Please provide a job description or context (min 30 characters).' })
    .max(5000, { message: 'Input is too long (max 5000 characters).' }),
  userSkills: z.string()
    .min(10, { message: 'List key skills (min 10 characters).' })
    .max(1000, { message: 'Skills list is too long (max 1000 characters).' }),
  githubUsername: z.string()
    .min(1, { message: 'GitHub username is required.' })
    .regex(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i, { message: 'Invalid GitHub username.' })
    .max(39, { message: 'GitHub username is too long.' }),
});

export default function PortfolioSummarizerSectionV2() {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLHeadingElement>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchemaV2>>({
    resolver: zodResolver(formSchemaV2),
    defaultValues: {
      jobDescription: '',
      userSkills: 'Python, FastAPI, PostgreSQL, Docker, AWS, Microservices, REST APIs, CI/CD, React, Next.js, TypeScript, System Design, API Security',
      githubUsername: 'KDasaradha',
    },
  });

   useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from([headerRef.current, cardRef.current], {
                opacity: 0, y: 100, scale:0.95, duration: 1.2, ease: 'expo.out', stagger: 0.25,
                scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reset" }
            });
        }, sectionRef);
        return () => ctx.revert();
   }, []);

   useEffect(() => {
        const resultElement = resultRef.current;
        if (!resultElement) return;
        if (summary || error || isLoading) {
             gsap.timeline()
                 .set(resultElement, { display: 'block', autoAlpha: 0, y: 30 })
                 .to(resultElement, { autoAlpha: 1, y: 0, duration: 0.7, ease: 'expo.out', delay: 0.1 });
        } else {
             gsap.to(resultElement, { autoAlpha: 0, y: 30, duration: 0.4, ease: 'power1.in', onComplete: () => {
                 if (resultElement) resultElement.style.display = 'none';
             }});
        }
   }, [summary, error, isLoading]);

   useEffect(() => {
        if (isCopied) {
            const timer = setTimeout(() => setIsCopied(false), 2500);
            return () => clearTimeout(timer);
        }
   }, [isCopied]);

   const handleCopy = () => {
        if (summary) {
            navigator.clipboard.writeText(summary).then(() => {
                setIsCopied(true);
                toast({ title: "Copied to Clipboard!", description: "AI summary is ready to paste.", variant: "default", duration: 3000 });
            }).catch(err => {
                toast({ title: "Copy Failed", description: "Could not copy summary.", variant: "destructive" });
            });
        }
   };

  async function onSubmit(values: z.infer<typeof formSchemaV2>) {
    setIsLoading(true); setError(null); setSummary(null); setIsCopied(false);
    
    if (resultRef.current) {
        resultRef.current.style.display = 'block'; // Make sure it's visible for scroll
        gsap.to(window, { duration: 1, scrollTo: { y: resultRef.current, offsetY: 100 }, ease: "power2.inOut"});
    }

    const input: PortfolioSummaryInput = {
      jobDescription: values.jobDescription,
      userSkills: values.userSkills.split(',').map(skill => skill.trim()).filter(Boolean),
      githubUsername: values.githubUsername,
    };

    try {
      const result = await generatePortfolioSummary(input);
      if (result?.summary) {
          setSummary(result.summary);
          toast({ title: "✨ Summary Synthesized!", description: "Your AI-powered portfolio narrative is complete.", variant: "default", duration: 5000 });
      } else {
          setError("AI generation yielded an empty summary. Please refine inputs or retry.");
          toast({ title: "⚠️ Generation Anomaly", description: "AI returned an empty summary.", variant: "destructive" });
      }
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        let displayError = 'An unexpected error occurred during summary generation.';
        if (errorMessage.includes('fetch') || errorMessage.includes('NetworkError')) displayError = 'Network Issue: Unable to connect to AI or GitHub services.';
        else if (errorMessage.includes('GitHub') || errorMessage.includes('404')) displayError = `GitHub Access Error: Could not fetch data for "${input.githubUsername}". Please check username and profile visibility.`;
        else if (errorMessage.includes('rate limit') || errorMessage.includes('429')) displayError = 'API Limit Reached: Please wait a moment and try again.';
        setError(displayError);
        toast({ title: "❌ Generation Failed", description: displayError, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section ref={sectionRef} id="ai-summarizer-v2" className="py-32 md:py-48 bg-gradient-to-b from-purple-950 via-indigo-950 to-neutral-900 text-neutral-200 relative overflow-hidden">
       <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-br from-purple-600/20 via-transparent to-transparent -translate-y-1/3 blur-3xl opacity-70 -z-0"></div>
       <div className="container mx-auto px-4 z-10 relative">
        <h2 ref={headerRef} className="text-5xl md:text-7xl font-black mb-16 md:mb-24 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 tracking-tighter drop-shadow-lg">
          AI Portfolio Co-Pilot
        </h2>

        <div ref={cardRef} className="max-w-5xl mx-auto">
           <Card className="bg-neutral-800/40 border border-neutral-700 backdrop-blur-2xl shadow-2xl rounded-2xl overflow-hidden">
            <CardHeader className="p-7 md:p-10 border-b border-neutral-700/70 bg-neutral-800/20">
              <CardTitle className="text-3xl md:text-4xl font-bold flex items-center gap-3.5 text-neutral-100">
                  <Sparkles className="h-8 w-8 text-purple-400 animate-pulse" /> Personalized Summary Engine
              </CardTitle>
              <CardDescription className="text-base md:text-lg mt-3 text-neutral-400 leading-relaxed">
                Craft a compelling, AI-generated narrative of your skills and projects, tailored to specific job descriptions or networking opportunities. Input the context below for a bespoke summary.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-7 md:p-10">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
                  <FormField
                    control={form.control} name="jobDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xl font-semibold flex items-center gap-2.5 text-neutral-200 mb-2">
                          <Info className="h-6 w-6 text-purple-400" /> Target Role / Context
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Paste full job description, company info, or networking context (e.g., 'Lead Backend Engineer at Innovatech, focusing on distributed systems & cloud native solutions'). Deeper context = richer summary."
                            className="resize-y min-h-[180px] bg-neutral-900/60 border-neutral-600 text-neutral-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/60 transition-all duration-300 text-base shadow-inner rounded-lg p-4 placeholder:text-neutral-500"
                            {...field} aria-label="Job Description or Context Input"
                          />
                        </FormControl>
                         <FormDescription className="text-sm text-neutral-500 pt-2">
                             Provide the AI with detailed requirements for a precisely tailored summary.
                         </FormDescription>
                        <FormMessage className="text-red-400" />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                     <FormField
                        control={form.control} name="userSkills"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-xl font-semibold text-neutral-200 mb-2">Core Skills</FormLabel>
                            <FormControl>
                            <Input
                                placeholder="e.g., Python, System Design, AWS..."
                                className="bg-neutral-900/60 border-neutral-600 text-neutral-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/60 transition-all text-base shadow-inner rounded-lg p-4 h-12 placeholder:text-neutral-500"
                                {...field} aria-label="Your Key Skills Input"
                             />
                            </FormControl>
                            <FormDescription className="text-sm text-neutral-500 pt-2">Comma-separated list of your most relevant technical skills.</FormDescription>
                            <FormMessage className="text-red-400" />
                        </FormItem>
                        )}
                     />
                      <FormField
                        control={form.control} name="githubUsername"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-xl font-semibold flex items-center gap-2 text-neutral-200 mb-2">
                                <Github className="h-6 w-6 text-neutral-400" /> GitHub Profile
                            </FormLabel>
                            <FormControl>
                            <Input
                                placeholder="Your GitHub Username"
                                className="bg-neutral-900/60 border-neutral-600 text-neutral-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/60 transition-all text-base shadow-inner rounded-lg p-4 h-12 placeholder:text-neutral-500"
                                {...field} aria-label="GitHub Username Input"
                            />
                            </FormControl>
                            <FormDescription className="text-sm text-neutral-500 pt-2">Public repositories will be analyzed for project insights.</FormDescription>
                            <FormMessage className="text-red-400" />
                        </FormItem>
                        )}
                    />
                  </div>
                  <div className="flex justify-center pt-6">
                      <Button
                        type="submit" disabled={isLoading}
                        className="w-full max-w-md transition-all duration-300 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white hover:shadow-xl hover:shadow-purple-500/40 hover:-translate-y-1.5 transform hover:scale-105 active:scale-100 text-lg font-semibold py-3.5 rounded-lg"
                        size="lg" data-cursor-interactive
                      >
                        {isLoading ? (<><Loader2 className="mr-2.5 h-6 w-6 animate-spin" /> Crafting Narrative...</>) 
                                   : (<><Sparkles className="mr-2.5 h-6 w-6" /> Generate AI Summary</>)}
                      </Button>
                  </div>
                </form>
              </Form>
            </CardContent>

            <CardFooter className="p-7 md:p-10 border-t border-neutral-700/60 bg-neutral-900/30 min-h-[250px] flex items-center justify-center">
                <div ref={resultRef} className="w-full max-w-4xl opacity-0" style={{ display: 'none' }}>
                    {isLoading && (
                        <div className="flex flex-col items-center justify-center text-neutral-400 space-y-5 py-10 text-center">
                            <Loader2 className="h-12 w-12 animate-spin text-purple-400" />
                            <span className="text-xl font-medium">AI engine is warming up...</span>
                            <span className="text-sm max-w-md">Analyzing your profile against the requirements. This sophisticated process may take a few moments.</span>
                        </div>
                    )}
                    {error && !isLoading && (
                        <Alert variant="destructive" className="bg-red-900/30 border-red-700/50 shadow-lg text-center p-6 rounded-xl">
                            <div className="flex justify-center mb-3.5"><AlertTriangle className="h-10 w-10 text-red-400" /></div>
                            <AlertTitle className="font-bold text-2xl mb-2 text-red-300">Synthesis Failed</AlertTitle>
                            <AlertDescription className="text-base leading-relaxed text-red-400/90">{error}</AlertDescription>
                             <Button variant="outline" size="sm" onClick={() => form.handleSubmit(onSubmit)()} className="mt-6 border-red-500/70 hover:bg-red-700/30 text-red-300 hover:text-red-200 px-5 py-2.5">
                                Retry Generation
                             </Button>
                        </Alert>
                    )}
                    {summary && !isLoading && (
                        <Card className="w-full bg-gradient-to-br from-green-900/30 via-neutral-800/50 to-teal-900/30 border border-green-700/50 shadow-xl animate-result-in rounded-xl">
                            <CardHeader className="p-6 flex flex-row items-center justify-between border-b border-green-700/40">
                                <CardTitle className="text-2xl flex items-center gap-3 text-green-300 font-semibold">
                                    <CheckCircle className="h-7 w-7" /> Your AI-Crafted Summary
                                </CardTitle>
                                <Button variant="ghost" size="icon" onClick={handleCopy} className="text-neutral-400 hover:text-green-300 hover:bg-green-500/10 rounded-full" aria-label="Copy summary">
                                    {isCopied ? <CheckCircle className="h-5 w-5 text-green-400" /> : <Copy className="h-5 w-5" />}
                                </Button>
                            </CardHeader>
                            <CardContent className="p-6">
                                <p className="text-base md:text-lg text-neutral-200 leading-relaxed whitespace-pre-wrap p-5 bg-neutral-900/50 rounded-lg border border-neutral-700 shadow-inner">
                                   {summary}
                                </p>
                            </CardContent>
                            <CardFooter className="text-xs text-neutral-500 pt-5 pb-6 justify-center border-t border-green-700/30">
                                <MessageSquareDashed className="h-4 w-4 mr-1.5"/> Review and refine this AI-generated content before professional use.
                            </CardFooter>
                        </Card>
                    )}
                 </div>
            </CardFooter>
          </Card>
        </div>
      </div>
       <style jsx>{`
            .pattern-dots { /* Ensure this is distinct or well-scoped if used elsewhere */
                background-image: radial-gradient(hsl(var(--foreground)/0.05) 0.8px, transparent 0.8px);
                background-size: 20px 20px;
            }
            @keyframes resultIn {
                from { opacity: 0; transform: translateY(25px) scale(0.97); }
                to { opacity: 1; transform: translateY(0) scale(1); }
            }
            .animate-result-in {
                animation: resultIn 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            }
       `}</style>
    </section>
  );
}
