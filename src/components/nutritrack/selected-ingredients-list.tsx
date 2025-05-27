
"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Trash2, Zap } from 'lucide-react';

interface SelectedIngredientsListProps {
  ingredients: string[];
  onRemoveIngredient: (ingredient: string) => void;
  onClearIngredients: () => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

// This component is not directly used in the new dashboard page structure.
// Its functionality might be integrated into how "Today's Meals" are managed.
export function SelectedIngredientsList({
  ingredients,
  onRemoveIngredient,
  onClearIngredients,
  onAnalyze,
  isAnalyzing,
}: SelectedIngredientsListProps) {
  return (
    <Card className="mb-4 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg">Selected Ingredients</CardTitle>
      </CardHeader>
      <CardContent>
        {ingredients.length > 0 ? (
          <ScrollArea className="h-40_max-h-[200px] _pr-3 mb-4_">
            <ul className="space-y-2 max-h-[150px] overflow-y-auto pr-2">
              {ingredients.map((ingredient, index) => (
                <li
                  key={`${ingredient}-${index}`}
                  className="flex justify-between items-center p-2 bg-secondary/50 rounded-md text-sm"
                >
                  <span>{ingredient}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveIngredient(ingredient)}
                    className="h-6 w-6"
                    aria-label={`Remove ${ingredient}`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </ScrollArea>
        ) : (
          <p className="text-muted-foreground text-sm mb-4">No ingredients added yet.</p>
        )}
        <div className="flex flex-col sm:flex-row gap-2 mt-2">
          <Button
            onClick={onAnalyze}
            disabled={ingredients.length === 0 || isAnalyzing}
            className="w-full sm:w-auto flex-grow bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Zap className="mr-2 h-4 w-4" />
            {isAnalyzing ? 'Analyzing...' : 'Analyze Nutrition'}
          </Button>
          <Button
            variant="outline"
            onClick={onClearIngredients}
            disabled={ingredients.length === 0 || isAnalyzing}
            className="w-full sm:w-auto"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear All
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
