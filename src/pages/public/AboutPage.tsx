import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  IndianRupee, 
  Clock, 
  Heart, 
  Award, 
  Users, 
  Microscope, 
  CalendarCheck,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const AboutPage: React.FC = () => {
  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <PageHeader
        title="About Davis Pathology Lab"
        subtitle="Dedicated to clinical accuracy, affordable diagnostics, and patient-centered service in Agra."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About Us' },
        ]}
      />

      {/* Disclaimer Alert */}
      <div className="mb-10 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold">Demonstration Web Application:</strong> Davis Pathology Lab is a demonstration project. All business information, diagnostic pricing, test procedures, staff profiles, and turnaround times are realistic mock data for evaluation and must be verified before clinical use.
        </div>
      </div>

      {/* Story / Mission Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
        <div className="lg:col-span-7 space-y-5">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Our Story</span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-foreground">
            Committed to Quality Diagnostics for the People of Agra
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Established at Shop No. 4, Millenium Complex, near Bhagwan Talkies in Agra, Davis Pathology Lab was founded with a singular conviction: that accurate diagnostic information is the bedrock of effective medical treatment.
          </p>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Too often, patients and families face confusing diagnostic charges, long waiting times, or inconsistent testing standards. Our laboratory bridges this gap by combining modern analytical instruments with transparent, affordable pricing and swift report delivery.
          </p>
          <div className="pt-2">
            <Link to="/book-appointment">
              <Button className="bg-primary hover:bg-primary-600 text-white font-semibold gap-2">
                <CalendarCheck className="w-4 h-4" />
                Book a Diagnostic Test
              </Button>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 bg-white p-8 rounded-2xl border border-border shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
              <Microscope className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-foreground">Our Core Mission</h3>
              <p className="text-xs text-muted-foreground">Patient-centric diagnostic care</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            "To deliver dependable, clinical-grade diagnostic reports at accessible prices, empowering patients and physicians to make timely, life-saving healthcare decisions."
          </p>
          <div className="space-y-2.5 pt-2 border-t border-border/80">
            <div className="flex items-center gap-2 text-xs font-medium text-foreground">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>Standardized internal calibration procedures</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-foreground">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>Trained phlebotomists for gentle sample extraction</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-foreground">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span>Strict patient data confidentiality and privacy</span>
            </div>
          </div>
        </div>
      </div>

      {/* The 3 Core Pillars */}
      <div className="mb-16">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-foreground">
            The Three Pillars of Davis Pathology
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-2">
            Every test we process is guided by our primary brand values.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-border hover:border-primary/50 transition-colors">
            <CardContent className="p-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground">ACCURATE</h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Precision is non-negotiable in medical pathology. We maintain strict internal quality checks and calibrated automated analyzers to ensure your doctor receives reliable results.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border hover:border-amber-400 transition-colors">
            <CardContent className="p-6">
              <div className="w-10 h-10 rounded-lg bg-secondary/30 flex items-center justify-center text-amber-800 mb-4 font-bold">
                <IndianRupee className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground">AFFORDABLE</h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Diagnostic monitoring is essential for disease prevention. Our test rates and packaged profiles are priced fairly so routine healthcare remains accessible to all families in Agra.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border hover:border-primary/50 transition-colors">
            <CardContent className="p-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground">QUICK</h3>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Anxious waiting shouldn't compound medical concern. We strive for same-day digital report release, allowing you and your physician to proceed with treatment without delay.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Target Audiences Served */}
      <div className="p-8 rounded-2xl bg-neutral-900 text-white mb-16">
        <h2 className="font-heading font-bold text-2xl mb-6 text-center">
          Who We Serve in Our Community
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
          <div className="p-4 rounded-xl bg-neutral-800/60 border border-neutral-700/60">
            <h4 className="font-bold text-secondary mb-1">Individual Patients & Walk-Ins</h4>
            <p className="text-xs text-neutral-300">Quick, hassle-free diagnostic investigations with no appointment required for routine blood checks.</p>
          </div>
          <div className="p-4 rounded-xl bg-neutral-800/60 border border-neutral-700/60">
            <h4 className="font-bold text-secondary mb-1">Families & Households</h4>
            <p className="text-xs text-neutral-300">Comprehensive health packages covering parents, spouses, and children under one trusted roof.</p>
          </div>
          <div className="p-4 rounded-xl bg-neutral-800/60 border border-neutral-700/60">
            <h4 className="font-bold text-secondary mb-1">Senior Citizens</h4>
            <p className="text-xs text-neutral-300">Gentle care and home collection services so elders can avoid stressful laboratory commutes.</p>
          </div>
          <div className="p-4 rounded-xl bg-neutral-800/60 border border-neutral-700/60">
            <h4 className="font-bold text-secondary mb-1">Chronic Disease Monitoring</h4>
            <p className="text-xs text-neutral-300">Frequent HbA1c, thyroid, and lipid monitoring at discounted routine testing rates.</p>
          </div>
          <div className="p-4 rounded-xl bg-neutral-800/60 border border-neutral-700/60">
            <h4 className="font-bold text-secondary mb-1">Referring Doctors & Clinicians</h4>
            <p className="text-xs text-neutral-300">Prompt delivery of verified parameters to assist clinicians with diagnostic clarity.</p>
          </div>
          <div className="p-4 rounded-xl bg-neutral-800/60 border border-neutral-700/60">
            <h4 className="font-bold text-secondary mb-1">Annual Health Screenings</h4>
            <p className="text-xs text-neutral-300">Preventative wellness checkups to identify health markers before symptoms arise.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
