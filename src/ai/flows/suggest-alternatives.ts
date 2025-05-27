// src/ai/flows/suggest-alternatives.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting alternative ingredients with similar nutritional profiles.
 *
 * - suggestAlternatives - A function that suggests alternative ingredients based on user input.
 * - SuggestAlternativesInput - The input type for the suggestAlternatives function.
 * - SuggestAlternativesOutput - The output type for the suggestAlternatives function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestAlternativesInputSchema = z.object({
  ingredient: z
    .string()
    .describe('The ingredient for which to suggest alternatives.'),
  dietaryNeeds: z
    .string()
    .optional()
    .describe('The dietary needs or restrictions of the user.'),
  desiredNutrientProfile: z
    .string()
    .optional()
    .describe('The desired nutrient profile of the alternative ingredients.'),
});
export type SuggestAlternativesInput = z.infer<typeof SuggestAlternativesInputSchema>;

const SuggestAlternativesOutputSchema = z.object({
  alternatives: z
    .array(z.string())
    .describe('An array of alternative ingredients.'),
  reasoning: z
    .string()
    .describe('The reasoning behind suggesting these alternatives.'),
});
export type SuggestAlternativesOutput = z.infer<typeof SuggestAlternativesOutputSchema>;

export async function suggestAlternatives(input: SuggestAlternativesInput): Promise<SuggestAlternativesOutput> {
  return suggestAlternativesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestAlternativesPrompt',
  input: {schema: SuggestAlternativesInputSchema},
  output: {schema: SuggestAlternativesOutputSchema},
  prompt: `You are a nutritional expert. A user is looking for alternatives to an ingredient.

  Ingredient: {{{ingredient}}}

  Dietary Needs: {{{dietaryNeeds}}}

  Desired Nutrient Profile: {{{desiredNutrientProfile}}}

  Suggest a few alternative ingredients that would be suitable for the user, along with a brief explanation of why you are suggesting them. Format your response as a JSON object with "alternatives" key containing a list of alternative ingredients, and a "reasoning" key explaining the choice of alternatives.`,
});

const suggestAlternativesFlow = ai.defineFlow(
  {
    name: 'suggestAlternativesFlow',
    inputSchema: SuggestAlternativesInputSchema,
    outputSchema: SuggestAlternativesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
