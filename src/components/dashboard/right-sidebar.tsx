
"use client";
import { MealPlanningCard } from './meal-planning-card';
import { HealthMetricsCard } from './health-metrics-card';

export function RightSidebar() {
  return (
    <aside className="w-full md:w-1/4 lg:w-1/5 xl:w-[22%] p-4 space-y-6 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto bg-card md:bg-transparent md:border-l">
      <MealPlanningCard />
      <HealthMetricsCard />
    </aside>
  );
}
