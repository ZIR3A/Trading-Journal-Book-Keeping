'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, LabelList, Cell, ReferenceLine } from 'recharts';
import { formatCurrency } from '@/lib/utils/formatters';

export function MonthlyPnlChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <Card className="rounded-none shadow-none border-border">
        <CardHeader className="border-b border-border bg-subtle-background/50">
          <CardTitle className="text-lg font-display text-primary">Monthly Performance</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <p className="text-secondary-text text-sm">No closed trades available for monthly analysis.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-none shadow-none border-border">
      <CardHeader className="border-b border-border bg-subtle-background/50">
        <CardTitle className="text-lg font-display text-primary">Monthly Performance</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[300px] w-full">
          <ChartContainer config={{
            pnl: {
              label: "Net P&L",
            }
          }} className="w-full h-full">
            <BarChart data={data} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
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
                tickFormatter={(value) => {
                  if (Math.abs(value) >= 1000) return `$${(value / 1000).toFixed(1)}k`;
                  return `$${value.toFixed(0)}`;
                }}
              />
              <ReferenceLine y={0} stroke="hsl(var(--border))" strokeWidth={1.5} />
              <ChartTooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="grid min-w-[140px] items-start gap-1 rounded-none border border-border bg-background px-3 py-2 text-xs shadow-none">
                        <div className="font-medium text-primary mb-1 uppercase tracking-wider text-[10px]">{data.name}</div>
                        <div className="flex justify-between gap-4">
                          <span className="text-secondary-text">Trades</span>
                          <span className="font-mono font-medium">{data.trades}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                          <span className="text-secondary-text">Net P&L</span>
                          <span className={`font-mono font-bold ${data.pnl >= 0 ? 'text-profit' : 'text-loss'}`}>
                            {data.pnl >= 0 ? '+' : ''}{formatCurrency(data.pnl)}
                          </span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }} 
              />
              <Bar 
                dataKey="pnl" 
                radius={[0, 0, 0, 0]}
                barSize={40}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.pnl >= 0 ? 'hsl(var(--profit))' : 'hsl(var(--loss))'} />
                ))}
                <LabelList 
                  dataKey="pnl" 
                  position="top" 
                  offset={10}
                  className="font-mono text-[10px]" 
                  formatter={(val) => {
                    const str = formatCurrency(Math.abs(val));
                    return val >= 0 ? `+${str}` : `-${str}`;
                  }}
                  fill="hsl(var(--primary))"
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
