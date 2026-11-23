import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Clock, 
  Droplet, 
  CheckCircle2, 
  CalendarCheck, 
  ArrowLeft, 
  Share2, 
  AlertTriangle,
  FileQuestion,
  FlaskConical 
} from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useTest, useRelatedTests, useCategories } from '@/hooks/useTests';
import { formatPrice } from '@/lib/utils';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export const TestDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { data: test, isLoading } = useTest(slug || '');
  const { data: categories = [] } = useCategories();
  const category = categories.find((c) => c.id === test?.category_id);
  const { data: relatedTests = [] } = useRelatedTests(test?.category_id || '', test?.id || '');

  if (isLoading) {
    return (
      <div className="py-24 flex justify-center">
        <LoadingSpinner text="Retrieving test details..." />
      </div>
    );
  }

  if (!test) {
    return (
      <div className="py-20 max-w-3xl mx-auto text-center px-4">
        <FileQuestion className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground">Diagnostic Test Not Found</h2>
        <p className="text-muted-foreground text-sm mt-2 mb-6">
          The test you are looking for does not exist or may have been deactivated.
        </p>
        <Button onClick={() => navigate('/tests')} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Catalogue
        </Button>
      </div>
    );
  }

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <PageHeader
        title={test.name}
        subtitle={`Category: ${category?.name || 'General Pathology'}`}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Tests', href: '/tests' },
          { label: test.name },
        ]}
      />

      {/* Demonstration Alert */}
      <div className="mb-8 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong>Clinical Verification Required:</strong> Preparation instructions, sample requirements, and prices shown are demonstration values. Please consult your physician or laboratory technician before fasting or sample submission.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Content Details */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-border shadow-xs space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs bg-neutral-50 font-semibold">
                  {category?.name}
                </Badge>
                <Badge variant="outline" className="text-xs text-green-700 bg-green-50 border-green-200">
                  Active in Catalogue
                </Badge>
              </div>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-foreground">
                {test.name}
              </h2>
            </div>

            <div>
              <h3 className="font-heading font-bold text-base text-foreground mb-2">
                Test Description
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {test.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border">
              <div className="p-4 rounded-xl bg-neutral-50 border border-border/80">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-1">
                  <Droplet className="w-4 h-4" />
                  Specimen / Sample Type
                </div>
                <p className="text-sm font-semibold text-foreground">
                  {test.sample_type}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Collected with sterile single-use vacutainer.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-neutral-50 border border-border/80">
                <div className="flex items-center gap-2 text-secondary font-bold text-xs uppercase tracking-wider mb-1">
                  <Clock className="w-4 h-4 text-amber-700" />
                  <span className="text-amber-800">Expected Turnaround</span>
                </div>
                <p className="text-sm font-semibold text-foreground">
                  {test.turnaround_time}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Report uploaded directly to patient account.
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-heading font-bold text-base text-foreground mb-2">
                Patient Preparation Guidelines
              </h3>
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-xs sm:text-sm text-foreground leading-relaxed">
                {test.preparation}
              </div>
            </div>
          </div>

          {/* Related Tests */}
          {relatedTests.length > 0 && (
            <div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-4">
                Related Investigations in {category?.name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {relatedTests.map((rel) => (
                  <Link key={rel.id} to={`/tests/${rel.slug}`} className="group">
                    <Card className="h-full border-border hover:border-primary/40 hover:shadow-xs transition-all">
                      <CardContent className="p-4">
                        <div className="font-semibold text-xs text-foreground group-hover:text-primary transition-colors line-clamp-1">
                          {rel.name}
                        </div>
                        <div className="text-primary font-bold text-xs mt-2">
                          {formatPrice(rel.price)}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Booking Box */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 bg-neutral-900 text-white p-6 sm:p-8 rounded-2xl border border-neutral-800 shadow-xl space-y-6">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-secondary">
                Standard Test Fee
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-heading font-extrabold text-3xl sm:text-4xl text-secondary">
                  {formatPrice(test.price)}
                </span>
                <span className="text-xs text-neutral-400">*(Demonstration)</span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-neutral-300 pt-3 border-t border-neutral-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                <span>Home sample collection available in Agra</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                <span>Digital PDF report download upon completion</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                <span>Strict quality-checked pathology procedures</span>
              </div>
            </div>

            <Link to={`/book-appointment?test=${test.slug}`} className="block">
              <Button className="w-full bg-primary hover:bg-primary-600 text-white font-bold h-12 text-sm shadow-md gap-2">
                <CalendarCheck className="w-4 h-4" />
                Book This Test Now
              </Button>
            </Link>

            <Link to="/contact" className="block">
              <Button variant="outline" className="w-full border-neutral-700 text-neutral-300 hover:text-white hover:bg-neutral-800 text-xs">
                Inquire about this Test
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
