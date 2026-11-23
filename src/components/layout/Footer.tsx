import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, MapPin, Phone, Mail, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#171717] text-white border-t-4 border-primary">
      {/* Upper Color Bar Accent */}
      <div className="h-1.5 w-full bg-secondary" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Column 1: About Davis Pathology Lab */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-primary flex items-center justify-center text-white border border-secondary shrink-0">
                <Activity className="w-5 h-5 stroke-[3]" />
              </div>
              <span className="font-heading font-black text-xl text-white tracking-tight">
                DAVIS <span className="text-secondary">PATHOLOGY</span>
              </span>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed">
              Established diagnostic and pathology laboratory located at Millenium Complex, Bhagwan Talkies, Agra. Providing accurate clinical investigations, transparent pricing, and rapid verified reporting.
            </p>

            <div className="border border-neutral-700 bg-neutral-900/80 p-3 space-y-1">
              <div className="text-[10px] uppercase font-bold tracking-widest text-secondary">
                Our Core Promise
              </div>
              <div className="text-xs font-bold text-white flex items-center gap-2">
                <span className="text-primary">ACCURATE</span> • 
                <span className="text-secondary">AFFORDABLE</span> • 
                <span className="text-white">QUICK</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-secondary border-b-2 border-secondary pb-1.5 mb-3 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link to="/" className="text-neutral-300 hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="text-primary font-bold">›</span> Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-300 hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="text-primary font-bold">›</span> About Our Laboratory
                </Link>
              </li>
              <li>
                <Link to="/tests" className="text-neutral-300 hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="text-primary font-bold">›</span> Diagnostic Test Directory
                </Link>
              </li>
              <li>
                <Link to="/packages" className="text-neutral-300 hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="text-primary font-bold">›</span> Health Checkup Packages
                </Link>
              </li>
              <li>
                <Link to="/book-appointment" className="text-neutral-300 hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="text-primary font-bold">›</span> Book Diagnostic Appointment
                </Link>
              </li>
              <li>
                <Link to="/reports" className="text-neutral-300 hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="text-primary font-bold">›</span> Download Reports Online
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-neutral-300 hover:text-primary transition-colors flex items-center gap-1.5">
                  <span className="text-primary font-bold">›</span> Contact & Directions
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Diagnostic Services */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-secondary border-b-2 border-secondary pb-1.5 mb-3 inline-block">
              Diagnostic Services
            </h3>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link to="/tests?category=hematology" className="text-neutral-300 hover:text-secondary transition-colors flex items-center gap-1.5">
                  <span className="text-secondary font-bold">■</span> Hematology & Blood Cell Analysis
                </Link>
              </li>
              <li>
                <Link to="/tests?category=biochemistry" className="text-neutral-300 hover:text-secondary transition-colors flex items-center gap-1.5">
                  <span className="text-secondary font-bold">■</span> Clinical Biochemistry (LFT / KFT)
                </Link>
              </li>
              <li>
                <Link to="/tests?category=thyroid" className="text-neutral-300 hover:text-secondary transition-colors flex items-center gap-1.5">
                  <span className="text-secondary font-bold">■</span> Thyroid & Hormonal Testing
                </Link>
              </li>
              <li>
                <Link to="/tests?category=clinical-pathology" className="text-neutral-300 hover:text-secondary transition-colors flex items-center gap-1.5">
                  <span className="text-secondary font-bold">■</span> Clinical Pathology (Urine / Stool)
                </Link>
              </li>
              <li>
                <Link to="/tests?category=serology" className="text-neutral-300 hover:text-secondary transition-colors flex items-center gap-1.5">
                  <span className="text-secondary font-bold">■</span> Serology & Infectious Markers
                </Link>
              </li>
              <li>
                <Link to="/tests?category=vitamins" className="text-neutral-300 hover:text-secondary transition-colors flex items-center gap-1.5">
                  <span className="text-secondary font-bold">■</span> Vitamins & Minerals Panels
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Hours */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-secondary border-b-2 border-secondary pb-1.5 mb-3 inline-block">
              Agra Laboratory
            </h3>

            <div className="text-xs space-y-2.5 text-neutral-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Shop No. 4, Millenium Complex, Bhagwan Talkies, Agra, Uttar Pradesh</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-secondary shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white">+91 98765 43210 (Demo)</a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>info@davispathology.com</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-neutral-800 text-xs">
              <div className="flex items-center gap-1.5 text-secondary font-bold mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Timings:</span>
              </div>
              <p className="text-neutral-400 text-[11px]">Mon–Sat: 7:00 AM – 8:00 PM</p>
              <p className="text-neutral-400 text-[11px]">Sunday: 8:00 AM – 2:00 PM</p>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="border-t border-neutral-800 pt-6 mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-neutral-400">
          <div>
            © {new Date().getFullYear()} Davis Pathology Lab, Agra. All rights reserved. 
            <span className="ml-2 text-secondary font-semibold">Demonstration Web Application</span>
          </div>
          <div className="flex items-center gap-4 text-neutral-400">
            <span>Accuracy Standards</span>
            <span>•</span>
            <span>Patient Charter</span>
            <span>•</span>
            <span>Privacy Guidelines</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
