
"use client";
import { TodaysMealsSection } from './todays-meals-section';
import { QuickAddFoodSection } from './quick-add-food-section';
import { NutritionSummarySection } from './nutrition-summary-section';
import type { Translations, Language } from '@/app/page'; // Import Language type

interface MainContentAreaProps {
  translations: Translations;
  language: Language; // Add language prop
}

export function MainContentArea({ translations, language }: MainContentAreaProps) {
  return (
    <main className="flex-1 p-4 md:p-6 space-y-6 overflow-y-auto h-[calc(100vh-4rem-3.5rem)] md:h-[calc(100vh-4rem-3rem)] bg-transparent"> {/* Adjusted height for footer */}
      <TodaysMealsSection translations={translations} language={language} /> {/* Pass language */}
      <QuickAddFoodSection translations={translations} />
      <NutritionSummarySection translations={translations} />
    </main>
  );
}
