'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/layout/page-header';
import { CalendarView } from '@/components/calendar/calendar-view';
import { tradeStore } from '@/lib/store/trade-store';
import { LoadingState } from '@/components/shared/loading-state';

export default function CalendarPage() {
  const [trades, setTrades] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTrades() {
      try {
        const data = await tradeStore.getTrades();
        setTrades(data);
      } catch (error) {
        console.error("Failed to load trades", error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadTrades();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Calendar" 
        description="View your trading activity over time"
      />
      
      {isLoading ? (
        <LoadingState text="Loading calendar data..." />
      ) : (
        <CalendarView trades={trades} />
      )}
    </div>
  );
}
