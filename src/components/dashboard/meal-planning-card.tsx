
"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarDays, PlusCircle, Utensils } from 'lucide-react';
import Image from 'next/image';
import type { Translations } from '@/app/page';

interface MealPlanningCardProps {
  translations: Translations;
}

const weeklyPlanData = [
  { dayKey: 'monday', calories: '1,950 kcal', mealThumbnails: ['https://placehold.co/20x20/A8D5BA/333.png?text=B', 'https://placehold.co/20x20/FFDDA2/333.png?text=L', 'https://placehold.co/20x20/C5E1A5/333.png?text=D'] , dataAiHints: ['breakfast fruit', 'lunch meal', 'dinner food']},
  { dayKey: 'tuesday', calories: '2,050 kcal', mealThumbnails: ['https://placehold.co/20x20/ADD8E6/333.png?text=B', 'https://placehold.co/20x20/E6B980/333.png?text=L', 'https://placehold.co/20x20/FFABAB/333.png?text=D'] , dataAiHints: ['healthy breakfast', 'quick lunch', 'light dinner']},
  { dayKey: 'wednesday', calories: '1,850 kcal', mealThumbnails: ['https://placehold.co/20x20/FFCC80/333.png?text=B', 'https://placehold.co/20x20/A8D5BA/333.png?text=L', 'https://placehold.co/20x20/FFDDA2/333.png?text=D'] , dataAiHints: ['morning meal', 'midday food', 'evening supper']},
];

const mockRecipesData = [
    { id: 'r1', name: 'Chicken Stir-fry', calories: '450 kcal', image: 'https://placehold.co/80x60/C5E1A5/333.png', dataAiHint: 'chicken stirfry' },
    { id: 'r2', name: 'Quinoa Salad', calories: '380 kcal', image: 'https://placehold.co/80x60/FFDDA2/333.png', dataAiHint: 'quinoa salad' },
    { id: 'r3', name: 'Lentil Soup', calories: '320 kcal', image: 'https://placehold.co/80x60/FFCC80/333.png', dataAiHint: 'lentil soup' },
];


export function MealPlanningCard({ translations }: MealPlanningCardProps) {
  // In a real app, 'May 15' would be dynamic
  const weekDateString = translations.language === 'zh' ? "五月 15日" : "May 15";

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3 pt-5">
        <CardTitle className="text-md">{translations.mealPlanningTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-9 mb-3">
            <TabsTrigger value="weekly" className="text-xs px-2 py-1.5 h-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <CalendarDays className="mr-1.5 h-3.5 w-3.5" /> {translations.weeklyPlanTab}
            </TabsTrigger>
            <TabsTrigger value="recipes" className="text-xs px-2 py-1.5 h-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Utensils className="mr-1.5 h-3.5 w-3.5" /> {translations.recipesTab}
            </TabsTrigger>
          </TabsList>
          <TabsContent value="weekly" className="mt-1 space-y-3">
            <div className="flex justify-between items-center mb-1">
                <h4 className="text-xs font-medium text-muted-foreground">{translations.weekOf.replace('{date}', weekDateString)}</h4>
                <Button variant="link" size="sm" className="text-xs h-auto p-0 text-primary hover:text-primary/80">{translations.viewAll}</Button>
            </div>
            {weeklyPlanData.map(plan => (
              <div key={plan.dayKey} className="flex items-center justify-between p-2.5 rounded-md bg-card hover:bg-secondary/10 border border-border/60">
                <div>
                  <p className="text-sm font-medium">{translations[plan.dayKey as keyof Translations]}</p>
                  <div className="flex gap-1 mt-1">
                    {plan.mealThumbnails.map((thumb, idx) => (
                        <Image key={idx} src={thumb} alt="meal thumbnail" width={18} height={18} className="rounded-full" data-ai-hint={plan.dataAiHints[idx]} />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{plan.calories.replace('kcal', translations.kcalUnit)}</span>
              </div>
            ))}
            <Button className="w-full mt-3 bg-primary hover:bg-primary/90 text-primary-foreground text-sm h-9">
              <PlusCircle className="mr-2 h-4 w-4" /> {translations.createMealPlan}
            </Button>
          </TabsContent>
          <TabsContent value="recipes" className="mt-1 space-y-3">
            <div className="flex justify-between items-center mb-1">
                <h4 className="text-xs font-medium text-muted-foreground">{translations.yourRecipes}</h4>
                <Button variant="link" size="sm" className="text-xs h-auto p-0 text-primary hover:text-primary/80">{translations.viewAll}</Button>
            </div>
            {mockRecipesData.map(recipe => (
                 <div key={recipe.id} className="flex items-center gap-3 p-2.5 rounded-md bg-card hover:bg-secondary/10 border border-border/60">
                    <Image src={recipe.image} alt={recipe.name} width={60} height={45} className="rounded-md object-cover" data-ai-hint={recipe.dataAiHint} />
                    <div>
                        {/* Recipe name is dynamic data */}
                        <p className="text-sm font-medium">{recipe.name}</p>
                        <p className="text-xs text-muted-foreground">{recipe.calories.replace('kcal', translations.kcalUnit)}</p>
                    </div>
                 </div>
            ))}
             <Button variant="outline" className="w-full mt-3 text-sm h-9 border-primary/50 text-primary hover:bg-primary/10 hover:text-primary">
              <PlusCircle className="mr-2 h-4 w-4" /> {translations.addNewRecipe}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
