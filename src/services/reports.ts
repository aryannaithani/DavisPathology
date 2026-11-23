import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { Report } from '@/types';

let demoReports: Report[] = [
  {
    id: 'report-demo-1',
    patient_id: 'patient-demo-1',
    booking_id: 'booking-1',
    report_title: 'Complete Health Checkup Report',
    storage_path: 'reports/demo/sample-report-1.pdf',
    report_date: '2024-12-20',
    uploaded_by: 'admin-demo',
    is_published: true,
    created_at: '2024-12-20T14:30:00Z',
    patient: {
      id: 'patient-demo-1',
      full_name: 'Rajesh Kumar',
      email: 'rajesh.kumar@example.com',
      phone: '9876500001',
      role: 'patient',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    },
  },
  {
    id: 'report-demo-2',
    patient_id: 'patient-demo-2',
    booking_id: 'booking-4',
    report_title: 'Complete Blood Count (CBC) Report',
    storage_path: 'reports/demo/sample-report-2.pdf',
    report_date: '2024-12-24',
    uploaded_by: 'admin-demo',
    is_published: true,
    created_at: '2024-12-24T12:00:00Z',
    patient: {
      id: 'patient-demo-2',
      full_name: 'Priya Gupta',
      email: 'priya.gupta@example.com',
      phone: '9876500004',
      role: 'patient',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    },
  },
];

export async function getReports(): Promise<Report[]> {
  if (!isSupabaseConfigured) {
    return [...demoReports];
  }

  const { data, error } = await supabase
    .from('reports')
    .select('*, patient:profiles(*), booking:bookings(*)')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Report[];
}

export async function getPatientReports(patientId: string): Promise<Report[]> {
  if (!isSupabaseConfigured) {
    return demoReports.filter(r => r.is_published);
  }

  const { data, error } = await supabase
    .from('reports')
    .select('*, booking:bookings(*)')
    .eq('patient_id', patientId)
    .eq('is_published', true)
    .order('report_date', { ascending: false });

  if (error) throw error;
  return data as Report[];
}

export async function uploadReport(
  file: File,
  reportData: {
    patient_id: string;
    booking_id?: string | null;
    report_title: string;
    report_date: string;
    uploaded_by: string;
  }
): Promise<Report> {
  if (!isSupabaseConfigured) {
    const newReport: Report = {
      id: `report-demo-${Date.now()}`,
      patient_id: reportData.patient_id,
      booking_id: reportData.booking_id ?? null,
      report_title: reportData.report_title,
      storage_path: `reports/demo/${file.name}`,
      report_date: reportData.report_date,
      uploaded_by: reportData.uploaded_by,
      is_published: true,
      created_at: new Date().toISOString(),
      patient: {
        id: reportData.patient_id,
        full_name: 'Patient (Demo)',
        email: 'patient.demo@example.com',
        phone: '9876500000',
        role: 'patient',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    };
    demoReports.unshift(newReport);
    return newReport;
  }

  // Upload the file to Supabase storage
  const fileExt = file.name.split('.').pop();
  const filePath = `reports/${reportData.patient_id}/${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from('reports')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) throw uploadError;

  // Insert the report record
  const { data, error: insertError } = await supabase
    .from('reports')
    .insert({
      patient_id: reportData.patient_id,
      booking_id: reportData.booking_id ?? null,
      report_title: reportData.report_title,
      storage_path: filePath,
      report_date: reportData.report_date,
      uploaded_by: reportData.uploaded_by,
      is_published: false,
    })
    .select('*, patient:profiles(*), booking:bookings(*)')
    .single();

  if (insertError) throw insertError;
  return data as Report;
}

export async function publishReport(reportId: string): Promise<void> {
  if (!isSupabaseConfigured) {
    const r = demoReports.find(rep => rep.id === reportId);
    if (r) r.is_published = true;
    return;
  }

  const { error } = await supabase
    .from('reports')
    .update({ is_published: true })
    .eq('id', reportId);

  if (error) throw error;
}

export async function unpublishReport(reportId: string): Promise<void> {
  if (!isSupabaseConfigured) {
    const r = demoReports.find(rep => rep.id === reportId);
    if (r) r.is_published = false;
    return;
  }

  const { error } = await supabase
    .from('reports')
    .update({ is_published: false })
    .eq('id', reportId);

  if (error) throw error;
}

export async function getSignedReportUrl(storagePath: string): Promise<string> {
  if (!isSupabaseConfigured) {
    // Generate an in-memory sample medical report PDF/blob for demonstration
    const sampleContent = `%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Count 1/Kids[3 0 R]>>endobj\n3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R/Resources<<>>>>endobj\nxref\n0 4\n0000000000 65535 f \n0000000009 00000 n \n0000000052 00000 n \n0000000101 00000 n \ntrailer<</Size 4/Root 1 0 R>>\nstartxref\n178\n%%EOF`;
    const blob = new Blob([sampleContent], { type: 'application/pdf' });
    return URL.createObjectURL(blob);
  }

  const { data, error } = await supabase.storage
    .from('reports')
    .createSignedUrl(storagePath, 3600); // 1 hour expiry

  if (error) throw error;
  return data.signedUrl;
}
