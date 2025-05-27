
// This file is machine-generated - edit with caution!
'use server';
/**
 * @fileOverview A flow to analyze a list of ingredients and provide a nutritional breakdown.
 *
 * - analyzeIngredients - A function that takes a list of ingredients and returns a nutritional breakdown.
 * - AnalyzeIngredientsInput - The input type for the analyzeIngredients function.
 * - AnalyzeIngredientsOutput - The return type for the analyzeIngredients function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeIngredientsInputSchema = z.object({
  ingredients: z.string().describe('A comma-separated list of ingredients to analyze.'),
});
export type AnalyzeIngredientsInput = z.infer<typeof AnalyzeIngredientsInputSchema>;

const AnalyzeIngredientsOutputSchema = z.object({
  calories: z.number().describe('The total number of calories in the combined ingredients.'),
  protein: z.number().describe('The total amount of protein in grams in the combined ingredients.'),
  fat: z.number().describe('The total amount of fat in grams in the combined ingredients.'),
  carbohydrates: z.number().describe('The total amount of carbohydrates in grams in the combined ingredients.'),
  fiber: z.number().describe('The total amount of fiber in grams in the combined ingredients.'),
  sugar: z.number().describe('The total amount of sugar in grams in the combined ingredients.'),
  vitaminA: z.number().describe('The total amount of Vitamin A in the combined ingredients, in mcg RAE (numeric value only).'),
  vitaminC: z.number().describe('The total amount of Vitamin C in the combined ingredients, in mg (numeric value only).'),
  calcium: z.number().describe('The total amount of Calcium in the combined ingredients, in mg (numeric value only).'),
  iron: z.number().describe('The total amount of Iron in the combined ingredients, in mg (numeric value only).'),
  otherNutrients: z
    .string()
    .optional()
    .describe('Any other relevant nutritional information about the ingredients.'),
});
export type AnalyzeIngredientsOutput = z.infer<typeof AnalyzeIngredientsOutputSchema>;

export async function analyzeIngredients(input: AnalyzeIngredientsInput): Promise<AnalyzeIngredientsOutput> {
  return analyzeIngredientsFlow(input);
}

const analyzeIngredientsPrompt = ai.definePrompt({
  name: 'analyzeIngredientsPrompt',
  input: {schema: AnalyzeIngredientsInputSchema},
  output: {schema: AnalyzeIngredientsOutputSchema},
  prompt: `You are a nutritionist providing a nutritional breakdown of a list of ingredients.

  Analyze the following ingredients and provide a comprehensive nutritional breakdown, including calories, macros (protein, fat, carbohydrates), fiber, sugar, and key vitamins and minerals (Vitamin A, Vitamin C, Calcium, Iron). Ensure Vitamin A, Vitamin C, Calcium, and Iron are provided as numeric values based on their respective units (mcg RAE for Vitamin A; mg for Vitamin C, Calcium, Iron). Also include any other relevant nutritional information.

  Ingredients: {{{ingredients}}}
  `,
});

const analyzeIngredientsFlow = ai.defineFlow(
  {
    name: 'analyzeIngredientsFlow',
    inputSchema: AnalyzeIngredientsInputSchema,
    outputSchema: AnalyzeIngredientsOutputSchema,
  },
  async input => {
    const {output} = await analyzeIngredientsPrompt(input);
    return output!;
  }
);
