import { Loader2 } from 'lucide-react';

export function LoadingState({ text = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 h-full">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      <p className="mt-4 text-sm text-secondary-text">{text}</p>
    </div>
  );
}
