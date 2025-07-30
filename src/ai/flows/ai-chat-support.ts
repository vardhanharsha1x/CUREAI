'use server';

/**
 * @fileOverview Provides an AI chatbot flow for follow-up questions and proactive suggestions related to health and wellness.
 *
 * - aiChatSupport - A function that handles the AI chat support process.
 * - AIChatSupportInput - The input type for the aiChatSupport function.
 * - AIChatSupportOutput - The return type for the aiChatSupport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChatSupportInputSchema = z.object({
  message: z.string().describe('the user message to the chatbot.'),
  previousMessages: z.array(z.object({
    role: z.enum(['user', 'assistant']).describe('the role of the message sender.'),
    content: z.string().describe('the content of the message.'),
  })).optional().describe('the list of previous messages in the conversation.'),
});
export type AIChatSupportInput = z.infer<typeof AIChatSupportInputSchema>;

const AIChatSupportOutputSchema = z.object({
  response: z.string().describe('the chatbot response to the user message, formatted in markdown.'),
  suggestedQuestions: z.array(z.string()).describe('suggested follow-up questions for the user.'),
});
export type AIChatSupportOutput = z.infer<typeof AIChatSupportOutputSchema>;

export async function aiChatSupport(input: AIChatSupportInput): Promise<AIChatSupportOutput> {
  return aiChatSupportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatSupportPrompt',
  input: {schema: AIChatSupportInputSchema},
  output: {schema: AIChatSupportOutputSchema},
  prompt: `you are a helpful ai chatbot providing health and wellness information. all your responses, including suggested questions, must be in lowercase.

  respond to the user's message, taking into account the previous messages in the conversation.
  provide helpful and informative answers in lowercase and formatted using markdown. use headings and bullet points where appropriate.

  after responding, suggest 3 follow-up questions that the user might find helpful, tailored to their specific situation and the conversation history.  be proactive in suggesting relevant checks or actions the user could take. the suggested questions must also be in lowercase.

  previous messages:
  {{#each previousMessages}}
  {{role}}: {{content}}
  {{/each}}

  user message: {{message}}

  your response should be structured as a json object.
  `,
});

const aiChatSupportFlow = ai.defineFlow(
  {
    name: 'aiChatSupportFlow',
    inputSchema: AIChatSupportInputSchema,
    outputSchema: AIChatSupportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
