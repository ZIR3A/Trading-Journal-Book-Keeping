'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatCurrency, formatNumber, formatInteger } from '@/lib/utils/formatters';

export function SetupPerformance({ data }) {
  if (!data || data.length === 0) {
    return (
      <Card className="rounded-none shadow-none border-border">
        <CardHeader className="border-b border-border bg-subtle-background/50">
          <CardTitle className="text-lg font-display text-primary">Setup Performance</CardTitle>
        </CardHeader>
        <CardContent className="h-[200px] flex items-center justify-center">
          <p className="text-secondary-text text-sm">No setup data available for analysis.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-none shadow-none border-border">
      <CardHeader className="border-b border-border bg-subtle-background/50">
        <CardTitle className="text-lg font-display text-primary">Setup Performance</CardTitle>
      </CardHeader>
      <CardContent className="p-0 overflow-x-auto w-full">
        <Table className="w-full min-w-[500px]">
          <TableHeader>
            <TableRow className="border-b border-border bg-secondary hover:bg-secondary">
              <TableHead className="font-mono text-xs text-secondary-text uppercase h-10 py-2">Setup</TableHead>
              <TableHead className="font-mono text-xs text-secondary-text uppercase h-10 py-2">Trades</TableHead>
              <TableHead className="font-mono text-xs text-secondary-text uppercase h-10 py-2">Win Rate</TableHead>
              <TableHead className="font-mono text-xs text-secondary-text uppercase h-10 py-2">Avg R</TableHead>
              <TableHead className="font-mono text-xs text-secondary-text uppercase h-10 py-2 text-right">P&L</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((setup) => (
              <TableRow key={setup.name} className="border-b border-border hover:bg-secondary transition-colors">
                <TableCell className="font-medium text-primary py-3">{setup.name}</TableCell>
                <TableCell className="py-3 text-secondary-text font-mono text-sm">{formatInteger(setup.trades)}</TableCell>
                <TableCell className="py-3 font-mono text-sm">{formatNumber(setup.winRate, 1)}%</TableCell>
                <TableCell className={`py-3 font-mono text-sm ${setup.averageR > 0 ? 'text-profit' : setup.averageR < 0 ? 'text-loss' : 'text-primary'}`}>
                  {setup.averageR > 0 ? '+' : ''}{formatNumber(setup.averageR, 2)}R
                </TableCell>
                <TableCell className={`py-3 text-right font-mono text-sm font-medium ${setup.totalPnl > 0 ? 'text-profit' : setup.totalPnl < 0 ? 'text-loss' : 'text-primary'}`}>
                  {setup.totalPnl > 0 ? '+' : ''}{formatCurrency(setup.totalPnl)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
