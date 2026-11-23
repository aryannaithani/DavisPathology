import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  CalendarCheck, 
  Sparkles, 
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Info
} from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { usePackages } from '@/hooks/usePackages';
import { formatPrice } from '@/lib/utils';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export const PackagesPage: React.FC = () => {
  const { data: packages = [], isLoading } = usePackages();

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <PageHeader
        title="Health Checkup Packages"
        subtitle="Curated diagnostic profiles combining essential tests for proactive wellness and early disease screening."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Health Packages' },
        ]}
      />

      {/* Notice Banner */}
      <div className="mb-8 p-4 bg-[#F5C542]/15 border-2 border-[#F5C542] text-xs text-[#171717] flex items-start gap-3">
        <Info className="w-4 h-4 text-[#171717] shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="font-bold uppercase tracking-wider">Demonstration Pricing Notice:</strong> Package compositions, test counts and fees displayed below are mock records for web application demonstration. Please contact our laboratory reception desk at Millenium Complex, Agra for operational package availability.
        </div>
      </div>

      {isLoading ? (
        <div className="py-20 flex justify-center">
          <LoadingSpinner text="Loading preventative health packages..." />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {packages.map((pkg, index) => {
            const isFeatured = index === 1; // Complete Health Checkup
            return (
              <div
                key={pkg.id}
                className={`relative flex flex-col justify-between transition-all ${
                  isFeatured
                    ? 'bg-[#171717] text-white border-2 border-[#F5C542]'
                    : 'bg-white border-2 border-neutral-300 text-[#171717]'
                }`}
              >
                {/* Header Strip */}
                <div className={`p-4 border-b ${
                  isFeatured 
                    ? 'bg-neutral-900 border-[#F5C542]/40' 
                    : 'bg-neutral-100 border-neutral-300'
                }`}>
                  {isFeatured ? (
                    <div className="inline-block bg-[#F5C542] text-[#171717] text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 mb-2">
                      RECOMMENDED PANEL
                    </div>
                  ) : (
                    <div className="inline-block bg-neutral-200 text-neutral-800 text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 mb-2">
                      DIAGNOSTIC PANEL
                    </div>
                  )}
                  <h3 className={`font-heading font-black text-xl sm:text-2xl tracking-tight ${isFeatured ? 'text-white' : 'text-[#171717]'}`}>
                    {pkg.name}
                  </h3>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className={`text-xs leading-relaxed ${isFeatured ? 'text-neutral-300' : 'text-neutral-600'}`}>
                      {pkg.description}
                    </p>

                    {/* Price Section */}
                    <div className={`my-6 p-4 border ${
                      isFeatured 
                        ? 'bg-neutral-900/80 border-neutral-800' 
                        : 'bg-neutral-50 border-neutral-200'
                    }`}>
                      <div className={`text-[10px] uppercase font-bold tracking-wider ${isFeatured ? 'text-[#F5C542]' : 'text-neutral-500'}`}>
                        All-Inclusive Package Fee
                      </div>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className={`text-3xl sm:text-4xl font-black font-heading ${isFeatured ? 'text-[#F5C542]' : 'text-[#E94B35]'}`}>
                          {formatPrice(pkg.price)}
                        </span>
                        <span className="text-[10px] opacity-70">*(Demonstration)</span>
                      </div>
                    </div>

                    {/* Included Tests List */}
                    <div className="space-y-3 mb-6">
                      <div className={`text-xs font-bold uppercase tracking-wider pb-1.5 border-b ${
                        isFeatured ? 'border-neutral-800 text-neutral-200' : 'border-neutral-200 text-neutral-800'
                      }`}>
                        Included Investigations ({pkg.tests?.length || 0}):
                      </div>
                      <ul className="space-y-2 text-xs">
                        {pkg.tests && pkg.tests.length > 0 ? (
                          pkg.tests.map((test) => (
                            <li key={test.id} className="flex items-start gap-2">
                              <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isFeatured ? 'text-[#F5C542]' : 'text-[#E94B35]'}`} />
                              <span className={isFeatured ? 'text-neutral-200' : 'text-neutral-700'}>
                                {test.name}
                              </span>
                            </li>
                          ))
                        ) : (
                          <li className="text-xs italic text-neutral-400">Standard test profile parameters</li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <div>
                    {/* Preparation Guidelines */}
                    <div className={`p-3 text-xs leading-relaxed mb-6 border-l-4 ${
                      isFeatured
                        ? 'bg-neutral-900 text-neutral-300 border-[#F5C542]'
                        : 'bg-neutral-100 text-neutral-700 border-[#E94B35]'
                    }`}>
                      <strong className={`block uppercase text-[10px] tracking-wider mb-0.5 ${isFeatured ? 'text-white' : 'text-[#171717]'}`}>
                        Sample Preparation:
                      </strong>
                      {pkg.preparation}
                    </div>

                    <Link to={`/book-appointment?package=${pkg.slug}`}>
                      <Button
                        className={`w-full font-bold h-12 text-xs uppercase tracking-wider rounded-none ${
                          isFeatured
                            ? 'bg-[#F5C542] hover:bg-[#e4b532] text-[#171717] border-2 border-[#171717]'
                            : 'bg-[#E94B35] hover:bg-[#d63f2a] text-white border-2 border-[#171717]'
                        }`}
                      >
                        <CalendarCheck className="w-4 h-4 mr-2" />
                        Book This Package
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Why Health Screening Section - Structured 3 Column Block */}
      <div className="mt-14 border-2 border-[#171717] bg-white">
        <div className="p-6 bg-[#171717] text-white border-b-2 border-[#171717] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#F5C542]">
              Clinical Rationale
            </span>
            <h3 className="font-heading font-black text-xl text-white tracking-tight mt-0.5">
              Why Opt for a Preventive Health Package?
            </h3>
          </div>
          <div className="text-xs text-neutral-400 max-w-md">
            Periodic investigations reveal vital bio-markers long before visible symptoms emerge.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x-2 divide-neutral-200">
          <div className="p-6">
            <div className="text-[11px] font-black uppercase tracking-wider text-[#E94B35] mb-1">
              01. Cost Effectiveness
            </div>
            <strong className="block text-[#171717] text-sm font-bold mb-2">Significant Financial Savings</strong>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Bundled packages reduce overall testing costs by up to 50% compared to requisitioning individual biochemical investigations separately.
            </p>
          </div>

          <div className="p-6">
            <div className="text-[11px] font-black uppercase tracking-wider text-[#171717] mb-1">
              02. Comprehensive Scope
            </div>
            <strong className="block text-[#171717] text-sm font-bold mb-2">Cross-Organ Assessment</strong>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Panels provide a single consolidated health picture across liver function, renal efficiency, blood glucose, and complete lipid profiles.
            </p>
          </div>

          <div className="p-6">
            <div className="text-[11px] font-black uppercase tracking-wider text-[#E94B35] mb-1">
              03. Actionable Baseline
            </div>
            <strong className="block text-[#171717] text-sm font-bold mb-2">Comparative Tracking</strong>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Annual parameters create an accurate diagnostic history that your treating physician can evaluate over months and years for targeted care.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
