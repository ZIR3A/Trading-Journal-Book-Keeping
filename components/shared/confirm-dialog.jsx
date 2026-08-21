'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

export function ConfirmDialog({
  trigger,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  isDestructive = false,
  isOpen,
  onOpenChange,
}) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      {trigger && <AlertDialogTrigger render={trigger} />}
      <AlertDialogContent className="rounded-none shadow-sm border-border">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-display text-primary">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-secondary-text">{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-none" disabled={isOpen && typeof isOpen !== 'boolean'}>
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            className={`rounded-none ${
              isDestructive ? 'bg-loss hover:bg-loss/90 text-white' : ''
            }`}
            onClick={(e) => {
              if (onConfirm) {
                e.preventDefault();
                onConfirm();
              }
            }}
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
