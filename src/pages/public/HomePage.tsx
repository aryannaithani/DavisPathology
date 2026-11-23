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
          1. HERO SECTION — Left text fading into right lab photograph
          Inspired by the AIIMS reference: clean text on left, building photo on right
          ======================================================================== */}
      <section className="relative w-full overflow-hidden bg-white border-b-4 border-[#F1654C]">
        <div className="relative min-h-[420px] sm:min-h-[480px] lg:min-h-[520px] flex items-stretch">

          {/* Left Content Area (transparent on mobile so the low-opacity lab image shows through, gradient on desktop) */}
          <div className="relative z-20 w-full lg:w-[55%] flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-12 sm:py-16 bg-transparent lg:bg-gradient-to-r lg:from-white lg:via-white lg:to-transparent">
            
            {/* Lab Emblem / Crest */}
            <div className="mb-6 flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#171717] border-2 border-[#F5C542] flex items-center justify-center text-[#F5C542] shrink-0">
                <Activity className="w-10 h-10 sm:w-12 sm:h-12 stroke-[2]" />
              </div>
              <div className="hidden sm:block text-[10px] font-bold text-neutral-500 uppercase tracking-widest leading-snug">
                Diagnostic Laboratory<br />
                Millenium Complex, Agra
              </div>
            </div>

            {/* Lab Name — Large, bold, like AIIMS blue name */}
            <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-[#F1654C] tracking-tight leading-tight uppercase">
              Davis Pathology Lab,<br />
              <span className="text-[#171717]">Agra</span>
            </h1>

            {/* Slogan / Description */}
            <h2 className="mt-4 font-heading font-bold text-base sm:text-lg lg:text-xl text-[#171717] leading-snug max-w-lg">
              Accurate Diagnostics. Affordable Healthcare. Quick Results —{' '}
              <span className="text-neutral-600 font-normal">
                Your trusted neighbourhood pathology laboratory for reliable blood testing and diagnostic services.
              </span>
            </h2>

            {/* Value Badges */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="bg-[#171717] text-[#F5C542] text-[10px] font-black uppercase tracking-widest px-3 py-1.5 border border-[#171717]">
                ✓ Accurate
              </span>
              <span className="bg-[#F1654C] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 border border-[#F1654C]">
                ✓ Affordable
              </span>
              <span className="bg-[#F5C542] text-[#171717] text-[10px] font-black uppercase tracking-widest px-3 py-1.5 border border-[#F5C542]">
                ✓ Quick
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link to="/book-appointment">
                <Button 
                  size="lg" 
                  className="bg-[#F1654C] hover:bg-[#DF472B] text-white font-extrabold uppercase tracking-wider text-xs h-11 px-6 border-2 border-[#171717] rounded-none shadow-[3px_3px_0px_0px_#171717]"
                >
                  <CalendarCheck className="w-4 h-4 mr-2" />
                  Book a Test
                </Button>
              </Link>
              <Link to="/tests">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="text-[#171717] font-extrabold uppercase tracking-wider text-xs h-11 px-6 border-2 border-[#171717] hover:bg-[#171717] hover:text-[#F5C542] rounded-none shadow-[3px_3px_0px_0px_#F5C542]"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Explore Services
                </Button>
              </Link>
            </div>

            {/* Address line */}
            <div className="mt-5 flex items-center gap-2 text-xs text-neutral-600 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#F1654C] shrink-0" />
              <span>Shop No. 4, Millenium Complex, Bhagwan Talkies, Agra, Uttar Pradesh</span>
            </div>
          </div>

          {/* Right: Laboratory Photograph with Left-Fade */}
          <div className="hidden lg:block absolute top-0 right-0 w-[55%] h-full">
            <img
              src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1400&q=85"
              alt="Pathology laboratory professionals working with diagnostic equipment"
              className="w-full h-full object-cover"
            />
            {/* Gradient fade from left (white) into the image */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent" />
          </div>

          {/* Mobile: Show image as a low-opacity full-width background */}
          <div className="lg:hidden absolute inset-0 z-0 w-full h-full">
            <img
              src="https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=75"
              alt="Laboratory"
              className="w-full h-full object-cover opacity-15"
            />
            <div className="absolute inset-0 bg-white/60" />
          </div>
        </div>
      </section>

      {/* ========================================================================
          2. TRUST HIGHLIGHTS (Clean Horizontal Bar with Brand Color Tops)
          ======================================================================== */}
      <section className="bg-white border-b-2 border-[#171717]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-neutral-300">
            
            <div className="p-6 flex items-start gap-4 border-t-4 border-[#F1654C] bg-white">
              <div className="w-10 h-10 bg-[#F1654C] text-white flex items-center justify-center shrink-0 border border-black font-bold">
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

            <div className="p-6 flex items-start gap-4 border-t-4 border-[#F5C542] bg-white">
              <div className="w-10 h-10 bg-[#F5C542] text-[#171717] flex items-center justify-center shrink-0 border border-black font-bold">
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

            <div className="p-6 flex items-start gap-4 border-t-4 border-[#171717] bg-white">
              <div className="w-10 h-10 bg-[#171717] text-[#F5C542] flex items-center justify-center shrink-0 border border-black font-bold">
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

            <div className="p-6 flex items-start gap-4 border-t-4 border-[#F1654C] bg-white">
              <div className="w-10 h-10 bg-[#F1654C] text-white flex items-center justify-center shrink-0 border border-black font-bold">
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
          3. DIAGNOSTIC SERVICES (Rectangular Grid with Brand Color Tops)
          ======================================================================== */}
      <section className="py-14 sm:py-16 bg-[#F8F8F6] border-b-2 border-[#171717]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b-2 border-neutral-300 gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-[#F1654C] bg-[#F1654C]/10 px-2 py-0.5 border border-[#F1654C]/30 inline-block">
                LABORATORY DEPARTMENTS
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#171717] uppercase tracking-tight mt-1.5">
                Diagnostic Services
              </h2>
            </div>
            <Link to="/tests">
              <Button 
                variant="outline" 
                size="sm"
                className="h-9 border-2 border-[#171717] font-bold text-xs uppercase tracking-wider text-[#171717] hover:bg-[#171717] hover:text-[#F5C542] rounded-none shadow-[2px_2px_0px_0px_#171717]"
              >
                <span>View Full Test Catalogue</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>

          {/* 6 Rectangular Service Containers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {demoCategories.map((category, idx) => {
              const borderColors = ['border-t-4 border-t-[#F1654C]', 'border-t-4 border-t-[#F5C542]', 'border-t-4 border-t-[#171717]'];
              const iconBg = [
                'bg-[#F1654C]/10 text-[#F1654C] border border-[#F1654C]/40',
                'bg-[#F5C542]/20 text-[#171717] border border-[#F5C542]',
                'bg-[#171717] text-[#F5C542] border border-[#171717]'
              ];
              const styleIdx = idx % 3;
              return (
                <div
                  key={category.id}
                  className={`bg-white border-2 border-[#171717] p-6 flex flex-col justify-between hover:shadow-[4px_4px_0px_0px_#171717] transition-all ${borderColors[styleIdx]}`}
                >
                  <div>
                    <div className={`w-11 h-11 flex items-center justify-center mb-4 ${iconBg[styleIdx]}`}>
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
                      className="inline-flex items-center text-xs font-black uppercase tracking-wider text-[#F1654C] hover:text-[#DF472B] transition-colors"
                    >
                      <span>View Tests</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================
          4. POPULAR HEALTH PACKAGES
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
              const isPopular = index === 1;
              return (
                <div
                  key={pkg.id}
                  className={`border-2 flex flex-col justify-between p-6 sm:p-7 bg-white relative ${
                    isPopular
                      ? 'border-[#171717] shadow-[5px_5px_0px_0px_#171717]'
                      : 'border-neutral-300 hover:border-neutral-800'
                  }`}
                >
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

                    <div className="my-5 p-3.5 bg-neutral-50 border-y border-neutral-200">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                        Package Fee
                      </div>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="font-heading font-black text-3xl text-[#F1654C]">
                          {formatPrice(pkg.price)}
                        </span>
                        <span className="text-[11px] text-neutral-500 font-bold">*All-Inclusive</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      <div className="text-[11px] font-black uppercase tracking-wider text-[#171717]">
                        Included Tests:
                      </div>
                      <ul className="space-y-1.5 text-xs text-neutral-700">
                        {pkg.tests?.map((t) => (
                          <li key={t.id} className="flex items-start gap-2">
                            <span className="text-[#F1654C] font-bold">✓</span>
                            <span>{t.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <Link to={`/book-appointment?package=${pkg.slug}`}>
                      <Button
                        className={`w-full font-extrabold uppercase tracking-wider text-xs h-11 border border-[#171717] rounded-none ${
                          isPopular
                            ? 'bg-secondary hover:bg-[#E6AD1E] text-[#171717]'
                            : 'bg-[#F1654C] hover:bg-[#DF472B] text-white'
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
        </div>
      </section>

      {/* ========================================================================
          5. WHY CHOOSE US (Bold 3-Column Layout: Black, Orange, Yellow)
          ======================================================================== */}
      <section className="border-b-2 border-[#171717]">
        <div className="grid grid-cols-1 md:grid-cols-3">
          
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

          <div className="bg-[#F1654C] text-white p-8 sm:p-10 border-b-2 md:border-b-0 md:border-r-2 border-black flex flex-col justify-between">
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
          6. APPOINTMENT CTA
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
                  className="bg-[#F1654C] hover:bg-[#DF472B] text-white font-extrabold uppercase tracking-wider text-xs sm:text-sm h-12 px-8 border-2 border-white rounded-none shadow-[4px_4px_0px_0px_#F5C542]"
                >
                  BOOK YOUR APPOINTMENT
                </Button>
              </Link>
              <Link to="/contact">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent border-2 border-secondary text-secondary hover:bg-secondary hover:text-[#171717] font-extrabold uppercase tracking-wider text-xs sm:text-sm h-12 px-7 rounded-none"
                >
                  CONTACT OUR AGRA LAB
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================
          7. LOCATION & MAP
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
                    className="w-full bg-[#171717] hover:bg-black text-white font-extrabold uppercase tracking-wider text-xs h-11 border border-black rounded-none"
                  >
                    <MapPin className="w-4 h-4 mr-2 text-secondary" />
                    GET GOOGLE MAPS DIRECTIONS
                  </Button>
                </a>
              </div>
            </div>

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
