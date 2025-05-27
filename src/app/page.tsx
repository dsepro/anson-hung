"use client";

import { useState, useEffect } from 'react';
import { analyzeIngredients } from '@/ai/flows/analyze-ingredients';
import type { NutrientInfo, Recipe } from '@/lib/types';
import { IngredientInputForm } from '@/components/nutritrack/ingredient-input-form';
import { SelectedIngredientsList } from '@/components/nutritrack/selected-ingredients-list';
import { NutritionDisplay } from '@/components/nutritrack/nutrition-display';
import { RecipeManager } from '@/components/nutritrack/recipe-manager';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Salad, Loader2, Github } from 'lucide-react';
import Link from 'next/link';

export default function NutriTrackPage() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [analysisResult, setAnalysisResult] = useState<NutrientInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // State to manage initial render and prevent hydration mismatch for localStorage access
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAddIngredient = (ingredient: string) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients((prev) => [...prev, ingredient]);
      toast({ title: "Ingredient Added", description: `"${ingredient}" added to the list.`, className: "bg-primary text-primary-foreground"});
    } else {
      toast({ title: "Already Added", description: `"${ingredient}" is already in the list.`, variant: "default"});
    }
  };

  const handleRemoveIngredient = (ingredientToRemove: string) => {
    setSelectedIngredients((prev) => prev.filter((ing) => ing !== ingredientToRemove));
    toast({ title: "Ingredient Removed", description: `"${ingredientToRemove}" removed from the list.`, variant: "destructive" });
  };

  const handleClearIngredients = () => {
    setSelectedIngredients([]);
    setAnalysisResult(null);
    setError(null);
    toast({ title: "List Cleared", description: "All ingredients have been removed." });
  };

  const handleAnalyzeIngredients = async () => {
    if (selectedIngredients.length === 0) {
      toast({ title: "No Ingredients", description: "Please add some ingredients to analyze.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const ingredientsString = selectedIngredients.join(', ');
      const result = await analyzeIngredients({ ingredients: ingredientsString });
      setAnalysisResult(result);
      toast({ title: "Analysis Complete!", description: "Nutritional information has been generated.", className: "bg-primary text-primary-foreground" });
    } catch (e) {
      console.error("Error analyzing ingredients:", e);
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred during analysis.";
      setError(`Failed to analyze ingredients. ${errorMessage}`);
      toast({ title: "Analysis Failed", description: `Could not retrieve nutritional data. ${errorMessage}`, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadRecipeIngredients = (ingredients: string[]) => {
    setSelectedIngredients(ingredients);
    setAnalysisResult(null); // Clear previous analysis when loading a recipe
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="py-6 px-4 sm:px-8 shadow-md bg-card">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Salad className="h-10 w-10 text-primary" />
            <h1 className="text-3xl font-bold text-primary">NutriTrack</h1>
          </div>
           <Button variant="outline" size="sm" asChild>
            <Link href="https://github.com/FirebaseExtended/genkit-nextjs-template" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              View on GitHub
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 sm:p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Panel */}
          <div className="w-full lg:w-2/5 xl:w-1/3 space-y-6">
            <IngredientInputForm onAddIngredient={handleAddIngredient} />
            <SelectedIngredientsList
              ingredients={selectedIngredients}
              onRemoveIngredient={handleRemoveIngredient}
              onClearIngredients={handleClearIngredients}
              onAnalyze={handleAnalyzeIngredients}
              isAnalyzing={isLoading}
            />
            {isClient && ( // Render RecipeManager only on client to use localStorage
               <RecipeManager
                currentIngredients={selectedIngredients}
                onLoadRecipe={handleLoadRecipeIngredients}
              />
            )}
          </div>

          {/* Right Panel */}
          <div className="w-full lg:w-3/5 xl:w-2/3">
            <NutritionDisplay analysis={analysisResult} isLoading={isLoading} error={error} />
          </div>
        </div>
      </main>

      <footer className="py-4 text-center text-sm text-muted-foreground border-t border-border mt-auto bg-card">
        <p>&copy; {new Date().getFullYear()} NutriTrack. Powered by Generative AI.</p>
      </footer>
      
      {isLoading && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <Loader2 className="h-12 w-12 text-primary animate-spin" />
          <p className="ml-4 text-lg text-primary">Analyzing Nutrition...</p>
        </div>
      )}
    </div>
  );
}
