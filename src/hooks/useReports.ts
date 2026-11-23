import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getReports,
  getPatientReports,
  uploadReport,
  publishReport,
  unpublishReport,
  getSignedReportUrl,
} from '@/services/reports';

export function useReports() {
  return useQuery({
    queryKey: ['reports'],
    queryFn: getReports,
  });
}

export function usePatientReports(patientId?: string) {
  return useQuery({
    queryKey: ['patient-reports', patientId],
    queryFn: () => (patientId ? getPatientReports(patientId) : Promise.resolve([])),
    enabled: Boolean(patientId),
  });
}

export function useUploadReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      file,
      reportData,
    }: {
      file: File;
      reportData: {
        patient_id: string;
        booking_id?: string | null;
        report_title: string;
        report_date: string;
        uploaded_by: string;
      };
    }) => uploadReport(file, reportData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      queryClient.invalidateQueries({ queryKey: ['patient-reports'] });
    },
  });
}

export function usePublishReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reportId: string) => publishReport(reportId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      queryClient.invalidateQueries({ queryKey: ['patient-reports'] });
    },
  });
}

export function useUnpublishReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (reportId: string) => unpublishReport(reportId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reports'] });
      queryClient.invalidateQueries({ queryKey: ['patient-reports'] });
    },
  });
}

export function useReportDownload() {
  return useMutation({
    mutationFn: (storagePath: string) => getSignedReportUrl(storagePath),
  });
}
