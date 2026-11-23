# Davis Pathology Lab - Full-Stack Diagnostic Laboratory Management System

**Location:** Shop No. 4, Millenium Complex, Bhagwan Talkies, Agra, Uttar Pradesh, India  
**Brand Message:** "Accurate Diagnostics. Affordable Healthcare. Quick Results."  
**Brand Values:** ACCURATE | AFFORDABLE | QUICK

---

## 🔬 System Overview

**Davis Pathology Lab** is a full-stack digital web application and management system tailored for diagnostic laboratories. It provides:
1. **Public Patient Portal**:
   - Dynamic diagnostic test directory with category filtering and keyword search
   - Curated health checkup packages with instant booking pre-selection
   - Interactive appointment booking with real-time server-side price validation
   - Track booking reference status
   - Patient authentication with Supabase Auth
   - Floating WhatsApp integration with prefilled enquiry messages
   - Embedded Google Maps with directions to the Agra laboratory facility
2. **Patient Dashboard (`/patient/dashboard`)**:
   - Personal appointment records and statuses (`PENDING`, `CONFIRMED`, `SAMPLE_COLLECTED`, `PROCESSING`, `COMPLETED`, `CANCELLED`)
   - Encrypted diagnostic PDF report downloads via secure signed URLs
   - Patient profile management
3. **Super Administrator Console (`/admin`)**:
   - Real-time visual analytics with **Recharts** (7-day daily booking trend, live status distribution donut, popular investigations chart, revenue metrics)
   - Full booking workflow lifecycle management (advance statuses, audit logging)
   - Patient directory with appointment and report tracking
   - Diagnostic test catalogue CRUD (set price, turnaround time, specimen requirements, fasting guidelines)
   - Preventive health package builder (bundle tests, calculate rates)
   - Secure PDF report uploader and publisher (private bucket validation)
   - Public contact enquiries manager
   - Editable laboratory configuration settings (timings, addresses, fees, contact numbers)

---

## 🛠️ Technology Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, shadcn/ui (Radix UI primitives), Lucide React, React Router v7
- **Forms & Validation:** React Hook Form + Zod schemas
- **Server State Management:** TanStack React Query v5
- **Visual Analytics:** Recharts
- **Backend & Database:** Supabase PostgreSQL, Row Level Security (RLS) policies, Private Storage, Edge Functions
- **Design System:**
  - Primary Orange-Red: `#E94B35`
  - Secondary Accent Yellow: `#F5C542`
  - Dark Contrast: `#171717`
  - Typography: Plus Jakarta Sans (Headings), Inter (Body)

---

## 🗄️ Database Architecture & Migrations

The database schema is located in `supabase/migrations/001_initial_schema.sql` and includes:
- `profiles`: Patient and administrator user records linked with `auth.users`
- `test_categories`: Pathology departments (Hematology, Biochemistry, Thyroid, Clinical Pathology, Serology, Vitamins)
- `tests`: Diagnostic tests with clinical specimen types, preparation notes, turnaround times, and prices
- `packages`: Curated health checkup packages
- `package_tests`: Junction table linking packages to included diagnostic tests
- `bookings`: Patient appointments with unique reference codes (`DPL-...`)
- `booking_items`: Immutable price snapshots preserving historical order records
- `reports`: Diagnostic report metadata linked to private storage buckets
- `booking_status_history`: Timestamped audit trail of status transitions
- `notifications`: In-app notification queue
- `laboratory_settings`: Dynamic JSONB configuration store
- `contact_enquiries`: Patient enquiries submitted through the contact page

Sample demonstration records are pre-configured in `supabase/seed.sql` and `src/data/demo.ts`.

---

## 🚀 Running the Application

### 1. Development Server
```bash
npm install
npm run dev
```

### 2. Production Build
```bash
npm run build
npm run preview
```

### 3. Supabase Configuration (Optional)
To link your live Supabase cloud project, copy `.env.example` to `.env` and provide your credentials:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_WHATSAPP_NUMBER=919999999999
```
*Note: If credentials are not set, the application automatically runs in demonstration mode with comprehensive in-memory mock services.*

---

## 🔐 Demonstration Credentials

To evaluate the authentication and role-based workflows:
- **Administrator Demo:** `admin@davispathology.com` / `AdminPassword123!` -> Navigates to `/admin`
- **Patient Demo:** `patient@example.com` / `PatientPassword123!` -> Navigates to `/patient/dashboard`

*(Clickable demo autofill buttons are available on the `/login` screen).*

---

## ⚠️ Medical & Business Disclaimer
All business information, test preparation instructions, prices, turnaround times, and sample reports contained in this project are demonstration data for software evaluation and must not be used as clinical diagnostic advice.
