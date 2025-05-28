
"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarDays, PlusCircle, Utensils, Coffee, Sandwich, Fish, Leaf, Soup as SoupIcon, Drumstick, Salad } from 'lucide-react'; 
import type { Translations } from '@/lib/translations'; // Updated import

interface MealPlanningCardProps {
  translations: Translations;
}

export function MealPlanningCard({ translations }: MealPlanningCardProps) {
  const weeklyPlanData = [
    {
      dayKey: 'monday',
      calories: '1,950 kcal',
      mealIcons: [
        { icon: Coffee, hint: 'breakfast beverage', color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-500' },
        { icon: Sandwich, hint: 'lunch meal', color: 'bg-sky-100 dark:bg-sky-900/30 text-sky-500' },
        { icon: Fish, hint: 'dinner food', color: 'bg-teal-100 dark:bg-teal-900/30 text-teal-500' }
      ]
    },
    {
      dayKey: 'tuesday',
      calories: '2,050 kcal',
      mealIcons: [
        { icon: Coffee, hint: 'healthy breakfast', color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-500' },
        { icon: Salad, hint: 'quick lunch', color: 'bg-lime-100 dark:bg-lime-900/30 text-lime-500' },
        { icon: Drumstick, hint: 'light dinner', color: 'bg-red-100 dark:bg-red-900/30 text-red-500' }
      ]
    },
    {
      dayKey: 'wednesday',
      calories: '1,850 kcal',
      mealIcons: [
        { icon: Coffee, hint: 'morning meal', color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-500' },
        { icon: SoupIcon, hint: 'midday food', color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-500' },
        { icon: Fish, hint: 'evening supper', color: 'bg-teal-100 dark:bg-teal-900/30 text-teal-500' }
      ]
    },
  ];

  const mockRecipesDataRaw = [
      { id: 'r1', nameKey: 'recipeChickenStirFry', calories: '450 kcal', icon: Drumstick, dataAiHint: 'chicken stirfry' },
      { id: 'r2', nameKey: 'recipeQuinoaSalad', calories: '380 kcal', icon: Leaf, dataAiHint: 'quinoa salad' }, 
      { id: 'r3', nameKey: 'recipeLentilSoup', calories: '320 kcal', icon: SoupIcon, dataAiHint: 'lentil soup' },
  ];

  const translatedRecipesData = mockRecipesDataRaw.map(recipe => ({
    ...recipe,
    name: translations[recipe.nameKey as keyof Translations] || recipe.nameKey,
  }));

  const weekDateString = translations.language === 'zh' ? "五月 15日" : "May 15"; // This should ideally be dynamic based on current date

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
                  <div className="flex gap-1.5 mt-1.5">
                    {plan.mealIcons.map((mealIcon, idx) => {
                      const IconComponent = mealIcon.icon;
                      return (
                        <div key={idx} className={`h-5 w-5 rounded-full flex items-center justify-center ${mealIcon.color}`} data-ai-hint={mealIcon.hint}>
                           <IconComponent className="h-3 w-3" />
                        </div>
                      );
                    })}
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
            {translatedRecipesData.map(recipe => {
                 const IconComponent = recipe.icon;
                 return (
                 <div key={recipe.id} className="flex items-center gap-3 p-2.5 rounded-md bg-card hover:bg-secondary/10 border border-border/60">
                    <div className="h-12 w-16 rounded-md bg-muted flex items-center justify-center" data-ai-hint={recipe.dataAiHint}>
                        <IconComponent className="h-7 w-7 text-muted-foreground" />
                    </div>
                    <div>
                        <p className="text-sm font-medium">{recipe.name}</p>
                        <p className="text-xs text-muted-foreground">{recipe.calories.replace('kcal', translations.kcalUnit)}</p>
                    </div>
                 </div>
                );
            })}
             <Button variant="outline" className="w-full mt-3 text-sm h-9 border-primary/50 text-primary hover:bg-primary/10 hover:text-primary">
              <PlusCircle className="mr-2 h-4 w-4" /> {translations.addNewRecipe}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
    

    