export function analyzeSetups(trades) {
  const closedTrades = trades.filter(t => t.status === 'closed');
  
  const setupMap = {};

  closedTrades.forEach(trade => {
    const setup = trade.setup || 'Uncategorized';
    if (!setupMap[setup]) {
      setupMap[setup] = { name: setup, trades: 0, wins: 0, losses: 0, totalR: 0, totalPnl: 0 };
    }
    
    setupMap[setup].trades += 1;
    if (trade.result === 'win') setupMap[setup].wins += 1;
    if (trade.result === 'loss') setupMap[setup].losses += 1;
    setupMap[setup].totalR += (trade.rMultiple || 0);
    setupMap[setup].totalPnl += (trade.pnl || 0);
  });

  return Object.values(setupMap).map(stats => {
    const winRateRaw = stats.trades > 0 ? (stats.wins / stats.trades) * 100 : 0;
    const avgRRaw = stats.trades > 0 ? stats.totalR / stats.trades : 0;
    
    return {
      ...stats,
      winRate: isFinite(winRateRaw) && !isNaN(winRateRaw) ? winRateRaw : 0,
      averageR: isFinite(avgRRaw) && !isNaN(avgRRaw) ? avgRRaw : 0
    };
  }).sort((a, b) => b.totalPnl - a.totalPnl);
}

export function analyzeDirection(trades) {
  const closedTrades = trades.filter(t => t.status === 'closed');
  
  const longs = closedTrades.filter(t => t.direction === 'long');
  const shorts = closedTrades.filter(t => t.direction === 'short');
  
  const processGroup = (group) => {
    const wins = group.filter(t => t.result === 'win').length;
    const losses = group.filter(t => t.result === 'loss').length;
    const totalPnl = group.reduce((sum, t) => sum + (t.pnl || 0), 0);
    const totalR = group.reduce((sum, t) => sum + (t.rMultiple || 0), 0);
    
    const winRateRaw = group.length > 0 ? (wins / group.length) * 100 : 0;
    const avgRRaw = group.length > 0 ? totalR / group.length : 0;
    
    return {
      trades: group.length,
      wins,
      losses,
      winRate: isFinite(winRateRaw) && !isNaN(winRateRaw) ? winRateRaw : 0,
      totalPnl,
      averageR: isFinite(avgRRaw) && !isNaN(avgRRaw) ? avgRRaw : 0
    };
  };

  return {
    long: processGroup(longs),
    short: processGroup(shorts)
  };
}

export function buildRDistribution(trades) {
  const closedTrades = trades.filter(t => t.status === 'closed');
  
  const bins = {
    'Loss (<-1R)': 0,
    '-1R to 0R': 0,
    '0R to 1R': 0,
    '1R to 2R': 0,
    '2R to 3R': 0,
    '>3R': 0
  };

  closedTrades.forEach(t => {
    const r = t.rMultiple || 0;
    if (r < -1) bins['Loss (<-1R)']++;
    else if (r < 0) bins['-1R to 0R']++;
    else if (r < 1) bins['0R to 1R']++;
    else if (r < 2) bins['1R to 2R']++;
    else if (r < 3) bins['2R to 3R']++;
    else bins['>3R']++;
  });

  return Object.entries(bins).map(([name, count]) => ({ name, count }));
}

/**
 * Builds a chronological cumulative R series from closed trades.
 * Each point represents: { index, date, symbol, rMultiple, cumulativeR }
 * This is R-based (not P&L-based) — do NOT conflate with buildEquityCurve().
 */
export function buildCumulativeR(trades) {
  const closedTrades = trades
    .filter(t => t.status === 'closed' && t.rMultiple != null)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  let cumulative = 0;

  const points = [{ index: 0, label: 'Start', cumulativeR: 0, rMultiple: null, symbol: null }];

  closedTrades.forEach((t, i) => {
    cumulative += (t.rMultiple || 0);
    points.push({
      index: i + 1,
      label: `T${i + 1}`,
      date: t.date,
      symbol: t.symbol,
      rMultiple: t.rMultiple,
      cumulativeR: cumulative
    });
  });

  return points;
}

export function buildMonthlyPnl(trades) {
  const closedTrades = trades.filter(t => t.status === 'closed' && t.pnl != null);
  const monthlyMap = {};

  closedTrades.forEach(t => {
    const d = new Date(t.date);
    const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const monthLabel = d.toLocaleString('default', { month: 'short', year: '2-digit' });
    
    if (!monthlyMap[monthKey]) {
      monthlyMap[monthKey] = { sortKey: monthKey, name: monthLabel, pnl: 0, trades: 0 };
    }
    
    monthlyMap[monthKey].pnl += t.pnl;
    monthlyMap[monthKey].trades += 1;
  });

  return Object.values(monthlyMap)
    .sort((a, b) => a.sortKey.localeCompare(b.sortKey))
    .map(({ sortKey, ...rest }) => rest);
}

export function buildWinLossData(trades) {
  const closedTrades = trades.filter(t => t.status === 'closed');
  
  let wins = 0;
  let losses = 0;
  
  closedTrades.forEach(t => {
    if (t.result === 'win' || (t.result === 'breakeven' && t.pnl > 0)) wins++;
    else if (t.result === 'loss' || (t.result === 'breakeven' && t.pnl < 0)) losses++;
  });
  
  return [
    { name: 'Wins', value: wins, fill: 'hsl(var(--profit))' },
    { name: 'Losses', value: losses, fill: 'hsl(var(--loss))' }
  ];
}
