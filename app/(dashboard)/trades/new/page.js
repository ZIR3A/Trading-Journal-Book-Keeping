'use client';

import { PageHeader } from '@/components/layout/page-header';
import { TradeForm } from '@/components/trades/trade-form';
import { tradeStore } from '@/lib/store/trade-store';
import { useRouter } from 'next/navigation';

export default function NewTradePage() {
  const router = useRouter();

  const handleSubmit = async (data) => {
    await tradeStore.createTrade(data);
    router.push('/trades');
  };

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader 
        title="Record New Trade" 
        description="Plan your trade and calculate risk before execution."
      />
      <TradeForm onSubmit={handleSubmit} />
    </div>
  );
}
