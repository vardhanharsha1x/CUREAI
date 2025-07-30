'use server';

/**
 * @fileOverview Provides remedy suggestions based on a given diagnosis.
 *
 * - suggestRemedy - A function that accepts a diagnosis and returns suggested remedies.
 * - SuggestRemedyInput - The input type for the suggestRemedy function.
 * - SuggestRemedyOutput - The return type for the suggestRemedy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRemedyInputSchema = z.object({
  diagnosis: z.string().describe('the diagnosis of the illness.'),
});
export type SuggestRemedyInput = z.infer<typeof SuggestRemedyInputSchema>;

const SuggestRemedyOutputSchema = z.object({
  remedies: z.string().describe('suggested remedies and initial cure steps.'),
});
export type SuggestRemedyOutput = z.infer<typeof SuggestRemedyOutputSchema>;

export async function suggestRemedy(input: SuggestRemedyInput): Promise<SuggestRemedyOutput> {
  return suggestRemedyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRemedyPrompt',
  input: {schema: SuggestRemedyInputSchema},
  output: {schema: SuggestRemedyOutputSchema},
  prompt: `based on the following diagnosis: {{{diagnosis}}}, suggest remedies and initial cure steps. the response should be in lowercase and formatted using markdown.

  use headings for different sections, for example: '### home remedies' or '### over-the-counter options'.
  use bullet points for list items.`,
});

const suggestRemedyFlow = ai.defineFlow(
  {
    name: 'suggestRemedyFlow',
    inputSchema: SuggestRemedyInputSchema,
    outputSchema: SuggestRemedyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
