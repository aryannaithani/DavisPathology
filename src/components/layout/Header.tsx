import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  Activity, 
  Menu, 
  X, 
  User as UserIcon, 
  LogOut, 
  LayoutDashboard, 
  ShieldAlert, 
  Phone, 
  MapPin, 
  FileDown, 
  CalendarCheck,
  Clock
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Header: React.FC = () => {
  const { user, profile, isAdmin, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Tests & Services', path: '/tests' },
    { name: 'Health Packages', path: '/packages' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b-2 border-[#171717]">
      {/* Top Traditional Information Strip - Black Background with Yellow & White Text */}
      <div className="bg-[#171717] text-white text-[11px] py-2 px-4 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 text-neutral-200">
              <MapPin className="w-3.5 h-3.5 text-secondary" />
              <span>Shop No. 4, Millenium Complex, Bhagwan Talkies, Agra, UP</span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 text-neutral-300">
              <Clock className="w-3.5 h-3.5 text-secondary" />
              <span>Mon–Sat: 7:00 AM – 8:00 PM | Sun: 8:00 AM – 2:00 PM</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-xs font-semibold">
            <a href="tel:+919876543210" className="flex items-center gap-1.5 text-secondary hover:underline">
              <Phone className="w-3.5 h-3.5" />
              <span>Tel: +91 98765 43210</span>
            </a>
            <span className="text-neutral-500">|</span>
            <span className="text-[10px] bg-secondary text-[#171717] px-2 py-0.5 font-bold uppercase tracking-wider">
              Demonstration Lab
            </span>
          </div>
        </div>
      </div>

      {/* Main Traditional Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo / Brand Name - Traditional Signboard Styling */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 bg-primary flex items-center justify-center text-white border-2 border-[#171717] shrink-0">
              <Activity className="w-6 h-6 stroke-[3]" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-xl sm:text-2xl text-[#171717] tracking-tight leading-none">
                DAVIS <span className="text-primary">PATHOLOGY</span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-[#171717] tracking-wider uppercase mt-1 border-t border-neutral-300 pt-0.5 flex items-center gap-2">
                <span>AGRA</span>
                <span className="text-secondary font-black">•</span>
                <span className="text-neutral-600 font-semibold">ESTABLISHED DIAGNOSTICS</span>
              </span>
            </div>
          </Link>

          {/* Desktop Links (Traditional, clean, rectangular hover states) */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3.5 py-2 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${
                    isActive
                      ? 'border-primary text-primary bg-neutral-50'
                      : 'border-transparent text-[#171717] hover:text-primary hover:border-neutral-300'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Download Reports Button */}
            <Link to="/reports">
              <Button
                variant="outline"
                size="sm"
                className="h-10 border-2 border-[#171717] text-[#171717] hover:bg-[#171717] hover:text-white font-bold text-xs uppercase tracking-wider gap-1.5"
              >
                <FileDown className="w-4 h-4 text-primary" />
                <span>Download Reports</span>
              </Button>
            </Link>

            {/* Book a Test Button - Rectangular Orange-Red */}
            <Link to="/book-appointment">
              <Button
                size="sm"
                className="h-10 bg-primary hover:bg-[#D63520] text-white font-bold text-xs uppercase tracking-wider gap-1.5 border border-[#171717]"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book a Test</span>
              </Button>
            </Link>

            {/* User / Authentication Dropdown */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-10 border border-neutral-300 text-xs font-bold gap-1.5 px-3">
                    <UserIcon className="w-4 h-4 text-primary" />
                    <span className="max-w-[85px] truncate">
                      {profile?.full_name?.split(' ')[0] || 'Account'}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-none border-2 border-[#171717] p-1">
                  <DropdownMenuLabel className="rounded-none bg-neutral-100 p-2">
                    <div className="text-[10px] uppercase font-bold text-neutral-500">Signed In As</div>
                    <div className="font-bold text-sm text-[#171717] truncate">{user.email}</div>
                    {isAdmin && (
                      <span className="inline-block mt-1 text-[10px] bg-red-600 text-white font-black px-1.5 py-0.2">
                        ADMINISTRATOR
                      </span>
                    )}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="my-1" />
                  <DropdownMenuItem asChild className="rounded-none cursor-pointer">
                    <Link to="/patient/dashboard" className="flex items-center">
                      <LayoutDashboard className="w-4 h-4 mr-2 text-primary" />
                      Patient Dashboard
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild className="rounded-none cursor-pointer bg-red-50 text-primary font-bold">
                      <Link to="/admin" className="flex items-center">
                        <ShieldAlert className="w-4 h-4 mr-2" />
                        Admin Console
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator className="my-1" />
                  <DropdownMenuItem onClick={handleSignOut} className="rounded-none text-destructive cursor-pointer font-semibold">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="sm" className="h-10 text-xs font-bold uppercase tracking-wider text-neutral-700 hover:text-black">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex lg:hidden items-center gap-2">
            <Link to="/book-appointment">
              <Button size="sm" className="h-9 bg-primary text-white text-xs font-bold uppercase">
                Book Test
              </Button>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border-2 border-[#171717] text-[#171717] hover:bg-neutral-100"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer (Traditional, clean rectangular list) */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t-2 border-[#171717] bg-white divide-y divide-neutral-200">
          <div className="p-3 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 text-sm font-bold uppercase tracking-wider ${
                    isActive ? 'bg-primary text-white' : 'text-[#171717] hover:bg-neutral-100'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="p-3 bg-neutral-50 flex flex-col gap-2">
            <Link to="/reports" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full justify-center h-10 border-2 border-[#171717] font-bold text-xs uppercase gap-2">
                <FileDown className="w-4 h-4 text-primary" />
                Download Reports
              </Button>
            </Link>

            {user ? (
              <>
                <Link to="/patient/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-center h-10 font-bold text-xs uppercase">
                    Patient Dashboard
                  </Button>
                </Link>
                {isAdmin && (
                  <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full justify-center h-10 bg-[#171717] text-secondary font-bold text-xs uppercase">
                      Admin Console
                    </Button>
                  </Link>
                )}
                <Button onClick={handleSignOut} variant="ghost" className="w-full text-destructive text-xs font-bold uppercase">
                  Sign Out
                </Button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full h-10 text-xs font-bold uppercase">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full h-10 bg-[#171717] text-white text-xs font-bold uppercase">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
