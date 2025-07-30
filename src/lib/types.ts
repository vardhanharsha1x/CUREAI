export type DiagnosisResult = {
  diagnosis: string;
  remedy: string;
  dietPlan: string;
  category: 'urgent' | 'general' | 'minor';
};

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};
