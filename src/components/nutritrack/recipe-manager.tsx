"use client";

import { useState } from 'react';
import type { Recipe } from '@/lib/types';
import useLocalStorage from '@/hooks/use-local-storage';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';
import { Save, Trash2, ListChecks, BookOpen, PlusSquare } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface RecipeManagerProps {
  currentIngredients: string[];
  onLoadRecipe: (ingredients: string[]) => void;
}

export function RecipeManager({ currentIngredients, onLoadRecipe }: RecipeManagerProps) {
  const [recipes, setRecipes] = useLocalStorage<Recipe[]>('nutritrack-recipes', []);
  const [recipeName, setRecipeName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveRecipe = () => {
    if (!recipeName.trim()) {
      toast({ title: "Error", description: "Please enter a name for your recipe.", variant: "destructive" });
      return;
    }
    if (currentIngredients.length === 0) {
      toast({ title: "Error", description: "Cannot save an empty recipe. Add some ingredients first.", variant: "destructive" });
      return;
    }

    setIsSaving(true);
    const newRecipe: Recipe = {
      id: Date.now().toString(), // Simple ID generation
      name: recipeName.trim(),
      ingredients: [...currentIngredients],
    };
    setRecipes([...recipes, newRecipe]);
    setRecipeName('');
    setIsSaving(false);
    toast({ title: "Recipe Saved!", description: `"${newRecipe.name}" has been saved.`, className: "bg-primary text-primary-foreground" });
  };

  const handleDeleteRecipe = (recipeId: string) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== recipeId));
    toast({ title: "Recipe Deleted", description: "The recipe has been removed.", variant: "destructive" });
  };

  const handleLoadRecipe = (recipe: Recipe) => {
    onLoadRecipe(recipe.ingredients);
    toast({ title: "Recipe Loaded!", description: `Ingredients from "${recipe.name}" are now selected.`, className: "bg-accent text-accent-foreground" });
  };

  return (
    <Card className="mt-6 shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg flex items-center"><BookOpen className="mr-2 h-5 w-5 text-primary" /> Recipe Book</CardTitle>
        <CardDescription>Save and load your favorite ingredient combinations.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 space-y-2">
          <Input
            type="text"
            placeholder="New Recipe Name"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
            aria-label="Recipe Name"
            className="bg-background"
          />
          <Button onClick={handleSaveRecipe} disabled={isSaving || currentIngredients.length === 0} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? 'Saving...' : 'Save Current Ingredients'}
          </Button>
        </div>

        {recipes.length > 0 ? (
          <>
            <h4 className="text-sm font-medium mb-2 text-muted-foreground">Saved Recipes:</h4>
            <ScrollArea className="h-48">
              <ul className="space-y-2 pr-2">
                {recipes.map((recipe) => (
                  <li
                    key={recipe.id}
                    className="flex justify-between items-center p-3 bg-secondary/50 rounded-md"
                  >
                    <span className="text-sm font-medium cursor-pointer hover:underline" onClick={() => handleLoadRecipe(recipe)}>
                      {recipe.name}
                    </span>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:bg-destructive/10" aria-label={`Delete ${recipe.name}`}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the recipe "{recipe.name}".
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteRecipe(recipe.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </>
        ) : (
          <div className="text-center py-4">
            <ListChecks className="mx-auto h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">No recipes saved yet.</p>
            <p className="text-xs text-muted-foreground mt-1">Save your current selection to find it here later.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
