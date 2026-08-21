import { Reveal } from '@/components/public/motion/reveal';
import { Plus } from 'lucide-react';

export function FaqSection() {
  const faqs = [
    {
      question: "Is there a mobile app?",
      answer: "No native mobile app yet, but the web interface is fully responsive and designed to work well on your phone or tablet."
    },
    {
      question: "Can I connect my broker to import trades automatically?",
      answer: "Currently, trades must be logged manually. This is an intentional design choice to force active review of every trade, though we may add import tools in the future."
    },
    {
      question: "Does it support crypto, forex, or options?",
      answer: "Yes, the journal is agnostic to the asset class. You can log any ticker symbol and define your own setups."
    },
    {
      question: "Does this replace my trading platform?",
      answer: "No. This is an analytical layer that sits on top of your execution platform. You execute trades in your broker, and log them here for review and analytics."
    }
  ];

  return (
    <section className="py-24 border-t border-border bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        
        <Reveal delay={0}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary tracking-tight">
              Common questions
            </h2>
          </div>
        </Reveal>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Reveal key={index} delay={index * 100}>
              <details className="group border border-border bg-card overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer items-center justify-between gap-1.5 p-6 text-primary">
                  <h3 className="text-lg font-medium">
                    {faq.question}
                  </h3>
                  <span className="shrink-0 transition duration-300 group-open:-rotate-45">
                    <Plus className="h-5 w-5" />
                  </span>
                </summary>
                <div className="px-6 pb-6 text-secondary-text leading-relaxed">
                  <p>{faq.answer}</p>
                </div>
              </details>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
