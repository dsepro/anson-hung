
"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface Goal {
  name: string;
  current: number;
  target: number;
  unit: string;
  color: string; // Tailwind bg color class e.g. "bg-green-500"
}

interface DailyGoalsCardProps {
  goals: Goal[];
}

export function DailyGoalsCard({ goals }: DailyGoalsCardProps) {
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3 pt-5">
        <CardTitle className="text-md">Daily Goals</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {goals.map((goal) => (
          <div key={goal.name}>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium">{goal.name}</span>
              <span className="text-muted-foreground">{goal.current}/{goal.target} {goal.unit}</span>
            </div>
            <Progress value={(goal.current / goal.target) * 100} className="h-2" indicatorClassName={goal.color} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

// Small modification to Progress component to accept indicator class
// This module augmentation should ideally be in a d.ts file or alongside the progress component itself,
// but for simplicity, it's often kept here if co-located or in the component file where it's first needed.
// Ensure this is declared only once or in a global d.ts file.
// Since it's already in progress.tsx, it's fine.
/*
declare module "@/components/ui/progress" {
  interface ProgressProps {
    indicatorClassName?: string;
  }
}
*/
