
"use client";
import { UserProfileCard } from './user-profile-card';
import { DailyGoalsCard } from './daily-goals-card';
import { DietitianRecommendationsCard } from './dietitian-recommendations-card';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import type { Translations } from '@/app/page';

const mockUser = {
  name: "John Doe",
  condition: "Type 2 Diabetes, Hypertension",
  avatarUrl: "https://placehold.co/80x80.png", 
  avatarFallback: "JD",
};

const mockGoals = [
  { id: "calories", current: 1450, target: 2000, unit: "kcal", color: "bg-green-500" },
  { id: "protein", current: 65, target: 90, unit: "g", color: "bg-blue-500" },
  { id: "carbs", current: 180, target: 250, unit: "g", color: "bg-yellow-500" }, 
  { id: "fat", current: 45, target: 65, unit: "g", color: "bg-red-500" },
  { id: "sodium", current: 1800, target: 2300, unit: "mg", color: "bg-purple-500" },
];

const mockRecommendations = [
  { text: "Try to include more leafy greens in your lunch to help manage blood sugar levels.", styleKey: 'green' as const },
  { text: "Consider reducing sodium intake by avoiding processed foods.", styleKey: 'blue' as const }, 
  { text: "Your calcium intake is below recommended levels. Try adding more dairy or fortified alternatives.", styleKey: 'yellow' as const }
];

interface LeftSidebarProps {
  translations: Translations;
}

export function LeftSidebar({ translations }: LeftSidebarProps) {
  const translatedGoals = mockGoals.map(goal => ({
    ...goal,
    name: translations[goal.id as keyof Translations] || goal.id, // Fallback to id if no translation
  }));
  return (
    <aside className="w-full md:w-1/4 lg:w-1/5 xl:w-[22%] p-4 space-y-6 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto bg-card md:bg-transparent md:border-r border-border/60">
      <UserProfileCard user={mockUser} />
      <DailyGoalsCard goals={translatedGoals} translations={translations} />
      <DietitianRecommendationsCard recommendations={mockRecommendations} translations={translations} />
      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
        <MessageSquare className="mr-2 h-4 w-4" />
        {translations.chatWithDietitian}
      </Button>
    </aside>
  );
}
