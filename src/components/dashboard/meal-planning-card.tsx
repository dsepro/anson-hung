
"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarDays, PlusCircle, Utensils } from 'lucide-react';
import Image from 'next/image';

// Mock data
const weeklyPlan = [
  { day: 'Monday', calories: '1950 kcal', mealThumbnails: ['https://placehold.co/20x20.png', 'https://placehold.co/20x20.png', 'https://placehold.co/20x20.png'] , dataAiHints: ['breakfast', 'lunch', 'dinner']},
  { day: 'Tuesday', calories: '2050 kcal', mealThumbnails: ['https://placehold.co/20x20.png', 'https://placehold.co/20x20.png', 'https://placehold.co/20x20.png'] , dataAiHints: ['breakfast', 'lunch', 'dinner']},
  { day: 'Wednesday', calories: '1850 kcal', mealThumbnails: ['https://placehold.co/20x20.png', 'https://placehold.co/20x20.png', 'https://placehold.co/20x20.png'] , dataAiHints: ['breakfast', 'lunch', 'dinner']},
  // Add more days if needed
];

const mockRecipes = [
    { id: 'r1', name: 'Chicken Stir-fry', calories: '450 kcal', image: 'https://placehold.co/80x60.png', dataAiHint: 'chicken stirfry' },
    { id: 'r2', name: 'Quinoa Salad', calories: '380 kcal', image: 'https://placehold.co/80x60.png', dataAiHint: 'quinoa salad' },
];


export function MealPlanningCard() {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-md">Meal Planning</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-9">
            <TabsTrigger value="weekly" className="text-xs px-2 py-1.5 h-full">
              <CalendarDays className="mr-1.5 h-3.5 w-3.5" /> Weekly Plan
            </TabsTrigger>
            <TabsTrigger value="recipes" className="text-xs px-2 py-1.5 h-full">
              <Utensils className="mr-1.5 h-3.5 w-3.5" /> Recipes
            </TabsTrigger>
          </TabsList>
          <TabsContent value="weekly" className="mt-4 space-y-3">
            <div className="flex justify-between items-center mb-1">
                <h4 className="text-xs font-medium text-muted-foreground">Week of May 15</h4>
                <Button variant="link" size="sm" className="text-xs h-auto p-0">View All</Button>
            </div>
            {weeklyPlan.map(plan => (
              <div key={plan.day} className="flex items-center justify-between p-2.5 rounded-md bg-secondary/5 hover:bg-secondary/10">
                <div>
                  <p className="text-sm font-medium">{plan.day}</p>
                  <div className="flex gap-1 mt-0.5">
                    {plan.mealThumbnails.map((thumb, idx) => (
                        <Image key={idx} src={thumb} alt="meal thumbnail" width={16} height={16} className="rounded-full" data-ai-hint={plan.dataAiHints[idx]} />
                    ))}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{plan.calories}</span>
              </div>
            ))}
            <Button className="w-full mt-3 bg-primary hover:bg-primary/90 text-primary-foreground text-sm h-9">
              <PlusCircle className="mr-2 h-4 w-4" /> Create Meal Plan
            </Button>
          </TabsContent>
          <TabsContent value="recipes" className="mt-4 space-y-3">
            <div className="flex justify-between items-center mb-1">
                <h4 className="text-xs font-medium text-muted-foreground">Your Recipes</h4>
                <Button variant="link" size="sm" className="text-xs h-auto p-0">View All</Button>
            </div>
            {mockRecipes.map(recipe => (
                 <div key={recipe.id} className="flex items-center gap-3 p-2.5 rounded-md bg-secondary/5 hover:bg-secondary/10">
                    <Image src={recipe.image} alt={recipe.name} width={60} height={45} className="rounded-md" data-ai-hint={recipe.dataAiHint} />
                    <div>
                        <p className="text-sm font-medium">{recipe.name}</p>
                        <p className="text-xs text-muted-foreground">{recipe.calories}</p>
                    </div>
                 </div>
            ))}
             <Button variant="outline" className="w-full mt-3 text-sm h-9">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Recipe
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
