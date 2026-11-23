import React, { useState, useEffect } from 'react';
import { 
  MessageSquareQuote, 
  Mail, 
  Phone, 
  Calendar, 
  CheckCircle2, 
  Eye, 
  Clock 
} from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { getContactEnquiries, markEnquiryRead } from '@/services/contact';
import { formatDate } from '@/lib/utils';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { useToast } from '@/components/ui/use-toast';
import type { ContactEnquiry } from '@/types';

export const AdminContactEnquiriesPage: React.FC = () => {
  const { toast } = useToast();
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<ContactEnquiry | null>(null);

  useEffect(() => {
    loadEnquiries();
  }, []);

  const loadEnquiries = async () => {
    try {
      const data = await getContactEnquiries();
      setEnquiries(data);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDetail = async (enquiry: ContactEnquiry) => {
    setSelectedEnquiry(enquiry);
    if (!enquiry.is_read) {
      try {
        await markEnquiryRead(enquiry.id);
        setEnquiries((prev) =>
          prev.map((e) => (e.id === enquiry.id ? { ...e, is_read: true } : e))
        );
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Public Contact Enquiries"
        subtitle="Manage inquiries submitted through the website contact form."
      />

      {isLoading ? (
        <div className="py-20 flex justify-center">
          <LoadingSpinner text="Loading enquiries..." />
        </div>
      ) : enquiries.length === 0 ? (
        <Card className="border-border p-12 text-center text-xs text-muted-foreground">
          No contact enquiries submitted yet.
        </Card>
      ) : (
        <Card className="border-border shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-100 border-b border-border text-neutral-600 font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Sender</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">Phone</th>
                  <th className="py-3 px-4">Date Received</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {enquiries.map((enq) => (
                  <tr
                    key={enq.id}
                    className={`transition-colors hover:bg-neutral-50/80 ${
                      !enq.is_read ? 'bg-primary/5 font-medium' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-foreground">{enq.name}</div>
                      <div className="text-[11px] text-muted-foreground">{enq.email}</div>
                    </td>
                    <td className="py-3.5 px-4 text-foreground max-w-xs truncate">
                      {enq.subject}
                    </td>
                    <td className="py-3.5 px-4 text-muted-foreground font-mono">
                      +91 {enq.phone}
                    </td>
                    <td className="py-3.5 px-4 text-muted-foreground">
                      {formatDate(enq.created_at)}
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge
                        variant="outline"
                        className={`text-[10px] ${
                          enq.is_read
                            ? 'bg-neutral-100 text-neutral-600'
                            : 'bg-primary/10 text-primary border-primary/30 font-bold'
                        }`}
                      >
                        {enq.is_read ? 'Read' : 'New Unread'}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenDetail(enq)}
                        className="text-xs h-8 px-2"
                      >
                        <Eye className="w-3.5 h-3.5 mr-1" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Message Modal */}
      <Dialog open={Boolean(selectedEnquiry)} onOpenChange={(open) => !open && setSelectedEnquiry(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-lg">
              Enquiry: {selectedEnquiry?.subject}
            </DialogTitle>
          </DialogHeader>

          {selectedEnquiry && (
            <div className="space-y-4 text-xs pt-2">
              <div className="p-3 bg-neutral-50 rounded-lg border border-border space-y-1">
                <div>From: <strong className="text-foreground">{selectedEnquiry.name}</strong></div>
                <div>Email: <a href={`mailto:${selectedEnquiry.email}`} className="text-primary hover:underline">{selectedEnquiry.email}</a></div>
                <div>Mobile: <a href={`tel:${selectedEnquiry.phone}`} className="text-primary font-mono hover:underline">+91 {selectedEnquiry.phone}</a></div>
                <div>Date: <span className="text-muted-foreground">{new Date(selectedEnquiry.created_at).toLocaleString()}</span></div>
              </div>

              <div>
                <span className="text-muted-foreground font-semibold block mb-1">Message Content:</span>
                <div className="p-3 bg-white rounded-lg border border-border leading-relaxed text-foreground whitespace-pre-wrap">
                  {selectedEnquiry.message}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
