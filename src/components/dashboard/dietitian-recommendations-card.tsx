
"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

interface DietitianRecommendationsCardProps {
  recommendations: string[];
}

export function DietitianRecommendationsCard({ recommendations }: DietitianRecommendationsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-md">Dietitian Recommendations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {recommendations.map((rec, index) => (
          <div key={index} className="flex items-start gap-2 text-xs p-2 bg-accent/10 rounded-md">
            <Lightbulb className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
            <p className="text-muted-foreground">{rec}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
