'use client';

import { PageHeader } from '@/components/layout/page-header';
import { EmptyState } from '@/components/shared/empty-state';
import { BookOpen } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { tradeStore } from '@/lib/store/trade-store';
import { TradeList } from '@/components/trades/trade-list';
import { useState, useEffect } from 'react';
import { LoadingState } from '@/components/shared/loading-state';

export default function Trades() {
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
    <div>
      <PageHeader 
        title="Trade Journal" 
        description="Record and review your trades"
      >
        <Link href="/trades/new" className={buttonVariants({ className: "rounded-none" })}>
          New Trade
        </Link>
      </PageHeader>
      
      {isLoading ? (
        <LoadingState text="Loading journal..." />
      ) : trades.length > 0 ? (
        <TradeList trades={trades} />
      ) : (
        <EmptyState 
          icon={BookOpen}
          title="No trades yet"
          description="Get started by recording your first trade."
          actionLabel="Record Trade"
          actionHref="/trades/new" 
        />
      )}
    </div>
  );
}
