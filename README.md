# CureAI: AI-Powered Health Insights

CureAI is a modern, responsive web application designed to provide users with preliminary health insights based on their reported symptoms. By leveraging the power of generative AI, the app offers potential diagnoses, suggests remedies, provides dietary advice, and facilitates a follow-up conversation with an AI assistant.

The user interface is designed to be clean, intuitive, and accessible, with support for multiple languages and color schemes.

## Core Features

- **AI-Powered Diagnosis**: Users can select up to four symptoms from a predefined list to receive an AI-generated diagnosis, including a likely illness, suggested remedies, and a recommended diet plan.
- **Symptom Auto-Suggest**: To enhance user experience, symptom input fields feature real-time auto-suggestions, making it easier to find and select symptoms.
- **Advanced AI Chat**: Following a diagnosis, users can engage with an AI assistant for follow-up questions. The chat interface presents AI responses in a structured, article-like format with headings and bullet points.
- **Optional Authentication**: User registration and login are available but optional, allowing anyone to access the core features without an account.
- **Multi-Language Support**: The user interface can be switched between English, Hindi, and Telugu.
- **Dark/Light Mode**: A theme toggle in the header allows users to switch between dark and light modes for comfortable viewing.
- **Responsive Design**: The application is fully responsive and provides a seamless experience on both desktop and mobile devices.
- **Bento-Style Results UI**: Diagnosis results are displayed in a modern, visually balanced bento-box grid, organizing information clearly and effectively.
- **Contextual UI Helpers**: Features like tooltips on form elements and a "Last Checked" timestamp on results improve usability.

## Technology Stack

- **Frontend Framework**: Next.js 15 (using App Router, Server Components, and Server Actions)
- **Programming Language**: TypeScript
- **AI Integration**: Google Gemini via Genkit for diagnosis, remedy, diet plan, and chat generation.
- **UI Components**: ShadCN UI, a collection of accessible and composable components.
- **Styling**: Tailwind CSS for utility-first styling and theming.
- **Internationalization (i18n)**: `react-i18next` and `i18next` for UI language switching.
- **State Management**: React Hooks (`useState`, `useEffect`) and React Hook Form for form handling.
- **Authentication**: Firebase Authentication for optional user management.

## UI Overview

1.  **Home Page / Symptom Selector**: The main entry point features a clean card where users can select their symptoms. The dropdowns are enhanced with auto-complete functionality to streamline the process.
2.  **Results Page**: After submitting symptoms, the UI transitions to a bento-style grid.
    - The **left frame** displays the "Likely Diagnosis" and "Suggested Remedy" in separate cards.
    - The **right frame** shows the "Recommended Diet Plan," vertically aligned with the left frame for a balanced layout.
    - Below the grid, a **full-width AI chat interface** appears, pre-populated with an initial message based on the diagnosis, inviting the user to ask follow-up questions.
3.  **Header & Footer**: A consistent header provides navigation, language and theme toggles, and login/logout options. The footer includes links to informational pages like "About" and "Privacy Policy."
4.  **Informational Pages**: The app includes several static pages (`About`, `Contact`, `FAQ`, `Privacy`) with a clean, consistent, and professional design.
