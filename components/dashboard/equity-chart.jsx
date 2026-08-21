'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from 'recharts';
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
      <CardHeader className="border-b border-border bg-subtle-background/50 flex flex-row items-center justify-between py-4">
        <CardTitle className="text-lg font-display text-primary">Equity Curve</CardTitle>
        <div className="text-sm font-mono font-medium text-primary bg-background px-3 py-1 border border-border">
          {formatCurrency(data[data.length - 1].balance)}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="h-[300px] w-full">
          <ChartContainer config={{
            balance: {
              label: "Account Balance",
              color: "hsl(var(--primary))",
            }
          }} className="w-full h-full">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="fillBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-balance)" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="var(--color-balance)" stopOpacity={0.01}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" opacity={0.5} />
              <XAxis 
                dataKey="name" 
                tickLine={false} 
                axisLine={false} 
                tick={{ fontSize: 12, fill: 'hsl(var(--secondary-text))' }} 
                dy={10} 
                interval="preserveStartEnd"
              />
              <YAxis 
                domain={[domainMin, domainMax]} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => {
                  if (value >= 1000) return `$${(value / 1000).toFixed(1)}k`;
                  return `$${value.toFixed(0)}`;
                }} 
                tick={{ fontSize: 12, fill: 'hsl(var(--secondary-text))' }}
                width={65}
              />
              <ChartTooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="grid min-w-[150px] items-start gap-3 rounded-none border border-border bg-background px-3 py-2 text-xs shadow-none">
                        <div>
                          <div className="font-medium text-primary uppercase tracking-wider text-[10px]">
                            {data.name === 'Start' ? 'Starting Equity' : `Trade ${data.name.replace('T', '')}`}
                          </div>
                          {data.date && <div className="text-secondary-text mt-1">{data.date}</div>}
                        </div>
                        <div className="grid gap-1 pt-2 border-t border-border/50">
                          <div className="flex justify-between gap-4">
                            <span className="text-secondary-text">Equity</span>
                            <span className="font-mono font-medium">{formatCurrency(data.balance)}</span>
                          </div>
                          {data.pnl !== undefined && (
                            <div className="flex justify-between gap-4">
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
              <Area 
                type="stepAfter" 
                dataKey="balance" 
                stroke="var(--color-balance)" 
                strokeWidth={2} 
                fill="url(#fillBalance)"
                dot={data.length <= 15 ? { r: 3, fill: 'hsl(var(--primary))', strokeWidth: 0 } : false} 
                activeDot={{ r: 4, fill: 'hsl(var(--primary))', stroke: 'hsl(var(--background))', strokeWidth: 2 }}
              />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
