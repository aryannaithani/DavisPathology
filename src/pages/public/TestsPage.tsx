import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  ArrowRight, 
  Clock, 
  Droplet, 
  FileText, 
  CalendarCheck,
  AlertTriangle 
} from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
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
        subtitle="Explore our comprehensive directory of laboratory investigations and specialized profiles."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Diagnostic Tests' },
        ]}
      />

      {/* Notice Banner */}
      <div className="mb-8 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong>Demonstration Catalogue:</strong> All test prices, sample requirements, and turnaround times are realistic demonstration parameters and must be validated with laboratory staff before clinical decision-making.
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="space-y-4 mb-8">
        <div className="relative max-w-lg">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search test name, sample type, or condition (e.g. CBC, Sugar, Thyroid)..."
            className="pl-10 h-11 text-sm bg-white"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              currentCategorySlug === 'all'
                ? 'bg-primary text-white shadow-xs'
                : 'bg-white border border-border text-foreground/80 hover:bg-neutral-100'
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
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  isSelected
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-white border border-border text-foreground/80 hover:bg-neutral-100'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
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
              <Card
                key={test.id}
                className="flex flex-col justify-between border-border/80 hover:border-primary/40 hover:shadow-md transition-all duration-200"
              >
                <CardContent className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <Badge variant="outline" className="text-[10px] font-semibold bg-neutral-50">
                        {category?.name || 'Diagnostic'}
                      </Badge>
                      <div className="text-right">
                        <span className="font-heading font-extrabold text-lg text-primary">
                          {formatPrice(test.price)}
                        </span>
                        <span className="block text-[10px] text-muted-foreground">*Demo</span>
                      </div>
                    </div>

                    <Link to={`/tests/${test.slug}`}>
                      <h3 className="font-heading font-bold text-base text-foreground hover:text-primary transition-colors line-clamp-1">
                        {test.name}
                      </h3>
                    </Link>

                    <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                      {test.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-border/60 space-y-1.5 text-[11px] text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Droplet className="w-3.5 h-3.5 text-primary" />
                        <span>Sample: <strong className="text-foreground">{test.sample_type}</strong></span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-secondary shrink-0" />
                        <span>Turnaround: <strong className="text-foreground">{test.turnaround_time}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-border/60 flex items-center gap-2">
                    <Link to={`/tests/${test.slug}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full text-xs font-semibold">
                        View Details
                      </Button>
                    </Link>
                    <Link to={`/book-appointment?test=${test.slug}`} className="flex-1">
                      <Button size="sm" className="w-full bg-primary hover:bg-primary-600 text-white text-xs font-semibold">
                        Book Test
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
