'use client';

import { PageHeader } from '@/components/layout/page-header';
import { EmptyState } from '@/components/shared/empty-state';
import { LoadingState } from '@/components/shared/loading-state';
import { LineChart } from 'lucide-react';
import { tradeStore } from '@/lib/store/trade-store';
import { useState, useEffect, useMemo } from 'react';
import { calculateDashboardMetrics, calculateStreaks } from '@/lib/utils/dashboard-metrics';
import { analyzeSetups, analyzeDirection, buildRDistribution, buildCumulativeR } from '@/lib/utils/analytics';

import { AnalyticsFilters } from '@/components/analytics/analytics-filters';
import { PerformanceOverview } from '@/components/analytics/performance-overview';
import { CumulativeRChart } from '@/components/analytics/cumulative-r-chart';
import { SetupPerformance } from '@/components/analytics/setup-performance';
import { DirectionPerformance } from '@/components/analytics/direction-performance';
import { RDistributionChart } from '@/components/analytics/r-distribution-chart';
import { StreakStats } from '@/components/analytics/streak-stats';

/**
 * Returns a cutoff Date for the given preset key, or null for "all".
 */
function getDateCutoff(preset) {
  const now = new Date();
  if (preset === '7d') {
    return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  }
  if (preset === '30d') {
    return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  }
  if (preset === '90d') {
    return new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
  }
  if (preset === 'year') {
    return new Date(now.getFullYear(), 0, 1); // Jan 1 of current year
  }
  return null; // 'all'
}

export default function AnalyticsPage() {
  const [trades, setTrades] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter state — all defaults represent "no filter"
  const [dateRange, setDateRange] = useState('all');
  const [directionFilter, setDirectionFilter] = useState('all');
  const [setupFilter, setSetupFilter] = useState('all');

  useEffect(() => {
    async function loadData() {
      try {
        const data = await tradeStore.getTrades();
        setTrades(data);
      } catch (error) {
        console.error('Failed to load analytics data', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const hasActiveFilters = dateRange !== 'all' || directionFilter !== 'all' || setupFilter !== 'all';

  const clearFilters = () => {
    setDateRange('all');
    setDirectionFilter('all');
    setSetupFilter('all');
  };

  // Compute unique setups from all closed trades (for the filter dropdown)
  const uniqueSetups = useMemo(() => {
    const closed = trades.filter(t => t.status === 'closed' && t.setup);
    return Array.from(new Set(closed.map(t => t.setup))).sort();
  }, [trades]);

  /**
   * UNIFIED filter pipeline — ALL analysis sections derive from this same set.
   * This guarantees filter consistency across every metric, chart, and breakdown.
   */
  const filteredTrades = useMemo(() => {
    const cutoff = getDateCutoff(dateRange);

    return trades.filter(t => {
      if (t.status !== 'closed') return false;
      if (cutoff && new Date(t.date) < cutoff) return false;
      if (directionFilter !== 'all' && t.direction !== directionFilter) return false;
      if (setupFilter !== 'all' && t.setup !== setupFilter) return false;
      return true;
    });
  }, [trades, dateRange, directionFilter, setupFilter]);

  // All analytics computed from filteredTrades
  const metrics = useMemo(() => calculateDashboardMetrics(filteredTrades), [filteredTrades]);
  const streaks = useMemo(() => calculateStreaks(filteredTrades), [filteredTrades]);
  const cumulativeRData = useMemo(() => buildCumulativeR(filteredTrades), [filteredTrades]);
  const setupData = useMemo(() => analyzeSetups(filteredTrades), [filteredTrades]);
  const directionData = useMemo(() => analyzeDirection(filteredTrades), [filteredTrades]);
  const rDistData = useMemo(() => buildRDistribution(filteredTrades), [filteredTrades]);

  if (isLoading) {
    return <LoadingState text="Loading performance analysis..." />;
  }

  // No closed trades at all in the journal
  const hasAnyClosedTrades = trades.some(t => t.status === 'closed');
  if (!hasAnyClosedTrades) {
    return (
      <div>
        <PageHeader
          title="Performance Analysis"
          description="Deep dive into your trading data and find your edge."
        />
        <EmptyState
          icon={LineChart}
          title="No trading data yet"
          description="Record closed trades in your journal to start analyzing your performance."
          actionLabel="New Trade"
          actionHref="/trades/new"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Performance Analysis"
        description="Understand your historical trading performance and behavior."
      />

      {/* Filters — Date, Direction, Setup, Clear */}
      <AnalyticsFilters
        setups={uniqueSetups}
        currentDateRange={dateRange}
        currentDirection={directionFilter}
        currentSetup={setupFilter}
        onDateRangeChange={setDateRange}
        onDirectionChange={setDirectionFilter}
        onSetupChange={setSetupFilter}
        onClearFilters={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* No trades match the current filter combination */}
      {filteredTrades.length === 0 ? (
        <div className="py-16 flex flex-col items-center justify-center border border-border bg-card">
          <LineChart className="h-10 w-10 text-secondary-text mb-4" />
          <h3 className="text-lg font-display text-primary mb-2">No trades match your filters</h3>
          <p className="text-sm text-secondary-text mb-6">Try adjusting the date range or filter selections.</p>
          <button
            onClick={clearFilters}
            className="border border-border px-4 py-2 text-sm hover:bg-secondary transition-colors"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <>
          {/* Performance Overview — KPI cards */}
          <PerformanceOverview metrics={metrics} />

          {/* Cumulative R Progression chart */}
          <CumulativeRChart data={cumulativeRData} />

          {/* R Distribution + Direction Performance */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <RDistributionChart data={rDistData} />
            <DirectionPerformance data={directionData} />
          </div>

          {/* Setup Performance table */}
          <SetupPerformance data={setupData} />

          {/* Streak Analysis */}
          <StreakStats streaks={streaks} />
        </>
      )}
    </div>
  );
}

