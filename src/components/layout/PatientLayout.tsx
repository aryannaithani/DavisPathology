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
    <div className="min-h-screen bg-neutral-50 flex flex-col antialiased">
      {/* Patient Top Bar */}
      <header className="bg-white border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white">
                <Activity className="w-5 h-5" />
              </div>
              <span className="font-heading font-bold text-xl text-foreground tracking-tight">
                <span className="text-primary">DAVIS</span> LAB
              </span>
            </Link>
            <span className="hidden sm:inline text-xs font-semibold px-2 py-0.5 rounded bg-muted text-muted-foreground uppercase tracking-wider">
              Patient Portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/book-appointment">
              <Button size="sm" className="bg-primary text-white text-xs gap-1.5 hidden sm:flex">
                <PlusCircle className="w-3.5 h-3.5" />
                Book New Test
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="text-muted-foreground hover:text-destructive gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-muted"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Sub Navigation */}
        <div className="hidden md:block bg-white border-t border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-8">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 py-3 border-b-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'border-primary text-primary font-semibold'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-neutral-300'
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
          <div className="md:hidden border-t border-border bg-white px-4 py-3 space-y-1">
            <div className="px-3 py-2 text-xs text-muted-foreground">
              Signed in as: <strong className="text-foreground">{profile?.full_name || user?.email}</strong>
            </div>
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium ${
                    isActive
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-foreground hover:bg-muted'
                  }`
                }
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </NavLink>
            ))}
            <div className="pt-2 border-t border-border">
              <Link to="/book-appointment" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-primary text-white text-xs">
                  Book New Test
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};
