import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ErrorState({ title = 'Something went wrong', message, onRetry }) {
  return (
    <div className="text-center py-16 px-4 border border-border bg-card rounded-md">
      <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
      <h3 className="mt-4 text-base font-semibold text-primary">{title}</h3>
      {message && <p className="mt-2 text-sm text-secondary-text max-w-sm mx-auto">{message}</p>}
      {onRetry && (
        <div className="mt-6">
          <Button variant="outline" onClick={onRetry}>
            Try again
          </Button>
        </div>
      )}
    </div>
  );
}
