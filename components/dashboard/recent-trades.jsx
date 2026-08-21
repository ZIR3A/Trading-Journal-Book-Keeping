'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TradeList } from '@/components/trades/trade-list';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function RecentTrades({ trades }) {
  const recentTrades = trades.slice(0, 5);

  return (
    <Card className="rounded-none shadow-none border-border h-full flex flex-col">
      <CardHeader className="border-b border-border bg-subtle-background/50 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-display text-primary">Recent Activity</CardTitle>
        <Link href="/trades" className={buttonVariants({ variant: "ghost", size: "sm", className: "h-8 rounded-none px-2 text-secondary-text hover:text-primary flex items-center gap-1 text-xs" })}>
          View All <ArrowRight className="w-3 h-3" />
        </Link>
      </CardHeader>
      <CardContent className="p-0 flex-1 flex flex-col">
        {recentTrades.length > 0 ? (
          <div className="flex-1 overflow-x-auto">
            {/* We can re-use the TradeList component, but style it so it flows well inside a Card */}
            <TradeList trades={recentTrades} />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-6 text-sm text-secondary-text">
            No trades recorded yet.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
