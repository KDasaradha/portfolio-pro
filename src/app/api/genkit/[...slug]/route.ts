// src/app/api/genkit/[...slug]/route.ts
import { genkitApi } from '@genkit-ai/next/server';
import '@/ai/flows/portfolio-summarizer.ts'; // Import your flows

export const { GET, POST } = genkitApi();
