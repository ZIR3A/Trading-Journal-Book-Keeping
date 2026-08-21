'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button, buttonVariants } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { usePathname } from 'next/navigation';

export function PublicNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isLoading } = useAuth();
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="font-display font-semibold text-lg tracking-tight text-primary flex items-center gap-3">
            <Image src="/brand-logo.png" alt="Trading Journal" width={48} height={48} className="object-contain" />
            Trading Journal
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/product" className={`text-sm font-medium transition-colors ${isActive('/product') ? 'text-primary border-b-2 border-primary' : 'text-secondary-text hover:text-primary'}`}>
              Product
            </Link>
            <Link href="/how-it-works" className={`text-sm font-medium transition-colors ${isActive('/how-it-works') ? 'text-primary border-b-2 border-primary' : 'text-secondary-text hover:text-primary'}`}>
              How It Works
            </Link>
            <Link href="/about" className={`text-sm font-medium transition-colors ${isActive('/about') ? 'text-primary border-b-2 border-primary' : 'text-secondary-text hover:text-primary'}`}>
              About
            </Link>
          </nav>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {!isLoading && user ? (
            <Link href="/dashboard" className={buttonVariants({ variant: 'default', size: 'sm', className: "rounded-none" })}>
              Dashboard
            </Link>
          ) : (
              <Link href="/login" className={buttonVariants({ variant: 'default', size: 'sm', className: "rounded-none" })}>
                Start Journaling
              </Link>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-secondary-text"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background absolute w-full left-0 animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-4 px-4 py-6 shadow-xl">
            <Link 
              href="/product" 
              className={`text-sm font-medium ${isActive('/product') ? 'text-primary font-semibold' : 'text-secondary-text hover:text-primary'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Product
            </Link>
            <Link 
              href="/how-it-works" 
              className={`text-sm font-medium ${isActive('/how-it-works') ? 'text-primary font-semibold' : 'text-secondary-text hover:text-primary'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link 
              href="/about" 
              className={`text-sm font-medium ${isActive('/about') ? 'text-primary font-semibold' : 'text-secondary-text hover:text-primary'}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <div className="border-t border-border pt-4 flex flex-col gap-4">
              {!isLoading && user ? (
                <Link 
                  href="/dashboard" 
                  className={buttonVariants({ variant: 'default', className: "w-full rounded-none justify-center" })}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              ) : (
                  <Link 
                    href="/login" 
                    className={buttonVariants({ variant: 'default', className: "w-full rounded-none justify-center" })}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Start Journaling
                  </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
