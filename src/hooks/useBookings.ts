import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getBookings,
  getBookingByReference,
  getPatientBookings,
  createBooking,
  updateBookingStatus,
  getDashboardStats,
  getDailyBookings,
  getStatusDistribution,
  getPopularTests,
  BookingFilters,
  CreateBookingData,
} from '@/services/bookings';
import type { BookingStatus } from '@/types';

export function useBookings(filters?: BookingFilters) {
  return useQuery({
    queryKey: ['bookings', filters],
    queryFn: () => getBookings(filters),
  });
}

export function useBooking(reference: string) {
  return useQuery({
    queryKey: ['booking', reference],
    queryFn: () => getBookingByReference(reference),
    enabled: Boolean(reference),
  });
}

export function usePatientBookings(patientId?: string) {
  return useQuery({
    queryKey: ['patient-bookings', patientId],
    queryFn: () => (patientId ? getPatientBookings(patientId) : Promise.resolve([])),
    enabled: Boolean(patientId),
  });
}

export function useCreateBooking() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateBookingData) => createBooking(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['patient-bookings'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
      queryClient.invalidateQueries({ queryKey: ['daily-bookings'] });
    },
  });
}

export function useUpdateBookingStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      bookingId,
      newStatus,
      changedBy,
    }: {
      bookingId: string;
      newStatus: BookingStatus;
      changedBy: string;
    }) => updateBookingStatus(bookingId, newStatus, changedBy),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
      queryClient.invalidateQueries({ queryKey: ['patient-bookings'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
    },
  });
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: getDashboardStats,
  });
}

export function useDailyBookings(days: number = 7) {
  return useQuery({
    queryKey: ['daily-bookings', days],
    queryFn: () => getDailyBookings(days),
  });
}

export function useStatusDistribution() {
  return useQuery({
    queryKey: ['status-distribution'],
    queryFn: getStatusDistribution,
  });
}

export function usePopularTests() {
  return useQuery({
    queryKey: ['popular-tests'],
    queryFn: getPopularTests,
  });
}
