import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FileText, 
  ShieldCheck, 
  Lock, 
  ArrowRight, 
  Search, 
  Download, 
  AlertTriangle,
  UserCheck,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useBooking } from '@/hooks/useBookings';
import { formatPrice, getStatusColor, getStatusLabel } from '@/lib/utils';

export const ReportsPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchRef, setSearchRef] = useState('');
  const [queriedRef, setQueriedRef] = useState('');

  const { data: bookingResult, isLoading: isSearchingBooking } = useBooking(queriedRef);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchRef.trim()) {
      setQueriedRef(searchRef.trim().toUpperCase());
    }
  };

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <PageHeader
        title="Diagnostic Report Portal"
        subtitle="Secure, authenticated access to your laboratory results and investigation histories."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Reports' },
        ]}
      />

      {/* Security & Access Banner */}
      <div className="mb-8 p-6 bg-[#171717] text-white border-2 border-[#171717] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#F5C542] flex items-center justify-center text-[#171717] shrink-0 font-bold">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="inline-block bg-[#E94B35] text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 mb-1">
              PATIENT CONFIDENTIALITY
            </div>
            <h4 className="font-heading font-black text-base text-white">Private & Encrypted Health Records</h4>
            <p className="text-xs text-neutral-300">
              In compliance with clinical privacy standards, diagnostic PDFs are accessible solely to authenticated patients.
            </p>
          </div>
        </div>

        {user ? (
          <Link to="/patient/reports">
            <Button className="bg-[#E94B35] hover:bg-[#d63f2a] text-white font-bold text-xs uppercase tracking-wider rounded-none h-11 px-5 border-2 border-[#E94B35] whitespace-nowrap">
              Open My Patient Reports <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button className="bg-[#E94B35] hover:bg-[#d63f2a] text-white font-bold text-xs uppercase tracking-wider rounded-none h-11 px-5 border-2 border-[#E94B35]">
                Log In to Download
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" className="border-2 border-neutral-700 bg-transparent text-white hover:bg-neutral-800 font-bold text-xs uppercase tracking-wider rounded-none h-11 px-4">
                Register
              </Button>
            </Link>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Booking Reference Status Lookup */}
        <div className="lg:col-span-7 space-y-6">
          <div className="border-2 border-[#171717] bg-white">
            <div className="p-4 bg-neutral-100 border-b-2 border-[#171717]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#E94B35]">Quick Verification</span>
              <h3 className="font-heading font-black text-base uppercase tracking-wider text-[#171717]">
                Check Sample & Booking Status
              </h3>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <p className="text-xs text-neutral-600 leading-relaxed">
                Have a booking reference number issued by Davis Pathology Lab? Enter it below to check current processing stage and report readiness.
              </p>

              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
                <Input
                  value={searchRef}
                  onChange={(e) => setSearchRef(e.target.value)}
                  placeholder="Enter Booking Reference (e.g. DPL-DEMO001)..."
                  className="h-12 text-xs font-bold uppercase rounded-none border-2 border-neutral-300 focus:border-[#171717]"
                />
                <Button type="submit" className="bg-[#171717] hover:bg-neutral-800 text-white font-bold h-12 px-6 rounded-none uppercase text-xs tracking-wider border-2 border-[#171717]">
                  <Search className="w-4 h-4 mr-2 text-[#F5C542]" />
                  Track Status
                </Button>
              </form>

              {/* Booking status result box */}
              {queriedRef && (
                <div className="mt-4 pt-4 border-t-2 border-neutral-200">
                  {isSearchingBooking ? (
                    <div className="text-xs text-neutral-500 py-4 text-center font-bold">
                      Searching laboratory records for {queriedRef}...
                    </div>
                  ) : bookingResult ? (
                    <div className="p-4 bg-neutral-50 border-2 border-[#171717] space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-neutral-200">
                        <span className="font-black text-[#171717] text-sm">
                          Ref: {bookingResult.booking_reference}
                        </span>
                        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase ${getStatusColor(bookingResult.status)}`}>
                          {getStatusLabel(bookingResult.status)}
                        </span>
                      </div>
                      <div className="text-xs text-neutral-600 grid grid-cols-2 gap-2">
                        <div>Patient: <strong className="text-[#171717]">{bookingResult.patient_name}</strong></div>
                        <div>Date: <strong className="text-[#171717]">{bookingResult.appointment_date}</strong></div>
                      </div>
                      <div className="pt-2 border-t border-neutral-200 flex items-center justify-between text-xs">
                        <span>Total: <strong className="text-[#E94B35] font-bold">{formatPrice(bookingResult.total_amount)}</strong></span>
                        {bookingResult.status === 'COMPLETED' ? (
                          <Link to="/login">
                            <span className="text-[#E94B35] font-bold underline uppercase text-[11px]">
                              Report Ready - Log in to download
                            </span>
                          </Link>
                        ) : (
                          <span className="text-amber-700 font-semibold italic text-[11px]">
                            Specimen under processing. Check back soon.
                          </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-red-50 text-[#E94B35] text-xs border border-red-300 font-semibold">
                      No booking found matching reference "{queriedRef}". Please verify the code printed on your receipt slip.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: How Report Access Works */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border-2 border-[#171717] bg-white">
            <div className="p-4 bg-neutral-100 border-b-2 border-[#171717]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#E94B35]">Protocol Workflow</span>
              <h3 className="font-heading font-black text-base uppercase tracking-wider text-[#171717]">
                How Online Reports Work
              </h3>
            </div>

            <div className="p-6 sm:p-8 space-y-5">
              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-[#171717] text-white font-black flex items-center justify-center shrink-0 text-xs">
                    1
                  </div>
                  <div>
                    <strong className="block text-[#171717] font-bold text-sm">Sample Collection & Analysis</strong>
                    <p className="text-neutral-600 mt-0.5 leading-relaxed">
                      Specimens are processed on calibrated clinical analyzers in our Agra lab following strict laboratory quality controls.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-[#171717] text-white font-black flex items-center justify-center shrink-0 text-xs">
                    2
                  </div>
                  <div>
                    <strong className="block text-[#171717] font-bold text-sm">Pathologist Verification</strong>
                    <p className="text-neutral-600 mt-0.5 leading-relaxed">
                      All clinical findings and abnormal values undergo systematic review and digital sign-off by diagnostic professionals.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 bg-[#E94B35] text-white font-black flex items-center justify-center shrink-0 text-xs">
                    3
                  </div>
                  <div>
                    <strong className="block text-[#171717] font-bold text-sm">Secure Digital Publishing</strong>
                    <p className="text-neutral-600 mt-0.5 leading-relaxed">
                      Authenticated PDF reports are instantly generated and accessible from your personal patient dashboard.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-neutral-100 border-l-4 border-[#F5C542] text-[11px] text-neutral-700 leading-relaxed">
                <strong>Physical Hard Copies:</strong> Stamped and signed paper reports are available at our reception counter at Shop No. 4, Millenium Complex, Bhagwan Talkies, Agra.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
