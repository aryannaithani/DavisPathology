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
  PhoneCall, 
  Sparkles,
  Droplets,
  FlaskConical,
  Activity,
  Microscope,
  Shield,
  Sun
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { demoCategories, demoPackages } from '@/data/demo';
import { formatPrice } from '@/lib/utils';

export const HomePage: React.FC = () => {
  const categoryIconMap: Record<string, React.ReactNode> = {
    hematology: <Droplets className="w-7 h-7 text-primary" />,
    biochemistry: <FlaskConical className="w-7 h-7 text-primary" />,
    thyroid: <Activity className="w-7 h-7 text-primary" />,
    'clinical-pathology': <Microscope className="w-7 h-7 text-primary" />,
    serology: <Shield className="w-7 h-7 text-primary" />,
    vitamins: <Sun className="w-7 h-7 text-primary" />,
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-background to-neutral-100/60 pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-border">
        {/* Subtle decorative background shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-secondary/15 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & CTA */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                Trusted Diagnostic Care in Agra
              </div>

              <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-foreground tracking-tight leading-[1.15]">
                Your Health Deserves <br />
                <span className="text-primary underline decoration-secondary decoration-wavy decoration-2">
                  Accurate Answers.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Reliable diagnostic testing made accessible. At Davis Pathology Lab, we believe quality healthcare starts with accurate results, affordable services and quick reporting.
              </p>

              {/* Three Value Propositions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white border border-border/80 shadow-xs">
                  <div className="flex items-center gap-2 text-primary font-bold text-sm">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    ACCURATE
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Reliable diagnostic testing.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-border/80 shadow-xs">
                  <div className="flex items-center gap-2 text-amber-600 font-bold text-sm">
                    <span className="w-2 h-2 rounded-full bg-secondary" />
                    AFFORDABLE
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Respects your healthcare budget.</p>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-border/80 shadow-xs">
                  <div className="flex items-center gap-2 text-primary-700 font-bold text-sm">
                    <span className="w-2 h-2 rounded-full bg-primary-600" />
                    QUICK
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Timely & efficient reporting.</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <Link to="/book-appointment">
                  <Button size="lg" className="bg-primary hover:bg-primary-600 text-white font-semibold shadow-md hover:shadow-lg transition-all h-12 px-6 gap-2">
                    <CalendarCheck className="w-5 h-5" />
                    Book a Test
                  </Button>
                </Link>
                <Link to="/tests">
                  <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-muted font-semibold h-12 px-6 gap-2">
                    <Search className="w-5 h-5 text-muted-foreground" />
                    Explore Our Services
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>Shop No. 4, Millenium Complex, Bhagwan Talkies, Agra, Uttar Pradesh</span>
              </div>
            </div>

            {/* Right Column: Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-2xl bg-white p-6 shadow-xl border border-border/80 space-y-6">
                  {/* Laboratory Card Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                        <Microscope className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="font-heading font-bold text-base text-foreground">Davis Pathology Lab</h2>
                        <p className="text-xs text-muted-foreground">Certified Quality Diagnostics</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-[10px] font-bold">
                      OPEN TODAY
                    </Badge>
                  </div>

                  {/* Highlights Grid */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 text-xs">
                      <span className="font-medium text-foreground">Home Sample Collection</span>
                      <span className="font-bold text-primary">Available across Agra</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 text-xs">
                      <span className="font-medium text-foreground">Digital PDF Reports</span>
                      <span className="font-bold text-foreground">Same-Day Download</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 text-xs">
                      <span className="font-medium text-foreground">Popular Packages</span>
                      <span className="font-bold text-amber-700">Starting ₹399*</span>
                    </div>
                  </div>

                  {/* Notice banner */}
                  <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 text-[11px] text-amber-900 leading-relaxed">
                    <strong>Note:</strong> All information and demonstration prices are for system demonstration. Prices and test availability must be confirmed with laboratory staff.
                  </div>

                  <Link to="/packages" className="block">
                    <Button variant="secondary" className="w-full font-bold bg-secondary hover:bg-amber-400 text-neutral-900 justify-between">
                      <span>View Health Checkup Packages</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST HIGHLIGHTS */}
      <section className="py-12 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            <div className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-neutral-50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="font-heading font-bold text-base text-foreground">Quality-Focused Testing</h2>
              <p className="text-xs text-muted-foreground mt-1">Calibrated equipment and strict quality protocols.</p>
            </div>

            <div className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-neutral-50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-secondary/30 flex items-center justify-center text-amber-800 mb-3">
                <IndianRupee className="w-6 h-6" />
              </div>
              <h2 className="font-heading font-bold text-base text-foreground">Affordable Diagnostic Services</h2>
              <p className="text-xs text-muted-foreground mt-1">Transparent and fair healthcare test pricing.</p>
            </div>

            <div className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-neutral-50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3">
                <Clock className="w-6 h-6" />
              </div>
              <h2 className="font-heading font-bold text-base text-foreground">Timely Reporting</h2>
              <p className="text-xs text-muted-foreground mt-1">Fast turnaround times and direct online downloads.</p>
            </div>

            <div className="flex flex-col items-center text-center p-4 rounded-xl hover:bg-neutral-50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-primary mb-3">
                <Heart className="w-6 h-6" />
              </div>
              <h2 className="font-heading font-bold text-base text-foreground">Patient-Friendly Experience</h2>
              <p className="text-xs text-muted-foreground mt-1">Gentle sample collection and clear communication.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DIAGNOSTIC SERVICES CATEGORIES */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Department Catalogue</span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mt-1">
                Diagnostic Services
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base mt-2 max-w-xl">
                Comprehensive laboratory investigations categorized by pathology discipline.
              </p>
            </div>
            <Link to="/tests">
              <Button variant="outline" className="gap-2 self-start">
                View All Tests <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoCategories.map((category) => (
              <Link
                key={category.id}
                to={`/tests?category=${category.slug}`}
                className="group"
              >
                <Card className="h-full border border-border/80 hover:border-primary/50 hover:shadow-lg transition-all duration-200">
                  <CardContent className="p-6 flex flex-col justify-between h-full">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-neutral-100 group-hover:bg-primary/10 flex items-center justify-center mb-4 transition-colors">
                        {categoryIconMap[category.slug] || <FlaskConical className="w-6 h-6 text-primary" />}
                      </div>
                      <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                        {category.description}
                      </p>
                    </div>

                    <div className="flex items-center text-xs font-semibold text-primary pt-4 mt-4 border-t border-border/50 group-hover:translate-x-1 transition-transform">
                      <span>Explore investigations</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. POPULAR HEALTH PACKAGES */}
      <section className="py-16 sm:py-20 bg-white border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-secondary bg-neutral-900 px-3 py-1 rounded-full">
              Preventive Healthcare
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mt-3">
              Popular Health Packages
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mt-2">
              Holistic screening profiles designed for routine health checks, family monitoring, and early detection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {demoPackages.map((pkg, index) => {
              const isPopular = index === 1; // Complete Health Checkup
              return (
                <div
                  key={pkg.id}
                  className={`relative rounded-2xl flex flex-col justify-between p-6 sm:p-8 transition-all ${
                    isPopular
                      ? 'bg-neutral-900 text-white shadow-xl scale-105 z-10 border-2 border-secondary'
                      : 'bg-background border border-border text-foreground hover:shadow-md'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-secondary text-neutral-900 text-[11px] font-extrabold uppercase tracking-widest px-4 py-1 rounded-full shadow-xs">
                      MOST RECOMMENDED
                    </div>
                  )}

                  <div>
                    <h3 className={`font-heading font-bold text-xl ${isPopular ? 'text-white' : 'text-foreground'}`}>
                      {pkg.name}
                    </h3>
                    <p className={`text-xs mt-2 line-clamp-2 ${isPopular ? 'text-neutral-400' : 'text-muted-foreground'}`}>
                      {pkg.description}
                    </p>

                    <div className="my-6 pb-6 border-b border-border/40">
                      <div className="text-xs uppercase tracking-wider font-semibold opacity-75">Package Price</div>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className={`text-3xl sm:text-4xl font-extrabold ${isPopular ? 'text-secondary' : 'text-primary'}`}>
                          {formatPrice(pkg.price)}
                        </span>
                        <span className="text-xs opacity-70">*Demo Price</span>
                      </div>
                    </div>

                    <div className="space-y-2.5 mb-8">
                      <div className={`text-xs font-bold uppercase tracking-wider ${isPopular ? 'text-neutral-300' : 'text-foreground'}`}>
                        Included Investigations:
                      </div>
                      <ul className="space-y-2 text-xs">
                        {pkg.tests?.map((t) => (
                          <li key={t.id} className="flex items-start gap-2">
                            <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${isPopular ? 'text-secondary' : 'text-green-600'}`} />
                            <span className={isPopular ? 'text-neutral-300' : 'text-muted-foreground'}>
                              {t.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Link to={`/book-appointment?package=${pkg.slug}`}>
                    <Button
                      className={`w-full font-bold h-11 ${
                        isPopular
                          ? 'bg-secondary hover:bg-amber-400 text-neutral-900 shadow-md'
                          : 'bg-primary hover:bg-primary-600 text-white'
                      }`}
                    >
                      Book This Package
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-10 text-xs text-muted-foreground">
            *All prices and included test combinations are demonstration records and must be confirmed prior to public booking.
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Our Core Philosophy</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground mt-2">
              Why Choose Davis Pathology Lab?
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base mt-2">
              Driven by medical integrity and patient-first diagnostics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-border shadow-xs hover:border-primary/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-2">ACCURATE</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Diagnostics you and your consulting physician can trust. We utilize calibrated analytical equipment and standard operating procedures for dependable reporting.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-border shadow-xs hover:border-amber-400 transition-all">
              <div className="w-12 h-12 rounded-xl bg-secondary/30 flex items-center justify-center text-amber-800 font-bold mb-5">
                <IndianRupee className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-2">AFFORDABLE</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Healthcare should never be out of reach. We maintain competitive, affordable pricing across all routine blood investigations and preventative health profiles.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-border shadow-xs hover:border-primary/40 transition-all">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold mb-5">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-foreground mb-2">QUICK</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Timely clinical decisions require fast report generation. Most routine investigations are reported within 4 to 8 hours with instant online portal access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. APPOINTMENT CTA BANNER */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight">
            Your Health Check Starts Here.
          </h2>
          <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto">
            Book an appointment online in less than a minute. Choose between laboratory walk-in or convenient home sample collection in Agra.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <Link to="/book-appointment">
              <Button size="lg" className="bg-white hover:bg-neutral-100 text-primary font-extrabold shadow-lg h-12 px-8">
                Book Your Appointment Now
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10 h-12 px-6">
                Contact Laboratory
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. LOCATION & MAP */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Visit Our Facility</span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-foreground">
                Easy Access in Agra
              </h2>
              <div className="p-6 rounded-2xl bg-neutral-50 border border-border space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-base text-foreground">Davis Pathology Lab</h3>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                      Shop No. 4, Millenium Complex, Bhagwan Talkies, Agra, Uttar Pradesh, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-border/80">
                  <Clock className="w-5 h-5 text-secondary shrink-0 mt-1" />
                  <div className="text-xs text-muted-foreground">
                    <p className="font-semibold text-foreground">Operational Timings:</p>
                    <p>Monday – Saturday: 7:00 AM – 8:00 PM</p>
                    <p>Sunday: 8:00 AM – 2:00 PM</p>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="https://maps.google.com/?q=Shop+No+4+Millenium+Complex+Bhagwan+Talkies+Agra+Uttar+Pradesh"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="w-full gap-2 font-semibold">
                      <MapPin className="w-4 h-4 text-primary" />
                      Open in Google Maps / Directions
                    </Button>
                  </a>
                </div>
              </div>
            </div>

            {/* Map Container */}
            <div className="lg:col-span-7 h-80 sm:h-96 rounded-2xl overflow-hidden border border-border shadow-md bg-neutral-200">
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
