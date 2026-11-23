import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  IndianRupee, 
  Clock, 
  Microscope, 
  CalendarCheck,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';

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

      {/* Demonstration Alert Strip (Yellow Accent) */}
      <div className="mb-10 p-4 border-2 border-secondary bg-secondary/15 flex items-start gap-3 text-xs text-[#171717]">
        <AlertTriangle className="w-5 h-5 text-[#171717] shrink-0 mt-0.5" />
        <div>
          <strong className="font-extrabold uppercase">Demonstration Project Notice:</strong> Davis Pathology Lab is an interactive diagnostic laboratory web application and management system. All business information, diagnostic pricing, test procedures, staff profiles, and turnaround times are realistic demonstration records.
        </div>
      </div>

      {/* Story & Mission Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
        
        {/* Left: Our Story */}
        <div className="lg:col-span-7 bg-white border-2 border-[#171717] p-6 sm:p-8 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="border-b-2 border-neutral-200 pb-2">
              <span className="text-xs font-black uppercase tracking-wider text-primary">
                LOCAL PATHOLOGY IN AGRA
              </span>
              <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#171717] uppercase tracking-tight mt-1">
                Quality Diagnostics for Our Community
              </h2>
            </div>
            
            <p className="text-sm text-neutral-700 leading-relaxed font-normal">
              Located at Shop No. 4, Millenium Complex, near Bhagwan Talkies in Agra, Davis Pathology Lab was established with a singular conviction: that accurate diagnostic investigations form the indispensable foundation of clinical healthcare.
            </p>
            <p className="text-sm text-neutral-700 leading-relaxed font-normal">
              Too often, patients and families encounter confusing fee structures, prolonged waiting periods, or uncertain reporting timelines. We resolve this by combining modern automated analytical instruments with honest, affordable rates and rapid report delivery.
            </p>
          </div>

          <div className="pt-4 border-t border-neutral-200">
            <Link to="/book-appointment">
              <Button className="bg-primary hover:bg-[#D63520] text-white font-extrabold uppercase tracking-wider text-xs h-11 px-6 border border-[#171717]">
                <CalendarCheck className="w-4 h-4 mr-2" />
                Book a Diagnostic Test
              </Button>
            </Link>
          </div>
        </div>

        {/* Right: Mission Box */}
        <div className="lg:col-span-5 bg-[#171717] text-white border-2 border-black p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 border-b border-neutral-800 pb-3">
              <div className="w-10 h-10 bg-secondary text-[#171717] flex items-center justify-center font-black">
                <Microscope className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-secondary tracking-widest block">
                  Core Purpose
                </span>
                <h3 className="font-heading font-black text-lg text-white uppercase tracking-tight">
                  Our Laboratory Mission
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic border-l-2 border-secondary pl-3">
              "To deliver dependable, clinical-grade diagnostic reports at accessible prices, empowering patients and referring physicians to make timely, informed medical decisions."
            </p>

            <div className="space-y-2.5 pt-2 text-xs">
              <div className="flex items-center gap-2 text-neutral-200 font-medium">
                <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                <span>Calibrated hematology & biochemistry analyzers</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-200 font-medium">
                <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                <span>Trained phlebotomists for gentle blood draws</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-200 font-medium">
                <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                <span>Private, encrypted digital patient report access</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-neutral-400 font-bold uppercase tracking-wider border-t border-neutral-800 pt-3">
            Bhagwan Talkies, Agra • Uttar Pradesh
          </div>
        </div>

      </div>

      {/* The 3 Core Pillars */}
      <div className="mb-16">
        <div className="mb-6 pb-2 border-b-2 border-neutral-300">
          <span className="text-xs font-black uppercase tracking-wider text-primary">
            FOUNDATIONAL VALUES
          </span>
          <h2 className="font-heading font-black text-2xl text-[#171717] uppercase tracking-tight mt-0.5">
            The Three Pillars of Davis Pathology Lab
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#171717] text-white p-6 border-2 border-black flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 bg-secondary text-[#171717] flex items-center justify-center font-black mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-black text-xl text-white uppercase tracking-tight mb-2">
                ACCURATE
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed font-normal">
                Precision is non-negotiable in medical investigations. We maintain strict internal quality checks and standardized sample handling to ensure physicians receive dependable diagnostic parameters.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-neutral-800 text-[10px] font-bold text-secondary uppercase tracking-widest">
              Standard Operating Procedures
            </div>
          </div>

          <div className="bg-primary text-white p-6 border-2 border-black flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 bg-[#171717] text-white flex items-center justify-center font-black mb-4">
                <IndianRupee className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-black text-xl text-white uppercase tracking-tight mb-2">
                AFFORDABLE
              </h3>
              <p className="text-xs text-white/95 leading-relaxed font-normal">
                Preventive health monitoring must be economically feasible for families. Our test tariffs and bundled packages are structured fairly without compromising reagent or analytical quality.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-white/20 text-[10px] font-bold text-white uppercase tracking-widest">
              Fair & Transparent Pricing
            </div>
          </div>

          <div className="bg-secondary text-[#171717] p-6 border-2 border-black flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 bg-[#171717] text-secondary flex items-center justify-center font-black mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-black text-xl text-[#171717] uppercase tracking-tight mb-2">
                QUICK
              </h3>
              <p className="text-xs text-neutral-900 leading-relaxed font-normal">
                Prompt diagnosis prevents treatment delays. Routine investigations are reported within 4 to 8 hours with instant, authenticated access through our online report portal.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-neutral-900/30 text-[10px] font-bold text-[#171717] uppercase tracking-widest">
              Same-Day Report Delivery
            </div>
          </div>
        </div>
      </div>

      {/* Target Audiences Served */}
      <div className="border-2 border-[#171717] bg-white p-8">
        <div className="mb-6 pb-2 border-b-2 border-neutral-200">
          <span className="text-xs font-black uppercase tracking-wider text-primary">
            WHO WE SERVE
          </span>
          <h2 className="font-heading font-black text-xl text-[#171717] uppercase tracking-tight mt-0.5">
            Diagnostic Care for Patients, Families & Clinicians
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
          <div className="p-4 bg-neutral-50 border border-neutral-300">
            <h4 className="font-bold text-[#171717] uppercase text-xs mb-1.5 border-b border-neutral-200 pb-1">
              Individual Walk-In Patients
            </h4>
            <p className="text-neutral-600 leading-relaxed">
              Convenient walk-in blood sample collection with minimal waiting times at our Bhagwan Talkies lab counter.
            </p>
          </div>

          <div className="p-4 bg-neutral-50 border border-neutral-300">
            <h4 className="font-bold text-[#171717] uppercase text-xs mb-1.5 border-b border-neutral-200 pb-1">
              Families & Households
            </h4>
            <p className="text-neutral-600 leading-relaxed">
              Comprehensive preventive health packages covering pediatric, adult, and geriatric family members.
            </p>
          </div>

          <div className="p-4 bg-neutral-50 border border-neutral-300">
            <h4 className="font-bold text-[#171717] uppercase text-xs mb-1.5 border-b border-neutral-200 pb-1">
              Senior Citizens
            </h4>
            <p className="text-neutral-600 leading-relaxed">
              Gentle home sample collection across Agra so elders can avoid travel and laboratory queues.
            </p>
          </div>

          <div className="p-4 bg-neutral-50 border border-neutral-300">
            <h4 className="font-bold text-[#171717] uppercase text-xs mb-1.5 border-b border-neutral-200 pb-1">
              Chronic Disease Monitoring
            </h4>
            <p className="text-neutral-600 leading-relaxed">
              Regular blood sugar, HbA1c, lipid, and thyroid monitoring at economical repeat testing rates.
            </p>
          </div>

          <div className="p-4 bg-neutral-50 border border-neutral-300">
            <h4 className="font-bold text-[#171717] uppercase text-xs mb-1.5 border-b border-neutral-200 pb-1">
              Referring Doctors & Clinics
            </h4>
            <p className="text-neutral-600 leading-relaxed">
              Prompt delivery of verified parameters to support consulting clinicians with accurate clinical decisions.
            </p>
          </div>

          <div className="p-4 bg-neutral-50 border border-neutral-300">
            <h4 className="font-bold text-[#171717] uppercase text-xs mb-1.5 border-b border-neutral-200 pb-1">
              Corporate & Annual Checks
            </h4>
            <p className="text-neutral-600 leading-relaxed">
              Structured annual preventive screenings to detect early metabolic and cardiovascular risk factors.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
