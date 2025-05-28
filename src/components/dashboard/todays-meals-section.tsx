
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  Apple,
  GlassWater,
  Salad,
  Sandwich,
  Soup,
  Fish,
} from 'lucide-react';
// import Image from 'next/image'; // Removed Image import
import type { Translations, Language } from '@/app/page';

interface MealItem {
  id: string;
  nameKey: keyof Translations;
  quantity: string;
  calories: string;
  pfc: string; // Protein, Fat, Carbs
  icon: React.ElementType; // Changed from iconUrl to icon ElementType
}

interface MealsData {
  breakfast: MealItem[];
  lunch: MealItem[];
  dinner: MealItem[];
  snacks: MealItem[];
}

const initialMockMeals: (translations: Translations) => MealsData = (translations) => ({
  breakfast: [
    { id: 'b1', nameKey: 'mealNameOatmealWithBerries', quantity: '1 cup (240g)', calories: '320 kcal', pfc: 'P: 12g | C: 58g | F: 6g', icon: Apple },
    { id: 'b2', nameKey: 'mealNameOrangeJuice', quantity: '1 glass (240ml)', calories: '130 kcal', pfc: 'P: 2g | C: 30g | F: 0g', icon: GlassWater },
  ],
  lunch: [
    { id: 'l1', nameKey: 'mealNameGrilledChickenSalad', quantity: '1 bowl (350g)', calories: '420 kcal', pfc: 'P: 35g | C: 25g | F: 22g', icon: Salad },
    { id: 'l2', nameKey: 'mealNameWholeGrainBread', quantity: '1 slice (40g)', calories: '100 kcal', pfc: 'P: 4g | C: 15g | F: 1g', icon: Sandwich },
    { id: 'l3', nameKey: 'mealNameApple', quantity: '1 medium (182g)', calories: '100 kcal', pfc: 'P: 0g | C: 25g | F: 0g', icon: Apple },
  ],
  dinner: [
    { id: 'd1', nameKey: 'mealNameVegetableSoup', quantity: '1 bowl (300ml)', calories: '180 kcal', pfc: 'P: 8g | C: 20g | F: 8g', icon: Soup },
    { id: 'd2', nameKey: 'mealNameBakedSalmon', quantity: '1 fillet (100g)', calories: '200 kcal', pfc: 'P: 22g | C: 0g | F: 12g', icon: Fish },
  ],
  snacks: [],
});

type MealCategoryKey = keyof MealsData;

interface TodaysMealsSectionProps {
  translations: Translations;
  language: Language;
}

export function TodaysMealsSection({ translations, language }: TodaysMealsSectionProps) {
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [mealsData, setMealsData] = useState<MealsData>(() => initialMockMeals(translations));

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  useEffect(() => {
     setMealsData(initialMockMeals(translations));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [translations]);


  const mealTitles: Record<MealCategoryKey, string> = {
    breakfast: translations.breakfast,
    lunch: translations.lunch,
    dinner: translations.dinner,
    snacks: translations.snacks,
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    if (language === 'zh') {
        return date.toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const changeDate = (offset: number) => {
    setCurrentDate(prevDate => {
      if (!prevDate) return null;
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + offset);
      return newDate;
    });
  };

  const getTotalCalories = (category: MealCategoryKey) => {
    return mealsData[category].reduce((sum, item) => {
        const calValue = parseInt(item.calories.replace(translations.kcalUnit, '').replace('kcal', ''));
        return sum + (isNaN(calValue) ? 0 : calValue);
    }, 0);
  }

  if (!currentDate) {
    return null;
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">{translations.todaysMealsTitle}</CardTitle>
          <div className="flex items-center gap-1 sm:gap-2">
            <Button variant="ghost" size="icon" onClick={() => changeDate(-1)} className="h-8 w-8">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <span className="text-sm font-medium min-w-[110px] sm:min-w-[150px] text-center">{formatDate(currentDate)}</span>
            <Button variant="ghost" size="icon" onClick={() => changeDate(1)} className="h-8 w-8">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {(Object.keys(mealsData) as MealCategoryKey[]).filter(cat => cat !== 'snacks' || mealsData.snacks.length > 0).map(category => (
          <div key={category}>
            <div className="flex justify-between items-baseline mb-2">
              <h3 className="text-md font-semibold text-primary">{mealTitles[category]}</h3>
              <span className="text-xs text-muted-foreground">{getTotalCalories(category)} {translations.kcalUnit}</span>
            </div>
            {mealsData[category].length > 0 ? (
              <div className="space-y-3">
                {mealsData[category].map(item => {
                  const IconComponent = item.icon;
                  return (
                    <Card key={item.id} className="p-3 flex items-center justify-between bg-card hover:shadow-sm transition-shadow border border-border/70">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{translations[item.nameKey] || item.nameKey}</p>
                          <p className="text-xs text-muted-foreground">{item.quantity}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">{item.calories.replace('kcal', translations.kcalUnit)}</p>
                        <p className="text-xs text-muted-foreground">{item.pfc}</p>
                      </div>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground italic text-center py-2">
                {translations.noMealsLogged.replace('{mealType}', mealTitles[category].toLowerCase())}
              </p>
            )}
            <Button variant="outline" className="w-full mt-3 text-xs h-8 border-dashed hover:border-primary hover:text-primary text-muted-foreground hover:bg-accent/50">
              <PlusCircle className="mr-1.5 h-3.5 w-3.5" /> {translations.addFood}
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
