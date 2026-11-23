// Database types for Davis Pathology Lab
// All prices, test details, and business information are DEMONSTRATION DATA
// and must be verified before use in a production environment.

export type UserRole = 'patient' | 'admin';

export type BookingStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'SAMPLE_COLLECTED'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'CANCELLED';

export type CollectionMethod = 'visit_laboratory' | 'home_collection';

export type Gender = 'male' | 'female' | 'other';

export interface Profile {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface TestCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  is_active: boolean;
  created_at: string;
}

export interface Test {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string;
  sample_type: string;
  preparation: string;
  turnaround_time: string;
  price: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  category?: TestCategory;
}

export interface Package {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  preparation: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  package_tests?: PackageTest[];
  tests?: Test[];
}

export interface PackageTest {
  id: string;
  package_id: string;
  test_id: string;
  test?: Test;
}

export interface Booking {
  id: string;
  booking_reference: string;
  patient_id: string | null;
  patient_name: string;
  phone: string;
  email: string;
  age: number;
  gender: string;
  appointment_date: string;
  appointment_time: string;
  collection_method: CollectionMethod;
  status: BookingStatus;
  total_amount: number;
  notes: string;
  created_at: string;
  updated_at: string;
  booking_items?: BookingItem[];
}

export interface BookingItem {
  id: string;
  booking_id: string;
  test_id: string | null;
  package_id: string | null;
  item_name: string;
  item_price: number;
}

export interface Report {
  id: string;
  patient_id: string;
  booking_id: string | null;
  report_title: string;
  storage_path: string;
  report_date: string;
  uploaded_by: string;
  is_published: boolean;
  created_at: string;
  patient?: Profile;
  booking?: Booking;
}

export interface BookingStatusHistory {
  id: string;
  booking_id: string;
  previous_status: string;
  new_status: string;
  changed_by: string;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface LaboratorySetting {
  id: string;
  setting_key: string;
  setting_value: Record<string, unknown>;
  updated_at: string;
}

export interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

// Dashboard analytics types
export interface DashboardStats {
  totalBookings: number;
  pendingBookings: number;
  confirmedBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  totalPatients: number;
  revenue: number;
}

export interface DailyBookingData {
  date: string;
  count: number;
}

export interface StatusDistribution {
  status: BookingStatus;
  count: number;
}

export interface PopularTest {
  name: string;
  count: number;
}
