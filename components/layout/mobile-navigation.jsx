'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { navigation } from './sidebar';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from '@/components/ui/sheet';
import { Button, buttonVariants } from '@/components/ui/button';

export function MobileNavigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className={buttonVariants({ variant: "ghost", size: "icon", className: "md:hidden text-secondary-text hover:text-primary" })}>
        <Menu className="h-6 w-6" />
        <span className="sr-only">Open sidebar</span>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0 border-r border-border">
        <SheetHeader className="h-16 flex items-center justify-start border-b border-border px-6">
          <SheetTitle className="text-lg font-display font-semibold tracking-tight text-primary text-left">Trading Journal</SheetTitle>
        </SheetHeader>
        <div className="flex flex-1 flex-col overflow-y-auto bg-card">
          <nav className="flex-1 px-4 py-4 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-sm transition-colors ${
                    isActive
                      ? 'bg-secondary text-primary'
                      : 'text-secondary-text hover:bg-secondary hover:text-primary'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 flex-shrink-0 ${
                      isActive ? 'text-primary' : 'text-secondary-text group-hover:text-primary'
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
