'use server';

/**
 * @fileOverview AI agent that proposes a diet plan based on the identified illness.
 *
 * - proposeDietPlan - A function that handles the diet plan proposal process.
 * - ProposeDietPlanInput - The input type for the proposeDietPlan function.
 * - ProposeDietPlanOutput - The return type for the proposeDietPlan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProposeDietPlanInputSchema = z.object({
  illness: z.string().describe('the identified illness.'),
});
export type ProposeDietPlanInput = z.infer<typeof ProposeDietPlanInputSchema>;

const ProposeDietPlanOutputSchema = z.object({
  dietPlan: z.string().describe('a diet plan suitable for the identified illness.'),
});
export type ProposeDietPlanOutput = z.infer<typeof ProposeDietPlanOutputSchema>;

export async function proposeDietPlan(input: ProposeDietPlanInput): Promise<ProposeDietPlanOutput> {
  return proposeDietPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'proposeDietPlanPrompt',
  input: {schema: ProposeDietPlanInputSchema},
  output: {schema: ProposeDietPlanOutputSchema},
  prompt: `you are a nutritionist expert. based on the identified illness, propose a diet plan suitable for the user. the response should be in lowercase and formatted using markdown.

  use headings for different sections, for example: '### foods to eat' and '### foods to avoid'.
  use bullet points for list items.

  identified illness: {{{illness}}}`,
});

const proposeDietPlanFlow = ai.defineFlow(
  {
    name: 'proposeDietPlanFlow',
    inputSchema: ProposeDietPlanInputSchema,
    outputSchema: ProposeDietPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
