
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
    <Card>
      <CardHeader>
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
declare module "@/components/ui/progress" {
  interface ProgressProps {
    indicatorClassName?: string;
  }
}
