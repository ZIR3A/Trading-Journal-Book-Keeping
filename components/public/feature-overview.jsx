import { Reveal } from '@/components/public/motion/reveal';
import { PenLine, LineChart, CalendarDays, Search, BarChart3, Crosshair, Filter, Lightbulb } from 'lucide-react';

export function FeatureOverview() {
  const features = [
    {
      title: 'Trade Journal',
      description: 'Record and organize every trade in one centralized workspace.',
      icon: <PenLine className="h-5 w-5" />,
    },
    {
      title: 'Performance Analytics',
      description: 'Track your win rate, expectancy, and overall profit factor.',
      icon: <LineChart className="h-5 w-5" />,
    },
    {
      title: 'Equity Curve',
      description: 'Track cumulative performance over time.',
      icon: <BarChart3 className="h-5 w-5" />,
    },
    {
      title: 'Trading Calendar',
      description: 'Visualize your daily results and map your monthly consistency.',
      icon: <CalendarDays className="h-5 w-5" />,
    },
    {
      title: 'Historical Trade Review',
      description: 'Review the exact context, decisions, and setup of any historical trade.',
      icon: <Search className="h-5 w-5" />,
    },
    {
      title: 'Risk & Process',
      description: 'Record your intended risk and confirm if you followed your trading plan.',
      icon: <Crosshair className="h-5 w-5" />,
    },
    {
      title: 'Search & Filters',
      description: 'Quickly find specific trades by symbol, direction, or status.',
      icon: <Filter className="h-5 w-5" />,
    },
    {
      title: 'Pattern Insights',
      description: 'Compare historical setups and directions to understand what works.',
      icon: <Lightbulb className="h-5 w-5" />,
    },
  ];

  return (
    <section id="features" className="py-24 border-t border-border bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        <Reveal delay={0}>
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 bg-subtle-background border border-border text-xs font-mono uppercase tracking-wider text-secondary-text mb-6">
              Features
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary tracking-tight">
              Everything you need to journal your trades.
            </h2>
            <p className="mt-4 text-secondary-text max-w-2xl mx-auto text-lg leading-relaxed">
              From individual trade records to performance analytics and historical review, keep your trading information organized in one place. All of these tools are included in your free trading journal.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Reveal key={index} delay={index * 50}>
              <div className="p-6 border border-border bg-subtle-background/50 h-full space-y-4 hover:border-primary/30 transition-colors duration-300">
                <div className="h-10 w-10 flex items-center justify-center rounded bg-background border border-border text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-medium text-primary tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-sm text-secondary-text leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
