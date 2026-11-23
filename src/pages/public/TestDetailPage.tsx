import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Clock, 
  Droplet, 
  CheckCircle2, 
  CalendarCheck, 
  ArrowLeft, 
  AlertTriangle,
  FileQuestion
} from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
        <FileQuestion className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
        <h2 className="text-2xl font-black text-[#171717] uppercase">Diagnostic Test Not Found</h2>
        <p className="text-neutral-600 text-xs mt-2 mb-6">
          The test you are looking for does not exist or may have been deactivated.
        </p>
        <Button onClick={() => navigate('/tests')} variant="outline" className="border-2 border-[#171717]">
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
        subtitle={`Department: ${category?.name || 'Clinical Pathology'}`}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Tests', href: '/tests' },
          { label: test.name },
        ]}
      />

      {/* Notice Strip */}
      <div className="mb-8 p-3.5 border-2 border-[#F5C542] bg-[#F5C542]/20 text-xs text-[#171717] flex items-start gap-2.5">
        <AlertTriangle className="w-4 h-4 text-[#171717] shrink-0 mt-0.5" />
        <div>
          <strong className="font-extrabold uppercase">Sample Collection Guidelines:</strong> Please review preparation notes below. Our phlebotomy team follows strict barcoding and sterile blood draw procedures.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Test Specifications (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border-2 border-[#171717] p-6 sm:p-8 space-y-6 shadow-[3px_3px_0px_0px_#171717]">
            <div className="border-b-2 border-neutral-200 pb-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-[10px] bg-neutral-100 font-bold uppercase tracking-wider">
                  {category?.name}
                </Badge>
                <span className="text-[10px] font-bold text-green-800 bg-green-100 border border-green-300 px-2 py-0.5 uppercase tracking-wider">
                  ACTIVE SPECIFICATION
                </span>
              </div>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#171717] uppercase tracking-tight">
                {test.name}
              </h2>
            </div>

            <div>
              <h3 className="text-xs font-black uppercase tracking-wider text-primary mb-2">
                Clinical Description & Indications
              </h3>
              <p className="text-sm text-neutral-700 leading-relaxed font-normal">
                {test.description}
              </p>
            </div>

            {/* Specimen and Turnaround Details in Rectangular Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 border-2 border-neutral-300 bg-neutral-50">
                <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-wider mb-1">
                  <Droplet className="w-4 h-4" />
                  Specimen / Sample Type
                </div>
                <p className="text-sm font-bold text-[#171717]">
                  {test.sample_type}
                </p>
                <p className="text-[11px] text-neutral-500 mt-1">
                  Single-use vacuum blood tube collection.
                </p>
              </div>

              <div className="p-4 border-2 border-neutral-300 bg-neutral-50">
                <div className="flex items-center gap-2 text-amber-700 font-black text-xs uppercase tracking-wider mb-1">
                  <Clock className="w-4 h-4" />
                  Turnaround Timeline
                </div>
                <p className="text-sm font-bold text-[#171717]">
                  {test.turnaround_time}
                </p>
                <p className="text-[11px] text-neutral-500 mt-1">
                  Uploaded to authenticated portal upon pathologist signoff.
                </p>
              </div>
            </div>

            {/* Preparation Requirements */}
            <div className="border-t-2 border-neutral-200 pt-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#171717] mb-2">
                Patient Fasting & Preparation Instructions
              </h3>
              <div className="p-4 bg-amber-50/70 border-2 border-amber-300 text-xs sm:text-sm text-neutral-900 leading-relaxed font-medium">
                {test.preparation}
              </div>
            </div>
          </div>

          {/* Related Investigations */}
          {relatedTests.length > 0 && (
            <div className="bg-white border-2 border-[#171717] p-6 space-y-4">
              <h3 className="font-heading font-black text-base text-[#171717] uppercase tracking-wide border-b border-neutral-200 pb-2">
                Related Investigations in {category?.name}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedTests.map((rel) => (
                  <Link key={rel.id} to={`/tests/${rel.slug}`} className="block">
                    <div className="border border-neutral-300 p-3 hover:border-black hover:bg-neutral-50 transition-colors">
                      <div className="font-bold text-xs text-[#171717] truncate uppercase">
                        {rel.name}
                      </div>
                      <div className="text-primary font-black text-xs mt-1">
                        {formatPrice(rel.price)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Booking Box (4 cols) - Strong Black with Yellow/Red Accents */}
        <div className="lg:col-span-4 sticky top-24 space-y-4">
          <div className="bg-[#171717] text-white border-2 border-black p-6 sm:p-7 space-y-5 shadow-[4px_4px_0px_0px_#F1654C]">
            <div className="border-b border-neutral-700 pb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#F5C542] block mb-1">
                Investigation Tariff
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-heading font-black text-3xl sm:text-4xl text-[#F5C542]">
                  {formatPrice(test.price)}
                </span>
                <span className="text-[11px] text-neutral-400 font-semibold">*Standard Tariff</span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-neutral-300">
              <div className="flex items-start gap-2">
                <span className="text-secondary font-bold">■</span>
                <span>Home sample collection available in Agra</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-secondary font-bold">■</span>
                <span>Direct PDF download from patient dashboard</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-secondary font-bold">■</span>
                <span>Calibrated laboratory equipment protocols</span>
              </div>
            </div>

            <div className="pt-2 space-y-2.5">
              <Link to={`/book-appointment?test=${test.slug}`} className="block">
                <Button className="w-full bg-primary hover:bg-[#DF472B] text-white font-extrabold uppercase tracking-wider text-xs h-11 border border-white">
                  <CalendarCheck className="w-4 h-4 mr-2" />
                  BOOK THIS TEST
                </Button>
              </Link>
              <Link to="/contact" className="block">
                <Button variant="outline" className="w-full bg-transparent border border-neutral-600 text-neutral-200 hover:bg-neutral-800 hover:text-white font-bold uppercase tracking-wider text-xs h-10">
                  Enquire at Lab Counter
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-white border-2 border-[#171717] p-4 text-xs space-y-1">
            <span className="font-bold text-[#171717] uppercase block">Need Assistance?</span>
            <p className="text-neutral-600">
              Call our reception counter at <strong>+91 98765 43210</strong> or visit Shop No. 4, Millenium Complex, Agra.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
