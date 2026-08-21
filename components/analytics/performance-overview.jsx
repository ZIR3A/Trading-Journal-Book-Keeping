'use client';

import { formatCurrency, formatNumber } from '@/lib/utils/formatters';

function MetricBlock({ label, value, sub, highlight }) {
  return (
    <div className="border border-border p-4 bg-card">
      <p className="text-xs font-mono uppercase tracking-wider text-secondary-text mb-2">{label}</p>
      <p className={`text-2xl font-display font-semibold leading-none ${highlight === 'positive' ? 'text-profit' : highlight === 'negative' ? 'text-loss' : 'text-primary'}`}>
        {value}
      </p>
      {sub && <p className="text-xs text-secondary-text mt-2 font-mono">{sub}</p>}
    </div>
  );
}

export function PerformanceOverview({ metrics }) {
  const {
    totalTrades,
    winRate,
    totalPnl,
    totalR,
    averageR,
    profitFactor,
    expectancy,
    winCount,
    lossCount,
  } = metrics;

  const pnlHighlight = totalPnl > 0 ? 'positive' : totalPnl < 0 ? 'negative' : null;
  const rHighlight = totalR > 0 ? 'positive' : totalR < 0 ? 'negative' : null;
  const avgRHighlight = averageR > 0 ? 'positive' : averageR < 0 ? 'negative' : null;
  const expectancyHighlight = expectancy > 0 ? 'positive' : expectancy < 0 ? 'negative' : null;

  const profitFactorDisplay = !isFinite(profitFactor)
    ? '∞'
    : profitFactor === 0
    ? '—'
    : formatNumber(profitFactor, 2);

  return (
    <div>
      <h2 className="text-xs font-mono uppercase tracking-wider text-secondary-text mb-3">
        Performance Overview
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
        <MetricBlock
          label="Closed Trades"
          value={totalTrades}
          sub={`${winCount}W · ${lossCount}L`}
        />
        <MetricBlock
          label="Win Rate"
          value={`${formatNumber(winRate, 1)}%`}
          sub={totalTrades > 0 ? `${winCount} of ${totalTrades}` : 'No data'}
        />
        <MetricBlock
          label="Net P&L"
          value={`${totalPnl >= 0 ? '+' : ''}${formatCurrency(totalPnl)}`}
          highlight={pnlHighlight}
        />
        <MetricBlock
          label="Total R"
          value={`${totalR >= 0 ? '+' : ''}${formatNumber(totalR, 2)}R`}
          highlight={rHighlight}
        />
        <MetricBlock
          label="Average R"
          value={`${averageR >= 0 ? '+' : ''}${formatNumber(averageR, 2)}R`}
          highlight={avgRHighlight}
          sub="per closed trade"
        />
        <MetricBlock
          label="Profit Factor"
          value={profitFactorDisplay}
          sub={!isFinite(profitFactor) ? 'No losing trades' : undefined}
        />
        <MetricBlock
          label="Expectancy"
          value={`${expectancy >= 0 ? '+' : ''}${formatNumber(expectancy, 2)}`}
          highlight={expectancyHighlight}
          sub="per trade ($)"
        />
      </div>
    </div>
  );
}
