import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  ArrowRight, 
  Clock, 
  Droplet, 
  CalendarCheck,
  AlertTriangle 
} from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useTests, useCategories } from '@/hooks/useTests';
import { formatPrice } from '@/lib/utils';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { EmptyState } from '@/components/common/EmptyState';

export const TestsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategorySlug = searchParams.get('category') || 'all';
  const [searchQuery, setSearchQuery] = useState('');

  const { data: categories = [], isLoading: isLoadingCategories } = useCategories();
  const { data: tests = [], isLoading: isLoadingTests } = useTests();

  const handleCategoryChange = (slug: string) => {
    if (slug === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', slug);
    }
    setSearchParams(searchParams);
  };

  const filteredTests = useMemo(() => {
    return tests.filter((test) => {
      // Category filter
      if (currentCategorySlug !== 'all') {
        const category = categories.find((c) => c.slug === currentCategorySlug);
        if (category && test.category_id !== category.id) {
          return false;
        }
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = test.name.toLowerCase().includes(q);
        const matchesDesc = test.description.toLowerCase().includes(q);
        const matchesSample = test.sample_type.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesSample) {
          return false;
        }
      }

      return test.is_active;
    });
  }, [tests, categories, currentCategorySlug, searchQuery]);

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <PageHeader
        title="Diagnostic Test Catalogue"
        subtitle="Explore our comprehensive directory of laboratory investigations and specialized profiles in Agra."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Diagnostic Tests' },
        ]}
      />

      {/* Notice Banner */}
      <div className="mb-8 p-3.5 border-2 border-secondary bg-secondary/15 text-xs text-[#171717] flex items-start gap-2.5">
        <AlertTriangle className="w-4 h-4 text-[#171717] shrink-0 mt-0.5" />
        <div>
          <strong className="font-extrabold uppercase">Demonstration Catalogue:</strong> All test prices, sample requirements, and turnaround times are realistic demonstration parameters and must be validated with laboratory staff before clinical testing.
        </div>
      </div>

      {/* Search and Category Filters Bar */}
      <div className="space-y-4 mb-8 bg-white border-2 border-[#171717] p-5">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search test name, sample type, or condition (e.g. CBC, Sugar, LFT)..."
            className="pl-9 h-11 text-xs bg-neutral-50 border-2 border-[#171717] rounded-none focus-visible:ring-0"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-500 hover:text-black uppercase"
            >
              Clear
            </button>
          )}
        </div>

        {/* Traditional Category Filter Tabs */}
        <div className="pt-2 border-t border-neutral-200">
          <span className="text-[10px] font-black uppercase tracking-wider text-neutral-500 block mb-2">
            Filter by Department:
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors border ${
                currentCategorySlug === 'all'
                  ? 'bg-[#171717] text-secondary border-[#171717]'
                  : 'bg-white text-neutral-800 border-neutral-300 hover:border-black'
              }`}
            >
              All Tests ({tests.length})
            </button>

            {categories.map((cat) => {
              const isSelected = currentCategorySlug === cat.slug;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors border ${
                    isSelected
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-neutral-800 border-neutral-300 hover:border-black'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tests Grid */}
      {isLoadingTests || isLoadingCategories ? (
        <div className="py-20 flex justify-center">
          <LoadingSpinner text="Loading diagnostic tests..." />
        </div>
      ) : filteredTests.length === 0 ? (
        <EmptyState
          title="No Tests Found"
          description={`No diagnostic investigations found matching "${searchQuery}". Please try another keyword or browse all categories.`}
          actionText="Clear Filters"
          onAction={() => {
            setSearchQuery('');
            handleCategoryChange('all');
          }}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test) => {
            const category = categories.find((c) => c.id === test.category_id);
            return (
              <div
                key={test.id}
                className="bg-white border-2 border-[#171717] p-5 flex flex-col justify-between hover:border-primary transition-colors shadow-[3px_3px_0px_0px_#171717]"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider bg-neutral-100 border-neutral-400">
                      {category?.name || 'Diagnostic'}
                    </Badge>
                    <div className="text-right">
                      <span className="font-heading font-black text-xl text-primary block leading-none">
                        {formatPrice(test.price)}
                      </span>
                      <span className="text-[10px] text-neutral-500 font-bold uppercase">*Demo</span>
                    </div>
                  </div>

                  <Link to={`/tests/${test.slug}`}>
                    <h3 className="font-heading font-black text-base text-[#171717] hover:text-primary transition-colors line-clamp-1 uppercase">
                      {test.name}
                    </h3>
                  </Link>

                  <p className="text-xs text-neutral-600 mt-2 line-clamp-2 leading-relaxed">
                    {test.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-neutral-200 space-y-1.5 text-xs text-neutral-600">
                    <div className="flex items-center gap-1.5">
                      <Droplet className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>Sample: <strong className="text-[#171717]">{test.sample_type}</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-secondary shrink-0" />
                      <span>Turnaround: <strong className="text-[#171717]">{test.turnaround_time}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-neutral-200 flex items-center gap-2">
                  <Link to={`/tests/${test.slug}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full text-xs font-bold uppercase tracking-wider h-9 border border-[#171717]">
                      Details
                    </Button>
                  </Link>
                  <Link to={`/book-appointment?test=${test.slug}`} className="flex-1">
                    <Button size="sm" className="w-full bg-primary hover:bg-[#D63520] text-white text-xs font-bold uppercase tracking-wider h-9 border border-[#171717]">
                      Book Test
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
