
"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart as BarChartIcon } from 'lucide-react'; 
import type { Translations } from '@/app/page';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

interface NutritionSummarySectionProps {
  translations: Translations;
}

const mockDailyIntakeData = [
  { nutrientKey: 'carbohydratesChartLabel', intake: 280, unit: 'g', fill: "var(--color-carbs)" },
  { nutrientKey: 'proteinChartLabel', intake: 75, unit: 'g', fill: "var(--color-protein)" },
  { nutrientKey: 'fatChartLabel', intake: 60, unit: 'g', fill: "var(--color-fat)" },
  { nutrientKey: 'vitaminCChartLabel', intake: 90, unit: 'mg', fill: "var(--color-vitaminc)" },
  { nutrientKey: 'ironChartLabel', intake: 15, unit: 'mg', fill: "var(--color-iron)" },
  { nutrientKey: 'calciumChartLabel', intake: 800, unit: 'mg', fill: "var(--color-calcium)" },
];

export function NutritionSummarySection({ translations }: NutritionSummarySectionProps) {
  const chartData = mockDailyIntakeData.map(item => ({
    name: translations[item.nutrientKey as keyof Translations] || item.nutrientKey,
    intake: item.intake,
    unit: item.unit,
    fill: item.fill,
  }));

  const chartConfig = {
    intake: {
      label: "Intake", // This label is generic, specific nutrient labels come from data
      color: "hsl(var(--chart-1))", // Default color, will be overridden by item.fill
    },
    carbs: { label: translations.carbohydratesChartLabel, color: "hsl(var(--chart-1))" },
    protein: { label: translations.proteinChartLabel, color: "hsl(var(--chart-2))" },
    fat: { label: translations.fatChartLabel, color: "hsl(var(--chart-3))" },
    vitaminc: { label: translations.vitaminCChartLabel, color: "hsl(var(--chart-4))" },
    iron: { label: translations.ironChartLabel, color: "hsl(var(--chart-5))" },
    calcium: { label: translations.calciumChartLabel, color: "hsl(var(--chart-1))" }, // Re-use chart color
  } satisfies ChartConfig;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <BarChartIcon className="mr-2 h-5 w-5 text-primary" />
          {translations.nutritionSummaryTitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4 pb-2">
        {chartData.length > 0 ? (
          <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  tickLine={false} 
                  axisLine={false} 
                  stroke="#888888"
                  fontSize={10}
                  interval={0}
                  angle={0} // angle if labels are long: -30
                  textAnchor="middle" // end if angle is -30
                />
                <YAxis 
                  tickLine={false} 
                  axisLine={false} 
                  stroke="#888888"
                  fontSize={10}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                  cursor={{ fill: 'hsl(var(--muted))' }}
                  content={<ChartTooltipContent 
                              formatter={(value, name, props) => {
                                const item = chartData.find(d => d.name === props.payload.name);
                                return `${value} ${item?.unit || ''}`;
                              }}
                              indicator="dot" 
                          />}
                />
                {/* 
                  Legend is not ideal for this type of chart where each bar is a different nutrient.
                  If we had grouped bars (e.g., intake vs target for each nutrient), legend would be more useful.
                  <Legend content={<ChartLegendContent />} /> 
                */}
                <Bar dataKey="intake" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        ) : (
           <div className="text-center py-10">
            <BarChartIcon className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No nutrition data to display.</p>
           </div>
        )}
      </CardContent>
    </Card>
  );
}
