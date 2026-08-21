'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { calculateTradeMetrics, calculateActualResult } from '@/lib/utils/calculations';
import { useRouter } from 'next/navigation';
import { settingsStore } from '@/lib/store/settings-store';

export function TradeForm({ initialData = {}, onSubmit, isEditing = false }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isLoadingSettings, setIsLoadingSettings] = useState(!isEditing); // Only load settings if new trade
  const [accountBalance, setAccountBalance] = useState(10000); // Default fallback

  // Form State
  const [formData, setFormData] = useState({
    date: initialData.date ? new Date(initialData.date).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16),
    market: initialData.market || 'Forex',
    symbol: initialData.symbol || '',
    direction: initialData.direction || 'long',
    timeframe: initialData.timeframe || '15m',
    session: initialData.session || '',
    setup: initialData.setup || '',
    
    // Execution
    entryPrice: initialData.entryPrice || '',
    stopLoss: initialData.stopLoss || '',
    riskPercentage: initialData.riskPercentage || '1',
    targetRR: initialData.targetRR || '2',
    
    // Result
    status: initialData.status || 'open',
    exitPrice: initialData.exitPrice || '',
    result: initialData.result || 'pending', // win, loss, breakeven, pending
    
    // Notes
    notes: initialData.notes || '',
  });

  // Load defaults if new trade
  useEffect(() => {
    async function loadDefaults() {
      if (!isEditing) {
        const settings = await settingsStore.getSettings();
        setAccountBalance(settings.accountBalance || 10000);
        
        setFormData(prev => ({
          ...prev,
          market: settings.defaultMarket || prev.market,
          riskPercentage: settings.defaultRisk?.toString() || prev.riskPercentage,
          targetRR: settings.defaultRR?.toString() || prev.targetRR,
        }));
      }
      setIsLoadingSettings(false);
    }
    loadDefaults();
  }, [isEditing]);

  // Derived Metrics
  // Calculate metrics when inputs change (Derived State)
  const metrics = useMemo(() => calculateTradeMetrics({
    entryPrice: formData.entryPrice,
    stopLoss: formData.stopLoss,
    direction: formData.direction,
    riskPercentage: formData.riskPercentage,
    targetRR: formData.targetRR,
    accountBalance,
  }), [formData.entryPrice, formData.stopLoss, formData.direction, formData.riskPercentage, formData.targetRR, accountBalance]);

  // Calculate actual result if closed (Derived State)
  const actualResult = useMemo(() => {
    if (formData.status !== 'closed') return { rMultiple: 0, pnl: 0 };
    return calculateActualResult({
      entryPrice: formData.entryPrice,
      stopLoss: formData.stopLoss,
      exitPrice: formData.exitPrice,
      direction: formData.direction,
      riskPercentage: formData.riskPercentage,
      accountBalance,
    });
  }, [formData.status, formData.entryPrice, formData.stopLoss, formData.exitPrice, formData.direction, formData.riskPercentage, accountBalance]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.symbol || !formData.entryPrice || !formData.stopLoss) {
      setError('Please fill in all required fields.');
      return;
    }

    if (formData.status === 'closed' && !formData.exitPrice) {
      setError('Exit price is required for closed trades.');
      return;
    }

    const ePrice = parseFloat(formData.entryPrice);
    const sLoss = parseFloat(formData.stopLoss);
    const rPct = parseFloat(formData.riskPercentage);
    const rRatio = parseFloat(formData.targetRR);

    if (rPct <= 0 || rRatio <= 0) {
      setError('Risk percentage and Target R:R must be greater than zero.');
      return;
    }

    if (formData.direction === 'long' && sLoss >= ePrice) {
      setError('For Long trades, Stop Loss must be strictly below the Entry Price.');
      return;
    }

    if (formData.direction === 'short' && sLoss <= ePrice) {
      setError('For Short trades, Stop Loss must be strictly above the Entry Price.');
      return;
    }

    setIsSubmitting(true);
    try {
      const submitData = {
        ...formData,
        entryPrice: parseFloat(formData.entryPrice),
        stopLoss: parseFloat(formData.stopLoss),
        riskPercentage: parseFloat(formData.riskPercentage),
        targetRR: parseFloat(formData.targetRR),
        takeProfit: metrics.targetPrice,
        ...(formData.status === 'closed' && {
          exitPrice: parseFloat(formData.exitPrice),
          rMultiple: actualResult.rMultiple,
          pnl: actualResult.pnl
        })
      };
      
      await onSubmit(submitData);
    } catch (err) {
      setError(err.message || 'An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoadingSettings) {
    return <div className="py-8 text-center text-sm text-secondary-text">Loading configuration...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div role="alert" aria-live="assertive" className="p-4 border border-loss bg-loss/5 text-loss rounded-none text-sm font-medium">
          {error}
        </div>
      )}

      {/* Trade Information */}
      <Card className="rounded-none border-border shadow-none bg-card">
        <CardHeader className="border-b border-border bg-subtle-background/50 py-4">
          <CardTitle className="text-lg font-display text-primary">Trade Information</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label htmlFor="date">Date & Time</Label>
              <Input type="datetime-local" id="date" name="date" value={formData.date} onChange={handleChange} className="rounded-none" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="market">Market</Label>
              <select id="market" name="market" value={formData.market} onChange={handleChange} className="flex h-10 w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-none">
                <option value="Forex">Forex</option>
                <option value="Crypto">Crypto</option>
                <option value="Stocks">Stocks</option>
                <option value="Futures">Futures</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="symbol">Symbol</Label>
              <Input id="symbol" name="symbol" value={formData.symbol} onChange={handleChange} placeholder="e.g. EURUSD" className="rounded-none" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="direction">Direction</Label>
              <select id="direction" name="direction" value={formData.direction} onChange={handleChange} className="flex h-10 w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                <option value="long">Long</option>
                <option value="short">Short</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeframe">Timeframe</Label>
              <Input id="timeframe" name="timeframe" value={formData.timeframe} onChange={handleChange} placeholder="e.g. 15m" className="rounded-none" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="session">Session</Label>
              <Input id="session" name="session" value={formData.session} onChange={handleChange} placeholder="e.g. London" className="rounded-none" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="setup">Setup</Label>
              <Input id="setup" name="setup" value={formData.setup} onChange={handleChange} placeholder="e.g. Breakout" className="rounded-none" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Configuration */}
      <Card className="rounded-none border-border shadow-none bg-card">
        <CardHeader className="border-b border-border bg-subtle-background/50 py-4">
          <CardTitle className="text-lg font-display text-primary">Risk & Target Configuration</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="riskPercentage">Risk Percentage (%)</Label>
              <Input type="number" step="0.01" id="riskPercentage" name="riskPercentage" value={formData.riskPercentage} onChange={handleChange} className="rounded-none" required />
              <p className="text-xs text-secondary-text mt-1">Calculated Risk Amount: ${metrics.riskAmount.toFixed(2)}</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetRR">Target Risk:Reward (1:X)</Label>
              <Input type="number" step="0.1" id="targetRR" name="targetRR" value={formData.targetRR} onChange={handleChange} className="rounded-none" required />
              <p className="text-xs text-secondary-text mt-1">Potential Reward: ${metrics.potentialReward.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Entry & Stop */}
      <Card className="rounded-none border-border shadow-none bg-card">
        <CardHeader className="border-b border-border bg-subtle-background/50 py-4">
          <CardTitle className="text-lg font-display text-primary">Execution Prices</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label htmlFor="entryPrice">Entry Price</Label>
              <Input type="number" step="0.00001" id="entryPrice" name="entryPrice" value={formData.entryPrice} onChange={handleChange} className="rounded-none font-mono" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stopLoss">Stop Loss</Label>
              <Input type="number" step="0.00001" id="stopLoss" name="stopLoss" value={formData.stopLoss} onChange={handleChange} className="rounded-none font-mono" required />
            </div>
            <div className="space-y-2">
              <Label>Calculated Target Price</Label>
              <div className="h-10 border border-border bg-subtle-background flex items-center px-3 text-sm font-mono text-secondary-text">
                {metrics.targetPrice ? metrics.targetPrice.toFixed(5) : '-'}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Recommended Position Size</Label>
              <div className="h-10 border border-border bg-subtle-background flex items-center px-3 text-sm font-mono text-secondary-text">
                {metrics.positionSize ? metrics.positionSize.toFixed(2) : '-'} units
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Result Information */}
      <Card className="rounded-none border-border shadow-none bg-card">
        <CardHeader className="border-b border-border bg-subtle-background/50 py-4 flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-display text-primary">Result Information</CardTitle>
          <div className="flex items-center gap-2">
            <Label htmlFor="status" className="sr-only">Status</Label>
            <select id="status" name="status" value={formData.status} onChange={handleChange} className="h-8 border border-input bg-background px-2 py-1 text-xs ring-offset-background rounded-none focus-visible:outline-none">
              <option value="open">Open Trade</option>
              <option value="closed">Closed Trade</option>
            </select>
          </div>
        </CardHeader>
        {formData.status === 'closed' && (
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="exitPrice">Exit Price</Label>
                <Input type="number" step="0.00001" id="exitPrice" name="exitPrice" value={formData.exitPrice} onChange={handleChange} className="rounded-none font-mono" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="result">Result Category</Label>
                <select id="result" name="result" value={formData.result} onChange={handleChange} className="flex h-10 w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  <option value="pending">Pending</option>
                  <option value="win">Win</option>
                  <option value="loss">Loss</option>
                  <option value="breakeven">Breakeven</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Actual P&L / R-Multiple</Label>
                <div className="h-10 flex gap-2">
                  <div className={`flex-1 border border-border flex items-center px-3 text-sm font-mono ${actualResult.pnl > 0 ? 'bg-profit/10 text-profit' : actualResult.pnl < 0 ? 'bg-loss/10 text-loss' : 'bg-subtle-background text-secondary-text'}`}>
                    ${actualResult.pnl.toFixed(2)}
                  </div>
                  <div className={`w-20 border border-border flex items-center justify-center text-sm font-mono ${actualResult.rMultiple > 0 ? 'bg-profit/10 text-profit' : actualResult.rMultiple < 0 ? 'bg-loss/10 text-loss' : 'bg-subtle-background text-secondary-text'}`}>
                    {actualResult.rMultiple.toFixed(2)}R
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Journal & Notes */}
      <Card className="rounded-none border-border shadow-none bg-card">
        <CardHeader className="border-b border-border bg-subtle-background/50 py-4">
          <CardTitle className="text-lg font-display text-primary">Journal & Notes</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <Label htmlFor="notes" className="sr-only">Notes</Label>
            <Textarea 
              id="notes" 
              name="notes" 
              value={formData.notes} 
              onChange={handleChange} 
              placeholder="Record your setup, thoughts, emotions, and lessons learned..."
              className="min-h-[150px] rounded-none resize-y" 
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4 justify-end">
        <Button type="button" variant="outline" className="rounded-none" onClick={() => router.back()} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" className="rounded-none" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Trade'}
        </Button>
      </div>
    </form>
  );
}
