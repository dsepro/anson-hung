
"use client";
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, PlusCircle } from 'lucide-react';
import Image from 'next/image';

interface MealItem {
  id: string;
  name: string;
  quantity: string;
  calories: string;
  pfc: string; // Protein, Fat, Carbs
  iconUrl: string;
  dataAiHint: string;
}

interface MealsData {
  breakfast: MealItem[];
  lunch: MealItem[];
  dinner: MealItem[];
  snacks: MealItem[]; // Added snacks as per common structure, though not in UI with items
}

const initialMockMeals: MealsData = {
  breakfast: [
    { id: 'b1', name: 'Oatmeal with Berries', quantity: '1 cup (240g)', calories: '320 kcal', pfc: 'P: 12g | C: 58g | F: 6g', iconUrl: 'https://placehold.co/40x40/A8D5BA/333333.png?text=O', dataAiHint: 'oatmeal berries' },
    { id: 'b2', name: 'Orange Juice', quantity: '1 glass (240ml)', calories: '130 kcal', pfc: 'P: 2g | C: 30g | F: 0g', iconUrl: 'https://placehold.co/40x40/FFDDA2/333333.png?text=J', dataAiHint: 'orange juice' },
  ],
  lunch: [
    { id: 'l1', name: 'Grilled Chicken Salad', quantity: '1 bowl (350g)', calories: '420 kcal', pfc: 'P: 35g | C: 25g | F: 22g', iconUrl: 'https://placehold.co/40x40/C5E1A5/333333.png?text=S', dataAiHint: 'chicken salad' },
    { id: 'l2', name: 'Whole Grain Bread', quantity: '1 slice (40g)', calories: '100 kcal', pfc: 'P: 4g | C: 15g | F: 1g', iconUrl: 'https://placehold.co/40x40/E6B980/333333.png?text=B', dataAiHint: 'grain bread' },
    { id: 'l3', name: 'Apple', quantity: '1 medium (182g)', calories: '100 kcal', pfc: 'P: 0g | C: 25g | F: 0g', iconUrl: 'https://placehold.co/40x40/FFABAB/333333.png?text=A', dataAiHint: 'apple fruit' },
  ],
  dinner: [
    { id: 'd1', name: 'Vegetable Soup', quantity: '1 bowl (300ml)', calories: '180 kcal', pfc: 'P: 8g | C: 20g | F: 8g', iconUrl: 'https://placehold.co/40x40/FFCC80/333333.png?text=S', dataAiHint: 'vegetable soup' },
    { id: 'd2', name: 'Baked Salmon', quantity: '1 fillet (100g)', calories: '200 kcal', pfc: 'P: 22g | C: 0g | F: 12g', iconUrl: 'https://placehold.co/40x40/ADD8E6/333333.png?text=F', dataAiHint: 'baked salmon' },
  ],
  snacks: [],
};

type MealCategory = keyof MealsData;

const mealTitles: Record<MealCategory, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
  snacks: "Snacks",
};

export function TodaysMealsSection() {
  const [currentDate, setCurrentDate] = useState(new Date(2023, 4, 15)); // Month is 0-indexed, so 4 is May
  const [mealsData, setMealsData] = useState<MealsData>(initialMockMeals); // In a real app, this would be fetched

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const changeDate = (offset: number) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + offset);
      // Here you would typically fetch data for the newDate
      // For demo, we'll just keep the same mock data
      // setMealsData(fetchMealsForDate(newDate)); 
      return newDate;
    });
  };

  const getTotalCalories = (category: MealCategory) => {
    return mealsData[category].reduce((sum, item) => sum + parseInt(item.calories), 0);
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Today's Meals</CardTitle>
          <div className="flex items-center gap-1 sm:gap-2">
            <Button variant="ghost" size="icon" onClick={() => changeDate(-1)} className="h-8 w-8">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <span className="text-sm font-medium min-w-[110px] sm:min-w-[130px] text-center">{formatDate(currentDate)}</span>
            <Button variant="ghost" size="icon" onClick={() => changeDate(1)} className="h-8 w-8">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {(Object.keys(mealsData) as MealCategory[]).filter(cat => cat !== 'snacks' || mealsData.snacks.length > 0).map(category => (
          <div key={category}>
            <div className="flex justify-between items-baseline mb-2">
              <h3 className="text-md font-semibold text-primary">{mealTitles[category]}</h3>
              <span className="text-xs text-muted-foreground">{getTotalCalories(category)} kcal</span>
            </div>
            {mealsData[category].length > 0 ? (
              <div className="space-y-3">
                {mealsData[category].map(item => (
                  <Card key={item.id} className="p-3 flex items-center justify-between bg-card hover:shadow-sm transition-shadow border border-border/70">
                    <div className="flex items-center gap-3">
                      <Image src={item.iconUrl} alt={item.name} width={32} height={32} className="rounded-full" data-ai-hint={item.dataAiHint} />
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
              <p className="text-xs text-muted-foreground italic text-center py-2">No {mealTitles[category].toLowerCase()} logged yet.</p>
            )}
            <Button variant="outline" className="w-full mt-3 text-xs h-8 border-dashed hover:border-primary hover:text-primary text-muted-foreground hover:bg-accent">
              <PlusCircle className="mr-1.5 h-3.5 w-3.5" /> Add Food {/* to {mealTitles[category]} - removed for brevity as in UI */}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
