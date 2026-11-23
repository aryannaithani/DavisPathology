import React, { useState } from 'react';
import { 
  CalendarDays, 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  Clock, 
  XCircle, 
  FlaskConical, 
  FileCheck,
  Download,
  AlertTriangle 
} from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useBookings, useUpdateBookingStatus } from '@/hooks/useBookings';
import { useAuth } from '@/contexts/AuthContext';
import { formatPrice, getStatusColor, getStatusLabel } from '@/lib/utils';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { useToast } from '@/components/ui/use-toast';
import type { Booking, BookingStatus } from '@/types';

export const AdminBookingsPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { data: bookings = [], isLoading } = useBookings();
  const updateStatusMutation = useUpdateBookingStatus();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [statusModalBooking, setStatusModalBooking] = useState<{
    booking: Booking;
    newStatus: BookingStatus;
  } | null>(null);

  const statuses: BookingStatus[] = [
    'PENDING',
    'CONFIRMED',
    'SAMPLE_COLLECTED',
    'PROCESSING',
    'COMPLETED',
    'CANCELLED',
  ];

  const filteredBookings = bookings.filter((b) => {
    // Status filter
    if (statusFilter !== 'ALL' && b.status !== statusFilter) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesRef = b.booking_reference.toLowerCase().includes(q);
      const matchesName = b.patient_name.toLowerCase().includes(q);
      const matchesPhone = b.phone.includes(q);
      if (!matchesRef && !matchesName && !matchesPhone) {
        return false;
      }
    }
    return true;
  });

  const handleConfirmStatusChange = async () => {
    if (!statusModalBooking) return;
    try {
      await updateStatusMutation.mutateAsync({
        bookingId: statusModalBooking.booking.id,
        newStatus: statusModalBooking.newStatus,
        changedBy: user?.id || 'admin',
      });

      toast({
        title: 'Status Updated',
        description: `Booking ${statusModalBooking.booking.booking_reference} status updated to ${getStatusLabel(statusModalBooking.newStatus)}.`,
      });

      setStatusModalBooking(null);
      if (selectedBooking && selectedBooking.id === statusModalBooking.booking.id) {
        setSelectedBooking({ ...selectedBooking, status: statusModalBooking.newStatus });
      }
    } catch (err: unknown) {
      toast({
        variant: 'destructive',
        title: 'Update Failed',
        description: err instanceof Error ? err.message : 'Could not change status.',
      });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manage Patient Bookings"
        subtitle="Review booking requests, schedule sample collections, and advance clinical workflows."
      />

      {/* Filters bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by Reference, Patient Name, or Mobile..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-10 text-xs bg-white"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <button
            onClick={() => setStatusFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              statusFilter === 'ALL'
                ? 'bg-neutral-900 text-white'
                : 'bg-white border border-border text-foreground/80 hover:bg-neutral-100'
            }`}
          >
            All ({bookings.length})
          </button>
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === st
                  ? 'bg-neutral-900 text-white'
                  : 'bg-white border border-border text-foreground/80 hover:bg-neutral-100'
              }`}
            >
              {getStatusLabel(st)}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="py-20 flex justify-center">
          <LoadingSpinner text="Fetching bookings database..." />
        </div>
      ) : filteredBookings.length === 0 ? (
        <Card className="border-border p-12 text-center text-xs text-muted-foreground">
          No bookings match the selected filters.
        </Card>
      ) : (
        <Card className="border-border shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-100 border-b border-border text-neutral-600 font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Booking Ref</th>
                  <th className="py-3 px-4">Patient Details</th>
                  <th className="py-3 px-4">Scheduled Slot</th>
                  <th className="py-3 px-4">Preference</th>
                  <th className="py-3 px-4">Fee Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Workflow Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-neutral-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-foreground">
                      {b.booking_reference}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-foreground">{b.patient_name}</div>
                      <div className="text-[11px] text-muted-foreground">{b.phone} • {b.age}y/{b.gender[0]?.toUpperCase()}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="text-foreground font-medium">{b.appointment_date}</div>
                      <div className="text-[11px] text-muted-foreground">{b.appointment_time}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant="outline" className="text-[10px]">
                        {b.collection_method === 'home_collection' ? 'Home Visit' : 'Walk-in'}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-foreground">
                      {formatPrice(b.total_amount)}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${getStatusColor(b.status)}`}>
                        {getStatusLabel(b.status)}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right space-x-1 whitespace-nowrap">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedBooking(b)}
                        className="text-xs h-8 px-2"
                      >
                        <Eye className="w-3.5 h-3.5 mr-1" />
                        Details
                      </Button>

                      {/* Quick Next Status Trigger */}
                      {b.status === 'PENDING' && (
                        <Button
                          size="sm"
                          onClick={() => setStatusModalBooking({ booking: b, newStatus: 'CONFIRMED' })}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] h-8 px-2.5"
                        >
                          Confirm
                        </Button>
                      )}
                      {b.status === 'CONFIRMED' && (
                        <Button
                          size="sm"
                          onClick={() => setStatusModalBooking({ booking: b, newStatus: 'SAMPLE_COLLECTED' })}
                          className="bg-purple-600 hover:bg-purple-700 text-white text-[11px] h-8 px-2.5"
                        >
                          Collect Sample
                        </Button>
                      )}
                      {b.status === 'SAMPLE_COLLECTED' && (
                        <Button
                          size="sm"
                          onClick={() => setStatusModalBooking({ booking: b, newStatus: 'PROCESSING' })}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] h-8 px-2.5"
                        >
                          Process
                        </Button>
                      )}
                      {b.status === 'PROCESSING' && (
                        <Button
                          size="sm"
                          onClick={() => setStatusModalBooking({ booking: b, newStatus: 'COMPLETED' })}
                          className="bg-green-600 hover:bg-green-700 text-white text-[11px] h-8 px-2.5"
                        >
                          Mark Complete
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Details Dialog */}
      <Dialog open={Boolean(selectedBooking)} onOpenChange={(open) => !open && setSelectedBooking(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-heading text-lg">
              Booking Management: {selectedBooking?.booking_reference}
            </DialogTitle>
          </DialogHeader>

          {selectedBooking && (
            <div className="space-y-4 text-xs pt-2">
              <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 border border-border">
                <div>
                  <span className="text-[10px] uppercase text-muted-foreground font-semibold block">Workflow Status</span>
                  <span className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-bold mt-1 ${getStatusColor(selectedBooking.status)}`}>
                    {getStatusLabel(selectedBooking.status)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase text-muted-foreground font-semibold block">Created At</span>
                  <span className="font-semibold text-foreground text-xs mt-1 block">
                    {new Date(selectedBooking.created_at).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-white rounded-lg border border-border">
                <div>
                  <span className="text-muted-foreground">Patient:</span>
                  <p className="font-bold text-foreground">{selectedBooking.patient_name} ({selectedBooking.age} yrs, {selectedBooking.gender})</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Contact Phone:</span>
                  <p className="font-bold text-foreground">{selectedBooking.phone}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Date:</span>
                  <p className="font-bold text-foreground">{selectedBooking.appointment_date}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Time Slot:</span>
                  <p className="font-bold text-foreground">{selectedBooking.appointment_time}</p>
                </div>
              </div>

              {selectedBooking.notes && (
                <div className="p-3 bg-neutral-50 rounded-lg border border-border">
                  <span className="text-muted-foreground font-semibold block mb-0.5">Notes / Address:</span>
                  <p className="text-foreground">{selectedBooking.notes}</p>
                </div>
              )}

              {/* Items Snapshot */}
              <div className="border border-border rounded-lg overflow-hidden">
                <div className="bg-neutral-100 p-2.5 font-semibold text-foreground border-b border-border">
                  Ordered Investigations ({selectedBooking.booking_items?.length || 0})
                </div>
                <div className="p-3 space-y-1.5">
                  {selectedBooking.booking_items?.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-xs">
                      <span>{item.item_name}</span>
                      <strong className="text-foreground">{formatPrice(item.item_price)}</strong>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-border flex justify-between font-bold text-sm">
                    <span>Total Fee:</span>
                    <span className="text-primary">{formatPrice(selectedBooking.total_amount)}</span>
                  </div>
                </div>
              </div>

              {/* Status Update Buttons */}
              <div className="pt-2 border-t border-border space-y-2">
                <span className="text-[10px] uppercase font-bold text-muted-foreground block">
                  Advance Status Manually:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {statuses.map((st) => (
                    <Button
                      key={st}
                      variant="outline"
                      size="sm"
                      disabled={selectedBooking.status === st}
                      onClick={() => setStatusModalBooking({ booking: selectedBooking, newStatus: st })}
                      className="text-[10px] h-7 px-2"
                    >
                      {getStatusLabel(st)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Status Confirmation Modal */}
      <Dialog open={Boolean(statusModalBooking)} onOpenChange={(open) => !open && setStatusModalBooking(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-base">
              Confirm Status Change
            </DialogTitle>
          </DialogHeader>
          <div className="py-3 text-xs text-muted-foreground space-y-2">
            <p>
              Are you sure you want to change the status of booking{' '}
              <strong className="text-foreground">{statusModalBooking?.booking.booking_reference}</strong> to{' '}
              <strong className="text-foreground">{statusModalBooking && getStatusLabel(statusModalBooking.newStatus)}</strong>?
            </p>
            <p className="text-[11px] text-amber-700 bg-amber-50 p-2 rounded border border-amber-200">
              This transition will be recorded in the status audit log.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" size="sm" onClick={() => setStatusModalBooking(null)}>
              Cancel
            </Button>
            <Button
              size="sm"
              disabled={updateStatusMutation.isPending}
              onClick={handleConfirmStatusChange}
              className="bg-primary hover:bg-primary-600 text-white"
            >
              {updateStatusMutation.isPending ? 'Updating...' : 'Confirm Change'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
