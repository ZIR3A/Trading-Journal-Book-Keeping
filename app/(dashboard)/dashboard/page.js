'use client';

import { PageHeader } from '@/components/layout/page-header';
import { EmptyState } from '@/components/shared/empty-state';
import { LoadingState } from '@/components/shared/loading-state';
import { BookOpen } from 'lucide-react';
import { tradeStore } from '@/lib/store/trade-store';
import { settingsStore } from '@/lib/store/settings-store';
import { calculateDashboardMetrics, buildEquityCurve } from '@/lib/utils/dashboard-metrics';
import { MetricsCards } from '@/components/dashboard/metrics-cards';
import { EquityChart } from '@/components/dashboard/equity-chart';
import { RecentTrades } from '@/components/dashboard/recent-trades';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [trades, setTrades] = useState([]);
  const [accountBalance, setAccountBalance] = useState(10000);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [data, settings] = await Promise.all([
          tradeStore.getTrades(),
          settingsStore.getSettings()
        ]);
        setTrades(data);
        setAccountBalance(settings.accountBalance || 10000);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  if (isLoading) {
    return <LoadingState text="Loading dashboard analytics..." />;
  }

  if (trades.length === 0) {
    return (
      <div>
        <PageHeader 
          title="Dashboard" 
          description="Performance analytics and account overview"
        />
        <EmptyState 
          icon={BookOpen}
          title="No data available"
          description="Record trades in your journal to unlock dashboard analytics."
          actionLabel="Go to Journal"
          actionHref="/trades" 
        />
      </div>
    );
  }

  const metrics = calculateDashboardMetrics(trades);
  const curveData = buildEquityCurve(trades, accountBalance);

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Dashboard" 
        description="Performance analytics and account overview"
      />
      
      <MetricsCards metrics={metrics} />
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <EquityChart data={curveData} />
        </div>
        <div className="xl:col-span-1">
          <RecentTrades trades={trades} />
        </div>
      </div>
    </div>
  );
}
