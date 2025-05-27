
"use client";
import { UserProfileCard } from './user-profile-card';
import { DailyGoalsCard } from './daily-goals-card';
import { DietitianRecommendationsCard } from './dietitian-recommendations-card';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

const mockUser = {
  name: "John Doe",
  condition: "Type 2 Diabetes, Hypertension",
  avatarUrl: "https://placehold.co/80x80.png", 
  avatarFallback: "JD",
};

const mockGoals = [
  { name: "Calories", current: 1450, target: 2000, unit: "kcal", color: "bg-green-500" },
  { name: "Protein", current: 65, target: 90, unit: "g", color: "bg-blue-500" },
  { name: "Carbs", current: 180, target: 250, unit: "g", color: "bg-yellow-500" }, // Changed to yellow for better distinction
  { name: "Fat", current: 45, target: 65, unit: "g", color: "bg-red-500" },
  { name: "Sodium", current: 1800, target: 2300, unit: "mg", color: "bg-purple-500" },
];

const mockRecommendations = [
  { text: "Try to include more leafy greens in your lunch to help manage blood sugar levels.", styleKey: 'green' as const },
  { text: "Consider reducing sodium intake by avoiding processed foods.", styleKey: 'blue' as const }, // Changed to blue for variety
  { text: "Your calcium intake is below recommended levels. Try adding more dairy or fortified alternatives.", styleKey: 'yellow' as const }
];

export function LeftSidebar() {
  return (
    <aside className="w-full md:w-1/4 lg:w-1/5 xl:w-[22%] p-4 space-y-6 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto bg-card md:bg-transparent md:border-r border-border/60">
      <UserProfileCard user={mockUser} />
      <DailyGoalsCard goals={mockGoals} />
      <DietitianRecommendationsCard recommendations={mockRecommendations} />
      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
        <MessageSquare className="mr-2 h-4 w-4" />
        Chat with Dietitian
      </Button>
    </aside>
  );
}
