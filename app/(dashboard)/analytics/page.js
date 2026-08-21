'use client';

import { PageHeader } from '@/components/layout/page-header';
import { EmptyState } from '@/components/shared/empty-state';
import { LoadingState } from '@/components/shared/loading-state';
import { LineChart } from 'lucide-react';
import { tradeStore } from '@/lib/store/trade-store';
import { useState, useEffect, useMemo } from 'react';
import { analyzeSetups, analyzeDirection, buildRDistribution } from '@/lib/utils/analytics';

import { AnalyticsFilters } from '@/components/analytics/analytics-filters';
import { SetupPerformance } from '@/components/analytics/setup-performance';
import { DirectionPerformance } from '@/components/analytics/direction-performance';
import { RDistributionChart } from '@/components/analytics/r-distribution-chart';

export default function AnalyticsPage() {
  const [trades, setTrades] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters State
  const [directionFilter, setDirectionFilter] = useState('all');
  const [setupFilter, setSetupFilter] = useState('all');

  useEffect(() => {
    async function loadData() {
      try {
        const data = await tradeStore.getTrades();
        setTrades(data);
      } catch (error) {
        console.error("Failed to load analytics data", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Compute unique setups for the filter dropdown
  const uniqueSetups = useMemo(() => {
    const closed = trades.filter(t => t.status === 'closed' && t.setup);
    return Array.from(new Set(closed.map(t => t.setup))).sort();
  }, [trades]);

  // Apply filters to get a subset of trades
  const filteredTrades = useMemo(() => {
    return trades.filter(t => {
      if (t.status !== 'closed') return false;
      if (directionFilter !== 'all' && t.direction !== directionFilter) return false;
      if (setupFilter !== 'all' && t.setup !== setupFilter) return false;
      return true;
    });
  }, [trades, directionFilter, setupFilter]);

  // Derived Analytics Data
  const setupData = useMemo(() => analyzeSetups(filteredTrades), [filteredTrades]);
  const directionData = useMemo(() => analyzeDirection(filteredTrades), [filteredTrades]);
  const rDistData = useMemo(() => buildRDistribution(filteredTrades), [filteredTrades]);

  if (isLoading) {
    return <LoadingState text="Loading advanced analytics..." />;
  }

  // Entirely empty state (No trades recorded at all in the journal)
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
          title="Not enough data"
          description="Record closed trades in your journal to unlock performance analysis."
          actionLabel="Go to Journal"
          actionHref="/trades" 
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Performance Analysis" 
        description="Deep dive into your trading data and find your edge."
      />

      <AnalyticsFilters 
        setups={uniqueSetups}
        currentDirection={directionFilter}
        currentSetup={setupFilter}
        onDirectionChange={setDirectionFilter}
        onSetupChange={setSetupFilter}
      />

      {filteredTrades.length === 0 ? (
        <div className="py-12 border border-border flex items-center justify-center bg-subtle-background/50">
          <p className="text-secondary-text text-sm">No trades match the selected filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="space-y-6">
            <RDistributionChart data={rDistData} />
            <DirectionPerformance data={directionData} />
          </div>
          <div className="space-y-6">
            <SetupPerformance data={setupData} />
          </div>
        </div>
      )}
    </div>
  );
}
