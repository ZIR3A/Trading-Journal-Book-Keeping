'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ReferenceLine, ResponsiveContainer } from 'recharts';
import { formatNumber } from '@/lib/utils/formatters';

function CumulativeRTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const point = payload[0]?.payload;
  if (!point) return null;

  return (
    <div className="border border-border bg-card p-3 text-xs font-mono shadow-none min-w-[140px] rounded-none">
      {point.date && <p className="text-secondary-text mb-1 uppercase tracking-wider text-[10px]">{point.date}</p>}
      {point.symbol && <p className="text-primary font-semibold mb-2">{point.symbol.toUpperCase()}</p>}
      <div className="grid gap-1 pt-2 border-t border-border/50">
        {point.rMultiple != null && (
          <div className="flex justify-between gap-4">
            <span className="text-secondary-text font-sans">Trade R</span>
            <span className={`font-mono font-medium ${point.rMultiple >= 0 ? 'text-profit' : 'text-loss'}`}>
              {point.rMultiple >= 0 ? '+' : ''}{formatNumber(point.rMultiple, 2)}R
            </span>
          </div>
        )}
        <div className="flex justify-between gap-4">
          <span className="text-secondary-text font-sans">Cumulative</span>
          <span className={`font-mono font-bold ${point.cumulativeR >= 0 ? 'text-profit' : 'text-loss'}`}>
            {point.cumulativeR >= 0 ? '+' : ''}{formatNumber(point.cumulativeR, 2)}R
          </span>
        </div>
      </div>
    </div>
  );
}

export function CumulativeRChart({ data }) {
  // Require at least 2 real trade points (index > 0) to show chart
  const hasData = data && data.filter(d => d.index > 0).length >= 1;

  if (!hasData) {
    return (
      <Card className="rounded-none shadow-none border-border">
        <CardHeader className="border-b border-border bg-subtle-background/50 py-4">
          <CardTitle className="text-lg font-display text-primary">Cumulative R Progression</CardTitle>
        </CardHeader>
        <CardContent className="h-[280px] flex items-center justify-center">
          <p className="text-secondary-text text-sm text-center max-w-xs">
            Not enough closed trade data to display performance progression.
          </p>
        </CardContent>
      </Card>
    );
  }

  const finalR = data[data.length - 1]?.cumulativeR ?? 0;

  return (
    <Card className="rounded-none shadow-none border-border">
      <CardHeader className="border-b border-border bg-subtle-background/50 py-4 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-display text-primary">Cumulative R Progression</CardTitle>
        <div className="text-sm font-mono font-medium text-primary bg-background px-3 py-1 border border-border">
          {finalR >= 0 ? '+' : ''}{formatNumber(finalR, 2)}R
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-[260px] w-full">
          <ChartContainer
            config={{
              cumulativeR: {
                label: 'Cumulative R',
                color: 'hsl(var(--primary))',
              },
            }}
            className="w-full h-full"
          >
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="fillCumulativeR" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-cumulativeR)" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="var(--color-cumulativeR)" stopOpacity={0.01}/>
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(var(--border))"
                opacity={0.5}
              />
              <XAxis
                dataKey="label"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: 'hsl(var(--secondary-text))' }}
                dy={8}
                interval="preserveStartEnd"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: 'hsl(var(--secondary-text))' }}
                tickFormatter={(v) => `${v > 0 ? '+' : ''}${v}R`}
              />
              <ReferenceLine y={0} stroke="hsl(var(--border))" strokeWidth={1.5} />
              <ChartTooltip content={<CumulativeRTooltip />} />
              <Area
                type="monotone"
                dataKey="cumulativeR"
                stroke="var(--color-cumulativeR)"
                strokeWidth={2}
                fill="url(#fillCumulativeR)"
                dot={data.length <= 20 ? { r: 3, fill: 'hsl(var(--primary))', strokeWidth: 0 } : false}
                activeDot={{ r: 4, fill: 'hsl(var(--primary))', stroke: 'hsl(var(--background))', strokeWidth: 2 }}
              />
            </AreaChart>
          </ChartContainer>
        </div>
        <p className="text-xs text-secondary-text mt-2 font-mono text-center">
          Realized R — closed trades only. Planned target R:R is not included.
        </p>
      </CardContent>
    </Card>
  );
}
