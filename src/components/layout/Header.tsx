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
  Clock,
  Home,
  FlaskConical,
  Boxes,
  BookOpen,
  FileText,
  MessageSquare,
  Info
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
    { name: 'Home', path: '/', icon: Home },
    { name: 'About Us', path: '/about', icon: Info },
    { name: 'Diagnostic Tests', path: '/tests', icon: FlaskConical },
    { name: 'Health Packages', path: '/packages', icon: Boxes },
    { name: 'Book Appointment', path: '/book-appointment', icon: CalendarCheck },
    { name: 'Reports', path: '/reports', icon: FileText },
    { name: 'Contact', path: '/contact', icon: MessageSquare },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* ===== ROW 1: Top Notice/Alert Strip (like AIIMS yellow strip) ===== */}
      <div className="bg-[#F5C542] text-[#171717] text-[11px] py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 font-bold">
          <span className="text-[#E94B35]">📢</span>
          <span className="font-black uppercase tracking-wider">Important:</span>
          <span>All prices and data shown are for demonstration purposes only. Contact laboratory for verified information.</span>
        </div>
      </div>

      {/* ===== ROW 2: Brand Name + Action Buttons (like AIIMS logo row) ===== */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-[72px]">
            
            {/* Left: Logo + Lab Name + Location */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#171717] flex items-center justify-center text-[#F5C542] shrink-0 border-2 border-[#171717]">
                <Activity className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-lg sm:text-xl lg:text-2xl text-[#171717] tracking-tight leading-tight">
                  DAVIS PATHOLOGY LAB
                </span>
                <span className="text-[10px] sm:text-[11px] text-neutral-500 font-semibold tracking-wide">
                  Shop No. 4, Millenium Complex, Bhagwan Talkies, Agra, UP
                </span>
              </div>
            </Link>

            {/* Right: Action Buttons (like AIIMS About/Tr/Accessibility buttons) */}
            <div className="hidden sm:flex items-center gap-2">
              <Link to="/about">
                <Button
                  size="sm"
                  className="h-9 bg-[#171717] hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider rounded-none px-4"
                >
                  About
                </Button>
              </Link>
              <Link to="/reports">
                <Button
                  size="sm"
                  className="h-9 bg-[#171717] hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider rounded-none px-4"
                >
                  <FileDown className="w-3.5 h-3.5 mr-1.5" />
                  Reports
                </Button>
              </Link>
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" className="h-9 bg-[#E94B35] hover:bg-[#D63520] text-white font-bold text-xs uppercase tracking-wider rounded-none px-4">
                      <UserIcon className="w-3.5 h-3.5 mr-1.5" />
                      {profile?.full_name?.split(' ')[0] || 'Account'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 rounded-none border-2 border-[#171717] p-1">
                    <DropdownMenuLabel className="rounded-none bg-neutral-100 p-2">
                      <div className="text-[10px] uppercase font-bold text-neutral-500">Signed In As</div>
                      <div className="font-bold text-sm text-[#171717] truncate">{user.email}</div>
                      {isAdmin && (
                        <span className="inline-block mt-1 text-[10px] bg-red-600 text-white font-black px-1.5 py-0.5">
                          ADMINISTRATOR
                        </span>
                      )}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="my-1" />
                    <DropdownMenuItem asChild className="rounded-none cursor-pointer">
                      <Link to="/patient/dashboard" className="flex items-center">
                        <LayoutDashboard className="w-4 h-4 mr-2 text-[#E94B35]" />
                        Patient Dashboard
                      </Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem asChild className="rounded-none cursor-pointer bg-red-50 text-[#E94B35] font-bold">
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
                  <Button size="sm" className="h-9 bg-[#E94B35] hover:bg-[#D63520] text-white font-bold text-xs uppercase tracking-wider rounded-none px-4">
                    <UserIcon className="w-3.5 h-3.5 mr-1.5" />
                    Sign In
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Trigger */}
            <div className="flex sm:hidden items-center gap-2">
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
      </div>

      {/* ===== ROW 3: Navigation Bar (like AIIMS blue nav bar) ===== */}
      <div className="hidden lg:block bg-[#171717] border-b-2 border-[#E94B35]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-0">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-4 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                    isActive
                      ? 'border-[#F5C542] text-[#F5C542] bg-neutral-900'
                      : 'border-transparent text-neutral-300 hover:text-white hover:bg-neutral-800'
                  }`
                }
              >
                <link.icon className="w-3.5 h-3.5" />
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t-2 border-[#171717] bg-white divide-y divide-neutral-200">
          <div className="p-3 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2.5 text-sm font-bold uppercase tracking-wider ${
                    isActive ? 'bg-[#E94B35] text-white' : 'text-[#171717] hover:bg-neutral-100'
                  }`
                }
              >
                <link.icon className="w-4 h-4" />
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="p-3 bg-neutral-50 flex flex-col gap-2">
            <Link to="/book-appointment" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full h-10 bg-[#E94B35] text-white text-xs font-bold uppercase rounded-none">
                <CalendarCheck className="w-4 h-4 mr-2" />
                Book a Test
              </Button>
            </Link>
            <Link to="/reports" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full h-10 border-2 border-[#171717] font-bold text-xs uppercase rounded-none gap-2">
                <FileDown className="w-4 h-4 text-[#E94B35]" />
                Download Reports
              </Button>
            </Link>

            {user ? (
              <>
                <Link to="/patient/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full h-10 font-bold text-xs uppercase rounded-none">
                    Patient Dashboard
                  </Button>
                </Link>
                {isAdmin && (
                  <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full h-10 bg-[#171717] text-[#F5C542] font-bold text-xs uppercase rounded-none">
                      Admin Console
                    </Button>
                  </Link>
                )}
                <Button onClick={handleSignOut} variant="ghost" className="w-full text-destructive text-xs font-bold uppercase rounded-none">
                  Sign Out
                </Button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full h-10 text-xs font-bold uppercase rounded-none border-2 border-[#171717]">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full h-10 bg-[#171717] text-white text-xs font-bold uppercase rounded-none">
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
