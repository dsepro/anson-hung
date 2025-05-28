
"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Droplets, HeartPulse, Scale, ArrowRight } from 'lucide-react';
import type { Translations } from '@/lib/translations'; // Updated import

interface Metric {
  id: string;
  translationKey: keyof Translations;
  value: string;
  unit?: string;
  statusTextKey: keyof Translations;
  statusStyle: 'yellow' | 'green' | 'red' | 'default';
  icon: React.ElementType;
  timeKey: keyof Translations;
  change?: string;
  changeStyle?: 'green' | 'red';
}

const statusStyles = {
    yellow: "bg-yellow-100 text-yellow-700 dark:bg-yellow-700/30 dark:text-yellow-300",
    green: "bg-green-100 text-green-700 dark:bg-green-700/30 dark:text-green-300",
    red: "bg-red-100 text-red-700 dark:bg-red-700/30 dark:text-red-300",
    default: "bg-muted text-muted-foreground"
};

const changeTextStyles = {
    green: "text-green-600 dark:text-green-400",
    red: "text-red-600 dark:text-red-400"
}

const mockMetrics: Metric[] = [
  { id: 'glucose', translationKey: 'bloodGlucose', value: '128', unit: 'mg/dL', statusTextKey: 'statusSlightlyHigh', statusStyle: 'yellow', icon: Droplets, timeKey: 'timeToday' },
  { id: 'pressure', translationKey: 'bloodPressure', value: '135/85', unit: 'mmHg', statusTextKey: 'statusNormal', statusStyle: 'green', icon: HeartPulse, timeKey: 'timeToday' },
  { id: 'weight', translationKey: 'weight', value: '78.5', unit: 'kg', statusTextKey: 'statusValueOnly', statusStyle: 'default', icon: Scale, timeKey: 'timeYesterday', change: '-0.5 kg', changeStyle: 'green' },
];

interface HealthMetricsCardProps {
  translations: Translations;
}

export function HealthMetricsCard({ translations }: HealthMetricsCardProps) {
  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-5">
        <CardTitle className="text-md">{translations.healthMetricsTitle}</CardTitle>
        <Button variant="link" size="sm" className="text-xs h-auto p-0 text-primary hover:text-primary/80">{translations.viewAll} <ArrowRight className="ml-1 h-3 w-3"/></Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockMetrics.map(metric => {
          let statusTextDisplay = translations[metric.statusTextKey] || '';
          if (metric.statusTextKey === 'statusValueOnly' && metric.change) {
            statusTextDisplay = metric.change; // For weight, status text is the change itself
          } else if (metric.statusTextKey === 'statusValueWithUnit' && metric.change && metric.unit) {
            statusTextDisplay = translations.statusValueWithUnit
              .replace('{value}', metric.change)
              .replace('{unit}', metric.unit);
          }


          return (
          <div key={metric.id} className="p-3 rounded-lg bg-card hover:shadow-sm transition-shadow border border-border/60">
            <div className="flex items-start justify-between mb-1">
              <div className="flex items-center gap-2">
                <metric.icon className="h-4 w-4 text-primary mt-0.5" />
                <span className="text-sm font-medium">{translations[metric.translationKey]}</span>
              </div>
              <span className="text-xs text-muted-foreground">{translations[metric.timeKey]}</span>
            </div>
            <div className="flex items-baseline justify-between mt-1">
                <div>
                    <span className="text-xl font-bold">{metric.value}</span>
                    {metric.unit && <span className="text-xs text-muted-foreground ml-0.5">{metric.unit}</span>}
                </div>
                {metric.change && metric.changeStyle && metric.id !== 'weight' && ( // Don't show change separately for weight if it's in status
                     <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-sm ${changeTextStyles[metric.changeStyle]}`}>{metric.change}</span>
                )}
            </div>
             <div className="mt-1.5">
                <span className={`text-xs font-medium px-2 py-1 rounded-full text-center ${statusStyles[metric.statusStyle]}`}>
                    {statusTextDisplay}
                </span>
            </div>
          </div>
        )})}
      </CardContent>
    </Card>
  );
}


    