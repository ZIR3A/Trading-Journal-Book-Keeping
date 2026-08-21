'use client';

import Link from 'next/link';
import { MobileNavigation } from './mobile-navigation';
import { useAuth } from '@/lib/auth/auth-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function TopHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-card px-4 sm:gap-x-6 sm:px-6 lg:px-8">
      <MobileNavigation />
      
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-end items-center">
        <DropdownMenu>
          <DropdownMenuTrigger
            className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-xs font-medium border border-border text-primary cursor-pointer hover:bg-border transition-colors"
            aria-label="Open user menu"
          >
            {user ? user.name.charAt(0).toUpperCase() : 'U'}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-card border-border rounded-none shadow-none">
            {user && (
              <div className="px-3 py-2 border-b border-border">
                <p className="text-xs font-medium text-primary truncate">{user.name}</p>
                <p className="text-xs text-secondary-text truncate">{user.email}</p>
              </div>
            )}
            <DropdownMenuItem asChild className="cursor-pointer rounded-none hover:bg-secondary focus:bg-secondary">
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem onClick={logout} className="cursor-pointer rounded-none hover:bg-secondary focus:bg-secondary">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

