
"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart } from 'lucide-react'; 
import type { Translations } from '@/app/page';

interface NutritionSummarySectionProps {
  translations: Translations;
}

export function NutritionSummarySection({ translations }: NutritionSummarySectionProps) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg">{translations.nutritionSummaryTitle}</CardTitle>
      </CardHeader>
      <CardContent className="text-center py-10">
        <BarChart className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
        <p className="text-sm text-muted-foreground">{translations.nutritionSummaryPlaceholder}</p>
        {/* TODO: Implement nutrition summary chart using ShadCN charts */}
      </CardContent>
    </Card>
  );
}
