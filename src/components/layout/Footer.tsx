import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#171717] text-neutral-300 pt-16 pb-8 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-white shadow-md">
                <Activity className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="font-heading font-extrabold text-2xl text-white tracking-tight">
                <span className="text-primary">DAVIS</span> PATHOLOGY
              </span>
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6">
              Shop No. 4, Millenium Complex, Bhagwan Talkies, Agra, Uttar Pradesh. Providing reliable, affordable, and accurate pathology investigations with quick turnaround times.
            </p>
            <div className="space-y-2 text-xs text-neutral-400">
              <div className="flex items-center gap-2 text-secondary font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-secondary" />
                Accurate • Affordable • Quick
              </div>
              <p className="text-[11px] text-neutral-500">
                Note: All prices and test turnaround times shown are demonstration data and require laboratory verification.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-heading font-semibold text-base mb-4 tracking-wide uppercase text-sm border-l-2 border-primary pl-2">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/tests" className="hover:text-primary transition-colors">Diagnostic Tests</Link>
              </li>
              <li>
                <Link to="/packages" className="hover:text-primary transition-colors">Health Checkup Packages</Link>
              </li>
              <li>
                <Link to="/book-appointment" className="hover:text-primary transition-colors">Book an Appointment</Link>
              </li>
              <li>
                <Link to="/reports" className="hover:text-primary transition-colors">Download Reports</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">Contact & Location</Link>
              </li>
            </ul>
          </div>

          {/* Diagnostic Categories */}
          <div>
            <h4 className="text-white font-heading font-semibold text-base mb-4 tracking-wide uppercase text-sm border-l-2 border-secondary pl-2">
              Diagnostic Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/tests?category=hematology" className="hover:text-secondary transition-colors">
                  Hematology (CBC, ESR, Hb)
                </Link>
              </li>
              <li>
                <Link to="/tests?category=biochemistry" className="hover:text-secondary transition-colors">
                  Biochemistry (LFT, KFT, Lipids)
                </Link>
              </li>
              <li>
                <Link to="/tests?category=thyroid" className="hover:text-secondary transition-colors">
                  Thyroid & Hormonal Profiles
                </Link>
              </li>
              <li>
                <Link to="/tests?category=clinical-pathology" className="hover:text-secondary transition-colors">
                  Clinical Pathology (Urine, Stool)
                </Link>
              </li>
              <li>
                <Link to="/tests?category=serology" className="hover:text-secondary transition-colors">
                  Serology & Infectious Diseases
                </Link>
              </li>
              <li>
                <Link to="/tests?category=vitamins" className="hover:text-secondary transition-colors">
                  Vitamins & Mineral Panels
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h4 className="text-white font-heading font-semibold text-base mb-4 tracking-wide uppercase text-sm border-l-2 border-primary pl-2">
              Laboratory Hours
            </h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 text-neutral-300">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Shop No. 4, Millenium Complex, Bhagwan Talkies, Agra, UP</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-300">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+91 98765 43210 (Demonstration)</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-300">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>info@davispathology.com</span>
              </div>
              <div className="flex items-start gap-3 text-neutral-300 pt-2 border-t border-neutral-800">
                <Clock className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Mon – Sat: 7:00 AM – 8:00 PM</p>
                  <p className="text-neutral-400">Sunday: 8:00 AM – 2:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} Davis Pathology Lab. All rights reserved. Demonstration Project.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-neutral-400 cursor-pointer">Terms and Conditions</span>
            <span className="hover:text-neutral-400 cursor-pointer">Patient Charter</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
