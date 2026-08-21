// @TODO: BACKEND_INTEGRATION complete.
// LocalStorage has been replaced with authenticated API calls.

const mapToUI = (t) => ({
  id: t._id,
  date: t.tradeDate,
  market: t.market || '',
  symbol: t.instrument,
  direction: t.direction,
  timeframe: t.timeframe || '',
  session: t.session || '',
  setup: t.setup || '',
  entryPrice: t.entryPrice,
  stopLoss: t.stopLoss || '',
  takeProfit: t.target || '',
  riskPercentage: t.riskPercentage,
  targetRR: t.riskRewardRatio,
  status: t.status,
  result: t.result,
  exitPrice: t.exitPrice || '',
  rMultiple: t.rMultiple || '',
  pnl: t.pnl || '',
  notes: t.notes || ''
});

const mapToAPI = (t) => {
  const apiObj = {
    tradeDate: t.date,
    market: t.market,
    instrument: t.symbol,
    direction: t.direction,
    timeframe: t.timeframe,
    session: t.session,
    setup: t.setup,
    entryPrice: parseFloat(t.entryPrice),
    riskPercentage: parseFloat(t.riskPercentage),
    riskRewardRatio: parseFloat(t.targetRR),
    status: t.status || 'open',
    result: t.result || 'pending',
    notes: t.notes
  };
  
  if (t.stopLoss) apiObj.stopLoss = parseFloat(t.stopLoss);
  if (t.takeProfit) apiObj.target = parseFloat(t.takeProfit);
  if (t.exitPrice) apiObj.exitPrice = parseFloat(t.exitPrice);
  if (t.rMultiple) apiObj.rMultiple = parseFloat(t.rMultiple);
  if (t.pnl) apiObj.pnl = parseFloat(t.pnl);

  return apiObj;
};

export const tradeStore = {
  getTrades: async () => {
    if (typeof window === 'undefined') return [];
    try {
      const res = await fetch('/api/trades');
      if (!res.ok) throw new Error('Failed to fetch trades');
      const json = await res.json();
      return json.data.map(mapToUI);
    } catch (err) {
      console.error(err);
      return [];
    }
  },

  getTradeById: async (id) => {
    // For now we fetch all and filter since we don't have a GET /api/trades/:id route.
    // In production we could create one or just use the cached list.
    const trades = await tradeStore.getTrades();
    return trades.find(t => t.id === id) || null;
  },

  createTrade: async (tradeData) => {
    try {
      // Use current date if none provided
      const apiData = mapToAPI({ ...tradeData, date: tradeData.date || new Date().toISOString() });
      const res = await fetch('/api/trades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiData)
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to create trade');
      }
      const json = await res.json();
      return mapToUI(json.data);
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  updateTrade: async (id, updates) => {
    try {
      // Map the UI updates to API updates
      const apiUpdates = mapToAPI({ ...updates, date: updates.date });
      
      // Clean undefined fields that mapping might produce for omitted update fields
      Object.keys(apiUpdates).forEach(key => {
        if (apiUpdates[key] === undefined) {
          delete apiUpdates[key];
        }
      });

      const res = await fetch(`/api/trades/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiUpdates)
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to update trade');
      }
      const json = await res.json();
      return mapToUI(json.data);
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  deleteTrade: async (id) => {
    try {
      const res = await fetch(`/api/trades/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to delete trade');
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
};
