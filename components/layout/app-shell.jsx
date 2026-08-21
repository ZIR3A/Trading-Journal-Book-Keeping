import { Sidebar } from './sidebar';
import { TopHeader } from './top-header';

export function AppShell({ children }) {
  return (
    <div className="flex min-h-screen md:h-screen md:overflow-hidden bg-background text-foreground">
      <Sidebar />

      <div className="flex flex-1 flex-col min-w-0 min-h-0">
        <TopHeader />
        <main className="flex-1 overflow-y-auto focus:outline-none">
          <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
