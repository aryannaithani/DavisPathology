import React from 'react';
import { 
  FileText, 
  Download, 
  Calendar, 
  ShieldCheck, 
  Lock, 
  AlertTriangle 
} from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { usePatientReports, useReportDownload } from '@/hooks/useReports';
import { formatDate } from '@/lib/utils';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { EmptyState } from '@/components/common/EmptyState';

export const PatientReportsPage: React.FC = () => {
  const { user } = useAuth();
  const { data: reports = [], isLoading } = usePatientReports(user?.id);
  const downloadMutation = useReportDownload();

  const handleDownload = async (storagePath: string, title: string) => {
    try {
      const signedUrl = await downloadMutation.mutateAsync(storagePath);
      const link = document.createElement('a');
      link.href = signedUrl;
      link.download = `${title.replace(/\s+/g, '_')}.pdf`;
      link.click();
    } catch (e) {
      console.error('Failed to download report:', e);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Diagnostic Pathology Reports"
        subtitle="Download authenticated, verified PDF reports for your clinical records."
      />

      {/* Security notice */}
      <div className="p-4 rounded-xl bg-neutral-900 text-white flex items-start gap-3 text-xs border border-neutral-800">
        <Lock className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
        <div>
          <strong className="text-secondary font-semibold">Strict Confidentiality:</strong> All laboratory investigation files are encrypted in private storage. Downloads are authorized solely through authenticated temporary signed tokens.
        </div>
      </div>

      {isLoading ? (
        <div className="py-20 flex justify-center">
          <LoadingSpinner text="Fetching your reports..." />
        </div>
      ) : reports.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No Published Reports Available"
          description="Your sample investigations are either in progress or pending collection. When testing is verified by the pathologist, your downloadable reports will appear here."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((report) => (
            <Card key={report.id} className="border-border hover:shadow-md transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <Badge variant="outline" className="text-[10px] bg-green-50 text-green-700 border-green-200 font-bold">
                      VERIFIED & PUBLISHED
                    </Badge>
                    <h3 className="font-heading font-bold text-base text-foreground mt-1">
                      {report.report_title}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                </div>

                <div className="text-xs text-muted-foreground space-y-1 pt-2 border-t border-border">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-secondary" />
                    <span>Report Date: <strong className="text-foreground">{formatDate(report.report_date)}</strong></span>
                  </div>
                  {report.booking && (
                    <div>
                      Reference: <strong className="text-foreground">{report.booking.booking_reference}</strong>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <Button
                    onClick={() => handleDownload(report.storage_path, report.report_title)}
                    className="w-full bg-primary hover:bg-primary-600 text-white font-semibold text-xs gap-2 h-10"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
