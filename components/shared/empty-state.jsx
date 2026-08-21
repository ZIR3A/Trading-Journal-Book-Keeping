import { Plus } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';

export function EmptyState({ title, description, actionLabel, actionHref, icon: Icon }) {
  return (
    <div className="text-center py-16 px-4 border border-border border-dashed bg-card rounded-md">
      {Icon && <Icon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />}
      <h3 className="text-base font-semibold text-primary">{title}</h3>
      <p className="mt-2 text-sm text-secondary-text max-w-sm mx-auto">{description}</p>
      {actionLabel && actionHref && (
        <div className="mt-6">
          <Link href={actionHref} className={buttonVariants({ variant: "default" })}>
            <Plus className="-ml-1 mr-2 h-4 w-4" aria-hidden="true" />
            {actionLabel}
          </Link>
        </div>
      )}
    </div>
  );
}
