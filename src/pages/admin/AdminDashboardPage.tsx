import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CalendarDays, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Users, 
  IndianRupee, 
  TrendingUp, 
  Activity,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { PageHeader } from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  useDashboardStats, 
  useDailyBookings, 
  useStatusDistribution, 
  usePopularTests,
  useBookings 
} from '@/hooks/useBookings';
import { formatPrice, getStatusColor, getStatusLabel } from '@/lib/utils';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

const STATUS_COLORS: Record<string, string> = {
  PENDING: '#F5C542',
  CONFIRMED: '#3B82F6',
  SAMPLE_COLLECTED: '#8B5CF6',
  PROCESSING: '#6366F1',
  COMPLETED: '#10B981',
  CANCELLED: '#EF4444',
};

export const AdminDashboardPage: React.FC = () => {
  const { data: stats, isLoading: isLoadingStats } = useDashboardStats();
  const { data: dailyData = [], isLoading: isLoadingDaily } = useDailyBookings(7);
  const { data: statusDistribution = [] } = useStatusDistribution();
  const { data: popularTests = [] } = usePopularTests();
  const { data: recentBookings = [] } = useBookings();

  if (isLoadingStats || isLoadingDaily) {
    return (
      <div className="py-24 flex justify-center">
        <LoadingSpinner text="Generating laboratory metrics and analytics..." />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
            Super Administrator Control Panel
          </span>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-foreground">
            Laboratory Analytics & Overview
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/admin/bookings">
            <Button size="sm" className="bg-primary hover:bg-primary-600 text-white text-xs font-semibold">
              Manage Bookings
            </Button>
          </Link>
          <Link to="/admin/reports">
            <Button size="sm" variant="outline" className="text-xs font-semibold">
              Upload Report
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="border-border shadow-xs">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold text-muted-foreground uppercase">
                Total Bookings
              </span>
              <div className="font-heading font-extrabold text-2xl sm:text-3xl text-foreground mt-1">
                {stats?.totalBookings ?? 0}
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5">Database verified records</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <CalendarDays className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-xs">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold text-muted-foreground uppercase">
                Pending Action
              </span>
              <div className="font-heading font-extrabold text-2xl sm:text-3xl text-amber-600 mt-1">
                {stats?.pendingBookings ?? 0}
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5">Awaiting staff confirmation</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-xs">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold text-muted-foreground uppercase">
                Completed Tests
              </span>
              <div className="font-heading font-extrabold text-2xl sm:text-3xl text-green-600 mt-1">
                {stats?.completedBookings ?? 0}
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5">Reported & delivered</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border shadow-xs">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold text-muted-foreground uppercase">
                Completed Revenue
              </span>
              <div className="font-heading font-extrabold text-2xl sm:text-3xl text-primary mt-1">
                {formatPrice(stats?.revenue ?? 0)}
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5">From fulfilled orders</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-red-50 text-primary flex items-center justify-center">
              <IndianRupee className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts Section (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Daily Trend Line Chart (7 cols) */}
        <Card className="lg:col-span-7 border-border shadow-xs">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-heading font-bold flex items-center justify-between">
              <span>Daily Booking Trend (Last 7 Days)</span>
              <Badge variant="outline" className="text-[10px] font-normal">Dynamic Database Data</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-64 sm:h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#6B7280' }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#6B7280' }} />
                  <Tooltip
                    contentStyle={{ borderRadius: 8, fontSize: 12, border: '1px solid #E5E7EB' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    name="Bookings"
                    stroke="#E94B35"
                    strokeWidth={3}
                    dot={{ r: 4, fill: '#E94B35' }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Status Distribution Pie Chart (5 cols) */}
        <Card className="lg:col-span-5 border-border shadow-xs">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-heading font-bold flex items-center justify-between">
              <span>Booking Status Distribution</span>
              <Badge variant="outline" className="text-[10px] font-normal">Live Mix</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-64 sm:h-72 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    dataKey="count"
                    nameKey="status"
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={STATUS_COLORS[entry.status] || '#9CA3AF'}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: 8, fontSize: 12, border: '1px solid #E5E7EB' }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    formatter={(value) => (
                      <span className="text-[11px] text-foreground font-medium">
                        {getStatusLabel(value)}
                      </span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Row 2: Popular Tests Bar Chart & Recent Bookings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Top 5 Tests (5 cols) */}
        <Card className="lg:col-span-5 border-border shadow-xs">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-heading font-bold">
              Most Booked Diagnostic Investigations
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={popularTests} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                  <XAxis type="number" allowDecimals={false} tick={{ fontSize: 11 }} />
                  <YAxis dataKey="name" type="category" width={110} tick={{ fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{ borderRadius: 8, fontSize: 12, border: '1px solid #E5E7EB' }}
                  />
                  <Bar dataKey="count" name="Appointments" fill="#F5C542" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Bookings Queue (7 cols) */}
        <Card className="lg:col-span-7 border-border shadow-xs">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-heading font-bold">
              Latest Laboratory Bookings
            </CardTitle>
            <Link to="/admin/bookings" className="text-xs text-primary font-semibold hover:underline">
              View All ({recentBookings.length})
            </Link>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="divide-y divide-border">
              {recentBookings.slice(0, 5).map((booking) => (
                <div key={booking.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                  <div className="space-y-0.5 truncate pr-2">
                    <div className="flex items-center gap-2">
                      <strong className="text-foreground font-semibold">{booking.booking_reference}</strong>
                      <span className={`px-2 py-0.2 rounded text-[10px] font-bold ${getStatusColor(booking.status)}`}>
                        {getStatusLabel(booking.status)}
                      </span>
                    </div>
                    <div className="text-muted-foreground text-[11px] truncate">
                      {booking.patient_name} • {booking.appointment_date} ({booking.appointment_time})
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="font-bold text-foreground">{formatPrice(booking.total_amount)}</div>
                    <Link to="/admin/bookings">
                      <span className="text-[10px] text-primary hover:underline">Manage</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
