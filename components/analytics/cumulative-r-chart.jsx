'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import { Line, LineChart, CartesianGrid, XAxis, YAxis, ReferenceLine, ResponsiveContainer } from 'recharts';
import { formatNumber } from '@/lib/utils/formatters';

function CumulativeRTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const point = payload[0]?.payload;
  if (!point) return null;

  return (
    <div className="border border-border bg-card p-3 text-xs font-mono shadow-none min-w-[140px]">
      {point.date && <p className="text-secondary-text mb-1">{point.date}</p>}
      {point.symbol && <p className="text-primary font-semibold mb-2">{point.symbol.toUpperCase()}</p>}
      {point.rMultiple != null && (
        <p className={`mb-1 ${point.rMultiple >= 0 ? 'text-profit' : 'text-loss'}`}>
          Trade R: {point.rMultiple >= 0 ? '+' : ''}{formatNumber(point.rMultiple, 2)}R
        </p>
      )}
      <p className={`font-bold ${point.cumulativeR >= 0 ? 'text-profit' : 'text-loss'}`}>
        Cumulative: {point.cumulativeR >= 0 ? '+' : ''}{formatNumber(point.cumulativeR, 2)}R
      </p>
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
        <span
          aria-label={`Net cumulative R: ${finalR >= 0 ? '+' : ''}${formatNumber(finalR, 2)}R`}
          className={`text-sm font-mono font-bold ${finalR >= 0 ? 'text-profit' : 'text-loss'}`}
        >
          {finalR >= 0 ? '+' : ''}{formatNumber(finalR, 2)}R
        </span>
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
            <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                tickFormatter={(v) => `${v >= 0 ? '+' : ''}${v}R`}
              />
              <ReferenceLine y={0} stroke="hsl(var(--border))" strokeWidth={1.5} />
              <ChartTooltip content={<CumulativeRTooltip />} />
              <Line
                type="monotone"
                dataKey="cumulativeR"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={data.length <= 20 ? { r: 3, fill: 'hsl(var(--primary))', strokeWidth: 0 } : false}
                activeDot={{ r: 5, fill: 'hsl(var(--primary))', strokeWidth: 0 }}
              />
            </LineChart>
          </ChartContainer>
        </div>
        <p className="text-xs text-secondary-text mt-2 font-mono text-center">
          Realized R — closed trades only. Planned target R:R is not included.
        </p>
      </CardContent>
    </Card>
  );
}
