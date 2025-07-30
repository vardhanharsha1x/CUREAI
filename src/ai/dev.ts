'use server';

import { config } from 'dotenv';
config();

import '@/ai/flows/diagnose-illness.ts';
import '@/ai/flows/ai-chat-support.ts';
import '@/ai/flows/suggest-remedy.ts';
import '@/ai/flows/propose-diet-plan.ts';
import '@/ai/flows/validate-symptoms.ts';
