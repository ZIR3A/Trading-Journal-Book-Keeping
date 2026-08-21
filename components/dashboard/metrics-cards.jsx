'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency, formatNumber, formatInteger } from '@/lib/utils/formatters';

export function MetricsCards({ metrics }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* P&L */}
      <Card className="rounded-none shadow-none border-border">
        <CardHeader className="py-4 pb-2">
          <CardTitle className="text-sm font-medium text-secondary-text uppercase tracking-wider">Total P&L</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-mono font-bold ${metrics.totalPnl > 0 ? 'text-profit' : metrics.totalPnl < 0 ? 'text-loss' : 'text-primary'}`}>
            {metrics.totalPnl > 0 ? '+' : ''}{formatCurrency(metrics.totalPnl)}
          </div>
        </CardContent>
      </Card>

      {/* Win Rate */}
      <Card className="rounded-none shadow-none border-border">
        <CardHeader className="py-4 pb-2">
          <CardTitle className="text-sm font-medium text-secondary-text uppercase tracking-wider">Win Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-mono font-bold text-primary">
            {formatNumber(metrics.winRate, 1)}%
          </div>
          <p className="text-xs text-secondary-text mt-1">
            {formatInteger(metrics.winCount)}W / {formatInteger(metrics.lossCount)}L
          </p>
        </CardContent>
      </Card>

      {/* Profit Factor */}
      <Card className="rounded-none shadow-none border-border">
        <CardHeader className="py-4 pb-2">
          <CardTitle className="text-sm font-medium text-secondary-text uppercase tracking-wider">Profit Factor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-mono font-bold text-primary">
            {metrics.profitFactor === Number.POSITIVE_INFINITY ? '∞' : formatNumber(metrics.profitFactor, 2)}
          </div>
        </CardContent>
      </Card>

      {/* Expectancy */}
      <Card className="rounded-none shadow-none border-border">
        <CardHeader className="py-4 pb-2">
          <CardTitle className="text-sm font-medium text-secondary-text uppercase tracking-wider">Expectancy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-mono font-bold ${metrics.expectancy > 0 ? 'text-profit' : metrics.expectancy < 0 ? 'text-loss' : 'text-primary'}`}>
            {metrics.expectancy > 0 ? '+' : ''}{formatCurrency(metrics.expectancy)}
          </div>
        </CardContent>
      </Card>

      {/* Average R */}
      <Card className="rounded-none shadow-none border-border">
        <CardHeader className="py-4 pb-2">
          <CardTitle className="text-sm font-medium text-secondary-text uppercase tracking-wider">Avg R-Multiple</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-mono font-bold ${metrics.averageR > 0 ? 'text-profit' : metrics.averageR < 0 ? 'text-loss' : 'text-primary'}`}>
            {metrics.averageR > 0 ? '+' : ''}{formatNumber(metrics.averageR, 2)}R
          </div>
        </CardContent>
      </Card>

      {/* Avg Win / Loss */}
      <Card className="rounded-none shadow-none border-border">
        <CardHeader className="py-4 pb-2">
          <CardTitle className="text-sm font-medium text-secondary-text uppercase tracking-wider">Avg Win / Loss</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 text-lg font-mono font-bold">
            <span className="text-profit">+{formatCurrency(metrics.averageWin)}</span>
            <span className="text-secondary-text">/</span>
            <span className="text-loss">-{formatCurrency(metrics.averageLoss)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Max Drawdown */}
      <Card className="rounded-none shadow-none border-border">
        <CardHeader className="py-4 pb-2">
          <CardTitle className="text-sm font-medium text-secondary-text uppercase tracking-wider">Max Drawdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-mono font-bold text-loss">
            -{formatCurrency(metrics.maxDrawdown)}
          </div>
        </CardContent>
      </Card>

      {/* Total Trades */}
      <Card className="rounded-none shadow-none border-border">
        <CardHeader className="py-4 pb-2">
          <CardTitle className="text-sm font-medium text-secondary-text uppercase tracking-wider">Trades Taken</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-mono font-bold text-primary">
            {formatInteger(metrics.totalTrades)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
