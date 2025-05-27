
"use client";
import { UserProfileCard } from './user-profile-card';
import { DailyGoalsCard } from './daily-goals-card';
import { DietitianRecommendationsCard } from './dietitian-recommendations-card';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

// Mock data - this would typically come from props or context/state
const mockUser = {
  name: "John Doe",
  condition: "Type 2 Diabetes, Hypertension",
  avatarUrl: "https://placehold.co/100x100.png", // Placeholder
};

const mockGoals = [
  { name: "Calories", current: 1450, target: 2000, unit: "kcal", color: "bg-green-500" },
  { name: "Protein", current: 65, target: 90, unit: "g", color: "bg-blue-500" },
  { name: "Carbs", current: 180, target: 250, unit: "g", color: "bg-orange-500" },
  { name: "Fat", current: 45, target: 65, unit: "g", color: "bg-red-500" },
  { name: "Sodium", current: 1800, target: 2300, unit: "mg", color: "bg-purple-500" },
];

const mockRecommendations = [
  "Try to include more leafy greens in your lunch to help manage blood sugar levels.",
  "Consider reducing sodium intake by avoiding processed foods.",
  "Your calcium intake is below recommended levels. Try adding more dairy or fortified alternatives."
];

export function LeftSidebar() {
  return (
    <aside className="w-full md:w-1/4 lg:w-1/5 xl:w-[22%] p-4 space-y-6 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto bg-card md:bg-transparent md:border-r">
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
