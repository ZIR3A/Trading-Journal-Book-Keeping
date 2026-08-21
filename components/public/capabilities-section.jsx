import { BookOpen, BarChart3, LineChart, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const capabilities = [
  {
    title: 'Trade Journal',
    description: 'Record the details and reasoning behind every trade while the context is still fresh.',
    icon: BookOpen,
  },
  {
    title: 'Performance Review',
    description: 'Review trading results over time and identify meaningful patterns in your execution.',
    icon: BarChart3,
  },
  {
    title: 'Trading Insights',
    description: 'Turn historical trade data into useful information for review and strategic adjustment.',
    icon: LineChart,
  },
  {
    title: 'Consistency',
    description: 'Build a repeatable journaling and review process that reinforces disciplined trading.',
    icon: CheckCircle2,
  },
];

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary tracking-tight">
            Designed for clarity and discipline.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {capabilities.map((capability, index) => (
            <Card key={index} className="rounded-none border-border shadow-none bg-card hover:bg-subtle-background/50 transition-colors duration-300">
              <CardHeader className="pb-4">
                <capability.icon className="w-8 h-8 text-primary mb-4" />
                <CardTitle className="text-xl font-medium tracking-tight text-primary">
                  {capability.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-secondary-text text-sm leading-relaxed">
                  {capability.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}
