import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

const googleApiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;

if (!googleApiKey && process.env.NODE_ENV === 'development') {
  console.warn(
    '[App Prototyper Tip] GOOGLE_API_KEY or GEMINI_API_KEY is not set. ' +
    'Ensure it is in your .env file (e.g., GOOGLE_API_KEY=your_key_here) for the Google AI features to work. ' +
    'The app will attempt to proceed, but AI calls may fail if the key is not accessible to Genkit.'
  );
}

export const ai = genkit({
  plugins: [
    // Explicitly pass the API key if found.
    // The googleAI plugin will also try to find it from GEMINI_API_KEY or GOOGLE_API_KEY
    // environment variables if not passed directly, but being explicit can help in some environments.
    googleAI(googleApiKey ? { apiKey: googleApiKey } : undefined),
  ],
  // Default model for ai.generate if not specified elsewhere
  model: 'googleai/gemini-2.0-flash',
});
