import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CalendarDays, 
  FileText, 
  User, 
  PlusCircle, 
  Clock, 
  Download, 
  ArrowRight,
  ShieldCheck,
  AlertCircle 
} from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { usePatientBookings } from '@/hooks/useBookings';
import { usePatientReports, useReportDownload } from '@/hooks/useReports';
import { formatPrice, getStatusColor, getStatusLabel, formatDate } from '@/lib/utils';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export const PatientDashboardPage: React.FC = () => {
  const { user, profile } = useAuth();
  const { data: bookings = [], isLoading: isLoadingBookings } = usePatientBookings(user?.id);
  const { data: reports = [], isLoading: isLoadingReports } = usePatientReports(user?.id);
  const downloadMutation = useReportDownload();

  const handleDownload = async (storagePath: string, title: string) => {
    try {
      const url = await downloadMutation.mutateAsync(storagePath);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title.replace(/\s+/g, '_')}.pdf`;
      link.click();
    } catch (e) {
      console.error('Download error:', e);
    }
  };

  const pendingBookings = bookings.filter((b) => b.status === 'PENDING' || b.status === 'CONFIRMED');

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-[#171717] text-white border-2 border-[#171717] rounded-none p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-[3px_3px_0px_0px_#F1654C]">
        <div>
          <span className="text-[11px] font-bold text-secondary uppercase tracking-wider">
            Patient Portal
          </span>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-white mt-1">
            Welcome, {profile?.full_name || user?.email?.split('@')[0] || 'Patient'}
          </h1>
          <p className="text-neutral-300 text-xs sm:text-sm mt-1 max-w-xl">
            Track your laboratory booking appointments, check diagnostic status, and download authenticated test reports.
          </p>
        </div>

        <Link to="/book-appointment">
          <Button className="bg-[#F1654C] hover:bg-[#DF472B] text-white font-bold text-xs uppercase tracking-wider rounded-none h-11 px-5 border border-[#171717] gap-2 whitespace-nowrap shadow-[2px_2px_0px_0px_#F5C542]">
            <PlusCircle className="w-4 h-4" />
            Book New Investigation
          </Button>
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border-2 border-[#171717] border-t-4 border-t-[#F1654C] p-6 flex items-center justify-between shadow-[3px_3px_0px_0px_#171717]">
          <div>
            <span className="text-xs text-neutral-500 font-bold uppercase tracking-wider">
              Active Bookings
            </span>
            <div className="font-heading font-black text-2xl sm:text-3xl text-[#171717] mt-1">
              {pendingBookings.length}
            </div>
          </div>
          <div className="w-12 h-12 bg-[#F1654C]/15 border border-[#F1654C] flex items-center justify-center text-[#F1654C]">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border-2 border-[#171717] border-t-4 border-t-[#F5C542] p-6 flex items-center justify-between shadow-[3px_3px_0px_0px_#171717]">
          <div>
            <span className="text-xs text-neutral-500 font-bold uppercase tracking-wider">
              Total Bookings
            </span>
            <div className="font-heading font-black text-2xl sm:text-3xl text-[#171717] mt-1">
              {bookings.length}
            </div>
          </div>
          <div className="w-12 h-12 bg-[#F5C542]/20 border border-[#F5C542] flex items-center justify-center text-[#171717]">
            <CalendarDays className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white border-2 border-[#171717] border-t-4 border-t-[#171717] p-6 flex items-center justify-between shadow-[3px_3px_0px_0px_#171717]">
          <div>
            <span className="text-xs text-neutral-500 font-bold uppercase tracking-wider">
              Available Reports
            </span>
            <div className="font-heading font-black text-2xl sm:text-3xl text-[#171717] mt-1">
              {reports.length}
            </div>
          </div>
          <div className="w-12 h-12 bg-[#171717] text-[#F5C542] flex items-center justify-center">
            <FileText className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Two Columns: Recent Bookings & Ready Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Bookings (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-bold text-lg text-foreground">
              Recent Appointments
            </h2>
            <Link to="/patient/bookings" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {isLoadingBookings ? (
            <div className="p-8 text-center bg-white border border-border">
              <LoadingSpinner size="sm" text="Loading appointments..." />
            </div>
          ) : bookings.length === 0 ? (
            <Card className="border-border">
              <CardContent className="p-8 text-center space-y-3">
                <CalendarDays className="w-10 h-10 text-muted-foreground mx-auto" />
                <h4 className="font-semibold text-foreground text-sm">No Appointments Yet</h4>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  You haven't scheduled any diagnostic tests or health packages.
                </p>
                <Link to="/book-appointment">
                  <Button size="sm" className="bg-primary text-white text-xs mt-2">
                    Schedule Now
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {bookings.slice(0, 4).map((booking) => (
                <Card key={booking.id} className="border-border hover:shadow-xs transition-shadow">
                  <CardContent className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground text-sm">
                          {booking.booking_reference}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getStatusColor(booking.status)}`}>
                          {getStatusLabel(booking.status)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Date: <strong className="text-foreground">{booking.appointment_date}</strong> at {booking.appointment_time}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {booking.collection_method === 'home_collection' ? 'Home Collection' : 'Lab Walk-in'} • {formatPrice(booking.total_amount)}
                      </p>
                    </div>

                    <Link to="/patient/bookings">
                      <Button variant="outline" size="sm" className="text-xs">
                        Details
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Download Ready Reports (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading font-bold text-lg text-foreground">
              Ready Diagnostic Reports
            </h2>
            <Link to="/patient/reports" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {isLoadingReports ? (
            <div className="p-8 text-center bg-white border border-border">
              <LoadingSpinner size="sm" text="Checking for reports..." />
            </div>
          ) : reports.length === 0 ? (
            <Card className="border-border">
              <CardContent className="p-8 text-center space-y-3">
                <FileText className="w-10 h-10 text-muted-foreground mx-auto" />
                <h4 className="font-semibold text-foreground text-sm">No Reports Published Yet</h4>
                <p className="text-xs text-muted-foreground">
                  Once your blood samples are collected and verified by the pathologist, your digital PDF report will appear here.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {reports.slice(0, 3).map((rep) => (
                <Card key={rep.id} className="border-border hover:shadow-xs transition-shadow">
                  <CardContent className="p-4 flex items-center justify-between gap-3">
                    <div className="space-y-1 truncate pr-2">
                      <h4 className="font-semibold text-xs text-foreground truncate">
                        {rep.report_title}
                      </h4>
                      <p className="text-[11px] text-muted-foreground">
                        Dated: {formatDate(rep.report_date)}
                      </p>
                    </div>

                    <Button
                      size="sm"
                      onClick={() => handleDownload(rep.storage_path, rep.report_title)}
                      className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs shrink-0 gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
