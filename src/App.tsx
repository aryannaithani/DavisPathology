import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

// Layouts
import { PublicLayout } from '@/components/layout/PublicLayout';
import { PatientLayout } from '@/components/layout/PatientLayout';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { ProtectedRoute } from '@/components/common/ProtectedRoute';

// Public Pages
import { HomePage } from '@/pages/public/HomePage';
import { AboutPage } from '@/pages/public/AboutPage';
import { TestsPage } from '@/pages/public/TestsPage';
import { TestDetailPage } from '@/pages/public/TestDetailPage';
import { PackagesPage } from '@/pages/public/PackagesPage';
import { BookAppointmentPage } from '@/pages/public/BookAppointmentPage';
import { ReportsPage } from '@/pages/public/ReportsPage';
import { ContactPage } from '@/pages/public/ContactPage';
import { LoginPage } from '@/pages/public/LoginPage';
import { RegisterPage } from '@/pages/public/RegisterPage';
import { ForgotPasswordPage } from '@/pages/public/ForgotPasswordPage';

// Patient Pages
import { PatientDashboardPage } from '@/pages/patient/PatientDashboardPage';
import { PatientBookingsPage } from '@/pages/patient/PatientBookingsPage';
import { PatientReportsPage } from '@/pages/patient/PatientReportsPage';
import { PatientProfilePage } from '@/pages/patient/PatientProfilePage';

// Admin Pages
import { AdminDashboardPage } from '@/pages/admin/AdminDashboardPage';
import { AdminBookingsPage } from '@/pages/admin/AdminBookingsPage';
import { AdminPatientsPage } from '@/pages/admin/AdminPatientsPage';
import { AdminTestsPage } from '@/pages/admin/AdminTestsPage';
import { AdminPackagesPage } from '@/pages/admin/AdminPackagesPage';
import { AdminReportsPage } from '@/pages/admin/AdminReportsPage';
import { AdminSettingsPage } from '@/pages/admin/AdminSettingsPage';
import { AdminContactEnquiriesPage } from '@/pages/admin/AdminContactEnquiriesPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Public Website Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/tests" element={<TestsPage />} />
          <Route path="/tests/:slug" element={<TestDetailPage />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/book-appointment" element={<BookAppointmentPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        {/* Patient Dashboard (Authenticated) */}
        <Route element={<ProtectedRoute requireAdmin={false} />}>
          <Route element={<PatientLayout />}>
            <Route path="/patient/dashboard" element={<PatientDashboardPage />} />
            <Route path="/patient/bookings" element={<PatientBookingsPage />} />
            <Route path="/patient/reports" element={<PatientReportsPage />} />
            <Route path="/patient/profile" element={<PatientProfilePage />} />
          </Route>
        </Route>

        {/* Admin Dashboard (Authenticated Admin) */}
        <Route element={<ProtectedRoute requireAdmin={true} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboardPage />} />
            <Route path="/admin/bookings" element={<AdminBookingsPage />} />
            <Route path="/admin/patients" element={<AdminPatientsPage />} />
            <Route path="/admin/tests" element={<AdminTestsPage />} />
            <Route path="/admin/packages" element={<AdminPackagesPage />} />
            <Route path="/admin/reports" element={<AdminReportsPage />} />
            <Route path="/admin/settings" element={<AdminSettingsPage />} />
            <Route path="/admin/enquiries" element={<AdminContactEnquiriesPage />} />
          </Route>
        </Route>

        {/* Catch-all fallback redirect */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
}

export default App;
