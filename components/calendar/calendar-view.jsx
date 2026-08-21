'use client';

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, X, Plus, TrendingUp, TrendingDown } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { formatCurrency, formatNumber } from '@/lib/utils/formatters';
import Link from 'next/link';

// Utilities
const getLocalDateString = (dateObj) => {
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, '0');
  const d = String(dateObj.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const getMonthData = (year, month) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  const daysInMonth = [];
  // Calculate padding days for the start of the month (assuming Sunday start)
  const startDayOfWeek = firstDay.getDay(); 
  
  // Padding from previous month
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const d = new Date(year, month, -i);
    daysInMonth.push({ date: d, isCurrentMonth: false });
  }
  
  // Days of current month
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const d = new Date(year, month, i);
    daysInMonth.push({ date: d, isCurrentMonth: true });
  }
  
  // Padding for next month to complete the grid (up to 42 cells, 6 rows)
  const remainingCells = 42 - daysInMonth.length;
  for (let i = 1; i <= remainingCells; i++) {
    const d = new Date(year, month + 1, i);
    daysInMonth.push({ date: d, isCurrentMonth: false });
  }
  
  return daysInMonth;
};

export function CalendarView({ trades }) {
  const [currentDate, setCurrentDate] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  
  const [selectedDate, setSelectedDate] = useState(null);

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
    setSelectedDate(getLocalDateString(today));
  };

  // Group trades by local date string
  const tradesByDate = useMemo(() => {
    const grouped = {};
    if (!trades) return grouped;
    
    trades.forEach(trade => {
      // Parse ISO date string to JS Date, then to local string
      const tradeDate = new Date(trade.date);
      const dateStr = getLocalDateString(tradeDate);
      
      if (!grouped[dateStr]) {
        grouped[dateStr] = {
          trades: [],
          pnl: 0,
          winCount: 0,
          lossCount: 0,
          status: 'neutral' // neutral, profit, loss
        };
      }
      
      grouped[dateStr].trades.push(trade);
      
      // Calculate PNL based only on closed trades
      if (trade.status === 'closed') {
         grouped[dateStr].pnl += (trade.pnl || 0);
         if (trade.pnl > 0) grouped[dateStr].winCount++;
         if (trade.pnl < 0) grouped[dateStr].lossCount++;
      }
    });
    
    // Determine status for each day
    Object.keys(grouped).forEach(dateStr => {
      const dayData = grouped[dateStr];
      if (dayData.pnl > 0) dayData.status = 'profit';
      else if (dayData.pnl < 0) dayData.status = 'loss';
      else if (dayData.trades.some(t => t.status === 'closed')) dayData.status = 'neutral';
      else dayData.status = 'neutral'; // open trades only
    });
    
    return grouped;
  }, [trades]);

  const monthDays = useMemo(() => {
    return getMonthData(currentDate.getFullYear(), currentDate.getMonth());
  }, [currentDate]);

  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
  const todayStr = getLocalDateString(new Date());

  const selectedDayData = selectedDate ? tradesByDate[selectedDate] : null;

  return (
    <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
      
      {/* Main Calendar Area */}
      <div className={`flex-grow w-full border border-border bg-card p-4 transition-all duration-300 ${selectedDate ? 'lg:w-2/3' : 'w-full'}`}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-medium text-primary">{monthName}</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={goToToday} className="text-xs font-mono uppercase h-8 px-3 rounded-none">
              Today
            </Button>
            <div className="flex border border-border rounded-none">
              <Button variant="ghost" size="icon" onClick={prevMonth} className="h-8 w-8 rounded-none border-r border-border hover:bg-subtle-background">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={nextMonth} className="h-8 w-8 rounded-none hover:bg-subtle-background">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 border-t border-l border-border">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="py-2 text-center text-xs font-mono uppercase text-secondary-text border-b border-r border-border bg-subtle-background/50">
              {day}
            </div>
          ))}
          
          {monthDays.map((dayObj, index) => {
            const dateStr = getLocalDateString(dayObj.date);
            const isToday = dateStr === todayStr;
            const isSelected = dateStr === selectedDate;
            const dayData = tradesByDate[dateStr];
            
            // Determine styling based on PNL state
            let bgClass = "bg-card hover:bg-secondary";
            let textClass = "text-primary";
            
            if (!dayObj.isCurrentMonth) {
              bgClass = "bg-subtle-background/20";
              textClass = "text-secondary-text/40";
            } else if (dayData) {
              if (dayData.status === 'profit') bgClass = "bg-profit/10 hover:bg-profit/20 border-b-2 border-b-profit";
              if (dayData.status === 'loss') bgClass = "bg-loss/10 hover:bg-loss/20 border-b-2 border-b-loss";
              if (dayData.status === 'neutral') bgClass = "bg-primary/5 hover:bg-primary/10 border-b-2 border-b-primary/50";
            }

            if (isSelected) {
              bgClass += " ring-2 ring-primary ring-inset z-10";
            }

            return (
              <div 
                key={index} 
                className={`min-h-[80px] md:min-h-[100px] border-b border-r border-border p-2 cursor-pointer transition-colors relative flex flex-col ${bgClass}`}
                onClick={() => setSelectedDate(dateStr)}
              >
                <div className="flex justify-between items-start">
                  <span className={`text-sm font-mono ${textClass} ${isToday ? 'bg-primary text-primary-foreground px-1' : ''}`}>
                    {dayObj.date.getDate()}
                  </span>
                  
                  {dayData && dayData.trades.length > 0 && (
                    <span className="text-[10px] font-mono text-secondary-text bg-background border border-border px-1">
                      {dayData.trades.length}T
                    </span>
                  )}
                </div>
                
                {dayData && (
                  <div className="mt-auto text-right">
                    <span className={`text-xs font-mono font-medium ${dayData.status === 'profit' ? 'text-profit' : dayData.status === 'loss' ? 'text-loss' : 'text-primary'}`}>
                      {dayData.status === 'loss' ? '-' : dayData.pnl > 0 ? '+' : ''}
                      {dayData.pnl !== 0 ? formatCurrency(Math.abs(dayData.pnl)) : '$0.00'}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Day Details Sidebar */}
      {selectedDate && (
        <div className="w-full lg:w-1/3 border border-border bg-card animate-in fade-in slide-in-from-right-4 duration-200">
          <div className="p-4 border-b border-border flex justify-between items-center bg-subtle-background/50">
            <h3 className="font-display font-medium text-primary">
              {new Date(selectedDate + "T12:00:00Z").toLocaleDateString('default', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </h3>
            <Button variant="ghost" size="icon" onClick={() => setSelectedDate(null)} className="h-8 w-8 text-secondary-text hover:text-primary rounded-none">
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="p-4">
            {selectedDayData ? (
              <div className="space-y-6">
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border border-border bg-subtle-background/30 text-center">
                    <div className="text-xs font-mono uppercase text-secondary-text mb-1">Daily P&L</div>
                    <div className={`text-xl font-mono font-medium ${selectedDayData.pnl > 0 ? 'text-profit' : selectedDayData.pnl < 0 ? 'text-loss' : 'text-primary'}`}>
                       {selectedDayData.pnl > 0 ? '+' : ''}{formatCurrency(selectedDayData.pnl)}
                    </div>
                  </div>
                  
                  <div className="p-4 border border-border bg-subtle-background/30 text-center flex flex-col justify-center">
                    <div className="text-xs font-mono uppercase text-secondary-text mb-1">Trades</div>
                    <div className="text-lg font-medium text-primary flex items-center justify-center gap-2">
                      <span>{selectedDayData.trades.length}</span>
                      <span className="text-xs text-secondary-text font-normal">
                         ({selectedDayData.winCount}W {selectedDayData.lossCount}L)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b border-border pb-2">
                    <h4 className="text-sm font-medium text-primary uppercase tracking-wider font-mono">Trades</h4>
                    <Link 
                      href={`/trades/new?date=${selectedDate}`} 
                      className={buttonVariants({ variant: 'outline', size: 'sm', className: "h-7 text-xs rounded-none px-2" })}
                    >
                      <Plus className="h-3 w-3 mr-1" /> Add
                    </Link>
                  </div>
                  
                  <div className="max-h-[400px] overflow-y-auto pr-2">
                    <div className="space-y-2">
                      {selectedDayData.trades.map(trade => (
                        <Link 
                          key={trade.id} 
                          href={`/trades/${trade.id}`}
                          className="block p-3 border border-border hover:bg-subtle-background transition-colors"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className="font-mono text-sm font-medium text-primary">
                              {trade.symbol.toUpperCase()}
                            </span>
                            <span className={`font-mono text-sm font-medium ${trade.status === 'open' ? 'text-primary' : trade.pnl > 0 ? 'text-profit' : trade.pnl < 0 ? 'text-loss' : 'text-primary'}`}>
                              {trade.status === 'open' ? 'OPEN' : `${trade.pnl > 0 ? '+' : ''}${formatCurrency(trade.pnl)}`}
                            </span>
                          </div>
                          <div className="flex justify-between text-xs text-secondary-text">
                            <div className="flex items-center" title={trade.direction === 'long' ? 'Long Trade' : 'Short Trade'}>
                              {trade.direction === 'long' ? (
                                <TrendingUp className="w-4 h-4 text-profit" aria-label="Long" />
                              ) : (
                                <TrendingDown className="w-4 h-4 text-loss" aria-label="Short" />
                              )}
                            </div>
                            <span>{trade.setup || 'No Setup'}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                <p className="text-secondary-text">No activity recorded for this date.</p>
                <Link 
                  href={`/trades/new?date=${selectedDate}`} 
                  className={buttonVariants({ variant: 'default', size: 'sm', className: "rounded-none" })}
                >
                  <Plus className="h-4 w-4 mr-2" /> Log a Trade
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
