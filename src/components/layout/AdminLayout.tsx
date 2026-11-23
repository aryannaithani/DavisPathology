import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  Activity, 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  FlaskConical, 
  Boxes, 
  FileText, 
  Settings, 
  MessageSquareQuote, 
  LogOut, 
  Menu, 
  X, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

export const AdminLayout: React.FC = () => {
  const { user, profile, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard Overview', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Manage Bookings', path: '/admin/bookings', icon: CalendarDays },
    { name: 'Registered Patients', path: '/admin/patients', icon: Users },
    { name: 'Diagnostic Tests', path: '/admin/tests', icon: FlaskConical },
    { name: 'Health Packages', path: '/admin/packages', icon: Boxes },
    { name: 'Diagnostic Reports', path: '/admin/reports', icon: FileText },
    { name: 'Contact Enquiries', path: '/admin/enquiries', icon: MessageSquareQuote },
    { name: 'Laboratory Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col md:flex-row antialiased">
      {/* Mobile Top Header */}
      <div className="md:hidden bg-[#171717] text-white px-4 py-3 flex items-center justify-between border-b-2 border-[#171717]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-neutral-900 border border-[#F5C542] flex items-center justify-center text-[#F5C542]">
            <Activity className="w-5 h-5" />
          </div>
          <span className="font-heading font-black text-lg tracking-tight">
            <span className="text-[#F1654C]">DAVIS</span> ADMIN
          </span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 text-neutral-300 hover:text-white hover:bg-neutral-800"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar for Desktop & Mobile Overlay */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#171717] text-neutral-300 flex flex-col transition-transform duration-200 ease-in-out md:translate-x-0 md:static border-r-2 border-[#171717] ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand */}
        <div className="h-16 px-6 flex items-center justify-between border-b-2 border-neutral-800 bg-neutral-950">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-black border border-[#F5C542] flex items-center justify-center text-[#F5C542]">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="font-heading font-black text-base text-white tracking-tight">
                <span className="text-[#F1654C]">DAVIS</span> LAB
              </div>
              <div className="text-[9px] text-[#F5C542] font-black uppercase tracking-widest">
                Agra Admin Console
              </div>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-neutral-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card */}
        <div className="p-3 mx-3 my-3 bg-neutral-900 border border-neutral-800 text-xs">
          <div className="text-neutral-400 text-[10px] uppercase font-bold tracking-wider">Signed in as Administrator</div>
          <div className="font-black text-white truncate mt-0.5">{profile?.full_name || user?.email || 'Admin User'}</div>
          <div className="text-[10px] text-[#F5C542] font-black uppercase tracking-wider mt-1">Super Admin Role</div>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                  isActive
                    ? 'bg-[#F1654C] text-white font-black'
                    : 'text-neutral-300 hover:bg-neutral-900 hover:text-white'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 opacity-50" />
            </NavLink>
          ))}
        </nav>

        {/* Quick Links and Logout */}
        <div className="p-3 border-t border-neutral-800 space-y-1 bg-neutral-950">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 text-xs text-neutral-400 hover:text-white font-bold uppercase tracking-wider transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              View Public Website
            </span>
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-[#F1654C] transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Admin Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
