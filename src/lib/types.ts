import type { AnalyzeIngredientsOutput } from '@/ai/flows/analyze-ingredients';

export type NutrientInfo = AnalyzeIngredientsOutput;

export interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
}
