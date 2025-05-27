
"use client";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, PlusCircle } from 'lucide-react';
import Image from 'next/image';

// Mock data
const mockMeals = {
  breakfast: [
    { id: 'b1', name: 'Oatmeal with Berries', quantity: '1 cup (240g)', calories: '320 kcal', pfc: 'P: 10g | C: 50g | F: 8g', icon: 'https://placehold.co/40x40.png', dataAiHint: 'oatmeal berries' },
    { id: 'b2', name: 'Orange Juice', quantity: '1 glass (240ml)', calories: '130 kcal', pfc: 'P: 2g | C: 30g | F: 0g', icon: 'https://placehold.co/40x40.png', dataAiHint: 'orange juice' },
  ],
  lunch: [
    { id: 'l1', name: 'Grilled Chicken Salad', quantity: '1 bowl (350g)', calories: '420 kcal', pfc: 'P: 35g | C: 25g | F: 22g', icon: 'https://placehold.co/40x40.png', dataAiHint: 'chicken salad' },
    { id: 'l2', name: 'Whole Grain Bread', quantity: '1 slice (40g)', calories: '100 kcal', pfc: 'P: 4g | C: 18g | F: 1g', icon: 'https://placehold.co/40x40.png', dataAiHint: 'bread slice' },
    { id: 'l3', name: 'Apple', quantity: '1 medium (182g)', calories: '100 kcal', pfc: 'P: 0g | C: 25g | F: 0g', icon: 'https://placehold.co/40x40.png', dataAiHint: 'apple fruit' },
  ],
  dinner: [
    { id: 'd1', name: 'Vegetable Soup', quantity: '1 bowl (300ml)', calories: '180 kcal', pfc: 'P: 8g | C: 20g | F: 8g', icon: 'https://placehold.co/40x40.png', dataAiHint: 'vegetable soup' },
    { id: 'd2', name: 'Baked Salmon', quantity: '1 fillet (100g)', calories: '200 kcal', pfc: 'P: 22g | C: 0g | F: 12g', icon: 'https://placehold.co/40x40.png', dataAiHint: 'baked salmon' },
  ],
  snacks: [],
};

type MealCategory = keyof typeof mockMeals;

const mealTitles: Record<MealCategory, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  snacks: "Snacks",
};

export function TodaysMealsSection() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const changeDate = (offset: number) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + offset);
      return newDate;
    });
  };

  const getTotalCalories = (category: MealCategory) => {
    return mockMeals[category].reduce((sum, item) => sum + parseInt(item.calories), 0);
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Today's Meals</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => changeDate(-1)} className="h-8 w-8">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <span className="text-sm font-medium min-w-[130px] text-center">{formatDate(currentDate)}</span>
            <Button variant="ghost" size="icon" onClick={() => changeDate(1)} className="h-8 w-8">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {(Object.keys(mockMeals) as MealCategory[]).map(category => (
          <div key={category}>
            <div className="flex justify-between items-baseline mb-2">
              <h3 className="text-md font-semibold text-primary">{mealTitles[category]}</h3>
              <span className="text-xs text-muted-foreground">{getTotalCalories(category)} kcal</span>
            </div>
            {mockMeals[category].length > 0 ? (
              <div className="space-y-3">
                {mockMeals[category].map(item => (
                  <Card key={item.id} className="p-3 flex items-center justify-between bg-secondary/5 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3">
                      <Image src={item.icon} alt={item.name} width={32} height={32} className="rounded-full" data-ai-hint={item.dataAiHint} />
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{item.calories}</p>
                      <p className="text-xs text-muted-foreground">{item.pfc}</p>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground italic text-center py-2">No {category} logged yet.</p>
            )}
            <Button variant="outline" className="w-full mt-3 text-xs h-8 border-dashed hover:border-primary hover:text-primary">
              <PlusCircle className="mr-1.5 h-3.5 w-3.5" /> Add Food to {mealTitles[category]}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
