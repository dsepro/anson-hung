
"use client";

import type { NutrientInfo } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { NutrientCard } from './nutrient-card'; // Old component
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

// This component is not directly used in the new dashboard page structure.
// The "Nutrition Summary" section will likely replace or adapt parts of this.
// For now, marking its content as largely irrelevant to the new dashboard page.
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
              Nutrition details will appear here once calculated.
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

  // The detailed card display is not part of the new main dashboard.
  // This could be a modal or a sub-page.
  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl text-primary">Detailed Nutritional Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>Calories: {calories} kcal</p>
        <p>Protein: {protein} g</p>
        {/* ... other nutrients ... */}
        {otherNutrients && <p>Other: {otherNutrients}</p>}
      </CardContent>
    </Card>
  );
}

