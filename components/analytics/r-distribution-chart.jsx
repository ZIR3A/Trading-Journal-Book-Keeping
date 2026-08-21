'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from 'recharts';

export function RDistributionChart({ data }) {
  if (!data || data.every(d => d.count === 0)) {
    return (
      <Card className="rounded-none shadow-none border-border">
        <CardHeader className="border-b border-border bg-subtle-background/50">
          <CardTitle className="text-lg font-display text-primary">R-Multiple Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <p className="text-secondary-text text-sm">No closed trades available for distribution analysis.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-none shadow-none border-border">
      <CardHeader className="border-b border-border bg-subtle-background/50">
        <CardTitle className="text-lg font-display text-primary">R-Multiple Distribution</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[300px] w-full">
          <ChartContainer config={{
            count: {
              label: "Trades",
              color: "hsl(var(--primary))",
            }
          }} className="w-full h-full">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
              <XAxis 
                dataKey="name" 
                tickLine={false} 
                axisLine={false} 
                tick={{ fontSize: 12, fill: 'hsl(var(--secondary-text))' }} 
                dy={10} 
              />
              <YAxis 
                tickLine={false} 
                axisLine={false} 
                tick={{ fontSize: 12, fill: 'hsl(var(--secondary-text))' }}
                allowDecimals={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar 
                dataKey="count" 
                fill="var(--color-count)" 
                radius={[0, 0, 0, 0]}
                barSize={40}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
