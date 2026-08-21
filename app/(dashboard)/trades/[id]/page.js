'use client';

import { PageHeader } from '@/components/layout/page-header';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button, buttonVariants } from '@/components/ui/button';
import { ArrowLeft, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { tradeStore } from '@/lib/store/trade-store';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { formatCurrency, formatNumber, formatDateTime } from '@/lib/utils/formatters';
import { ConfirmDialog } from '@/components/shared/confirm-dialog';
import { toast } from 'sonner';
import { normalizeError } from '@/lib/utils/errors';
import { use } from 'react';

export default function TradeDetails({ params }) {
  const unwrappedParams = use(params);
  const id = unwrappedParams.id;
  const router = useRouter();
  const [trade, setTrade] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function loadTrade() {
      try {
        const data = await tradeStore.getTradeById(id);
        if (!data) {
          setNotFound(true);
        } else {
          setTrade(data);
        }
      } catch (error) {
        console.error("Failed to load trade", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadTrade();
  }, [id, router]);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await tradeStore.deleteTrade(id);
      toast.success('Trade deleted successfully.');
      router.push('/trades');
    } catch (error) {
      toast.error(normalizeError(error));
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-sm text-secondary-text">Loading trade details...</div>;
  }

  if (notFound || !trade) {
    return (
      <div className="max-w-5xl mx-auto space-y-6">
        <Link href="/trades" className="inline-flex items-center text-xs text-secondary-text hover:text-primary mb-2">
          <ArrowLeft className="w-3 h-3 mr-1" /> Back to Journal
        </Link>
        <div className="text-center py-16 px-4 border border-border border-dashed bg-card rounded-md">
          <h3 className="text-base font-semibold text-primary">Trade Not Found</h3>
          <p className="mt-2 text-sm text-secondary-text max-w-sm mx-auto">
            The trade you're looking for doesn't exist or is no longer available.
          </p>
          <div className="mt-6">
            <Link href="/trades" className={buttonVariants({ variant: "default" })}>
              Back to Trade Journal
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Link href="/trades" className="inline-flex items-center text-xs text-secondary-text hover:text-primary mb-2">
            <ArrowLeft className="w-3 h-3 mr-1" /> Back to Journal
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-display text-primary">{trade.symbol.toUpperCase()}</h1>
            <Badge variant={trade.direction === 'long' ? 'long' : 'short'} className="text-sm px-3 py-1">
              {trade.direction.toUpperCase()}
            </Badge>
            <span className={`text-xs uppercase tracking-wider font-semibold ${trade.status === 'open' ? 'text-primary' : 'text-secondary-text'}`}>
              {trade.status}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link href={`/trades/${trade.id}/edit`} className={buttonVariants({ variant: "outline", className: "rounded-none h-9 text-xs" })}>
            <Pencil className="w-3 h-3 mr-2" /> Edit Trade
          </Link>
          
          <ConfirmDialog
            isOpen={showDeleteConfirm}
            onOpenChange={setShowDeleteConfirm}
            title="Delete Trade?"
            description="This action permanently removes this trade from your journal. This action cannot be undone."
            confirmLabel={isDeleting ? 'Deleting...' : 'Delete Trade'}
            isDestructive={true}
            onConfirm={handleDelete}
            trigger={
              <Button variant="ghost" className="rounded-none h-9 text-xs text-secondary-text hover:text-loss hover:bg-loss/5" onClick={() => setShowDeleteConfirm(true)}>
                <Trash2 className="w-3 h-3 mr-2" /> Delete
              </Button>
            }
          />
        </div>
      </div>

      {/* Trade Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 border border-border bg-subtle-background/30">
          <div className="text-xs uppercase text-secondary-text mb-1">Date</div>
          <div className="font-mono text-sm">{formatDateTime(trade.date)}</div>
        </div>
        <div className="p-4 border border-border bg-subtle-background/30">
          <div className="text-xs uppercase text-secondary-text mb-1">Market & Timeframe</div>
          <div className="font-medium text-sm">{trade.market} / {trade.timeframe}</div>
        </div>
        <div className="p-4 border border-border bg-subtle-background/30">
          <div className="text-xs uppercase text-secondary-text mb-1">Setup</div>
          <div className="font-medium text-sm">{trade.setup || '-'}</div>
        </div>
        <div className="p-4 border border-border bg-subtle-background/30">
          <div className="text-xs uppercase text-secondary-text mb-1">Session</div>
          <div className="font-medium text-sm">{trade.session || '-'}</div>
        </div>
      </div>

      {/* Execution Details & Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="rounded-none shadow-none border-border">
          <CardHeader className="border-b border-border bg-subtle-background/50 py-3">
            <CardTitle className="text-sm font-display text-primary">Execution</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              <div className="flex justify-between p-3 px-4">
                <span className="text-sm text-secondary-text">Entry Price</span>
                <span className="font-mono text-sm">{trade.entryPrice}</span>
              </div>
              <div className="flex justify-between p-3 px-4">
                <span className="text-sm text-secondary-text">Stop Loss</span>
                <span className="font-mono text-sm">{trade.stopLoss}</span>
              </div>
              <div className="flex justify-between p-3 px-4">
                <span className="text-sm text-secondary-text">Risk %</span>
                <span className="font-mono text-sm">{trade.riskPercentage}%</span>
              </div>
              {trade.status === 'closed' && (
                <div className="flex justify-between p-3 px-4 bg-secondary">
                  <span className="text-sm text-primary font-medium">Exit Price</span>
                  <span className="font-mono text-sm font-medium">{trade.exitPrice}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-none shadow-none border-border">
          <CardHeader className="border-b border-border bg-subtle-background/50 py-3">
            <CardTitle className="text-sm font-display text-primary">Result</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {trade.status === 'open' ? (
                <div className="p-8 text-center text-sm text-secondary-text">
                  Trade is currently open. Close the trade to see results.
                </div>
              ) : (
                <>
                  <div className="flex justify-between p-3 px-4">
                    <span className="text-sm text-secondary-text">Target R:R</span>
                    <span className="font-mono text-sm">1:{trade.targetRR}</span>
                  </div>
                  <div className="flex justify-between p-3 px-4">
                    <span className="text-sm text-secondary-text">Realized R-Multiple</span>
                    <span className={`font-mono text-sm font-medium ${trade.rMultiple > 0 ? 'text-profit' : trade.rMultiple < 0 ? 'text-loss' : 'text-primary'}`}>
                      {trade.rMultiple > 0 ? '+' : ''}{formatNumber(trade.rMultiple, 2)}R
                    </span>
                  </div>
                  <div className="flex justify-between p-3 px-4 bg-secondary">
                    <span className="text-sm text-primary font-medium">Net P&L</span>
                    <span className={`font-mono text-sm font-bold ${trade.pnl > 0 ? 'text-profit' : trade.pnl < 0 ? 'text-loss' : 'text-primary'}`}>
                      {trade.pnl > 0 ? '+' : ''}{formatCurrency(trade.pnl)}
                    </span>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notes Section */}
      <Card className="rounded-none shadow-none border-border">
        <CardHeader className="border-b border-border bg-subtle-background/50 py-3">
          <CardTitle className="text-sm font-display text-primary">Trade Notes</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          {trade.notes ? (
            <p className="text-sm text-secondary-text whitespace-pre-wrap leading-relaxed">{trade.notes}</p>
          ) : (
            <p className="text-sm text-secondary-text italic opacity-50">No notes provided for this trade.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
