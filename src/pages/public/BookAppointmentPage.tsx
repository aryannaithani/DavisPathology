import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  CalendarCheck, 
  Clock, 
  MapPin, 
  Home, 
  CheckCircle2, 
  MessageCircle, 
  AlertTriangle,
  Receipt,
  User,
  Plus,
  Trash2
} from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTests } from '@/hooks/useTests';
import { usePackages } from '@/hooks/usePackages';
import { useCreateBooking } from '@/hooks/useBookings';
import { useAuth } from '@/contexts/AuthContext';
import { bookingSchema, BookingFormData } from '@/schemas';
import { formatPrice } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import type { Booking } from '@/types';

export const BookAppointmentPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { user, profile } = useAuth();
  const { toast } = useToast();

  const preselectedTestSlug = searchParams.get('test');
  const preselectedPackageSlug = searchParams.get('package');

  const { data: allTests = [] } = useTests();
  const { data: allPackages = [] } = usePackages();
  const createBookingMutation = useCreateBooking();

  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Selected item IDs
  const [selectedTestIds, setSelectedTestIds] = useState<string[]>([]);
  const [selectedPackageIds, setSelectedPackageIds] = useState<string[]>([]);

  // Pre-select based on URL params
  useEffect(() => {
    if (preselectedTestSlug && allTests.length > 0) {
      const found = allTests.find((t) => t.slug === preselectedTestSlug);
      if (found && !selectedTestIds.includes(found.id)) {
        setSelectedTestIds([found.id]);
      }
    }
    if (preselectedPackageSlug && allPackages.length > 0) {
      const found = allPackages.find((p) => p.slug === preselectedPackageSlug);
      if (found && !selectedPackageIds.includes(found.id)) {
        setSelectedPackageIds([found.id]);
      }
    }
  }, [preselectedTestSlug, preselectedPackageSlug, allTests, allPackages]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      patient_name: profile?.full_name || '',
      phone: profile?.phone || '',
      email: profile?.email || user?.email || '',
      gender: 'male',
      collection_method: 'visit_laboratory',
      appointment_time: '09:00',
      appointment_date: new Date().toISOString().split('T')[0],
      selected_tests: [],
      selected_packages: [],
    },
  });

  const collectionMethod = watch('collection_method');

  // Sync selected arrays with react-hook-form
  useEffect(() => {
    setValue('selected_tests', selectedTestIds, { shouldValidate: true });
  }, [selectedTestIds, setValue]);

  useEffect(() => {
    setValue('selected_packages', selectedPackageIds, { shouldValidate: true });
  }, [selectedPackageIds, setValue]);

  // Compute calculated live total from database prices (prevent frontend price manipulation)
  const { calculatedTotal, selectedSummary } = useMemo(() => {
    const summary: Array<{ name: string; price: number; type: 'test' | 'package' }> = [];
    let total = 0;

    selectedPackageIds.forEach((id) => {
      const pkg = allPackages.find((p) => p.id === id);
      if (pkg) {
        total += pkg.price;
        summary.push({ name: pkg.name, price: pkg.price, type: 'package' });
      }
    });

    selectedTestIds.forEach((id) => {
      const test = allTests.find((t) => t.id === id);
      if (test) {
        total += test.price;
        summary.push({ name: test.name, price: test.price, type: 'test' });
      }
    });

    return { calculatedTotal: total, selectedSummary: summary };
  }, [selectedTestIds, selectedPackageIds, allTests, allPackages]);

  // Available Time Slots
  const timeSlots = [
    '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', 
    '10:30', '11:00', '11:30', '12:00', '14:00', '15:00', 
    '16:00', '17:00', '18:00', '19:00'
  ];

  const onSubmit = async (formData: BookingFormData) => {
    try {
      // Build booking items snapshot with database verified prices
      const items = [
        ...selectedPackageIds.map((id) => {
          const pkg = allPackages.find((p) => p.id === id)!;
          return {
            package_id: pkg.id,
            item_name: pkg.name,
            item_price: pkg.price,
          };
        }),
        ...selectedTestIds.map((id) => {
          const test = allTests.find((t) => t.id === id)!;
          return {
            test_id: test.id,
            item_name: test.name,
            item_price: test.price,
          };
        }),
      ];

      const result = await createBookingMutation.mutateAsync({
        patient_id: user?.id ?? null,
        patient_name: formData.patient_name,
        phone: formData.phone,
        email: formData.email || '',
        age: Number(formData.age),
        gender: formData.gender,
        appointment_date: formData.appointment_date,
        appointment_time: formData.appointment_time,
        collection_method: formData.collection_method,
        notes: formData.notes || '',
        items,
      });

      setConfirmedBooking(result.booking);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: unknown) {
      toast({
        variant: 'destructive',
        title: 'Booking Request Failed',
        description: err instanceof Error ? err.message : 'Please check your inputs and try again.',
      });
    }
  };

  const today = new Date().toISOString().split('T')[0];

  // If booking is confirmed, show the Confirmation Screen
  if (confirmedBooking) {
    const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '919999999999';
    const waText = encodeURIComponent(
      `Hello Davis Pathology Lab, I have submitted a booking request with Reference: ${confirmedBooking.booking_reference} for ${confirmedBooking.patient_name}. Please confirm the appointment.`
    );

    return (
      <div className="py-12 max-w-3xl mx-auto px-4 sm:px-6">
        <Card className="border-border shadow-lg overflow-hidden">
          <div className="bg-primary text-white p-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-white/20 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl">
              Booking Request Received!
            </h1>
            <p className="text-white/90 text-sm max-w-md mx-auto">
              Your booking request has been received. Our team will contact you to confirm your appointment.
            </p>
          </div>

          <CardContent className="p-6 sm:p-8 space-y-6">
            <div className="p-4 rounded-xl bg-neutral-50 border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
                  Booking Reference Number
                </span>
                <div className="font-heading font-extrabold text-xl text-primary mt-0.5">
                  {confirmedBooking.booking_reference}
                </div>
              </div>
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300 font-bold px-3 py-1">
                STATUS: PENDING CONFIRMATION
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-muted-foreground font-semibold">Patient Name:</span>
                <p className="font-bold text-foreground text-sm">{confirmedBooking.patient_name}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground font-semibold">Contact Mobile:</span>
                <p className="font-bold text-foreground text-sm">+91 {confirmedBooking.phone}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground font-semibold">Appointment Date & Time:</span>
                <p className="font-bold text-foreground text-sm">
                  {confirmedBooking.appointment_date} at {confirmedBooking.appointment_time}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground font-semibold">Collection Preference:</span>
                <p className="font-bold text-foreground text-sm capitalize">
                  {confirmedBooking.collection_method === 'home_collection'
                    ? 'Home Sample Collection'
                    : 'Visit Laboratory (Walk-in)'}
                </p>
              </div>
            </div>

            {/* Selected Items */}
            <div className="border-t border-border pt-4">
              <h4 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-3">
                Selected Investigations / Packages
              </h4>
              <div className="space-y-2">
                {confirmedBooking.booking_items?.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-xs py-1.5 border-b border-border/50">
                    <span className="font-medium text-foreground">{item.item_name}</span>
                    <span className="font-bold text-foreground">{formatPrice(item.item_price)}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center text-sm pt-2 font-bold">
                  <span>Estimated Total Amount:</span>
                  <span className="text-primary text-base">{formatPrice(confirmedBooking.total_amount)}</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${waText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white font-bold gap-2">
                  <MessageCircle className="w-4 h-4 fill-current" />
                  Send WhatsApp Confirmation
                </Button>
              </a>
              <Link to="/patient/dashboard" className="flex-1">
                <Button variant="outline" className="w-full font-semibold">
                  Go to Patient Dashboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <PageHeader
        title="Book Diagnostic Appointment"
        subtitle="Schedule your lab visit or request home sample collection in Agra in simple, intuitive steps."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Book Appointment' },
        ]}
      />

      <div className="mb-6 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong>Notice:</strong> Submitting this booking registers a request with status <strong>PENDING</strong>. A representative will contact you to verify sample preparation and confirm the appointment slot.
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Form Fields (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Section 1: Patient Information */}
            <Card className="border-border shadow-xs">
              <CardContent className="p-6 sm:p-8 space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-border">
                  <User className="w-5 h-5 text-primary" />
                  <h2 className="font-heading font-bold text-lg text-foreground">
                    1. Patient Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="patient_name" className="text-xs font-semibold">
                      Patient Full Name <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="patient_name"
                      placeholder="e.g. Ramesh Kumar"
                      {...register('patient_name')}
                    />
                    {errors.patient_name && (
                      <p className="text-[11px] text-destructive">{errors.patient_name.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-xs font-semibold">
                      Mobile Number <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="phone"
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      {...register('phone')}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-destructive">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label htmlFor="email" className="text-xs font-semibold">
                      Email Address <span className="text-muted-foreground font-normal">(Optional, for reports)</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="e.g. ramesh@example.com"
                      {...register('email')}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-destructive">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="age" className="text-xs font-semibold">
                      Age <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="e.g. 42"
                      {...register('age', { valueAsNumber: true })}
                    />
                    {errors.age && (
                      <p className="text-[11px] text-destructive">{errors.age.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <Label className="text-xs font-semibold">
                    Gender <span className="text-primary">*</span>
                  </Label>
                  <RadioGroup
                    defaultValue="male"
                    onValueChange={(val) => setValue('gender', val as 'male' | 'female' | 'other')}
                    className="flex items-center gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="g-male" />
                      <Label htmlFor="g-male" className="text-xs font-medium cursor-pointer">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="g-female" />
                      <Label htmlFor="g-female" className="text-xs font-medium cursor-pointer">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="g-other" />
                      <Label htmlFor="g-other" className="text-xs font-medium cursor-pointer">Other</Label>
                    </div>
                  </RadioGroup>
                  {errors.gender && (
                    <p className="text-[11px] text-destructive">{errors.gender.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Section 2: Select Tests / Packages */}
            <Card className="border-border shadow-xs">
              <CardContent className="p-6 sm:p-8 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <div className="flex items-center gap-2">
                    <CalendarCheck className="w-5 h-5 text-primary" />
                    <h2 className="font-heading font-bold text-lg text-foreground">
                      2. Select Tests & Health Packages <span className="text-primary">*</span>
                    </h2>
                  </div>
                  <span className="text-xs text-muted-foreground">Select one or multiple</span>
                </div>

                {errors.selected_tests && (
                  <div className="p-3 bg-red-50 text-destructive text-xs rounded-lg border border-red-200">
                    {errors.selected_tests.message}
                  </div>
                )}

                {/* Popular Health Packages */}
                <div>
                  <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-3">
                    Health Checkup Packages
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {allPackages.map((pkg) => {
                      const isSelected = selectedPackageIds.includes(pkg.id);
                      return (
                        <div
                          key={pkg.id}
                          onClick={() => {
                            if (isSelected) {
                              setSelectedPackageIds(selectedPackageIds.filter((id) => id !== pkg.id));
                            } else {
                              setSelectedPackageIds([...selectedPackageIds, pkg.id]);
                            }
                          }}
                          className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all flex items-start justify-between gap-3 ${
                            isSelected
                              ? 'border-primary bg-primary/5 text-primary shadow-xs'
                              : 'border-border bg-neutral-50/50 hover:bg-neutral-100 text-foreground'
                          }`}
                        >
                          <div>
                            <strong className="block font-semibold">{pkg.name}</strong>
                            <span className="text-muted-foreground text-[11px] line-clamp-1">{pkg.description}</span>
                          </div>
                          <span className="font-bold shrink-0">{formatPrice(pkg.price)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Individual Diagnostic Tests */}
                <div className="pt-2">
                  <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-3">
                    Individual Blood & Pathology Tests
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-1">
                    {allTests.map((t) => {
                      const isSelected = selectedTestIds.includes(t.id);
                      return (
                        <div
                          key={t.id}
                          onClick={() => {
                            if (isSelected) {
                              setSelectedTestIds(selectedTestIds.filter((id) => id !== t.id));
                            } else {
                              setSelectedTestIds([...selectedTestIds, t.id]);
                            }
                          }}
                          className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between gap-2 ${
                            isSelected
                              ? 'border-primary bg-primary/5 text-primary shadow-xs'
                              : 'border-border bg-white hover:bg-neutral-50 text-foreground'
                          }`}
                        >
                          <div className="truncate">
                            <span className="font-medium truncate block">{t.name}</span>
                            <span className="text-[10px] text-muted-foreground">{t.sample_type}</span>
                          </div>
                          <span className="font-bold shrink-0">{formatPrice(t.price)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Section 3: Appointment Date, Time & Collection Preference */}
            <Card className="border-border shadow-xs">
              <CardContent className="p-6 sm:p-8 space-y-5">
                <div className="flex items-center gap-2 pb-3 border-b border-border">
                  <Clock className="w-5 h-5 text-primary" />
                  <h2 className="font-heading font-bold text-lg text-foreground">
                    3. Appointment & Collection Details
                  </h2>
                </div>

                {/* Collection Method Radio */}
                <div className="space-y-3">
                  <Label className="text-xs font-semibold">
                    Sample Collection Preference <span className="text-primary">*</span>
                  </Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                      onClick={() => setValue('collection_method', 'visit_laboratory')}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                        collectionMethod === 'visit_laboratory'
                          ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                          : 'border-border bg-white hover:bg-neutral-50'
                      }`}
                    >
                      <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-sm font-semibold text-foreground">Visit Laboratory</strong>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Shop No. 4, Millenium Complex, Bhagwan Talkies, Agra
                        </p>
                      </div>
                    </div>

                    <div
                      onClick={() => setValue('collection_method', 'home_collection')}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                        collectionMethod === 'home_collection'
                          ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                          : 'border-border bg-white hover:bg-neutral-50'
                      }`}
                    >
                      <Home className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-sm font-semibold text-foreground">Home Sample Collection</strong>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Trained phlebotomist visits your doorstep in Agra
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Date & Time Select */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="appointment_date" className="text-xs font-semibold">
                      Preferred Date <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="appointment_date"
                      type="date"
                      min={today}
                      {...register('appointment_date')}
                    />
                    {errors.appointment_date && (
                      <p className="text-[11px] text-destructive">{errors.appointment_date.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="appointment_time" className="text-xs font-semibold">
                      Preferred Time Slot <span className="text-primary">*</span>
                    </Label>
                    <select
                      id="appointment_time"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      {...register('appointment_time')}
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot} {parseInt(slot) < 12 ? 'AM' : 'PM'}
                        </option>
                      ))}
                    </select>
                    {errors.appointment_time && (
                      <p className="text-[11px] text-destructive">{errors.appointment_time.message}</p>
                    )}
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="space-y-1.5 pt-2">
                  <Label htmlFor="notes" className="text-xs font-semibold">
                    Additional Notes / Address for Home Collection
                  </Label>
                  <Textarea
                    id="notes"
                    rows={3}
                    placeholder="Provide your complete home address for sample collection, or any specific clinical instructions..."
                    {...register('notes')}
                  />
                  {errors.notes && (
                    <p className="text-[11px] text-destructive">{errors.notes.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Booking Summary (4 Cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-white p-6 rounded-2xl border border-border shadow-lg space-y-6">
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <Receipt className="w-5 h-5 text-primary" />
                <h3 className="font-heading font-bold text-base text-foreground">
                  Booking Summary
                </h3>
              </div>

              {selectedSummary.length === 0 ? (
                <div className="py-8 text-center text-xs text-muted-foreground">
                  No tests or packages selected yet. Please select at least one item from the left.
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                    {selectedSummary.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs py-1 border-b border-border/40">
                        <span className="font-medium truncate pr-2">{item.name}</span>
                        <span className="font-bold shrink-0">{formatPrice(item.price)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-border space-y-1.5 text-xs">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Total Investigations:</span>
                      <span>{selectedSummary.length} items</span>
                    </div>
                    <div className="flex justify-between text-base font-extrabold text-foreground pt-1">
                      <span>Estimated Amount:</span>
                      <span className="text-primary">{formatPrice(calculatedTotal)}</span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      *Payment is collected at the laboratory or during home sample collection.
                    </p>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                disabled={createBookingMutation.isPending || selectedSummary.length === 0}
                className="w-full bg-primary hover:bg-primary-600 text-white font-bold h-12 text-sm shadow-md gap-2"
              >
                <CalendarCheck className="w-4 h-4" />
                {createBookingMutation.isPending ? 'Submitting Booking...' : 'Confirm Booking Request'}
              </Button>

              <div className="p-3 rounded-xl bg-neutral-50 text-[11px] text-muted-foreground space-y-1">
                <div className="font-semibold text-foreground">Next Steps:</div>
                <p>1. We receive your request.</p>
                <p>2. Lab staff calls to confirm time & fasting guidelines.</p>
                <p>3. Sample collected & digital report generated.</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
