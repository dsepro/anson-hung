
"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Droplets, HeartPulse, TrendingUp, Scale, ArrowRight } from 'lucide-react'; // Added TrendingUp and ArrowRight

interface Metric {
  id: string;
  name: string;
  value: string;
  unit?: string;
  status?: string;
  statusColor?: string; // e.g., "text-yellow-500", "text-green-500"
  icon: React.ElementType;
  time: string;
  change?: string; // e.g. "-0.5 kg"
}

const mockMetrics: Metric[] = [
  { id: 'glucose', name: 'Blood Glucose', value: '128', unit: 'mg/dL', status: 'Slightly High', statusColor: 'text-yellow-600 dark:text-yellow-400', icon: Droplets, time: 'Today' },
  { id: 'pressure', name: 'Blood Pressure', value: '135/85', unit: 'mmHg', status: 'Normal', statusColor: 'text-green-600 dark:text-green-400', icon: HeartPulse, time: 'Today' },
  { id: 'weight', name: 'Weight', value: '78.5', unit: 'kg', icon: Scale, time: 'Yesterday', change: '-0.5 kg' },
];

export function HealthMetricsCard() {
  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-md">Health Metrics</CardTitle>
        <Button variant="link" size="sm" className="text-xs h-auto p-0">View All <ArrowRight className="ml-1 h-3 w-3"/></Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockMetrics.map(metric => (
          <div key={metric.id} className="p-3 rounded-lg bg-secondary/5 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <metric.icon className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{metric.name}</span>
              </div>
              <span className="text-xs text-muted-foreground">{metric.time}</span>
            </div>
            <div className="flex items-baseline justify-between">
                <div>
                    <span className="text-xl font-bold">{metric.value}</span>
                    {metric.unit && <span className="text-xs text-muted-foreground ml-1">{metric.unit}</span>}
                </div>
                {metric.change && (
                     <span className={`text-xs font-medium ${metric.change.startsWith('-') ? 'text-green-600' : 'text-red-600'}`}>{metric.change}</span>
                )}
            </div>
            {metric.status && (
              <p className={`text-xs mt-0.5 font-medium ${metric.statusColor}`}>{metric.status}</p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
