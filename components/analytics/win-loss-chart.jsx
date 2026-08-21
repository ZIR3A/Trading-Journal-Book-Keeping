'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';

export function WinLossChart({ data }) {
  if (!data || (data[0].value === 0 && data[1].value === 0)) {
    return (
      <Card className="rounded-none shadow-none border-border flex flex-col">
        <CardHeader className="border-b border-border bg-subtle-background/50">
          <CardTitle className="text-lg font-display text-primary">Win vs Loss</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center flex-1">
          <p className="text-secondary-text text-sm">No closed trades available for analysis.</p>
        </CardContent>
      </Card>
    );
  }

  const total = data[0].value + data[1].value;
  const winRate = ((data[0].value / total) * 100).toFixed(1);

  return (
    <Card className="rounded-none shadow-none border-border flex flex-col">
      <CardHeader className="border-b border-border bg-subtle-background/50 flex flex-row items-center justify-between py-4">
        <CardTitle className="text-lg font-display text-primary">Win vs Loss</CardTitle>
        <div className="text-sm font-mono font-bold text-primary bg-background px-3 py-1 border border-border">
          {winRate}% WR
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-1 flex flex-col justify-center">
        <div className="h-[200px] w-full">
          <ChartContainer config={{
            value: { label: "Trades" }
          }} className="w-full h-full mx-auto aspect-square">
            <PieChart>
              <ChartTooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="grid min-w-[100px] items-start gap-1 rounded-none border border-border bg-background px-3 py-2 text-xs shadow-none">
                        <div className="flex justify-between gap-4">
                          <span className="text-secondary-text font-sans uppercase tracking-wider text-[10px]">{data.name}</span>
                          <span className={`font-mono font-bold ${data.name === 'Wins' ? 'text-profit' : 'text-loss'}`}>{data.value}</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }} 
              />
              <defs>
                <linearGradient id="winGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--profit))" stopOpacity={1} />
                  <stop offset="100%" stopColor="hsl(var(--profit))" stopOpacity={0.4} />
                </linearGradient>
              </defs>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                stroke="hsl(var(--background))"
                strokeWidth={2}
                paddingAngle={2}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.name === 'Wins' ? 'url(#winGradient)' : entry.fill} 
                  />
                ))}
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-primary text-2xl font-bold font-mono"
                          >
                            {total}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 20}
                            className="fill-secondary-text text-xs"
                          >
                            Trades
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
