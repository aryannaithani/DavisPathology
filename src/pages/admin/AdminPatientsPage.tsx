import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Eye, 
  Calendar, 
  FileText, 
  Mail, 
  Phone,
  ShieldAlert,
  UserCheck 
} from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useBookings } from '@/hooks/useBookings';
import { useReports } from '@/hooks/useReports';
import { formatDate } from '@/lib/utils';
import type { Profile } from '@/types';

// Demonstration patients
const demoPatients: Profile[] = [
  {
    id: 'patient-demo-1',
    full_name: 'Rajesh Kumar (Demo)',
    phone: '9876500001',
    email: 'demo.rajesh@example.com',
    role: 'patient',
    created_at: '2024-01-10T10:00:00Z',
    updated_at: '2024-01-10T10:00:00Z',
  },
  {
    id: 'patient-demo-2',
    full_name: 'Sunita Sharma (Demo)',
    phone: '9876500002',
    email: 'demo.sunita@example.com',
    role: 'patient',
    created_at: '2024-01-15T12:00:00Z',
    updated_at: '2024-01-15T12:00:00Z',
  },
  {
    id: 'patient-demo-3',
    full_name: 'Amit Verma (Demo)',
    phone: '9876500003',
    email: 'demo.amit@example.com',
    role: 'patient',
    created_at: '2024-02-01T08:30:00Z',
    updated_at: '2024-02-01T08:30:00Z',
  },
  {
    id: 'patient-demo-4',
    full_name: 'Priya Gupta (Demo)',
    phone: '9876500004',
    email: 'demo.priya@example.com',
    role: 'patient',
    created_at: '2024-02-18T14:20:00Z',
    updated_at: '2024-02-18T14:20:00Z',
  },
];

export const AdminPatientsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Profile | null>(null);

  const { data: bookings = [] } = useBookings();
  const { data: reports = [] } = useReports();

  const filtered = demoPatients.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return p.full_name.toLowerCase().includes(q) || p.email.toLowerCase().includes(q) || p.phone.includes(q);
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Registered Patients Directory"
        subtitle="Manage verified patient accounts, diagnostic histories, and report records."
      />

      <div className="max-w-md">
        <Input
          placeholder="Search by patient name, email, or mobile..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-white h-10 text-xs"
        />
      </div>

      <Card className="border-border shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-100 border-b border-border text-neutral-600 font-semibold uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Patient Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Registered Date</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((patient) => (
                <tr key={patient.id} className="hover:bg-neutral-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-foreground">
                    {patient.full_name}
                  </td>
                  <td className="py-3.5 px-4 text-muted-foreground">
                    {patient.email}
                  </td>
                  <td className="py-3.5 px-4 text-muted-foreground font-mono">
                    +91 {patient.phone}
                  </td>
                  <td className="py-3.5 px-4 text-muted-foreground">
                    {formatDate(patient.created_at)}
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant="outline" className="text-[10px] bg-neutral-50">
                      {patient.role}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedPatient(patient)}
                      className="text-xs h-8 px-2"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1" />
                      View Profile
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Patient Detail Modal */}
      <Dialog open={Boolean(selectedPatient)} onOpenChange={(open) => !open && setSelectedPatient(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-heading text-lg">
              Patient Record: {selectedPatient?.full_name}
            </DialogTitle>
          </DialogHeader>

          {selectedPatient && (
            <div className="space-y-4 text-xs pt-2">
              <div className="p-3 bg-neutral-50 rounded-lg border border-border grid grid-cols-2 gap-3">
                <div>
                  <span className="text-muted-foreground block text-[10px] font-semibold uppercase">Email</span>
                  <span className="font-medium text-foreground">{selectedPatient.email}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px] font-semibold uppercase">Mobile</span>
                  <span className="font-medium text-foreground">+91 {selectedPatient.phone}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px] font-semibold uppercase">Member Since</span>
                  <span className="font-medium text-foreground">{formatDate(selectedPatient.created_at)}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px] font-semibold uppercase">Role</span>
                  <Badge variant="outline" className="text-[10px] mt-0.5">{selectedPatient.role}</Badge>
                </div>
              </div>

              {/* Associated Bookings */}
              <div>
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  Appointment History
                </h4>
                <div className="p-3 bg-white rounded-lg border border-border text-muted-foreground">
                  Booking history records for this patient are linked directly via the bookings management table.
                </div>
              </div>

              {/* Associated Reports */}
              <div>
                <h4 className="font-semibold text-foreground mb-2 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-secondary" />
                  Diagnostic Reports
                </h4>
                <div className="p-3 bg-white rounded-lg border border-border text-muted-foreground">
                  Published reports for this patient can be reviewed in the Diagnostic Reports module.
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
