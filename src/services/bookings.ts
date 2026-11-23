import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { demoBookings, demoBookingItems } from '@/data/demo';
import { generateBookingReference } from '@/lib/utils';
import type {
  Booking,
  BookingItem,
  BookingStatus,
  DashboardStats,
  DailyBookingData,
  PopularTest,
  StatusDistribution,
} from '@/types';

export interface BookingFilters {
  status?: BookingStatus;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface CreateBookingData {
  patient_id?: string | null;
  patient_name: string;
  phone: string;
  email: string;
  age: number;
  gender: string;
  appointment_date: string;
  appointment_time: string;
  collection_method: 'visit_laboratory' | 'home_collection';
  notes?: string;
  items: Array<{
    test_id?: string | null;
    package_id?: string | null;
    item_name: string;
    item_price: number;
  }>;
}

function getDemoBookingsWithItems(): Booking[] {
  return demoBookings.map((b) => ({
    ...b,
    booking_items: demoBookingItems.filter((bi) => bi.booking_id === b.id),
  }));
}

export async function getBookings(filters?: BookingFilters): Promise<Booking[]> {
  if (!isSupabaseConfigured) {
    let bookings = getDemoBookingsWithItems();

    if (filters?.status) {
      bookings = bookings.filter((b) => b.status === filters.status);
    }
    if (filters?.search) {
      const s = filters.search.toLowerCase();
      bookings = bookings.filter(
        (b) =>
          b.patient_name.toLowerCase().includes(s) ||
          b.booking_reference.toLowerCase().includes(s) ||
          b.phone.includes(s)
      );
    }
    if (filters?.dateFrom) {
      bookings = bookings.filter((b) => b.appointment_date >= filters.dateFrom!);
    }
    if (filters?.dateTo) {
      bookings = bookings.filter((b) => b.appointment_date <= filters.dateTo!);
    }

    return bookings;
  }

  let query = supabase
    .from('bookings')
    .select('*, booking_items(*)')
    .order('created_at', { ascending: false });

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }
  if (filters?.search) {
    query = query.or(
      `patient_name.ilike.%${filters.search}%,booking_reference.ilike.%${filters.search}%,phone.ilike.%${filters.search}%`
    );
  }
  if (filters?.dateFrom) {
    query = query.gte('appointment_date', filters.dateFrom);
  }
  if (filters?.dateTo) {
    query = query.lte('appointment_date', filters.dateTo);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as Booking[];
}

export async function getBookingByReference(reference: string): Promise<Booking | null> {
  if (!isSupabaseConfigured) {
    const booking = demoBookings.find((b) => b.booking_reference === reference);
    if (!booking) return null;
    return {
      ...booking,
      booking_items: demoBookingItems.filter((bi) => bi.booking_id === booking.id),
    };
  }

  const { data, error } = await supabase
    .from('bookings')
    .select('*, booking_items(*)')
    .eq('booking_reference', reference)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return data as Booking;
}

export async function getPatientBookings(patientId: string): Promise<Booking[]> {
  if (!isSupabaseConfigured) {
    return getDemoBookingsWithItems().filter((b) => b.patient_id === patientId);
  }

  const { data, error } = await supabase
    .from('bookings')
    .select('*, booking_items(*)')
    .eq('patient_id', patientId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Booking[];
}

export async function createBooking(
  bookingData: CreateBookingData
): Promise<{ booking: Booking; reference: string }> {
  const reference = generateBookingReference();
  const totalAmount = bookingData.items.reduce((sum, item) => sum + item.item_price, 0);

  if (!isSupabaseConfigured) {
    const newBooking: Booking = {
      id: `booking-${Date.now()}`,
      booking_reference: reference,
      patient_id: bookingData.patient_id ?? null,
      patient_name: bookingData.patient_name,
      phone: bookingData.phone,
      email: bookingData.email,
      age: bookingData.age,
      gender: bookingData.gender,
      appointment_date: bookingData.appointment_date,
      appointment_time: bookingData.appointment_time,
      collection_method: bookingData.collection_method,
      status: 'PENDING',
      total_amount: totalAmount,
      notes: bookingData.notes ?? '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      booking_items: bookingData.items.map((item, idx) => ({
        id: `bi-new-${idx}-${Date.now()}`,
        booking_id: `booking-${Date.now()}`,
        test_id: item.test_id ?? null,
        package_id: item.package_id ?? null,
        item_name: item.item_name,
        item_price: item.item_price,
      })),
    };

    demoBookings.unshift(newBooking);
    return { booking: newBooking, reference };
  }

  const { data: booking, error: bookingError } = await supabase
    .from('bookings')
    .insert({
      booking_reference: reference,
      patient_id: bookingData.patient_id ?? null,
      patient_name: bookingData.patient_name,
      phone: bookingData.phone,
      email: bookingData.email,
      age: bookingData.age,
      gender: bookingData.gender,
      appointment_date: bookingData.appointment_date,
      appointment_time: bookingData.appointment_time,
      collection_method: bookingData.collection_method,
      status: 'PENDING' as BookingStatus,
      total_amount: totalAmount,
      notes: bookingData.notes ?? '',
    })
    .select()
    .single();

  if (bookingError) throw bookingError;

  const items: Omit<BookingItem, 'id'>[] = bookingData.items.map((item) => ({
    booking_id: booking.id,
    test_id: item.test_id ?? null,
    package_id: item.package_id ?? null,
    item_name: item.item_name,
    item_price: item.item_price,
  }));

  const { error: itemsError } = await supabase
    .from('booking_items')
    .insert(items);

  if (itemsError) throw itemsError;

  // Fetch the complete booking with items
  const result = await getBookingByReference(reference);
  if (!result) throw new Error('Failed to retrieve created booking');

  return { booking: result, reference };
}

export async function updateBookingStatus(
  bookingId: string,
  newStatus: BookingStatus,
  changedBy: string
): Promise<Booking> {
  if (!isSupabaseConfigured) {
    const booking = demoBookings.find((b) => b.id === bookingId);
    if (!booking) throw new Error('Booking not found');
    booking.status = newStatus;
    booking.updated_at = new Date().toISOString();
    return { ...booking };
  }

  // Get the current booking to record the previous status
  const { data: current, error: fetchError } = await supabase
    .from('bookings')
    .select('status')
    .eq('id', bookingId)
    .single();

  if (fetchError) throw fetchError;

  // Update the booking status
  const { error: updateError } = await supabase
    .from('bookings')
    .update({
      status: newStatus,
      updated_at: new Date().toISOString(),
    })
    .eq('id', bookingId);

  if (updateError) throw updateError;

  // Insert status history record
  const { error: historyError } = await supabase
    .from('booking_status_history')
    .insert({
      booking_id: bookingId,
      previous_status: current.status,
      new_status: newStatus,
      changed_by: changedBy,
    });

  if (historyError) throw historyError;

  // Return updated booking
  const { data: updated, error: refetchError } = await supabase
    .from('bookings')
    .select('*, booking_items(*)')
    .eq('id', bookingId)
    .single();

  if (refetchError) throw refetchError;
  return updated as Booking;
}

export async function getBookingStats(): Promise<DashboardStats> {
  if (!isSupabaseConfigured) {
    // Compute stats from demonstration data
    const bookings = demoBookings;
    return {
      totalBookings: bookings.length,
      pendingBookings: bookings.filter((b) => b.status === 'PENDING').length,
      confirmedBookings: bookings.filter((b) => b.status === 'CONFIRMED').length,
      completedBookings: bookings.filter((b) => b.status === 'COMPLETED').length,
      cancelledBookings: bookings.filter((b) => b.status === 'CANCELLED').length,
      totalPatients: new Set(bookings.map((b) => b.phone)).size,
      // Demonstration revenue figure
      revenue: bookings
        .filter((b) => b.status === 'COMPLETED')
        .reduce((sum, b) => sum + b.total_amount, 0),
    };
  }

  const { data, error } = await supabase
    .from('bookings')
    .select('status, total_amount, phone');

  if (error) throw error;

  const bookings = data as Array<{
    status: BookingStatus;
    total_amount: number;
    phone: string;
  }>;

  return {
    totalBookings: bookings.length,
    pendingBookings: bookings.filter((b) => b.status === 'PENDING').length,
    confirmedBookings: bookings.filter((b) => b.status === 'CONFIRMED').length,
    completedBookings: bookings.filter((b) => b.status === 'COMPLETED').length,
    cancelledBookings: bookings.filter((b) => b.status === 'CANCELLED').length,
    totalPatients: new Set(bookings.map((b) => b.phone)).size,
    revenue: bookings
      .filter((b) => b.status === 'COMPLETED')
      .reduce((sum, b) => sum + b.total_amount, 0),
  };
}

export async function getDailyBookings(days: number = 7): Promise<DailyBookingData[]> {
  if (!isSupabaseConfigured) {
    // Generate demonstration daily booking data
    const result: DailyBookingData[] = [];
    const today = new Date();
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0] || '';
      const count = demoBookings.filter((b) => b.appointment_date === dateStr).length;
      result.push({ date: dateStr, count });
    }
    return result;
  }

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  const startStr = startDate.toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('bookings')
    .select('appointment_date')
    .gte('appointment_date', startStr);

  if (error) throw error;

  // Aggregate by date
  const countMap = new Map<string, number>();
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    countMap.set(d.toISOString().split('T')[0] || '', 0);
  }

  for (const row of data) {
    const dateStr = row.appointment_date as string;
    if (countMap.has(dateStr)) {
      countMap.set(dateStr, (countMap.get(dateStr) ?? 0) + 1);
    }
  }

  return Array.from(countMap.entries()).map(([date, count]) => ({ date, count }));
}

export const getDashboardStats = getBookingStats;

export async function getStatusDistribution(): Promise<StatusDistribution[]> {
  const bookings = !isSupabaseConfigured
    ? demoBookings
    : ((await supabase.from('bookings').select('status')).data as Array<{ status: BookingStatus }>) ?? [];

  const statuses: BookingStatus[] = [
    'PENDING',
    'CONFIRMED',
    'SAMPLE_COLLECTED',
    'PROCESSING',
    'COMPLETED',
    'CANCELLED',
  ];

  return statuses.map((status) => ({
    status,
    count: bookings.filter((b) => b.status === status).length,
  }));
}

export async function getPopularTests(): Promise<PopularTest[]> {
  if (!isSupabaseConfigured) {
    // Demonstration popular tests data
    const countMap = new Map<string, number>();
    for (const item of demoBookingItems) {
      const name = item.item_name;
      countMap.set(name, (countMap.get(name) ?? 0) + 1);
    }
    return Array.from(countMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }

  const { data, error } = await supabase
    .from('booking_items')
    .select('item_name');

  if (error) throw error;

  const countMap = new Map<string, number>();
  for (const row of data) {
    const name = row.item_name as string;
    countMap.set(name, (countMap.get(name) ?? 0) + 1);
  }

  return Array.from(countMap.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}
