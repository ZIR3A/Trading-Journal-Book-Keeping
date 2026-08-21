'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, LineChart, Calendar, Settings, BookOpen } from 'lucide-react';

export const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Trade Journal', href: '/trades', icon: BookOpen },
  { name: 'Analytics', href: '/analytics', icon: LineChart },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r border-border bg-card hidden md:flex md:flex-col shrink-0">
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-border">
        <Link href="/dashboard" className="flex items-center gap-3 text-lg font-display font-semibold tracking-tight text-primary hover:opacity-80 transition-opacity">
          <div className="rounded-[4px] overflow-hidden flex items-center justify-center shrink-0 w-10 h-10">
            <Image src="/images/brand-logo.png" alt="Trading Journal" width={40} height={40} className="object-cover w-full h-full" />
          </div>
          Trading Journal
        </Link>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto">
        <nav className="flex-1 px-4 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
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
    </div>
  );
}
