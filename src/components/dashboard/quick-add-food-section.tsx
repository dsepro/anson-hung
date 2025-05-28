
"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Apple, Camera, Carrot, Milk, ScanLine, Wheat, PlusCircle, Drumstick, Leaf, Salad, CupSoda } from 'lucide-react';
import type { Translations } from '@/app/page';

interface QuickAddFoodSectionProps {
  translations: Translations;
}

export function QuickAddFoodSection({ translations }: QuickAddFoodSectionProps) {
  const quickAddItems = [
    { id: 'oatmeal', icon: Wheat },
    { id: 'salad', icon: Salad }, 
    { id: 'apple', icon: Apple },
    { id: 'milk', icon: Milk },
    { id: 'quickAddChickenBreast', icon: Drumstick },
    { id: 'quickAddBrownRice', icon: Wheat },
    { id: 'quickAddBroccoli', icon: Leaf },
    { id: 'quickAddYogurt', icon: CupSoda },
  ];

  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">{translations.quickAddFoodTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
          {quickAddItems.map(item => (
            <Button key={item.id} variant="outline" size="sm" className="text-xs flex-col h-16 sm:h-20 justify-center">
              <item.icon className="h-5 w-5 mb-1" /> 
              <span>{translations[item.id as keyof Translations]}</span>
            </Button>
          ))}
           <Button variant="outline" size="sm" className="text-xs flex-col h-16 sm:h-20 justify-center text-primary border-primary/50 hover:bg-primary/10 hover:text-primary">
              <PlusCircle className="h-5 w-5 mb-1" /> 
              <span>{translations.more}</span>
            </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-10">
            <Camera className="mr-2 h-4 w-4" /> {translations.takePhoto}
          </Button>
          <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground h-10">
            <ScanLine className="mr-2 h-4 w-4" /> {translations.scanBarcode}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
