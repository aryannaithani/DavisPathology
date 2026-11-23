import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  IndianRupee, 
  Clock, 
  Heart, 
  ArrowRight, 
  CalendarCheck, 
  Search, 
  MapPin, 
  CheckCircle2, 
  Droplets,
  FlaskConical,
  Activity,
  Microscope,
  Shield,
  Sun,
  FileDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { demoCategories, demoPackages } from '@/data/demo';
import { formatPrice } from '@/lib/utils';

export const HomePage: React.FC = () => {
  const categoryIconMap: Record<string, React.ReactNode> = {
    hematology: <Droplets className="w-6 h-6 text-primary" />,
    biochemistry: <FlaskConical className="w-6 h-6 text-primary" />,
    thyroid: <Activity className="w-6 h-6 text-primary" />,
    'clinical-pathology': <Microscope className="w-6 h-6 text-primary" />,
    serology: <Shield className="w-6 h-6 text-primary" />,
    vitamins: <Sun className="w-6 h-6 text-primary" />,
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F8F6]">
      {/* ========================================================================
          1. FULL-WIDTH REDESIGNED HERO SECTION WITH AUTHENTIC LAB PHOTOGRAPHY
          ======================================================================== */}
      <section className="relative w-full bg-[#171717] text-white border-b-4 border-primary overflow-hidden">
        {/* Authentic Background Photograph of Laboratory Technologists */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1579152276502-545a248a9931?auto=format&fit=crop&w=2000&q=85')`,
          }}
        />

        {/* High-Contrast Dark Black Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#171717]/95 via-[#171717]/90 to-[#171717]/80" />

        {/* Decorative Top Accent Lines (Orange-Red & Yellow) */}
        <div className="relative z-10 w-full flex h-1">
          <div className="w-1/3 bg-primary" />
          <div className="w-1/3 bg-secondary" />
          <div className="w-1/3 bg-[#171717]" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-24 sm:pb-20">
          <div className="max-w-3xl space-y-6">
            
            {/* Eyebrow Label */}
            <div className="inline-flex items-center gap-2 border-2 border-secondary bg-[#171717]/90 px-3 py-1">
              <span className="w-2 h-2 bg-secondary" />
              <span className="text-secondary font-heading font-black text-xs uppercase tracking-widest">
                DAVIS PATHOLOGY LAB | AGRA
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] uppercase">
              Accurate Testing.<br />
              <span className="text-secondary">Affordable Healthcare.</span><br />
              Results You Can Trust.
            </h1>

            {/* Subtle Divider Line */}
            <div className="w-24 h-1 bg-primary" />

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-neutral-200 leading-relaxed max-w-2xl font-normal">
              Your health deserves reliable answers. Experience diagnostic services focused on accuracy, affordability and timely reporting.
            </p>

            {/* Action Buttons (Rectangular, High Contrast) */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link to="/book-appointment">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-[#D63520] text-white font-extrabold uppercase tracking-wider text-sm h-12 px-7 border-2 border-white shadow-[4px_4px_0px_0px_#FFFFFF]"
                >
                  <CalendarCheck className="w-4 h-4 mr-2" />
                  BOOK A TEST
                </Button>
              </Link>
              <Link to="/tests">
                <Button 
                  size="lg" 
                  className="bg-secondary hover:bg-[#E6AD1E] text-[#171717] font-extrabold uppercase tracking-wider text-sm h-12 px-7 border-2 border-secondary shadow-[4px_4px_0px_0px_#171717]"
                >
                  <Search className="w-4 h-4 mr-2" />
                  EXPLORE OUR SERVICES
                </Button>
              </Link>
            </div>

            {/* Facility Location Strip */}
            <div className="pt-2 flex items-center gap-2 text-xs text-neutral-300">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span>Shop No. 4, Millenium Complex, Bhagwan Talkies, Agra, Uttar Pradesh</span>
            </div>

          </div>
        </div>

        {/* Bottom Information Strip Anchored to the Hero */}
        <div className="relative z-10 w-full bg-[#171717] border-t-2 border-neutral-700 py-3.5 px-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs tracking-wider uppercase font-bold">
            <div className="flex items-center gap-3 text-white">
              <span className="text-secondary font-black tracking-widest text-sm">ACCURATE</span>
              <span className="text-neutral-500">|</span>
              <span className="text-secondary font-black tracking-widest text-sm">AFFORDABLE</span>
              <span className="text-neutral-500">|</span>
              <span className="text-secondary font-black tracking-widest text-sm">QUICK</span>
            </div>
            <div className="text-neutral-400 text-[11px] font-semibold lowercase">
              *demonstration diagnostic portal • verified local pathology in agra
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================
          2. TRUST HIGHLIGHTS (Clean Horizontal Bar with Thin Borders)
          ======================================================================== */}
      <section className="bg-white border-b-2 border-[#171717]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-neutral-300">
            
            <div className="p-6 flex items-start gap-4">
              <div className="w-10 h-10 bg-[#171717] text-secondary flex items-center justify-center shrink-0 border border-black font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-heading font-black text-sm text-[#171717] uppercase tracking-wide">
                  Quality-Focused Testing
                </h2>
                <p className="text-xs text-neutral-600 mt-1 leading-snug">
                  Calibrated diagnostic instruments and standard quality protocols.
                </p>
              </div>
            </div>

            <div className="p-6 flex items-start gap-4">
              <div className="w-10 h-10 bg-[#171717] text-secondary flex items-center justify-center shrink-0 border border-black font-bold">
                <IndianRupee className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-heading font-black text-sm text-[#171717] uppercase tracking-wide">
                  Affordable Services
                </h2>
                <p className="text-xs text-neutral-600 mt-1 leading-snug">
                  Honest, transparent pricing for routine investigations.
                </p>
              </div>
            </div>

            <div className="p-6 flex items-start gap-4">
              <div className="w-10 h-10 bg-[#171717] text-secondary flex items-center justify-center shrink-0 border border-black font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-heading font-black text-sm text-[#171717] uppercase tracking-wide">
                  Timely Reporting
                </h2>
                <p className="text-xs text-neutral-600 mt-1 leading-snug">
                  Same-day reporting for standard blood tests with online access.
                </p>
              </div>
            </div>

            <div className="p-6 flex items-start gap-4">
              <div className="w-10 h-10 bg-[#171717] text-secondary flex items-center justify-center shrink-0 border border-black font-bold">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-heading font-black text-sm text-[#171717] uppercase tracking-wide">
                  Patient-Friendly
                </h2>
                <p className="text-xs text-neutral-600 mt-1 leading-snug">
                  Home sample collection across Agra and walk-in counter support.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================
          3. DIAGNOSTIC SERVICES (Rectangular Grid with Thin Borders)
          ======================================================================== */}
      <section className="py-14 sm:py-16 bg-[#F8F8F6] border-b-2 border-[#171717]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b-2 border-neutral-300 gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-primary">
                LABORATORY DEPARTMENTS
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#171717] uppercase tracking-tight mt-1">
                Diagnostic Services
              </h2>
            </div>
            <Link to="/tests">
              <Button 
                variant="outline" 
                size="sm"
                className="h-9 border-2 border-[#171717] font-bold text-xs uppercase tracking-wider text-[#171717] hover:bg-[#171717] hover:text-white"
              >
                <span>View Full Test Catalogue</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>

          {/* 6 Rectangular Service Containers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {demoCategories.map((category) => (
              <div
                key={category.id}
                className="bg-white border-2 border-[#171717] p-6 flex flex-col justify-between hover:border-primary transition-colors"
              >
                <div>
                  <div className="w-10 h-10 bg-neutral-100 border border-neutral-300 flex items-center justify-center mb-4">
                    {categoryIconMap[category.slug] || <FlaskConical className="w-5 h-5 text-primary" />}
                  </div>
                  <h3 className="font-heading font-black text-base text-[#171717] uppercase tracking-tight">
                    {category.name}
                  </h3>
                  <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-neutral-200">
                  <Link
                    to={`/tests?category=${category.slug}`}
                    className="inline-flex items-center text-xs font-black uppercase tracking-wider text-primary hover:text-[#D63520] transition-colors"
                  >
                    <span>View Tests</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================
          4. POPULAR HEALTH PACKAGES (White bg, Black text, Red price, Yellow badges)
          ======================================================================== */}
      <section className="py-14 sm:py-16 bg-white border-b-2 border-[#171717]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-10 pb-4 border-b-2 border-neutral-300 text-center sm:text-left">
            <span className="text-xs font-black uppercase tracking-wider text-primary">
              PREVENTIVE HEALTH SCREENINGS
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#171717] uppercase tracking-tight mt-1">
              Popular Health Packages
            </h2>
            <p className="text-xs text-neutral-600 mt-1 max-w-2xl font-medium">
              Curated investigation bundles designed for comprehensive screening with clear, upfront package fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {demoPackages.map((pkg, index) => {
              const isPopular = index === 1; // Complete Health Checkup
              return (
                <div
                  key={pkg.id}
                  className={`border-2 flex flex-col justify-between p-6 sm:p-7 bg-white relative ${
                    isPopular
                      ? 'border-[#171717] shadow-[5px_5px_0px_0px_#171717]'
                      : 'border-neutral-300 hover:border-neutral-800'
                  }`}
                >
                  {/* Yellow Highlight Strip for Featured Package */}
                  {isPopular && (
                    <div className="absolute -top-3.5 left-6 bg-secondary text-[#171717] text-[10px] font-black uppercase tracking-widest px-3 py-0.5 border border-[#171717]">
                      ★ MOST RECOMMENDED
                    </div>
                  )}

                  <div>
                    <h3 className="font-heading font-black text-lg text-[#171717] uppercase tracking-tight">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-neutral-600 mt-2 leading-relaxed">
                      {pkg.description}
                    </p>

                    {/* Price Block: Orange-Red */}
                    <div className="my-5 p-3.5 bg-neutral-50 border-y border-neutral-200">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                        Package Fee
                      </div>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="font-heading font-black text-3xl text-primary">
                          {formatPrice(pkg.price)}
                        </span>
                        <span className="text-[11px] text-neutral-500 italic">*Demo Rate</span>
                      </div>
                    </div>

                    {/* Tests Checklist */}
                    <div className="space-y-2 mb-6">
                      <div className="text-[11px] font-black uppercase tracking-wider text-[#171717]">
                        Included Tests:
                      </div>
                      <ul className="space-y-1.5 text-xs text-neutral-700">
                        {pkg.tests?.map((t) => (
                          <li key={t.id} className="flex items-start gap-2">
                            <span className="text-primary font-bold">✓</span>
                            <span>{t.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <Link to={`/book-appointment?package=${pkg.slug}`}>
                      <Button
                        className={`w-full font-extrabold uppercase tracking-wider text-xs h-11 border border-[#171717] ${
                          isPopular
                            ? 'bg-secondary hover:bg-[#E6AD1E] text-[#171717]'
                            : 'bg-primary hover:bg-[#D63520] text-white'
                        }`}
                      >
                        BOOK THIS PACKAGE
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 p-3 bg-neutral-100 border border-neutral-300 text-[11px] text-neutral-600">
            <strong>Demonstration Pricing Notice:</strong> All package rates and test parameters shown are demonstration data and require validation by Davis Pathology Lab staff before booking.
          </div>
        </div>
      </section>

      {/* ========================================================================
          5. WHY CHOOSE US (Bold 3-Column Layout: Black, Orange-Red, Yellow)
          ======================================================================== */}
      <section className="border-b-2 border-[#171717]">
        <div className="grid grid-cols-1 md:grid-cols-3">
          
          {/* Column 1: ACCURATE (Black Background, Yellow Accents, White Text) */}
          <div className="bg-[#171717] text-white p-8 sm:p-10 border-b-2 md:border-b-0 md:border-r-2 border-black flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-secondary text-[#171717] font-black flex items-center justify-center mb-6 border border-white">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-secondary font-black text-xs uppercase tracking-widest block mb-1">
                VALUE ONE
              </span>
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase tracking-tight mb-4">
                ACCURATE
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal">
                Diagnostics you and your consulting physician can trust. We utilize calibrated analytical equipment and standard operating procedures for dependable reporting.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-neutral-800 text-[11px] font-bold text-secondary uppercase tracking-wider">
              Calibrated Automated Analyzers
            </div>
          </div>

          {/* Column 2: AFFORDABLE (Orange-Red Background, White & Yellow Text) */}
          <div className="bg-primary text-white p-8 sm:p-10 border-b-2 md:border-b-0 md:border-r-2 border-black flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-[#171717] text-white font-black flex items-center justify-center mb-6 border border-white">
                <IndianRupee className="w-6 h-6" />
              </div>
              <span className="text-white/80 font-black text-xs uppercase tracking-widest block mb-1">
                VALUE TWO
              </span>
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-white uppercase tracking-tight mb-4">
                AFFORDABLE
              </h3>
              <p className="text-xs sm:text-sm text-white/95 leading-relaxed font-normal">
                Healthcare should never be out of reach. We maintain competitive, affordable pricing across all routine blood investigations and preventative health profiles.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/20 text-[11px] font-bold text-white uppercase tracking-wider">
              Transparent Lab Pricing
            </div>
          </div>

          {/* Column 3: QUICK (Yellow Background, Black Text) */}
          <div className="bg-secondary text-[#171717] p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 bg-[#171717] text-secondary font-black flex items-center justify-center mb-6 border border-black">
                <Clock className="w-6 h-6" />
              </div>
              <span className="text-[#171717]/80 font-black text-xs uppercase tracking-widest block mb-1">
                VALUE THREE
              </span>
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-[#171717] uppercase tracking-tight mb-4">
                QUICK
              </h3>
              <p className="text-xs sm:text-sm text-neutral-900 leading-relaxed font-normal">
                Timely clinical decisions require fast report generation. Most routine investigations are reported within 4 to 8 hours with instant online portal access.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-neutral-900/30 text-[11px] font-bold text-[#171717] uppercase tracking-wider">
              Rapid Same-Day Delivery
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================
          6. APPOINTMENT CTA (Strong Black Section with White & Yellow Text)
          ======================================================================== */}
      <section className="bg-[#171717] text-white py-14 sm:py-16 border-b-2 border-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-4 border-neutral-800 p-8 sm:p-12 bg-neutral-900 text-center space-y-5">
            <span className="text-secondary font-black text-xs uppercase tracking-widest">
              SCHEDULE YOUR INVESTIGATION
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-white uppercase tracking-tight">
              Your Health Check Starts Here.
            </h2>
            <p className="text-neutral-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
              Book your diagnostic test appointment online. Choose between direct laboratory walk-in or home sample collection across Agra.
            </p>
            <div className="pt-3 flex flex-wrap items-center justify-center gap-4">
              <Link to="/book-appointment">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-[#D63520] text-white font-extrabold uppercase tracking-wider text-xs sm:text-sm h-12 px-8 border-2 border-white"
                >
                  BOOK YOUR APPOINTMENT
                </Button>
              </Link>
              <Link to="/contact">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent border-2 border-secondary text-secondary hover:bg-secondary hover:text-[#171717] font-extrabold uppercase tracking-wider text-xs sm:text-sm h-12 px-7"
                >
                  CONTACT OUR AGRA LAB
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================
          7. LOCATION & MAP (Clean 2-Column Traditional Layout)
          ======================================================================== */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8 pb-4 border-b-2 border-neutral-300">
            <span className="text-xs font-black uppercase tracking-wider text-primary">
              LOCATION & DIRECTIONS
            </span>
            <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#171717] uppercase tracking-tight mt-1">
              Visit Our Agra Facility
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Column: Address, Hours, and Action */}
            <div className="lg:col-span-5 border-2 border-[#171717] p-6 sm:p-8 bg-[#F8F8F6] flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-heading font-black text-lg text-[#171717] uppercase tracking-tight">
                    Davis Pathology Lab
                  </h3>
                  <p className="text-xs text-neutral-600 mt-1 font-semibold">
                    Bhagwan Talkies Diagnostic Centre
                  </p>
                </div>

                <div className="border-t border-neutral-300 pt-3 space-y-2 text-xs">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#171717]">Laboratory Address:</strong>
                      <span className="text-neutral-700">
                        Shop No. 4, Millenium Complex, Bhagwan Talkies, Agra, Uttar Pradesh, India
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 pt-2">
                    <Clock className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#171717]">Operating Timings:</strong>
                      <span className="text-neutral-700 block">Monday to Saturday: 7:00 AM – 8:00 PM</span>
                      <span className="text-neutral-700 block">Sunday: 8:00 AM – 2:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <a
                  href="https://maps.google.com/?q=Shop+No+4+Millenium+Complex+Bhagwan+Talkies+Agra+Uttar+Pradesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button 
                    className="w-full bg-[#171717] hover:bg-black text-white font-extrabold uppercase tracking-wider text-xs h-11 border border-black"
                  >
                    <MapPin className="w-4 h-4 mr-2 text-secondary" />
                    GET GOOGLE MAPS DIRECTIONS
                  </Button>
                </a>
              </div>
            </div>

            {/* Right Column: Embedded Map with Crisp Border */}
            <div className="lg:col-span-7 h-80 sm:h-auto min-h-[320px] border-2 border-[#171717] overflow-hidden bg-neutral-200">
              <iframe
                title="Davis Pathology Lab Location Map"
                src="https://maps.google.com/maps?q=Shop%20No.%204,%20Millenium%20Complex,%20Bhagwan%20Talkies,%20Agra,%20Uttar%20Pradesh&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>

        </div>
      </section>
    </div>
  );
};
