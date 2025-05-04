// src/ai/flows/portfolio-summarizer.ts
'use server';

/**
 * @fileOverview AI agent that generates a personalized portfolio summary.
 *
 * - generatePortfolioSummary - A function that generates a portfolio summary tailored to a specific job description or networking opportunity.
 * - PortfolioSummaryInput - The input type for the generatePortfolioSummary function.
 * - PortfolioSummaryOutput - The return type for the generatePortfolioSummary function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {GitHubRepo, getGitHubRepos, getGitHubUserStats} from '@/services/github';

const PortfolioSummaryInputSchema = z.object({
  jobDescription: z
    .string()
    .describe('The job description or networking opportunity details.'),
  userSkills: z.array(z.string()).describe('A list of the user skills.'),
  githubUsername: z.string().describe('The user github username.'),
});
export type PortfolioSummaryInput = z.infer<typeof PortfolioSummaryInputSchema>;

const PortfolioSummaryOutputSchema = z.object({
  summary: z.string().describe('A personalized portfolio summary.'),
});
export type PortfolioSummaryOutput = z.infer<typeof PortfolioSummaryOutputSchema>;

export async function generatePortfolioSummary(input: PortfolioSummaryInput): Promise<PortfolioSummaryOutput> {
  return portfolioSummaryFlow(input);
}

const portfolioSummaryPrompt = ai.definePrompt({
  name: 'portfolioSummaryPrompt',
  input: {
    schema: z.object({
      jobDescription: z
        .string()
        .describe('The job description or networking opportunity details.'),
      userSkills: z.array(z.string()).describe('A list of the user skills.'),
      githubUsername: z.string().describe('The user github username.'),
      githubRepos: z.array(z.object({
        name: z.string(),
        description: z.string(),
        html_url: z.string(),
        language: z.string().nullable(),
        stargazers_count: z.number(),
      })).describe('A list of the user github repos.'),
      githubUserStats: z.object({
        public_repos: z.number(),
        followers: z.number(),
        following: z.number(),
      }).describe('The user github stats.'),
    }),
  },
  output: {
    schema: z.object({
      summary: z.string().describe('A personalized portfolio summary.'),
    }),
  },
  prompt: `You are a portfolio summary generator. You will generate a portfolio summary for a user based on their skills, their github repositories, and a job description.

Here are the user's skills:
{{#each userSkills}}
- {{this}}
{{/each}}

Here are the user's github repositories:
{{#each githubRepos}}
- {{this.name}}: {{this.description}} ({{this.language}})
{{/each}}

Here are the user's github stats:
- Public Repos: {{githubUserStats.public_repos}}
- Followers: {{githubUserStats.followers}}
- Following: {{githubUserStats.following}}

Here is the job description:
{{jobDescription}}

Generate a portfolio summary for the user that is tailored to the job description. Only include the projects that are relevant to the job description. The summary should be concise and engaging.
`,
});

const portfolioSummaryFlow = ai.defineFlow<
  typeof PortfolioSummaryInputSchema,
  typeof PortfolioSummaryOutputSchema
>({
  name: 'portfolioSummaryFlow',
  inputSchema: PortfolioSummaryInputSchema,
  outputSchema: PortfolioSummaryOutputSchema,
}, async (input) => {
  const {githubUsername, ...rest} = input;
  const githubRepos = await getGitHubRepos(githubUsername);
  const githubUserStats = await getGitHubUserStats(githubUsername);

  const {output} = await portfolioSummaryPrompt({
    ...rest,
    githubUsername,
    githubRepos,
    githubUserStats,
  });
  return output!;
});
