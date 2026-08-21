'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { formatCurrency } from '@/lib/utils/formatters';

export function EquityChart({ data }) {
  if (!data || data.length <= 1) {
    return (
      <Card className="rounded-none shadow-none border-border">
        <CardHeader className="border-b border-border bg-subtle-background/50">
          <CardTitle className="text-lg font-display text-primary">Equity Curve</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <p className="text-secondary-text text-sm">Your equity curve will appear here after you complete your first trade.</p>
        </CardContent>
      </Card>
    );
  }

  const minBalance = Math.min(...data.map(d => d.balance));
  const maxBalance = Math.max(...data.map(d => d.balance));
  
  // Dynamic padding for Y Axis
  const padding = (maxBalance - minBalance) * 0.1;
  const domainMin = Math.max(0, minBalance - padding);
  const domainMax = maxBalance + padding;

  return (
    <Card className="rounded-none shadow-none border-border">
      <CardHeader className="border-b border-border bg-subtle-background/50">
        <CardTitle className="text-lg font-display text-primary">Equity Curve</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[300px] w-full">
          <ChartContainer config={{
            balance: {
              label: "Account Balance",
              color: "hsl(var(--primary))",
            }
          }} className="w-full h-full">
            <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
              <XAxis 
                dataKey="name" 
                tickLine={false} 
                axisLine={false} 
                tick={{ fontSize: 12, fill: 'hsl(var(--secondary-text))' }} 
                dy={10} 
              />
              <YAxis 
                domain={[domainMin, domainMax]} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => formatCurrency(value)} 
                tick={{ fontSize: 12, fill: 'hsl(var(--secondary-text))' }}
                width={80}
              />
              <ChartTooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="grid min-w-[150px] items-start gap-3 rounded-lg border border-border/50 bg-background px-3 py-2 text-xs shadow-xl">
                        <div>
                          <div className="font-medium text-primary">
                            {data.name === 'Start' ? 'Starting Equity' : `Trade ${data.name.replace('T', '')}`}
                          </div>
                          {data.date && <div className="text-secondary-text">{data.date}</div>}
                        </div>
                        <div className="grid gap-1">
                          <div className="flex justify-between">
                            <span className="text-secondary-text">Equity</span>
                            <span className="font-mono font-medium">{formatCurrency(data.balance)}</span>
                          </div>
                          {data.pnl !== undefined && (
                            <div className="flex justify-between">
                              <span className="text-secondary-text">Trade P&L</span>
                              <span className={`font-mono font-medium ${data.pnl > 0 ? 'text-profit' : data.pnl < 0 ? 'text-loss' : 'text-primary'}`}>
                                {data.pnl > 0 ? '+' : ''}{formatCurrency(data.pnl)}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }
                  return null;
                }} 
              />
              <Line 
                type="stepAfter" 
                dataKey="balance" 
                stroke="var(--color-balance)" 
                strokeWidth={2} 
                dot={false} 
                activeDot={{ r: 4, fill: 'hsl(var(--primary))', stroke: 'hsl(var(--background))', strokeWidth: 2 }}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
