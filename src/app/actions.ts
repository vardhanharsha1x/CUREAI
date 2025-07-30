'use server';

import { diagnoseIllness } from '@/ai/flows/diagnose-illness';
import { suggestRemedy } from '@/ai/flows/suggest-remedy';
import { proposeDietPlan } from '@/ai/flows/propose-diet-plan';
import { aiChatSupport } from '@/ai/flows/ai-chat-support';
import { validateSymptoms as validateSymptomsFlow } from '@/ai/flows/validate-symptoms';
import type { DiagnosisResult, ChatMessage } from '@/lib/types';


export async function getDiagnosis(
  symptoms: string[]
): Promise<DiagnosisResult> {
  if (!symptoms || symptoms.length < 3) {
    throw new Error('at least three symptoms are required for diagnosis.');
  }

  try {
    const { likelyIllness, illnessCategory } = await diagnoseIllness({ symptoms });

    if (!likelyIllness) {
      throw new Error('could not determine a likely illness.');
    }

    const [remedyResult, dietResult] = await Promise.all([
      suggestRemedy({ diagnosis: likelyIllness }),
      proposeDietPlan({ illness: likelyIllness }),
    ]);

    return {
      diagnosis: likelyIllness,
      remedy: remedyResult.remedies,
      dietPlan: dietResult.dietPlan,
      category: illnessCategory,
    };
  } catch (error: any) {
    console.error('error in getdiagnosis action:', error);
    if (error.message && error.message.includes('503')) {
      throw new Error('the ai model is currently overloaded. please try again in a few moments.');
    }
    throw new Error(error.message || 'an unexpected error occurred while processing your request.');
  }
}

export async function validateSymptoms(
  symptoms: string[]
): Promise<{areUnusual: boolean; reasoning: string}> {
  try {
    const result = await validateSymptomsFlow({symptoms});
    return result;
  } catch (error: any) {
    console.error('error in validatesymptoms action:', error);
    // In case of error, we don't want to block the user.
    return {areUnusual: false, reasoning: ''};
  }
}

export async function getChatResponse(
  message: string,
  history: ChatMessage[],
) {
  try {
    const response = await aiChatSupport({
      message,
      previousMessages: history,
    });

    return response;
  } catch (error) {
    console.error('error in getchatresponse action:', error);
    throw new Error('failed to get response from ai chat support.');
  }
}
