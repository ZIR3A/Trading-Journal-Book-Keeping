'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const SELECT_CLS =
  'flex h-10 w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background rounded-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring';

export const DATE_RANGE_PRESETS = {
  all: 'All Time',
  '7d': '7 Days',
  '30d': '30 Days',
  '90d': '90 Days',
  year: 'This Year',
};

export function AnalyticsFilters({
  setups,
  currentDateRange,
  currentDirection,
  currentSetup,
  onDateRangeChange,
  onDirectionChange,
  onSetupChange,
  onClearFilters,
  hasActiveFilters,
}) {
  return (
    <Card className="rounded-none shadow-none border-border">
      <CardContent className="p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-end flex-wrap">

          {/* Date Range */}
          <div className="space-y-2 min-w-[140px]">
            <Label htmlFor="dateRangeFilter" className="text-xs uppercase text-secondary-text">
              Date Range
            </Label>
            <select
              id="dateRangeFilter"
              value={currentDateRange}
              onChange={(e) => onDateRangeChange(e.target.value)}
              className={SELECT_CLS}
            >
              {Object.entries(DATE_RANGE_PRESETS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          {/* Direction */}
          <div className="space-y-2 min-w-[140px]">
            <Label htmlFor="directionFilter" className="text-xs uppercase text-secondary-text">
              Direction
            </Label>
            <select
              id="directionFilter"
              value={currentDirection}
              onChange={(e) => onDirectionChange(e.target.value)}
              className={SELECT_CLS}
            >
              <option value="all">All Directions</option>
              <option value="long">Long Only</option>
              <option value="short">Short Only</option>
            </select>
          </div>

          {/* Setup */}
          <div className="space-y-2 min-w-[160px]">
            <Label htmlFor="setupFilter" className="text-xs uppercase text-secondary-text">
              Setup
            </Label>
            <select
              id="setupFilter"
              value={currentSetup}
              onChange={(e) => onSetupChange(e.target.value)}
              className={SELECT_CLS}
            >
              <option value="all">All Setups</option>
              {setups.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Clear Filters — only visible when any filter is non-default */}
          {hasActiveFilters && (
            <div className="sm:mt-0 mt-0 flex items-end">
              <Button
                variant="ghost"
                className="rounded-none h-10 text-xs text-secondary-text hover:text-primary flex items-center gap-1"
                onClick={onClearFilters}
                aria-label="Clear all filters"
              >
                <X className="h-3 w-3" />
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
