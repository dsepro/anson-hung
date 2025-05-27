
// Attempt to load .env variables immediately.
// Next.js should do this automatically for server-side code,
// but this is an extra measure to ensure it's loaded before Genkit initializes.
import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

const googleApiKeyFromEnv = process.env.GOOGLE_API_KEY;
const geminiApiKeyFromEnv = process.env.GEMINI_API_KEY;

// Logging for diagnostics - check your server console for these messages
console.log('[NutriTrack Genkit Init] Attempting to read GOOGLE_API_KEY from process.env:', googleApiKeyFromEnv ? '********** (found)' : 'Not found');
console.log('[NutriTrack Genkit Init] Attempting to read GEMINI_API_KEY from process.env:', geminiApiKeyFromEnv ? '********** (found)' : 'Not found');

const googleApiKey = googleApiKeyFromEnv || geminiApiKeyFromEnv;

if (!googleApiKey && process.env.NODE_ENV === 'development') {
  console.warn(
    '[NutriTrack Genkit Init] Warning: GOOGLE_API_KEY or GEMINI_API_KEY is not set in process.env. ' +
    'Ensure it is in your .env file (e.g., GOOGLE_API_KEY=your_key_here) for the Google AI features to work. ' +
    'The app will attempt to proceed, but AI calls may fail if the key is not accessible to Genkit at this point.'
  );
} else if (googleApiKey) {
  console.log('[NutriTrack Genkit Init] API Key found in process.env, will be passed to GoogleAI plugin if necessary.');
}


export const ai = genkit({
  plugins: [
    // Explicitly pass the API key if found.
    // The googleAI plugin will also try to find it from GEMINI_API_KEY or GOOGLE_API_KEY
    // environment variables if not passed directly.
    googleAI(googleApiKey ? { apiKey: googleApiKey } : undefined),
  ],
  // Default model for ai.generate if not specified elsewhere
  model: 'googleai/gemini-2.0-flash',
});
