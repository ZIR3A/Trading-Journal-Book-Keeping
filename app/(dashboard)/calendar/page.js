import { PageHeader } from '@/components/layout/page-header';
import { EmptyState } from '@/components/shared/empty-state';
import { Calendar } from 'lucide-react';

export default function CalendarPage() {
  return (
    <div>
      <PageHeader 
        title="Calendar" 
        description="View your trading activity over time"
      />
      
      <EmptyState 
        icon={Calendar}
        title="No activity found"
        description="Your trading sessions will appear here automatically."
      />
    </div>
  );
}
