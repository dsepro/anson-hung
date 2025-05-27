
"use client";
import { TodaysMealsSection } from './todays-meals-section';
import { QuickAddFoodSection } from './quick-add-food-section';
import { NutritionSummarySection } from './nutrition-summary-section';
import type { Translations } from '@/app/page';

interface MainContentAreaProps {
  translations: Translations;
}

export function MainContentArea({ translations }: MainContentAreaProps) {
  return (
    <main className="flex-1 p-4 md:p-6 space-y-6 overflow-y-auto h-[calc(100vh-4rem)] bg-transparent">
      <TodaysMealsSection translations={translations} />
      <QuickAddFoodSection translations={translations} />
      <NutritionSummarySection translations={translations} />
    </main>
  );
}
