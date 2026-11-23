import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  CalendarCheck, 
  ShieldCheck, 
  Sparkles, 
  AlertTriangle,
  ArrowRight 
} from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePackages } from '@/hooks/usePackages';
import { formatPrice } from '@/lib/utils';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export const PackagesPage: React.FC = () => {
  const { data: packages = [], isLoading } = usePackages();

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <PageHeader
        title="Health Checkup Packages"
        subtitle="Curated diagnostic profiles combining essential tests for proactive wellness and early disease screening."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Health Packages' },
        ]}
      />

      {/* Notice Banner */}
      <div className="mb-8 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong>Demonstration Pricing:</strong> Package compositions and fees displayed below are mock records for web application demonstration. Please contact the laboratory counter for operational package availability.
        </div>
      </div>

      {isLoading ? (
        <div className="py-20 flex justify-center">
          <LoadingSpinner text="Loading preventative health packages..." />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg, index) => {
            const isFeatured = index === 1; // Complete Health Checkup
            return (
              <div
                key={pkg.id}
                className={`relative rounded-2xl flex flex-col justify-between p-6 sm:p-8 transition-all ${
                  isFeatured
                    ? 'bg-neutral-900 text-white shadow-xl scale-105 z-10 border-2 border-secondary'
                    : 'bg-white border border-border text-foreground hover:shadow-lg'
                }`}
              >
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-secondary text-neutral-900 text-[11px] font-extrabold uppercase tracking-widest px-4 py-1 rounded-full shadow-xs flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    MOST COMPREHENSIVE
                  </div>
                )}

                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className={`font-heading font-extrabold text-2xl ${isFeatured ? 'text-white' : 'text-foreground'}`}>
                      {pkg.name}
                    </h3>
                  </div>

                  <p className={`text-xs leading-relaxed mt-2 line-clamp-3 ${isFeatured ? 'text-neutral-400' : 'text-muted-foreground'}`}>
                    {pkg.description}
                  </p>

                  <div className="my-6 pb-6 border-b border-border/40">
                    <div className="text-[11px] uppercase tracking-wider font-semibold opacity-75">
                      All-Inclusive Package Fee
                    </div>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className={`text-3xl sm:text-4xl font-extrabold ${isFeatured ? 'text-secondary' : 'text-primary'}`}>
                        {formatPrice(pkg.price)}
                      </span>
                      <span className="text-xs opacity-70">*(Demonstration)</span>
                    </div>
                  </div>

                  {/* Included Tests List */}
                  <div className="space-y-3 mb-8">
                    <div className={`text-xs font-bold uppercase tracking-wider ${isFeatured ? 'text-neutral-200' : 'text-foreground'}`}>
                      Included Investigations ({pkg.tests?.length || 0}):
                    </div>
                    <ul className="space-y-2 text-xs">
                      {pkg.tests && pkg.tests.length > 0 ? (
                        pkg.tests.map((test) => (
                          <li key={test.id} className="flex items-start gap-2">
                            <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isFeatured ? 'text-secondary' : 'text-green-600'}`} />
                            <span className={isFeatured ? 'text-neutral-300' : 'text-muted-foreground'}>
                              {test.name}
                            </span>
                          </li>
                        ))
                      ) : (
                        <li className="text-xs italic text-muted-foreground">Standard test panel</li>
                      )}
                    </ul>
                  </div>

                  {/* Preparation Guidelines */}
                  <div className={`p-3.5 rounded-xl text-xs leading-relaxed mb-6 ${
                    isFeatured
                      ? 'bg-neutral-800 text-neutral-300 border border-neutral-700'
                      : 'bg-neutral-50 text-muted-foreground border border-border/80'
                  }`}>
                    <strong className={isFeatured ? 'text-white' : 'text-foreground'}>Preparation: </strong>
                    {pkg.preparation}
                  </div>
                </div>

                <Link to={`/book-appointment?package=${pkg.slug}`}>
                  <Button
                    className={`w-full font-bold h-12 text-sm ${
                      isFeatured
                        ? 'bg-secondary hover:bg-amber-400 text-neutral-900 shadow-md'
                        : 'bg-primary hover:bg-primary-600 text-white'
                    }`}
                  >
                    <CalendarCheck className="w-4 h-4 mr-2" />
                    Book This Package
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      )}

      {/* Why Health Screening Section */}
      <div className="mt-16 p-8 rounded-2xl bg-neutral-50 border border-border">
        <h3 className="font-heading font-bold text-xl text-foreground mb-3 text-center">
          Why Opt for a Health Checkup Package?
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground text-center max-w-2xl mx-auto mb-8">
          Early detection through regular pathology screening helps identify cardiovascular risks, metabolic imbalances, and silent conditions long before visible symptoms emerge.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="p-4 bg-white rounded-xl border border-border">
            <strong className="block text-foreground text-sm font-semibold mb-1">Significant Cost Savings</strong>
            <p className="text-muted-foreground">Bundling tests saves up to 50% compared to booking individual blood investigations separately.</p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-border">
            <strong className="block text-foreground text-sm font-semibold mb-1">Single Blood Draw</strong>
            <p className="text-muted-foreground">Our experienced phlebotomists collect all necessary tube specimens in a single comfortable visit.</p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-border">
            <strong className="block text-foreground text-sm font-semibold mb-1">Holistic Doctor Overview</strong>
            <p className="text-muted-foreground">Comprehensive organ profiles (Liver, Kidney, Lipids, Blood) provide doctors with complete physiological insight.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
