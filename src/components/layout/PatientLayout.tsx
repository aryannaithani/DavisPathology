import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  Activity, 
  LayoutDashboard, 
  CalendarDays, 
  FileText, 
  User, 
  LogOut, 
  Menu, 
  X,
  PlusCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

export const PatientLayout: React.FC = () => {
  const { user, profile, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/patient/dashboard', icon: LayoutDashboard },
    { name: 'My Bookings', path: '/patient/bookings', icon: CalendarDays },
    { name: 'Diagnostic Reports', path: '/patient/reports', icon: FileText },
    { name: 'Profile Settings', path: '/patient/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col antialiased">
      {/* Patient Top Bar */}
      <header className="bg-white border-b-2 border-[#171717] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-[#171717] border-2 border-[#171717] flex items-center justify-center text-[#F5C542]">
                <Activity className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="font-heading font-black text-xl text-[#171717] tracking-tight">
                <span className="text-[#E94B35]">DAVIS</span> LAB
              </span>
            </Link>
            <span className="hidden sm:inline text-[10px] font-black px-2 py-0.5 bg-[#F5C542] text-[#171717] uppercase tracking-wider border border-[#171717]">
              Patient Portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/book-appointment">
              <Button size="sm" className="bg-[#E94B35] hover:bg-[#d63f2a] text-white text-xs uppercase font-bold tracking-wider rounded-none border border-[#171717] h-9 gap-1.5 hidden sm:flex">
                <PlusCircle className="w-3.5 h-3.5" />
                Book New Test
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="rounded-none border border-neutral-300 text-neutral-700 hover:text-[#E94B35] hover:border-[#E94B35] gap-1.5 h-9 text-xs font-bold uppercase tracking-wider"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-none border border-neutral-300 hover:bg-neutral-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Sub Navigation */}
        <div className="hidden md:block bg-neutral-50 border-t border-neutral-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-6">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 py-3 border-b-2 text-xs font-bold uppercase tracking-wider transition-colors ${
                    isActive
                      ? 'border-[#E94B35] text-[#E94B35] font-black'
                      : 'border-transparent text-neutral-600 hover:text-[#171717] hover:border-neutral-400'
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-neutral-200 px-4 py-3 space-y-1">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2 text-xs font-bold uppercase tracking-wider ${
                    isActive ? 'bg-[#E94B35] text-white' : 'text-neutral-700 hover:bg-neutral-100'
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </NavLink>
            ))}
            <div className="pt-2 border-t border-neutral-200">
              <Link to="/book-appointment" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-[#E94B35] text-white text-xs uppercase font-bold rounded-none h-10">
                  Book New Test
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Simplified Portal Footer */}
      <footer className="bg-[#171717] text-white border-t-2 border-[#171717] py-4 text-xs text-center">
        <div className="max-w-7xl mx-auto px-4 text-neutral-400">
          Davis Pathology Lab Agra • Patient Diagnostic Portal • Helpline: +91 98765 43210
        </div>
      </footer>
    </div>
  );
};
