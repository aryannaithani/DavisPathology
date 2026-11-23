-- ========================================================================
-- DAVIS PATHOLOGY LAB - INITIAL DATABASE SCHEMA & ROW LEVEL SECURITY
-- Location: Shop No. 4, Millenium Complex, Bhagwan Talkies, Agra, UP
-- ========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (Linked with Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    role TEXT NOT NULL DEFAULT 'patient' CHECK (role IN ('patient', 'admin')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. TEST CATEGORIES
CREATE TABLE IF NOT EXISTS public.test_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    icon TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. DIAGNOSTIC TESTS
CREATE TABLE IF NOT EXISTS public.tests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    category_id UUID NOT NULL REFERENCES public.test_categories(id) ON DELETE RESTRICT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    sample_type TEXT NOT NULL,
    preparation TEXT NOT NULL,
    turnaround_time TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. HEALTH PACKAGES
CREATE TABLE IF NOT EXISTS public.packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    preparation TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. PACKAGE TESTS JUNCTION
CREATE TABLE IF NOT EXISTS public.package_tests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    package_id UUID NOT NULL REFERENCES public.packages(id) ON DELETE CASCADE,
    test_id UUID NOT NULL REFERENCES public.tests(id) ON DELETE CASCADE,
    UNIQUE(package_id, test_id)
);

-- 6. BOOKINGS
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_reference TEXT NOT NULL UNIQUE,
    patient_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    patient_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    age INTEGER NOT NULL CHECK (age >= 0 AND age <= 150),
    gender TEXT NOT NULL CHECK (gender IN ('male', 'female', 'other')),
    appointment_date DATE NOT NULL,
    appointment_time TEXT NOT NULL,
    collection_method TEXT NOT NULL CHECK (collection_method IN ('visit_laboratory', 'home_collection')),
    status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'CONFIRMED', 'SAMPLE_COLLECTED', 'PROCESSING', 'COMPLETED', 'CANCELLED')),
    total_amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 7. BOOKING ITEMS (Historical Price Snapshot)
CREATE TABLE IF NOT EXISTS public.booking_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
    test_id UUID REFERENCES public.tests(id) ON DELETE SET NULL,
    package_id UUID REFERENCES public.packages(id) ON DELETE SET NULL,
    item_name TEXT NOT NULL,
    item_price NUMERIC(10, 2) NOT NULL CHECK (item_price >= 0)
);

-- 8. REPORTS
CREATE TABLE IF NOT EXISTS public.reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
    report_title TEXT NOT NULL,
    storage_path TEXT NOT NULL,
    report_date DATE NOT NULL,
    uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    is_published BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. BOOKING STATUS AUDIT HISTORY
CREATE TABLE IF NOT EXISTS public.booking_status_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
    previous_status TEXT NOT NULL,
    new_status TEXT NOT NULL,
    changed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 11. LABORATORY SETTINGS
CREATE TABLE IF NOT EXISTS public.laboratory_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    setting_key TEXT NOT NULL UNIQUE,
    setting_value JSONB NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 12. CONTACT ENQUIRIES
CREATE TABLE IF NOT EXISTS public.contact_enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ========================================================================
-- INDEXES FOR PERFORMANCE
-- ========================================================================
CREATE INDEX IF NOT EXISTS idx_tests_category ON public.tests(category_id);
CREATE INDEX IF NOT EXISTS idx_tests_slug ON public.tests(slug);
CREATE INDEX IF NOT EXISTS idx_packages_slug ON public.packages(slug);
CREATE INDEX IF NOT EXISTS idx_bookings_patient ON public.bookings(patient_id);
CREATE INDEX IF NOT EXISTS idx_bookings_ref ON public.bookings(booking_reference);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.bookings(status);
CREATE INDEX IF NOT EXISTS idx_booking_items_booking ON public.booking_items(booking_id);
CREATE INDEX IF NOT EXISTS idx_reports_patient ON public.reports(patient_id);
CREATE INDEX IF NOT EXISTS idx_reports_booking ON public.reports(booking_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON public.notifications(user_id);

-- ========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.package_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.laboratory_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_enquiries ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- PROFILES POLICIES
CREATE POLICY "Users can read their own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Users can update their own permitted fields"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id AND role = 'patient'); -- Disallow self-promoting to admin

CREATE POLICY "Admins have full access to profiles"
    ON public.profiles FOR ALL
    USING (public.is_admin());

-- TEST CATEGORIES POLICIES
CREATE POLICY "Public read active categories"
    ON public.test_categories FOR SELECT
    USING (is_active = true OR public.is_admin());

CREATE POLICY "Admins manage categories"
    ON public.test_categories FOR ALL
    USING (public.is_admin());

-- TESTS POLICIES
CREATE POLICY "Public read active tests"
    ON public.tests FOR SELECT
    USING (is_active = true OR public.is_admin());

CREATE POLICY "Admins manage tests"
    ON public.tests FOR ALL
    USING (public.is_admin());

-- PACKAGES POLICIES
CREATE POLICY "Public read active packages"
    ON public.packages FOR SELECT
    USING (is_active = true OR public.is_admin());

CREATE POLICY "Admins manage packages"
    ON public.packages FOR ALL
    USING (public.is_admin());

CREATE POLICY "Public read package tests"
    ON public.package_tests FOR SELECT
    USING (true);

CREATE POLICY "Admins manage package tests"
    ON public.package_tests FOR ALL
    USING (public.is_admin());

-- BOOKINGS POLICIES
CREATE POLICY "Patients view own bookings"
    ON public.bookings FOR SELECT
    USING (patient_id = auth.uid() OR public.is_admin());

CREATE POLICY "Allow public booking request insert"
    ON public.bookings FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Admins update bookings"
    ON public.bookings FOR UPDATE
    USING (public.is_admin());

-- BOOKING ITEMS POLICIES
CREATE POLICY "View booking items"
    ON public.booking_items FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.bookings
            WHERE bookings.id = booking_items.booking_id
            AND (bookings.patient_id = auth.uid() OR public.is_admin())
        )
    );

CREATE POLICY "Allow booking items insert on creation"
    ON public.booking_items FOR INSERT
    WITH CHECK (true);

-- REPORTS POLICIES
CREATE POLICY "Patients view own published reports"
    ON public.reports FOR SELECT
    USING (
        (patient_id = auth.uid() AND is_published = true)
        OR public.is_admin()
    );

CREATE POLICY "Admins manage reports"
    ON public.reports FOR ALL
    USING (public.is_admin());

-- NOTIFICATIONS POLICIES
CREATE POLICY "Users read own notifications"
    ON public.notifications FOR SELECT
    USING (user_id = auth.uid() OR public.is_admin());

CREATE POLICY "Users update own notifications"
    ON public.notifications FOR UPDATE
    USING (user_id = auth.uid());

-- LABORATORY SETTINGS POLICIES
CREATE POLICY "Public read laboratory settings"
    ON public.laboratory_settings FOR SELECT
    USING (true);

CREATE POLICY "Admins manage settings"
    ON public.laboratory_settings FOR ALL
    USING (public.is_admin());

-- CONTACT ENQUIRIES POLICIES
CREATE POLICY "Public insert enquiries"
    ON public.contact_enquiries FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Admins manage enquiries"
    ON public.contact_enquiries FOR ALL
    USING (public.is_admin());

-- ========================================================================
-- AUTOMATIC PROFILE CREATION TRIGGER
-- ========================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, phone, role)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', 'Patient'),
    new.email,
    COALESCE(new.raw_user_meta_data->>'phone', ''),
    'patient'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
