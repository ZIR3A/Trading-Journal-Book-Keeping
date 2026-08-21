'use client';

import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatNumber, formatDate } from '@/lib/utils/formatters';
import { useRouter } from 'next/navigation';

export function TradeList({ trades }) {
  const router = useRouter();

  if (!trades || trades.length === 0) {
    return (
      <div className="py-12 text-center text-secondary-text">
        <p className="text-sm">No trades found matching the criteria.</p>
      </div>
    );
  }

  return (
    <div className="border border-border w-full overflow-x-auto">
      <Table className="w-full min-w-[600px]">
        <TableHeader>
          <TableRow className="border-b border-border bg-secondary hover:bg-secondary border-t-0">
            <TableHead className="font-mono text-xs text-secondary-text uppercase h-10 py-2">Date</TableHead>
            <TableHead className="font-mono text-xs text-secondary-text uppercase h-10 py-2">Symbol</TableHead>
            <TableHead className="font-mono text-xs text-secondary-text uppercase h-10 py-2">Type</TableHead>
            <TableHead className="font-mono text-xs text-secondary-text uppercase h-10 py-2">Status</TableHead>
            <TableHead className="font-mono text-xs text-secondary-text uppercase h-10 py-2">R-Multiple</TableHead>
            <TableHead className="font-mono text-xs text-secondary-text uppercase h-10 py-2 text-right">P&L</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trades.map((trade) => (
            <TableRow 
              key={trade.id} 
              className="border-b border-border hover:bg-secondary transition-colors cursor-pointer group"
              onClick={() => router.push(`/trades/${trade.id}`)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  router.push(`/trades/${trade.id}`);
                }
              }}
              tabIndex={0}
            >
              <TableCell className="py-3 font-mono text-sm text-secondary-text">
                {formatDate(trade.date)}
              </TableCell>
              <TableCell className="py-3 font-medium text-primary group-hover:underline">
                {trade.symbol.toUpperCase()}
              </TableCell>
              <TableCell className="py-3">
                <Badge variant={trade.direction === 'long' ? 'long' : 'short'}>
                  {trade.direction.toUpperCase()}
                </Badge>
              </TableCell>
              <TableCell className="py-3">
                <span className={`text-xs uppercase tracking-wider font-semibold ${trade.status === 'open' ? 'text-primary' : 'text-secondary-text'}`}>
                  {trade.status}
                </span>
              </TableCell>
              <TableCell className="py-3 font-mono text-sm">
                {trade.status === 'open' ? (
                  <span className="text-secondary-text">-</span>
                ) : (
                  <span className={`${trade.rMultiple > 0 ? 'text-profit' : trade.rMultiple < 0 ? 'text-loss' : 'text-primary'}`}>
                    {trade.rMultiple > 0 ? '+' : ''}{formatNumber(trade.rMultiple, 2)}R
                  </span>
                )}
              </TableCell>
              <TableCell className="py-3 text-right font-mono text-sm font-medium">
                {trade.status === 'open' ? (
                  <span className="text-secondary-text">-</span>
                ) : (
                  <span className={`${trade.pnl > 0 ? 'text-profit' : trade.pnl < 0 ? 'text-loss' : 'text-primary'}`}>
                    {trade.pnl > 0 ? '+' : ''}{formatCurrency(trade.pnl)}
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
