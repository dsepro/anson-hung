
"use client";

import { useState, useEffect } from 'react';
import { analyzeIngredients } from '@/ai/flows/analyze-ingredients';
import type { NutrientInfo, Recipe } from '@/lib/types';
import { IngredientInputForm } from '@/components/nutritrack/ingredient-input-form';
import { SelectedIngredientsList } from '@/components/nutritrack/selected-ingredients-list';
import { NutritionDisplay } from '@/components/nutritrack/nutrition-display';
import { RecipeManager } from '@/components/nutritrack/recipe-manager';
import { LanguageSelector } from '@/components/nutritrack/language-selector';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Salad, Loader2, Github } from 'lucide-react';
import Link from 'next/link';

// Translations
const translations = {
  en: {
    headerTitle: "NutriTrack",
    githubButton: "View on GitHub",
    footerText1: "NutriTrack. Powered by Generative AI.",
    loadingText: "Analyzing Nutrition...",
    toastIngredientAddedTitle: "Ingredient Added",
    toastIngredientAddedDescription: (ingredient: string) => `"${ingredient}" added to the list.`,
    toastAlreadyAddedTitle: "Already Added",
    toastAlreadyAddedDescription: (ingredient: string) => `"${ingredient}" is already in the list.`,
    toastIngredientRemovedTitle: "Ingredient Removed",
    toastIngredientRemovedDescription: (ingredient: string) => `"${ingredient}" removed from the list.`,
    toastListClearedTitle: "List Cleared",
    toastListClearedDescription: "All ingredients have been removed.",
    toastNoIngredientsTitle: "No Ingredients",
    toastNoIngredientsDescription: "Please add some ingredients to analyze.",
    toastAnalysisCompleteTitle: "Analysis Complete!",
    toastAnalysisCompleteDescription: "Nutritional information has been generated.",
    toastAnalysisFailedTitle: "Analysis Failed",
    toastAnalysisFailedDescription: (errorMessage: string) => `Could not retrieve nutritional data. ${errorMessage}`,
    sampleIngredientsLoadedTitle: "Sample Ingredients Loaded",
    sampleIngredientsLoadedDescription: "A few sample ingredients have been added for you to try!",
  },
  zh: {
    headerTitle: "營養追踪",
    githubButton: "在 GitHub 上查看",
    footerText1: "營養追踪。由生成式人工智能驅動。",
    loadingText: "正在分析營養...",
    toastIngredientAddedTitle: "已添加食材",
    toastIngredientAddedDescription: (ingredient: string) => `"${ingredient}" 已添加到列表。`,
    toastAlreadyAddedTitle: "已存在",
    toastAlreadyAddedDescription: (ingredient: string) => `"${ingredient}" 已在列表中。`,
    toastIngredientRemovedTitle: "已移除食材",
    toastIngredientRemovedDescription: (ingredient: string) => `"${ingredient}" 已從列表中移除。`,
    toastListClearedTitle: "列表已清除",
    toastListClearedDescription: "所有食材均已移除。",
    toastNoIngredientsTitle: "沒有食材",
    toastNoIngredientsDescription: "請添加一些食材進行分析。",
    toastAnalysisCompleteTitle: "分析完成！",
    toastAnalysisCompleteDescription: "營養信息已生成。",
    toastAnalysisFailedTitle: "分析失敗",
    toastAnalysisFailedDescription: (errorMessage: string) => `無法檢索營養數據。 ${errorMessage}`,
    sampleIngredientsLoadedTitle: "已加載示例成分",
    sampleIngredientsLoadedDescription: "已為您添加了一些示例成分供您嘗試！",
  }
};

const initialSampleIngredients = ["1 large apple", "100g raw spinach", "1 slice whole wheat bread"];

export default function NutriTrackPage() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [analysisResult, setAnalysisResult] = useState<NutrientInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const [language, setLanguage] = useState<'en' | 'zh'>('en');

  const currentTranslations = translations[language];

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
    // Load sample ingredients only on initial client render and if no ingredients are already selected
    // (e.g. from a loaded recipe or previous session if we had persistence for selectedIngredients)
    if (selectedIngredients.length === 0) {
        setSelectedIngredients(initialSampleIngredients);
        // Use a timeout to ensure the toast appears after the initial UI is settled
        setTimeout(() => {
            toast({
                title: translations[language].sampleIngredientsLoadedTitle, // Use translations directly here as currentTranslations might not be updated yet
                description: translations[language].sampleIngredientsLoadedDescription,
                className: "bg-accent text-accent-foreground"
            });
        }, 100);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  useEffect(() => {
    // Update toast language if language changes after sample ingredients loaded
    if (selectedIngredients.length === initialSampleIngredients.length && selectedIngredients.every((val, index) => val === initialSampleIngredients[index])) {
        // This is a simple check, could be improved if needed
    }
  }, [language, selectedIngredients, toast]);


  const handleAddIngredient = (ingredient: string) => {
    if (!selectedIngredients.includes(ingredient)) {
      setSelectedIngredients((prev) => [...prev, ingredient]);
      toast({ title: currentTranslations.toastIngredientAddedTitle, description: currentTranslations.toastIngredientAddedDescription(ingredient), className: "bg-primary text-primary-foreground"});
    } else {
      toast({ title: currentTranslations.toastAlreadyAddedTitle, description: currentTranslations.toastAlreadyAddedDescription(ingredient), variant: "default"});
    }
  };

  const handleRemoveIngredient = (ingredientToRemove: string) => {
    setSelectedIngredients((prev) => prev.filter((ing) => ing !== ingredientToRemove));
    toast({ title: currentTranslations.toastIngredientRemovedTitle, description: currentTranslations.toastIngredientRemovedDescription(ingredientToRemove), variant: "destructive" });
  };

  const handleClearIngredients = () => {
    setSelectedIngredients([]);
    setAnalysisResult(null);
    setError(null);
    toast({ title: currentTranslations.toastListClearedTitle, description: currentTranslations.toastListClearedDescription });
  };

  const handleAnalyzeIngredients = async () => {
    if (selectedIngredients.length === 0) {
      toast({ title: currentTranslations.toastNoIngredientsTitle, description: currentTranslations.toastNoIngredientsDescription, variant: "destructive" });
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const ingredientsString = selectedIngredients.join(', ');
      const result = await analyzeIngredients({ ingredients: ingredientsString });
      setAnalysisResult(result);
      toast({ title: currentTranslations.toastAnalysisCompleteTitle, description: currentTranslations.toastAnalysisCompleteDescription, className: "bg-primary text-primary-foreground" });
    } catch (e) {
      console.error("Error analyzing ingredients:", e);
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred during analysis.";
      setError(`Failed to analyze ingredients. ${errorMessage}`);
      toast({ title: currentTranslations.toastAnalysisFailedTitle, description: currentTranslations.toastAnalysisFailedDescription(errorMessage), variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadRecipeIngredients = (ingredients: string[]) => {
    setSelectedIngredients(ingredients);
    setAnalysisResult(null); 
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="py-6 px-4 sm:px-8 shadow-md bg-card">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Salad className="h-10 w-10 text-primary" />
            <h1 className="text-3xl font-bold text-primary">{currentTranslations.headerTitle}</h1>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <LanguageSelector language={language} onLanguageChange={setLanguage} />
            <Button variant="outline" size="sm" asChild>
              <Link href="https://github.com/FirebaseExtended/genkit-nextjs-template" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                {currentTranslations.githubButton}
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 sm:p-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/5 xl:w-1/3 space-y-6">
            <IngredientInputForm onAddIngredient={handleAddIngredient} /> 
            <SelectedIngredientsList
              ingredients={selectedIngredients}
              onRemoveIngredient={handleRemoveIngredient}
              onClearIngredients={handleClearIngredients}
              onAnalyze={handleAnalyzeIngredients}
              isAnalyzing={isLoading}
            />
            {isClient && ( 
               <RecipeManager
                currentIngredients={selectedIngredients}
                onLoadRecipe={handleLoadRecipeIngredients}
              />
            )}
          </div>

          <div className="w-full lg:w-3/5 xl:w-2/3">
            <NutritionDisplay analysis={analysisResult} isLoading={isLoading} error={error} />
          </div>
        </div>
      </main>

      <footer className="py-4 text-center text-sm text-muted-foreground border-t border-border mt-auto bg-card">
        <p>&copy; {new Date().getFullYear()} {currentTranslations.footerText1}</p>
      </footer>
      
      {isLoading && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
          <Loader2 className="h-12 w-12 text-primary animate-spin" />
          <p className="ml-4 text-lg text-primary">{currentTranslations.loadingText}</p>
        </div>
      )}
    </div>
  );
}
