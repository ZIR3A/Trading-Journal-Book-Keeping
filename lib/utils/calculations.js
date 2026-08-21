export function calculateTradeMetrics({
  entryPrice,
  stopLoss,
  direction, // 'long' or 'short'
  riskPercentage, // e.g., 1 for 1%
  targetRR, // e.g., 2 for 1:2
  accountBalance = 10000
}) {
  const metrics = {
    riskAmount: 0,
    stopDistance: 0,
    positionSize: 0,
    targetDistance: 0,
    targetPrice: 0,
    potentialReward: 0,
  };

  const entry = parseFloat(entryPrice);
  const sl = parseFloat(stopLoss);
  const riskPct = parseFloat(riskPercentage);
  const rr = parseFloat(targetRR);

  if (isNaN(entry) || isNaN(sl) || isNaN(riskPct) || isNaN(rr)) {
    return metrics;
  }

  // Risk Amount
  metrics.riskAmount = accountBalance * (riskPct / 100);

  // Stop Distance
  metrics.stopDistance = Math.abs(entry - sl);
  
  if (metrics.stopDistance === 0) {
    metrics.positionSize = 0;
  } else {
    // Position Size
    metrics.positionSize = metrics.riskAmount / metrics.stopDistance;
  }

  // Target Distance
  metrics.targetDistance = metrics.stopDistance * rr;

  // Target Price
  if (direction === 'long') {
    metrics.targetPrice = entry + metrics.targetDistance;
  } else if (direction === 'short') {
    metrics.targetPrice = entry - metrics.targetDistance;
  }

  // Potential Reward
  metrics.potentialReward = metrics.riskAmount * rr;

  return metrics;
}

export function calculateActualResult({
  entryPrice,
  stopLoss,
  exitPrice,
  direction,
  riskPercentage,
  accountBalance = 10000
}) {
  const entry = parseFloat(entryPrice);
  const sl = parseFloat(stopLoss);
  const exit = parseFloat(exitPrice);
  const riskPct = parseFloat(riskPercentage);

  if (isNaN(entry) || isNaN(sl) || isNaN(exit) || isNaN(riskPct)) {
    return { rMultiple: 0, pnl: 0 };
  }

  const stopDistance = Math.abs(entry - sl);
  const riskAmount = accountBalance * (riskPct / 100);

  if (stopDistance === 0) return { rMultiple: 0, pnl: 0 };

  let rMultiple = 0;
  
  if (direction === 'long') {
    rMultiple = (exit - entry) / stopDistance;
  } else if (direction === 'short') {
    rMultiple = (entry - exit) / stopDistance;
  }

  const pnl = rMultiple * riskAmount;

  return {
    rMultiple,
    pnl
  };
}
