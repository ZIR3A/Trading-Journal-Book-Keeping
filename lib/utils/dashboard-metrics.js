export function calculateDashboardMetrics(trades) {
  const closedTrades = trades.filter(t => t.status === 'closed');
  const winningTrades = closedTrades.filter(t => t.result === 'win');
  const losingTrades = closedTrades.filter(t => t.result === 'loss');

  const totalTrades = closedTrades.length;
  const totalPnl = closedTrades.reduce((sum, t) => sum + (t.pnl || 0), 0);
  
  const winRate = totalTrades > 0 ? (winningTrades.length / totalTrades) * 100 : 0;
  
  const grossProfit = winningTrades.reduce((sum, t) => sum + (t.pnl || 0), 0);
  const grossLoss = Math.abs(losingTrades.reduce((sum, t) => sum + (t.pnl || 0), 0));
  
  const profitFactor = grossLoss > 0 ? (grossProfit / grossLoss) : (grossProfit > 0 ? Number.POSITIVE_INFINITY : 0);
  
  const averageWin = winningTrades.length > 0 ? grossProfit / winningTrades.length : 0;
  const averageLoss = losingTrades.length > 0 ? grossLoss / losingTrades.length : 0;
  
  // Guard against extreme values or NaN
  const expectancyRaw = totalTrades > 0 ? (averageWin * (winRate / 100)) - (averageLoss * (1 - (winRate / 100))) : 0;
  const expectancy = isFinite(expectancyRaw) && !isNaN(expectancyRaw) ? expectancyRaw : 0;
  
  const totalR = closedTrades.reduce((sum, t) => sum + (t.rMultiple || 0), 0);
  const averageRRaw = totalTrades > 0 ? totalR / totalTrades : 0;
  const averageR = isFinite(averageRRaw) && !isNaN(averageRRaw) ? averageRRaw : 0;

  let maxDrawdown = 0;
  let peak = 0;
  let currentEquity = 0;

  // Assume trades are sorted by date descending for UI, but we need ascending for drawdown
  const sortedTradesAsc = [...closedTrades].sort((a, b) => new Date(a.date) - new Date(b.date));
  
  sortedTradesAsc.forEach(t => {
    currentEquity += (t.pnl || 0);
    if (currentEquity > peak) {
      peak = currentEquity;
    }
    const drawdown = peak - currentEquity;
    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
    }
  });

  return {
    totalTrades,
    totalPnl,
    winRate,
    profitFactor,
    expectancy,
    averageR,
    averageWin,
    averageLoss,
    maxDrawdown,
    winCount: winningTrades.length,
    lossCount: losingTrades.length
  };
}

export function buildEquityCurve(trades, startingBalance = 10000) {
  const closedTrades = trades.filter(t => t.status === 'closed');
  const sortedTradesAsc = [...closedTrades].sort((a, b) => new Date(a.date) - new Date(b.date));
  
  let currentBalance = startingBalance;
  
  const curve = [{
    name: 'Start',
    balance: currentBalance,
  }];

  sortedTradesAsc.forEach((trade, index) => {
    currentBalance += (trade.pnl || 0);
    curve.push({
      name: `T${index + 1}`,
      date: new Date(trade.date).toLocaleDateString(),
      balance: currentBalance,
      pnl: trade.pnl,
    });
  });

  return curve;
}
