import React, { useState } from 'react';
import { 
  FileText, 
  UploadCloud, 
  CheckCircle2, 
  Download, 
  Trash2, 
  Eye, 
  ShieldCheck,
  AlertTriangle 
} from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { 
  useReports, 
  useUploadReport, 
  usePublishReport, 
  useUnpublishReport, 
  useReportDownload 
} from '@/hooks/useReports';
import { useBookings } from '@/hooks/useBookings';
import { useAuth } from '@/contexts/AuthContext';
import { formatDate } from '@/lib/utils';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { useToast } from '@/components/ui/use-toast';
import type { Report } from '@/types';

export const AdminReportsPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { data: reports = [], isLoading } = useReports();
  const { data: bookings = [] } = useBookings();

  const uploadReportMutation = useUploadReport();
  const publishMutation = usePublishReport();
  const unpublishMutation = useUnpublishReport();
  const downloadMutation = useReportDownload();

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [reportTitle, setReportTitle] = useState('');
  const [selectedBookingId, setSelectedBookingId] = useState('');
  const [reportDate, setReportDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast({
          variant: 'destructive',
          title: 'Invalid File',
          description: 'Only PDF format reports are permitted for clinical validation.',
        });
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast({
          variant: 'destructive',
          title: 'File Too Large',
          description: 'Report PDF must be under 10MB.',
        });
        return;
      }
      setSelectedFile(file);
      if (!reportTitle) {
        setReportTitle(file.name.replace(/\.pdf$/i, ''));
      }
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast({ variant: 'destructive', title: 'File Required', description: 'Please select a PDF report.' });
      return;
    }
    if (!reportTitle.trim()) {
      toast({ variant: 'destructive', title: 'Title Required', description: 'Please enter a report title.' });
      return;
    }

    try {
      await uploadReportMutation.mutateAsync({
        file: selectedFile,
        reportData: {
          patient_id: 'patient-demo-1',
          booking_id: selectedBookingId || null,
          report_title: reportTitle.trim(),
          report_date: reportDate || (new Date().toISOString().split('T')[0] as string),
          uploaded_by: user?.id || 'admin',
        },
      });

      toast({
        title: 'Report Uploaded Successfully',
        description: 'The diagnostic report has been stored securely and is ready for publishing.',
      });

      setIsUploadModalOpen(false);
      setSelectedFile(null);
      setReportTitle('');
    } catch (err: unknown) {
      toast({
        variant: 'destructive',
        title: 'Upload Failed',
        description: err instanceof Error ? err.message : 'Could not upload report.',
      });
    }
  };

  const handleTogglePublish = async (rep: Report) => {
    try {
      if (rep.is_published) {
        await unpublishMutation.mutateAsync(rep.id);
        toast({ title: 'Report Revoked', description: 'Report unpublished from patient access.' });
      } else {
        await publishMutation.mutateAsync(rep.id);
        toast({ title: 'Report Published', description: 'Patient can now view and download this report.' });
      }
    } catch (err) {
      toast({ variant: 'destructive', title: 'Action failed' });
    }
  };

  const handleDownload = async (storagePath: string, title: string) => {
    try {
      const url = await downloadMutation.mutateAsync(storagePath);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title.replace(/\s+/g, '_')}.pdf`;
      a.click();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <PageHeader
          title="Diagnostic Report Management"
          subtitle="Publish verified laboratory investigation PDFs to patient accounts with signed access."
          className="mb-0 pb-0 border-b-0"
        />
        <Button onClick={() => setIsUploadModalOpen(true)} className="bg-primary hover:bg-primary-600 text-white text-xs gap-1.5 font-bold">
          <UploadCloud className="w-4 h-4" />
          Upload New Report
        </Button>
      </div>

      {/* Security alert */}
      <div className="p-3.5 rounded-xl bg-neutral-900 text-white text-xs border border-neutral-800 flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-secondary shrink-0" />
        <span>All diagnostic uploads are validated for file structure and stored in a private Supabase Storage bucket.</span>
      </div>

      {isLoading ? (
        <div className="py-20 flex justify-center">
          <LoadingSpinner text="Fetching laboratory reports..." />
        </div>
      ) : reports.length === 0 ? (
        <Card className="border-border p-12 text-center text-xs text-muted-foreground">
          No reports currently uploaded. Click "Upload New Report" to add verified results.
        </Card>
      ) : (
        <Card className="border-border shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-100 border-b border-border text-neutral-600 font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Report Title</th>
                  <th className="py-3 px-4">Patient Name</th>
                  <th className="py-3 px-4">Report Date</th>
                  <th className="py-3 px-4">Publish Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {reports.map((rep) => (
                  <tr key={rep.id} className="hover:bg-neutral-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-foreground">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-primary shrink-0" />
                        <span>{rep.report_title}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-muted-foreground font-medium">
                      {rep.patient?.full_name || 'Patient'}
                    </td>
                    <td className="py-3.5 px-4 text-muted-foreground">
                      {formatDate(rep.report_date)}
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge
                        variant="outline"
                        className={`text-[10px] ${
                          rep.is_published
                            ? 'bg-green-100 text-green-800 border-green-200'
                            : 'bg-yellow-100 text-yellow-800 border-yellow-200'
                        }`}
                      >
                        {rep.is_published ? 'Published' : 'Draft / Unpublished'}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1 whitespace-nowrap">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTogglePublish(rep)}
                        className="text-[11px] h-8 px-2"
                      >
                        {rep.is_published ? 'Revoke' : 'Publish'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownload(rep.storage_path, rep.report_title)}
                        className="text-[11px] h-8 px-2 text-primary"
                      >
                        <Download className="w-3.5 h-3.5 mr-1" />
                        Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Upload Modal */}
      <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-lg">
              Upload Diagnostic PDF Report
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs pt-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Report Title *</Label>
              <Input
                placeholder="e.g. Complete Blood Count (CBC) Report"
                value={reportTitle}
                onChange={(e) => setReportTitle(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Associate With Booking (Optional)</Label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xs"
                value={selectedBookingId}
                onChange={(e) => setSelectedBookingId(e.target.value)}
              >
                <option value="">-- No specific booking --</option>
                {bookings.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.booking_reference} - {b.patient_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Report Date *</Label>
              <Input
                type="date"
                value={reportDate}
                onChange={(e) => setReportDate(e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Select PDF Document *</Label>
              <Input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
              />
              <p className="text-[10px] text-muted-foreground">PDF only, maximum size 10MB.</p>
            </div>

            <DialogFooter className="pt-3 border-t border-border">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsUploadModalOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={uploadReportMutation.isPending || !selectedFile}
                className="bg-primary hover:bg-primary-600 text-white font-bold"
              >
                {uploadReportMutation.isPending ? 'Uploading...' : 'Confirm Upload'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
