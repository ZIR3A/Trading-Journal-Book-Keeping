import { LegalLayout } from '@/components/public/legal-layout';

export const metadata = {
  title: 'Trading & Financial Disclaimer — Trading Journal',
  description: 'Trading Journal is an analysis tool and does not provide financial advice.',
  openGraph: {
    title: 'Trading & Financial Disclaimer — Trading Journal',
    description: 'Trading Journal is an analysis tool and does not provide financial advice.',
  },
  robots: {
    index: false,
    follow: true,
  }
};

export default function DisclaimerPage() {
  return (
    <LegalLayout title="Trading Disclaimer">
      
      <div className="bg-subtle-background/50 border-l-4 border-primary p-6 mb-12">
        <p className="text-lg font-medium text-primary m-0">
          The Trading Journal App helps you understand your own trading history. It does not tell you what to trade.
        </p>
      </div>

      <h3>Not Financial Advice</h3>
      <p>
        The Trading Journal App is designed strictly as a personal journaling, organizational, and analytical tool. The application, its creators, and its features do not provide personalized financial advice, investment recommendations, or trading signals.
      </p>

      <h3>Inherent Risks of Trading</h3>
      <p>
        Trading in financial markets—including stocks, forex, cryptocurrencies, futures, and options—involves a high degree of risk. You can lose some or all of your initial investment. You should carefully consider whether trading is appropriate for you in light of your financial condition, experience, and risk tolerance.
      </p>

      <h3>No Guarantee of Results</h3>
      <p>
        The analytics, metrics, and insights provided by the application are based entirely on the data you input. They are intended for educational and self-reflection purposes only. Historical performance, whether your own or hypothetical, is not a guarantee of future results. The application does not guarantee profitability or protect against losses.
      </p>

      <h3>User Responsibility</h3>
      <p>
        You remain solely responsible for your own trading decisions. You should not make any financial or investment decision based on the metrics or tools provided by this application without undertaking independent due diligence and consulting with a qualified financial professional if necessary.
      </p>

    </LegalLayout>
  );
}
