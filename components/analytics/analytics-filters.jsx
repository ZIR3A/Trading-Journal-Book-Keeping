'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export function AnalyticsFilters({ setups, currentDirection, currentSetup, onDirectionChange, onSetupChange }) {
  return (
    <Card className="rounded-none shadow-none border-border mb-6">
      <CardContent className="p-4 flex flex-col sm:flex-row gap-6">
        <div className="space-y-2 flex-1">
          <Label htmlFor="directionFilter" className="text-xs uppercase text-secondary-text">Direction</Label>
          <select 
            id="directionFilter" 
            value={currentDirection} 
            onChange={(e) => onDirectionChange(e.target.value)}
            className="flex h-10 w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="all">All Directions</option>
            <option value="long">Long Only</option>
            <option value="short">Short Only</option>
          </select>
        </div>

        <div className="space-y-2 flex-1">
          <Label htmlFor="setupFilter" className="text-xs uppercase text-secondary-text">Setup</Label>
          <select 
            id="setupFilter" 
            value={currentSetup} 
            onChange={(e) => onSetupChange(e.target.value)}
            className="flex h-10 w-full border border-input bg-background px-3 py-2 text-sm ring-offset-background rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="all">All Setups</option>
            {setups.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </CardContent>
    </Card>
  );
}
