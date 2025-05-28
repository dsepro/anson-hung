
"use client";
import { UserProfileCard } from './user-profile-card';
import { DailyGoalsCard } from './daily-goals-card';
import { DietitianRecommendationsCard } from './dietitian-recommendations-card';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import type { Translations } from '@/lib/translations';

interface LeftSidebarProps {
  translations: Translations;
}

export function LeftSidebar({ translations }: LeftSidebarProps) {
  const userName = translations.userNameDisplay;

  const mockUser = {
    name: userName,
    condition: translations.userConditionExample,
  };

  const mockGoals = [
    { id: "calories", current: 1450, target: 2000, unit: "kcal", color: "bg-green-500" },
    { id: "protein", current: 65, target: 90, unit: "g", color: "bg-blue-500" },
    { id: "carbs", current: 180, target: 250, unit: "g", color: "bg-yellow-500" }, 
    { id: "fat", current: 45, target: 65, unit: "g", color: "bg-red-500" },
    { id: "sodium", current: 1800, target: 2300, unit: "mg", color: "bg-purple-500" },
  ];

  const mockRecommendationsRaw = [
    { textKey: 'recTextLeafyGreens', styleKey: 'green' as const },
    { textKey: 'recTextSodium', styleKey: 'blue' as const }, 
    { textKey: 'recTextCalcium', styleKey: 'yellow' as const }
  ];

  const translatedRecommendations = mockRecommendationsRaw.map(rec => ({
    text: translations[rec.textKey as keyof Translations] || rec.textKey,
    styleKey: rec.styleKey,
  }));

  const translatedGoals = mockGoals.map(goal => ({
    ...goal,
    name: translations[goal.id as keyof Translations] || goal.id, 
  }));

  return (
    <aside className="w-full md:w-1/4 lg:w-1/5 xl:w-[22%] md:flex-shrink-0 p-4 space-y-6 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto bg-transparent md:border-r border-border/60">
      <UserProfileCard user={mockUser} />
      <DailyGoalsCard goals={translatedGoals} translations={translations} />
      <DietitianRecommendationsCard 
        recommendations={translatedRecommendations} 
        translations={translations} />
      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
        <MessageSquare className="mr-2 h-4 w-4" />
        {translations.chatWithDietitian}
      </Button>
    </aside>
  );
}

    

    
