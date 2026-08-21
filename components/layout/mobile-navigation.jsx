'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
        <SheetHeader className="h-16 flex flex-row items-center justify-start border-b border-border px-6 mt-0">
          <SheetTitle className="flex items-center gap-3 text-lg font-display font-semibold tracking-tight text-primary text-left m-0 p-0">
            <div className="rounded-[4px] overflow-hidden flex items-center justify-center shrink-0 w-10 h-10">
              <Image src="/images/brand-logo.png" alt="Trading Journal" width={40} height={40} className="object-cover w-full h-full" />
            </div>
            Trading Journal
          </SheetTitle>
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
