'use server';

/**
 * @fileOverview This file defines a Genkit flow for diagnosing illnesses based on a set of symptoms.
 *
 * - diagnoseIllness - A function that takes a list of symptoms and returns a likely illness and its category.
 * - DiagnoseIllnessInput - The input type for the diagnoseIllness function.
 * - DiagnoseIllnessOutput - The return type for the diagnoseIllness function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DiagnoseIllnessInputSchema = z.object({
  symptoms: z
    .array(z.string())
    .describe('an array of symptoms selected by the user.'),
});
export type DiagnoseIllnessInput = z.infer<typeof DiagnoseIllnessInputSchema>;

const DiagnoseIllnessOutputSchema = z.object({
  likelyIllness: z
    .string()
    .describe('the most likely illness based on the provided symptoms.'),
  illnessCategory: z.enum(['urgent', 'general', 'minor']).describe('the severity category of the illness. urgent: requires immediate attention. general: common, non-critical illness. minor: lifestyle-related or mild issue.'),
});
export type DiagnoseIllnessOutput = z.infer<typeof DiagnoseIllnessOutputSchema>;

export async function diagnoseIllness(input: DiagnoseIllnessInput): Promise<DiagnoseIllnessOutput> {
  return diagnoseIllnessFlow(input);
}

const diagnoseIllnessPrompt = ai.definePrompt({
  name: 'diagnoseIllnessPrompt',
  input: {schema: DiagnoseIllnessInputSchema},
  output: {schema: DiagnoseIllnessOutputSchema},
  prompt: `given the following symptoms, identify the most likely illness and categorize its severity. the response should be in lowercase.

symptoms: {{{symptoms}}}

categorize the illness severity as 'urgent', 'general', or 'minor'.
- urgent: conditions that may require immediate medical attention (e.g., involving shortness of breath, severe pain, very high fever).
- general: common illnesses that are typically not life-threatening (e.g., common cold, flu, mild infections).
- minor: lifestyle-related or less severe issues (e.g., fatigue from lack of sleep, mild headache).

likely illness:`,
});

const diagnoseIllnessFlow = ai.defineFlow(
  {
    name: 'diagnoseIllnessFlow',
    inputSchema: DiagnoseIllnessInputSchema,
    outputSchema: DiagnoseIllnessOutputSchema,
  },
  async input => {
    const {output} = await diagnoseIllnessPrompt(input);
    return output!;
  }
);
