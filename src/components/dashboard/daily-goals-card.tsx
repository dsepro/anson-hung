
"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { Translations } from '@/app/page';

interface Goal {
  name: string;
  current: number;
  target: number;
  unit: string;
  color: string; // Tailwind bg color class e.g. "bg-green-500"
}

interface DailyGoalsCardProps {
  goals: Goal[];
  translations: Translations;
}

export function DailyGoalsCard({ goals, translations }: DailyGoalsCardProps) {
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3 pt-5">
        <CardTitle className="text-md">{translations.dailyGoalsTitle}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {goals.map((goal) => (
          <div key={goal.name}>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium">{goal.name}</span>
              <span className="text-muted-foreground">{goal.current}/{goal.target} {goal.unit === 'kcal' ? translations.kcalUnit : goal.unit}</span>
            </div>
            <Progress value={(goal.current / goal.target) * 100} className="h-2" indicatorClassName={goal.color} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
