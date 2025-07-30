'use server';

/**
 * @fileOverview Validates if a combination of symptoms is unusual or conflicting.
 *
 * - validateSymptoms - A function that checks for unusual symptom combinations.
 * - ValidateSymptomsInput - The input type for the validateSymptoms function.
 * - ValidateSymptomsOutput - The return type for the validateSymptoms function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ValidateSymptomsInputSchema = z.object({
  symptoms: z.array(z.string()).describe('A list of symptoms to validate.'),
});
export type ValidateSymptomsInput = z.infer<typeof ValidateSymptomsInputSchema>;

const ValidateSymptomsOutputSchema = z.object({
  areUnusual: z
    .boolean()
    .describe('Whether the combination of symptoms is unusual or conflicting.'),
  reasoning: z
    .string()
    .describe('A brief, user-friendly explanation if the symptoms are unusual.'),
});
export type ValidateSymptomsOutput = z.infer<typeof ValidateSymptomsOutputSchema>;

export async function validateSymptoms(
  input: ValidateSymptomsInput
): Promise<ValidateSymptomsOutput> {
  return validateSymptomsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'validateSymptomsPrompt',
  input: {schema: ValidateSymptomsInputSchema},
  output: {schema: ValidateSymptomsOutputSchema},
  prompt: `You are a medical expert system. Your task is to analyze a list of symptoms and determine if the combination is medically unusual, conflicting, or unlikely to occur together.

Symptoms: {{{symptoms}}}

- If the combination is plausible, set 'areUnusual' to false.
- If the combination is unusual or conflicting, set 'areUnusual' to true and provide a brief, simple, user-friendly 'reasoning' (max 20 words). For example: "It's uncommon for someone to experience both a high fever and a complete loss of smell without other respiratory signs."

Do not provide a diagnosis. Only evaluate the plausibility of the symptom combination. The response should be in lowercase.`,
});

const validateSymptomsFlow = ai.defineFlow(
  {
    name: 'validateSymptomsFlow',
    inputSchema: ValidateSymptomsInputSchema,
    outputSchema: ValidateSymptomsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
