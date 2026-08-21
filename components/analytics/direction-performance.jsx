'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency, formatNumber, formatInteger } from '@/lib/utils/formatters';

export function DirectionPerformance({ data }) {
  const { long, short } = data;

  return (
    <Card className="rounded-none shadow-none border-border">
      <CardHeader className="border-b border-border bg-subtle-background/50">
        <CardTitle className="text-lg font-display text-primary">Direction Performance</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Long Stats */}
          <div className="border border-border p-4 bg-subtle-background/30">
            <h3 className="text-xs uppercase tracking-wider text-secondary-text font-semibold mb-4 border-b border-border pb-2">Long Trades</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-primary">Total Trades</span>
                <span className="font-mono text-sm">{formatInteger(long.trades)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-primary">Win Rate</span>
                <span className="font-mono text-sm">{formatNumber(long.winRate, 1)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-primary">Average R</span>
                <span className={`font-mono text-sm ${long.averageR > 0 ? 'text-profit' : long.averageR < 0 ? 'text-loss' : 'text-primary'}`}>
                  {long.averageR > 0 ? '+' : ''}{formatNumber(long.averageR, 2)}R
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-primary">Total P&L</span>
                <span className={`font-mono text-sm font-bold ${long.totalPnl > 0 ? 'text-profit' : long.totalPnl < 0 ? 'text-loss' : 'text-primary'}`}>
                  {long.totalPnl > 0 ? '+' : ''}{formatCurrency(long.totalPnl)}
                </span>
              </div>
            </div>
          </div>

          {/* Short Stats */}
          <div className="border border-border p-4 bg-subtle-background/30">
            <h3 className="text-xs uppercase tracking-wider text-secondary-text font-semibold mb-4 border-b border-border pb-2">Short Trades</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-primary">Total Trades</span>
                <span className="font-mono text-sm">{formatInteger(short.trades)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-primary">Win Rate</span>
                <span className="font-mono text-sm">{formatNumber(short.winRate, 1)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-primary">Average R</span>
                <span className={`font-mono text-sm ${short.averageR > 0 ? 'text-profit' : short.averageR < 0 ? 'text-loss' : 'text-primary'}`}>
                  {short.averageR > 0 ? '+' : ''}{formatNumber(short.averageR, 2)}R
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-primary">Total P&L</span>
                <span className={`font-mono text-sm font-bold ${short.totalPnl > 0 ? 'text-profit' : short.totalPnl < 0 ? 'text-loss' : 'text-primary'}`}>
                  {short.totalPnl > 0 ? '+' : ''}{formatCurrency(short.totalPnl)}
                </span>
              </div>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  );
}
