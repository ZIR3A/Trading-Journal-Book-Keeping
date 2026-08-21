'use client';

import { Toaster as Sonner } from 'sonner';

export function Toaster({ ...props }) {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-sm group-[.toaster]:rounded-none group-[.toaster]:border font-sans',
          description: 'group-[.toast]:text-secondary-text',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-none',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:rounded-none',
          error:
            'group-[.toaster]:border-loss/50 group-[.toaster]:bg-loss/5 group-[.toaster]:text-loss',
          success:
            'group-[.toaster]:border-profit/50 group-[.toaster]:bg-profit/5 group-[.toaster]:text-profit',
          warning:
            'group-[.toaster]:border-orange-500/50 group-[.toaster]:bg-orange-500/5 group-[.toaster]:text-orange-500',
          info:
            'group-[.toaster]:border-blue-500/50 group-[.toaster]:bg-blue-500/5 group-[.toaster]:text-blue-500',
        },
      }}
      {...props}
    />
  );
}
