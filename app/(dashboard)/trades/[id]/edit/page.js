'use client';

import { PageHeader } from '@/components/layout/page-header';
import { TradeForm } from '@/components/trades/trade-form';
import { tradeStore } from '@/lib/store/trade-store';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { LoadingState } from '@/components/shared/loading-state';
import { ErrorState } from '@/components/shared/error-state';
import { use } from 'react';

export default function EditTradePage({ params }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const { id } = unwrappedParams;
  
  const [trade, setTrade] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTrade() {
      try {
        const data = await tradeStore.getTradeById(id);
        setTrade(data);
      } catch (error) {
        console.error("Failed to load trade", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadTrade();
  }, [id]);

  const handleSubmit = async (data) => {
    await tradeStore.updateTrade(id, data);
    router.push(`/trades/${id}`);
  };

  if (isLoading) {
    return <LoadingState text="Loading trade data..." />;
  }

  if (!trade) {
    return (
      <ErrorState 
        title="Trade not found" 
        message="The trade you are trying to edit does not exist or has been deleted." 
        onRetry={() => router.push('/trades')}
      />
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader 
        title="Edit Trade" 
        description={`Editing trade ${trade.symbol} from ${new Date(trade.date).toLocaleDateString()}`}
      />
      <TradeForm initialData={trade} onSubmit={handleSubmit} isEditing={true} />
    </div>
  );
}
