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
  UserCheck 
} from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
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
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <PageHeader
        title="Diagnostic Report Portal"
        subtitle="Secure, authenticated access to your laboratory results and investigation histories."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Reports' },
        ]}
      />

      {/* Security Banner */}
      <div className="mb-10 p-4 rounded-xl bg-neutral-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary shrink-0">
            <Lock className="w-5 h-5 text-secondary" />
          </div>
          <div>
            <h4 className="font-heading font-bold text-sm text-white">Private & Encrypted Medical Data</h4>
            <p className="text-xs text-neutral-300">
              Reports are stored in private encrypted storage and accessible solely to authenticated patients.
            </p>
          </div>
        </div>

        {user ? (
          <Link to="/patient/reports">
            <Button className="bg-primary hover:bg-primary-600 text-white font-semibold text-xs whitespace-nowrap">
              Open My Patient Reports <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login">
              <Button size="sm" className="bg-primary hover:bg-primary-600 text-white font-semibold text-xs">
                Log In to Download
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm" variant="outline" className="border-neutral-700 text-neutral-200 hover:text-white text-xs">
                Register
              </Button>
            </Link>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Side: Booking Reference Status Lookup */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="border-border shadow-xs">
            <CardContent className="p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="font-heading font-bold text-lg text-foreground">
                  Check Booking Status
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Have a booking reference number? Enter it below to check current sample status and report availability.
                </p>
              </div>

              <form onSubmit={handleSearch} className="flex gap-2">
                <Input
                  value={searchRef}
                  onChange={(e) => setSearchRef(e.target.value)}
                  placeholder="Enter Booking Reference (e.g. DPL-DEMO001)..."
                  className="h-11 text-sm bg-neutral-50 uppercase"
                />
                <Button type="submit" className="bg-primary hover:bg-primary-600 text-white font-semibold h-11 px-5">
                  <Search className="w-4 h-4 mr-2" />
                  Track
                </Button>
              </form>

              {/* Booking status result box */}
              {queriedRef && (
                <div className="mt-4 pt-4 border-t border-border">
                  {isSearchingBooking ? (
                    <div className="text-xs text-muted-foreground py-4 text-center">
                      Searching reference...
                    </div>
                  ) : bookingResult ? (
                    <div className="p-4 rounded-xl bg-neutral-50 border border-border space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-foreground text-sm">
                          Ref: {bookingResult.booking_reference}
                        </span>
                        <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${getStatusColor(bookingResult.status)}`}>
                          {getStatusLabel(bookingResult.status)}
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground grid grid-cols-2 gap-2">
                        <div>Patient: <strong className="text-foreground">{bookingResult.patient_name}</strong></div>
                        <div>Date: <strong className="text-foreground">{bookingResult.appointment_date}</strong></div>
                      </div>
                      <div className="pt-2 border-t border-border/80 flex items-center justify-between text-xs">
                        <span>Total: <strong>{formatPrice(bookingResult.total_amount)}</strong></span>
                        {bookingResult.status === 'COMPLETED' ? (
                          <Link to="/login">
                            <span className="text-primary font-bold hover:underline">
                              Report ready - Log in to download
                            </span>
                          </Link>
                        ) : (
                          <span className="text-amber-700 italic">
                            Sample under processing. Check back soon.
                          </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-destructive py-2">
                      No booking found matching reference "{queriedRef}". Please verify the code.
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Side: How Report Access Works */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="border-border shadow-xs bg-white">
            <CardContent className="p-6 sm:p-8 space-y-5">
              <h3 className="font-heading font-bold text-base text-foreground">
                How Online Reports Work
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0 text-xs">
                    1
                  </div>
                  <div>
                    <strong className="block text-foreground font-semibold">Sample Collection & Analysis</strong>
                    <p className="text-muted-foreground mt-0.5">
                      Specimens are processed on calibrated analyzers following strict laboratory protocols.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0 text-xs">
                    2
                  </div>
                  <div>
                    <strong className="block text-foreground font-semibold">Pathologist Verification</strong>
                    <p className="text-muted-foreground mt-0.5">
                      All clinical parameters and reference ranges are reviewed by diagnostic personnel.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0 text-xs">
                    3
                  </div>
                  <div>
                    <strong className="block text-foreground font-semibold">Secure Digital Publishing</strong>
                    <p className="text-muted-foreground mt-0.5">
                      Verified PDF reports are uploaded directly into your encrypted patient account for download.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-border">
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Need a physical printed copy? Hard copies of stamped reports are available at our reception counter at Shop No. 4, Millenium Complex, Agra.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
