
"use client";
import { TodaysMealsSection } from './todays-meals-section';
import { QuickAddFoodSection } from './quick-add-food-section';
import { NutritionSummarySection } from './nutrition-summary-section';

export function MainContentArea() {
  // This component will orchestrate the central part of the dashboard
  return (
    <main className="flex-1 p-4 md:p-6 space-y-6 overflow-y-auto h-[calc(100vh-4rem)]">
      <TodaysMealsSection />
      <QuickAddFoodSection />
      <NutritionSummarySection />
    </main>
  );
}
