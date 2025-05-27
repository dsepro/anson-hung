
"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Apple, Camera, Carrot, Milk, ScanLine, Wheat, Salad, Zap } from 'lucide-react'; // Using more specific icons where possible

// Salad icon doesn't exist, use Leaf. Zap for general "Energy Bar" or similar.
// Replace Salad with Leaf, or another appropriate icon.
// Using generic icons for now that are available.
// Image shows: Oatmeal, Salad, Apple, Milk, Bread, Grapes (Grape icon does not exist, use Apple or generic Food)
const quickAddItems = [
  { name: 'Oatmeal', icon: Wheat },
  { name: 'Salad', icon: Carrot }, // Using Carrot as a proxy for Salad/Veggies
  { name: 'Apple', icon: Apple },
  { name: 'Milk', icon: Milk },
  // { name: 'Bread', icon: Wheat }, // Duplicates Oatmeal icon, UI implies more variety
  // { name: 'Grapes', icon: Apple }, // Using Apple as proxy for Grapes
];

export function QuickAddFoodSection() {
  return (
    <Card className="shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg">Quick Add Food</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
          {quickAddItems.map(item => (
            <Button key={item.name} variant="outline" size="sm" className="text-xs flex-col h-16 sm:h-20 justify-center">
              <item.icon className="h-5 w-5 mb-1" /> 
              <span>{item.name}</span>
            </Button>
          ))}
           <Button variant="outline" size="sm" className="text-xs flex-col h-16 sm:h-20 justify-center text-primary border-primary/50 hover:bg-primary/10 hover:text-primary">
              <PlusCircle className="h-5 w-5 mb-1" /> 
              <span>More</span>
            </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-10">
            <Camera className="mr-2 h-4 w-4" /> Take Photo
          </Button>
          <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground h-10">
            <ScanLine className="mr-2 h-4 w-4" /> Scan Barcode
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Added PlusCircle for the 'More' button
import { PlusCircle } from 'lucide-react';
