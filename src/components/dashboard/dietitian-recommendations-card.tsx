
"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import type { Translations } from '@/lib/translations'; // Updated import

interface DietitianRecommendationsCardProps {
  recommendations: Array<{ text: string; styleKey: 'green' | 'blue' | 'yellow' }>;
  translations: Translations;
}

const recommendationStyles = {
  green: "bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700 text-green-700 dark:text-green-300",
  blue: "bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300", 
  yellow: "bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700 text-yellow-700 dark:text-yellow-400",
};

const iconColors = {
  green: "text-green-500",
  blue: "text-blue-500",
  yellow: "text-yellow-500",
}

export function DietitianRecommendationsCard({ recommendations, translations }: DietitianRecommendationsCardProps) {
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3 pt-5">
        <CardTitle className="text-md">{translations.dietitianRecommendationsTitle}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {recommendations.map((rec, index) => (
          <div key={index} className={`flex items-start gap-2 text-xs p-2.5 rounded-md border ${recommendationStyles[rec.styleKey]}`}>
            <Lightbulb className={`h-4 w-4 ${iconColors[rec.styleKey]} flex-shrink-0 mt-0.5`} />
            {/* Recommendation text is mock data, typically dynamic and not translated via this static object */}
            <p className="leading-snug">{rec.text}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}


    