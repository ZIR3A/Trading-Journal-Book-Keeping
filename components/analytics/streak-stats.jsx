'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

function StreakItem({ label, value, highlight }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-border last:border-b-0">
      <span className="text-sm text-primary">{label}</span>
      <span
        className={`font-mono text-lg font-semibold ${
          highlight === 'positive' ? 'text-profit' : highlight === 'negative' ? 'text-loss' : 'text-primary'
        }`}
        aria-label={`${label}: ${value}`}
      >
        {value}
      </span>
    </div>
  );
}

export function StreakStats({ streaks }) {
  const { currentWinStreak, currentLossStreak, bestWinStreak, worstLossStreak } = streaks;

  return (
    <Card className="rounded-none shadow-none border-border">
      <CardHeader className="border-b border-border bg-subtle-background/50 py-4">
        <CardTitle className="text-lg font-display text-primary">Streak Analysis</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
          {/* Current Streaks */}
          <div className="p-5">
            <p className="text-xs font-mono uppercase tracking-wider text-secondary-text mb-4">
              Current Streak
            </p>
            <StreakItem
              label="Winning Streak"
              value={currentWinStreak}
              highlight={currentWinStreak > 0 ? 'positive' : null}
            />
            <StreakItem
              label="Losing Streak"
              value={currentLossStreak}
              highlight={currentLossStreak > 0 ? 'negative' : null}
            />
          </div>
          {/* Best Historical */}
          <div className="p-5">
            <p className="text-xs font-mono uppercase tracking-wider text-secondary-text mb-4">
              Historical Best
            </p>
            <StreakItem
              label="Best Win Streak"
              value={bestWinStreak}
              highlight={bestWinStreak > 0 ? 'positive' : null}
            />
            <StreakItem
              label="Worst Loss Streak"
              value={worstLossStreak}
              highlight={worstLossStreak > 0 ? 'negative' : null}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
