
"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Apple, Camera, Carrot, Milk, ScanLine, Wheat } from 'lucide-react'; // Using generic icons

const quickAddItems = [
  { name: 'Oatmeal', icon: Wheat },
  { name: 'Salad', icon: Carrot },
  { name: 'Apple', icon: Apple },
  { name: 'Milk', icon: Milk },
  { name: 'Bread', icon: Wheat },
  { name: 'Grapes', icon: Apple }, // Placeholder icon
];

export function QuickAddFoodSection() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg">Quick Add Food</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {quickAddItems.map(item => (
            <Button key={item.name} variant="outline" size="sm" className="text-xs">
              <item.icon className="mr-1.5 h-4 w-4" /> {item.name}
            </Button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            <Camera className="mr-2 h-4 w-4" /> Take Photo
          </Button>
          <Button className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
            <ScanLine className="mr-2 h-4 w-4" /> Scan Barcode
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
