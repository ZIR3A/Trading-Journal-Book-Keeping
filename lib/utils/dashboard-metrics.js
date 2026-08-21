export function calculateDashboardMetrics(trades) {
  const closedTrades = trades.filter(t => t.status === 'closed');
  const winningTrades = closedTrades.filter(t => t.result === 'win');
  const losingTrades = closedTrades.filter(t => t.result === 'loss');

  const totalTrades = closedTrades.length;
  const totalPnl = closedTrades.reduce((sum, t) => sum + Number(t.pnl || 0), 0);
  
  const winRate = totalTrades > 0 ? (winningTrades.length / totalTrades) * 100 : 0;
  
  const grossProfit = winningTrades.reduce((sum, t) => sum + Number(t.pnl || 0), 0);
  const grossLoss = Math.abs(losingTrades.reduce((sum, t) => sum + Number(t.pnl || 0), 0));
  
  const profitFactor = grossLoss > 0 ? (grossProfit / grossLoss) : (grossProfit > 0 ? Number.POSITIVE_INFINITY : 0);
  
  const averageWin = winningTrades.length > 0 ? grossProfit / winningTrades.length : 0;
  const averageLoss = losingTrades.length > 0 ? grossLoss / losingTrades.length : 0;
  
  // Guard against extreme values or NaN
  const expectancyRaw = totalTrades > 0 ? (averageWin * (winRate / 100)) - (averageLoss * (1 - (winRate / 100))) : 0;
  const expectancy = isFinite(expectancyRaw) && !isNaN(expectancyRaw) ? expectancyRaw : 0;
  
  const totalR = closedTrades.reduce((sum, t) => sum + Number(t.rMultiple || 0), 0);
  const averageRRaw = totalTrades > 0 ? totalR / totalTrades : 0;
  const averageR = isFinite(averageRRaw) && !isNaN(averageRRaw) ? averageRRaw : 0;

  let maxDrawdown = 0;
  let peak = 0;
  let currentEquity = 0;

  // Assume trades are sorted by date descending for UI, but we need ascending for drawdown
  const sortedTradesAsc = [...closedTrades].sort((a, b) => new Date(a.date) - new Date(b.date));
  
  sortedTradesAsc.forEach(t => {
    currentEquity += Number(t.pnl || 0);
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
  
  let currentBalance = Number(startingBalance) || 0;
  
  const curve = [{
    name: 'Start',
    balance: currentBalance,
  }];

  sortedTradesAsc.forEach((trade, index) => {
    currentBalance += Number(trade.pnl || 0);
    curve.push({
      name: `T${index + 1}`,
      date: new Date(trade.date).toLocaleDateString(),
      balance: currentBalance,
      pnl: Number(trade.pnl || 0),
    });
  });

  return curve;
}

/**
 * Calculates streak statistics from chronologically-ordered closed trades.
 * Returns current winning/losing streak and best historical streaks.
 */
export function calculateStreaks(trades) {
  const closedTrades = trades
    .filter(t => t.status === 'closed')
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  let currentWinStreak = 0;
  let currentLossStreak = 0;
  let bestWinStreak = 0;
  let worstLossStreak = 0;

  let runningWin = 0;
  let runningLoss = 0;

  closedTrades.forEach(trade => {
    if (trade.result === 'win') {
      runningWin += 1;
      runningLoss = 0;
    } else if (trade.result === 'loss') {
      runningLoss += 1;
      runningWin = 0;
    } else {
      // Breakeven or pending — reset both streaks
      runningWin = 0;
      runningLoss = 0;
    }

    if (runningWin > bestWinStreak) bestWinStreak = runningWin;
    if (runningLoss > worstLossStreak) worstLossStreak = runningLoss;
  });

  // The final running values represent the current streak
  currentWinStreak = runningWin;
  currentLossStreak = runningLoss;

  return {
    currentWinStreak,
    currentLossStreak,
    bestWinStreak,
    worstLossStreak,
  };
}
