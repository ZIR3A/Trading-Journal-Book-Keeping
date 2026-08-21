'use client';

import { PageHeader } from '@/components/layout/page-header';
import { EmptyState } from '@/components/shared/empty-state';
import { BookOpen, Search, X } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { tradeStore } from '@/lib/store/trade-store';
import { TradeList } from '@/components/trades/trade-list';
import { useState, useEffect, useMemo } from 'react';
import { LoadingState } from '@/components/shared/loading-state';
import { Input } from '@/components/ui/input';

export default function Trades() {
  const [trades, setTrades] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [directionFilter, setDirectionFilter] = useState('all');
  const [outcomeFilter, setOutcomeFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');

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

  const filteredTrades = useMemo(() => {
    return trades
      .filter((trade) => {
        // Search
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          const matchesSymbol = trade.symbol?.toLowerCase().includes(query);
          const matchesSetup = trade.setup?.toLowerCase().includes(query);
          const matchesNotes = trade.notes?.toLowerCase().includes(query);
          if (!matchesSymbol && !matchesSetup && !matchesNotes) return false;
        }

        // Status
        if (statusFilter !== 'all' && trade.status !== statusFilter) return false;
        
        // Direction
        if (directionFilter !== 'all' && trade.direction !== directionFilter) return false;
        
        // Outcome
        if (outcomeFilter !== 'all' && trade.result !== outcomeFilter) return false;

        return true;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
      });
  }, [trades, searchQuery, statusFilter, directionFilter, outcomeFilter, sortOrder]);

  const hasActiveFilters = searchQuery !== '' || statusFilter !== 'all' || directionFilter !== 'all' || outcomeFilter !== 'all' || sortOrder !== 'newest';

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setDirectionFilter('all');
    setOutcomeFilter('all');
    setSortOrder('newest');
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Trade Journal" 
        description="Record and review your trades"
      >
        <Link href="/trades/new" className={buttonVariants({ className: "rounded-none" })}>
          New Trade
        </Link>
      </PageHeader>
      
      {/* Filters Bar */}
      {trades.length > 0 && (
        <div className="bg-card border border-border p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-secondary-text" />
            <Input 
              placeholder="Search symbol, setup..." 
              className="pl-9 rounded-none h-9 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-9 border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-none"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>

            <select 
              value={directionFilter} 
              onChange={(e) => setDirectionFilter(e.target.value)}
              className="h-9 border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-none"
            >
              <option value="all">All Directions</option>
              <option value="long">Long</option>
              <option value="short">Short</option>
            </select>

            <select 
              value={outcomeFilter} 
              onChange={(e) => setOutcomeFilter(e.target.value)}
              className="h-9 border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-none"
            >
              <option value="all">All Outcomes</option>
              <option value="win">Win</option>
              <option value="loss">Loss</option>
              <option value="breakeven">Breakeven</option>
              <option value="pending">Pending</option>
            </select>

            <select 
              value={sortOrder} 
              onChange={(e) => setSortOrder(e.target.value)}
              className="h-9 border border-input bg-background px-3 py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-none bg-secondary/50 font-medium"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
      )}

      {isLoading ? (
        <LoadingState text="Loading journal..." />
      ) : trades.length > 0 ? (
        filteredTrades.length > 0 ? (
          <TradeList trades={filteredTrades} />
        ) : (
          <div className="py-16 flex flex-col items-center justify-center border border-border bg-card">
            <Search className="h-10 w-10 text-secondary-text mb-4" />
            <h3 className="text-lg font-display text-primary mb-2">No trades match your filters</h3>
            <p className="text-sm text-secondary-text mb-6">Try adjusting your search or filter parameters.</p>
            <Button variant="outline" className="rounded-none" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        )
      ) : (
        <EmptyState 
          icon={BookOpen}
          title="No trades yet"
          description="Start recording your trades to build your journal."
          actionLabel="New Trade"
          actionHref="/trades/new" 
        />
      )}
    </div>
  );
}
