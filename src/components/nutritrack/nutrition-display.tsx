"use client";

import type { NutrientInfo } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { NutrientCard } from './nutrient-card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Flame,
  Drumstick,
  CookingPot,
  Wheat,
  Leaf,
  Candy,
  Eye,
  Sparkles,
  Milk,
  Atom,
  AlertCircle,
  Info,
} from 'lucide-react';

interface NutritionDisplayProps {
  analysis: NutrientInfo | null;
  isLoading: boolean;
  error: string | null;
}

export function NutritionDisplay({ analysis, isLoading, error }: NutritionDisplayProps) {
  if (isLoading) {
    return (
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl text-primary">Nutritional Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-6 w-1/3" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(i === 0 ? 1 : i === 1 ? 3 : 4)].map((_, j) => (
                   <Skeleton key={j} className="h-24 rounded-lg" />
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="shadow-xl border-destructive">
        <CardHeader>
          <CardTitle className="text-xl text-destructive flex items-center">
            <AlertCircle className="mr-2 h-6 w-6" /> Error Analyzing Nutrition
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive-foreground bg-destructive p-3 rounded-md">{error}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Please check your ingredients or try again later.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (!analysis) {
    return (
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-xl text-primary">Nutritional Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-48 text-center">
            <Info className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Enter some ingredients and click "Analyze Nutrition" to see their profile.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const {
    calories,
    protein,
    fat,
    carbohydrates,
    fiber,
    sugar,
    vitaminA,
    vitaminC,
    calcium,
    iron,
    otherNutrients,
  } = analysis;

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl text-primary">Nutritional Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-3 text-foreground">Overall</h3>
          <NutrientCard icon={Flame} label="Calories" value={calories} unit="kcal" />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-foreground">Macronutrients</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <NutrientCard icon={Drumstick} label="Protein" value={protein} unit="g" />
            <NutrientCard icon={CookingPot} label="Fat" value={fat} unit="g" />
            <NutrientCard icon={Wheat} label="Carbohydrates" value={carbohydrates} unit="g" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-foreground">Fiber & Sugar</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <NutrientCard icon={Leaf} label="Fiber" value={fiber} unit="g" />
            <NutrientCard icon={Candy} label="Sugar" value={sugar} unit="g" />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-foreground">Vitamins & Minerals</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <NutrientCard icon={Eye} label="Vitamin A" value={vitaminA} />
            <NutrientCard icon={Sparkles} label="Vitamin C" value={vitaminC} />
            <NutrientCard icon={Milk} label="Calcium" value={calcium} />
            <NutrientCard icon={Atom} label="Iron" value={iron} />
          </div>
        </div>

        {otherNutrients && (
          <div>
            <h3 className="text-lg font-semibold mb-3 text-foreground">Additional Notes</h3>
            <div className="p-4 bg-secondary/30 rounded-lg">
              <p className="text-sm text-foreground/80">{otherNutrients}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
