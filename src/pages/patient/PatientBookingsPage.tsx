import React, { useState } from 'react';
import { 
  CalendarDays, 
  Search, 
  Eye, 
  MapPin, 
  Home, 
  Receipt, 
  Clock, 
  CheckCircle2, 
  X 
} from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContext';
import { usePatientBookings } from '@/hooks/useBookings';
import { formatPrice, getStatusColor, getStatusLabel } from '@/lib/utils';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { EmptyState } from '@/components/common/EmptyState';
import type { Booking } from '@/types';

export const PatientBookingsPage: React.FC = () => {
  const { user } = useAuth();
  const { data: bookings = [], isLoading } = usePatientBookings(user?.id);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = bookings.filter((b) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      b.booking_reference.toLowerCase().includes(q) ||
      b.patient_name.toLowerCase().includes(q) ||
      b.status.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Diagnostic Appointments"
        subtitle="Review your historical investigations, current appointment statuses, and test receipts."
      />

      {/* Filter Bar */}
      <div className="max-w-md">
        <Input
          placeholder="Filter by booking reference (e.g. DPL-)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-white h-10 text-xs"
        />
      </div>

      {isLoading ? (
        <div className="py-20 flex justify-center">
          <LoadingSpinner text="Loading appointment history..." />
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No Appointments Found"
          description={
            searchQuery
              ? `No bookings matched "${searchQuery}".`
              : "You have not placed any test appointments yet."
          }
        />
      ) : (
        <div className="space-y-4">
          {filtered.map((booking) => (
            <Card key={booking.id} className="border-border hover:shadow-xs transition-shadow">
              <CardContent className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-heading font-extrabold text-sm text-foreground">
                      {booking.booking_reference}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${getStatusColor(booking.status)}`}>
                      {getStatusLabel(booking.status)}
                    </span>
                  </div>

                  <div className="text-xs text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span>Patient: <strong className="text-foreground">{booking.patient_name}</strong> ({booking.age} yrs, {booking.gender})</span>
                    <span>Date: <strong className="text-foreground">{booking.appointment_date}</strong> at {booking.appointment_time}</span>
                    <span>Preference: <strong className="text-foreground">{booking.collection_method === 'home_collection' ? 'Home Collection' : 'Lab Walk-in'}</strong></span>
                  </div>

                  {booking.booking_items && booking.booking_items.length > 0 && (
                    <div className="text-[11px] text-muted-foreground line-clamp-1 pt-1">
                      Tests: {booking.booking_items.map((i) => i.item_name).join(', ')}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-border">
                  <div className="text-right">
                    <span className="text-[10px] text-muted-foreground uppercase block font-semibold">Total Fee</span>
                    <span className="font-bold text-foreground text-sm">{formatPrice(booking.total_amount)}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedBooking(booking)}
                    className="text-xs gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Booking Detail Dialog */}
      <Dialog open={Boolean(selectedBooking)} onOpenChange={(open) => !open && setSelectedBooking(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-heading text-lg">
              Appointment Summary: {selectedBooking?.booking_reference}
            </DialogTitle>
          </DialogHeader>

          {selectedBooking && (
            <div className="space-y-4 text-xs pt-2">
              <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 border border-border">
                <div>
                  <span className="text-muted-foreground uppercase text-[10px] font-semibold block">Current Status</span>
                  <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold mt-1 ${getStatusColor(selectedBooking.status)}`}>
                    {getStatusLabel(selectedBooking.status)}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-muted-foreground uppercase text-[10px] font-semibold block">Date Placed</span>
                  <span className="font-semibold text-foreground text-xs mt-1 block">
                    {new Date(selectedBooking.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 bg-white rounded-lg border border-border">
                <div>
                  <span className="text-muted-foreground">Patient Name:</span>
                  <p className="font-bold text-foreground">{selectedBooking.patient_name}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Mobile Phone:</span>
                  <p className="font-bold text-foreground">{selectedBooking.phone}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Scheduled Date:</span>
                  <p className="font-bold text-foreground">{selectedBooking.appointment_date}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Slot Time:</span>
                  <p className="font-bold text-foreground">{selectedBooking.appointment_time}</p>
                </div>
              </div>

              {selectedBooking.notes && (
                <div className="p-3 rounded-lg bg-neutral-50 border border-border">
                  <span className="text-muted-foreground font-semibold block mb-1">Notes / Address:</span>
                  <p className="text-foreground">{selectedBooking.notes}</p>
                </div>
              )}

              {/* Items Table */}
              <div className="border border-border rounded-lg overflow-hidden">
                <div className="bg-neutral-100 p-2.5 font-semibold text-foreground border-b border-border">
                  Selected Investigations ({selectedBooking.booking_items?.length || 0})
                </div>
                <div className="p-3 space-y-2">
                  {selectedBooking.booking_items?.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-xs">
                      <span>{item.item_name}</span>
                      <strong className="text-foreground">{formatPrice(item.item_price)}</strong>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-border flex justify-between font-bold text-sm">
                    <span>Total Amount:</span>
                    <span className="text-primary">{formatPrice(selectedBooking.total_amount)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
