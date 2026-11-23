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
  Trash2,
  Info
} from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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
        patient_id: user?.id || null,
        patient_name: formData.patient_name,
        phone: formData.phone,
        email: formData.email || '',
        age: formData.age,
        gender: formData.gender,
        appointment_date: formData.appointment_date,
        appointment_time: formData.appointment_time,
        collection_method: formData.collection_method,
        notes: formData.notes,
        items,
      });

      setConfirmedBooking(result.booking);
      toast({
        title: 'Booking Request Submitted',
        description: `Reference: ${result.reference}. Our Agra laboratory team will contact you.`,
      });
    } catch (err: unknown) {
      toast({
        variant: 'destructive',
        title: 'Booking Submission Failed',
        description: err instanceof Error ? err.message : 'Please try again later.',
      });
    }
  };

  const today = new Date().toISOString().split('T')[0];

  // If booking is confirmed, show confirmation view
  if (confirmedBooking) {
    const whatsappNumber = '919876543210';
    const waText = encodeURIComponent(
      `Hello Davis Pathology Lab, I have booked appointment ref: ${confirmedBooking.booking_reference} for patient: ${confirmedBooking.patient_name}.`
    );

    return (
      <div className="py-10 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="border-2 border-[#171717] bg-white">
          <div className="p-6 bg-[#171717] text-white border-b-2 border-[#171717]">
            <div className="inline-block bg-[#F5C542] text-[#171717] text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 mb-2">
              APPOINTMENT CONFIRMED
            </div>
            <h2 className="font-heading font-black text-2xl text-white tracking-tight">
              Booking Request Received
            </h2>
            <p className="text-xs text-neutral-300 mt-1">
              Your appointment request has been logged in our laboratory database.
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Booking Reference Box */}
            <div className="p-4 bg-neutral-100 border-2 border-neutral-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                  Laboratory Reference Number
                </span>
                <div className="text-2xl font-black font-heading text-[#E94B35]">
                  {confirmedBooking.booking_reference}
                </div>
              </div>
              <div className="bg-[#171717] text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">
                Status: {confirmedBooking.status}
              </div>
            </div>

            {/* Appointment Specifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs border border-neutral-200 p-4">
              <div>
                <span className="text-neutral-500 uppercase text-[10px] font-bold block">Patient Name</span>
                <p className="font-bold text-[#171717] text-sm mt-0.5">{confirmedBooking.patient_name}</p>
              </div>
              <div>
                <span className="text-neutral-500 uppercase text-[10px] font-bold block">Contact Phone</span>
                <p className="font-bold text-[#171717] text-sm mt-0.5">{confirmedBooking.phone}</p>
              </div>
              <div>
                <span className="text-neutral-500 uppercase text-[10px] font-bold block">Scheduled Date & Time</span>
                <p className="font-bold text-[#171717] text-sm mt-0.5">
                  {confirmedBooking.appointment_date} at {confirmedBooking.appointment_time}
                </p>
              </div>
              <div>
                <span className="text-neutral-500 uppercase text-[10px] font-bold block">Collection Mode</span>
                <p className="font-bold text-[#171717] text-sm mt-0.5">
                  {confirmedBooking.collection_method === 'home_collection'
                    ? 'Home Sample Collection'
                    : 'Visit Laboratory (Walk-in)'}
                </p>
              </div>
            </div>

            {/* Selected Items */}
            <div className="border-t-2 border-neutral-200 pt-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#171717] mb-3">
                Selected Investigations / Packages
              </h4>
              <div className="space-y-2">
                {confirmedBooking.booking_items?.map((item) => (
                  <div key={item.id} className="flex justify-between items-center text-xs py-2 border-b border-neutral-200">
                    <span className="font-medium text-[#171717]">{item.item_name}</span>
                    <span className="font-bold text-[#171717]">{formatPrice(item.item_price)}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center text-sm pt-3 font-bold">
                  <span>Estimated Total Amount:</span>
                  <span className="text-[#E94B35] text-lg font-black">{formatPrice(confirmedBooking.total_amount)}</span>
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
                <Button className="w-full bg-[#171717] hover:bg-neutral-800 text-white font-bold gap-2 rounded-none h-12 uppercase text-xs tracking-wider border-2 border-[#171717]">
                  <MessageCircle className="w-4 h-4 text-[#F5C542]" />
                  Send WhatsApp Confirmation
                </Button>
              </a>
              <Link to="/patient/dashboard" className="flex-1">
                <Button variant="outline" className="w-full font-bold rounded-none h-12 uppercase text-xs tracking-wider border-2 border-[#171717]">
                  Go to Patient Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <PageHeader
        title="Book Diagnostic Appointment"
        subtitle="Schedule your lab visit or request home sample collection in Agra in simple, intuitive steps."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Book Appointment' },
        ]}
      />

      <div className="mb-6 p-4 bg-[#F5C542]/15 border-2 border-[#F5C542] text-xs text-[#171717] flex items-start gap-3">
        <Info className="w-4 h-4 text-[#171717] shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="font-bold uppercase tracking-wider">Notice:</strong> Submitting this booking registers a request with status <strong>PENDING</strong>. A representative from Davis Pathology Lab will contact you via phone to verify fasting guidelines and confirm the schedule.
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Form Fields (8 Cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Section 1: Patient Information */}
            <div className="border-2 border-[#171717] bg-white">
              <div className="p-4 bg-neutral-100 border-b-2 border-[#171717] flex items-center gap-2">
                <User className="w-4 h-4 text-[#E94B35]" />
                <h2 className="font-heading font-black text-sm uppercase tracking-wider text-[#171717]">
                  1. Patient Information
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="patient_name" className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                      Patient Full Name <span className="text-[#E94B35]">*</span>
                    </Label>
                    <Input
                      id="patient_name"
                      placeholder="e.g. Ramesh Kumar"
                      className="rounded-none border-2 border-neutral-300 focus:border-[#171717] h-10"
                      {...register('patient_name')}
                    />
                    {errors.patient_name && (
                      <p className="text-[11px] text-[#E94B35] font-semibold">{errors.patient_name.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                      Mobile Number <span className="text-[#E94B35]">*</span>
                    </Label>
                    <Input
                      id="phone"
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className="rounded-none border-2 border-neutral-300 focus:border-[#171717] h-10"
                      {...register('phone')}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-[#E94B35] font-semibold">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                      Email Address <span className="text-neutral-500 font-normal lowercase">(optional for reports)</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="e.g. ramesh@example.com"
                      className="rounded-none border-2 border-neutral-300 focus:border-[#171717] h-10"
                      {...register('email')}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-[#E94B35] font-semibold">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="age" className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                      Age <span className="text-[#E94B35]">*</span>
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="e.g. 42"
                      className="rounded-none border-2 border-neutral-300 focus:border-[#171717] h-10"
                      {...register('age', { valueAsNumber: true })}
                    />
                    {errors.age && (
                      <p className="text-[11px] text-[#E94B35] font-semibold">{errors.age.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <Label className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                    Gender <span className="text-[#E94B35]">*</span>
                  </Label>
                  <RadioGroup
                    defaultValue="male"
                    onValueChange={(val) => setValue('gender', val as 'male' | 'female' | 'other')}
                    className="flex items-center gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="male" id="g-male" className="rounded-none" />
                      <Label htmlFor="g-male" className="text-xs font-bold cursor-pointer">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="female" id="g-female" className="rounded-none" />
                      <Label htmlFor="g-female" className="text-xs font-bold cursor-pointer">Female</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="g-other" className="rounded-none" />
                      <Label htmlFor="g-other" className="text-xs font-bold cursor-pointer">Other</Label>
                    </div>
                  </RadioGroup>
                  {errors.gender && (
                    <p className="text-[11px] text-[#E94B35] font-semibold">{errors.gender.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Section 2: Select Tests / Packages */}
            <div className="border-2 border-[#171717] bg-white">
              <div className="p-4 bg-neutral-100 border-b-2 border-[#171717] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CalendarCheck className="w-4 h-4 text-[#E94B35]" />
                  <h2 className="font-heading font-black text-sm uppercase tracking-wider text-[#171717]">
                    2. Select Tests & Health Packages <span className="text-[#E94B35]">*</span>
                  </h2>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Multiple selection enabled</span>
              </div>
              <div className="p-6 space-y-5">
                {errors.selected_tests && (
                  <div className="p-3 bg-red-50 text-[#E94B35] text-xs border border-red-300 font-semibold">
                    {errors.selected_tests.message}
                  </div>
                )}

                {/* Popular Health Packages */}
                <div>
                  <h3 className="font-bold text-xs uppercase tracking-wider text-[#171717] mb-2 pb-1 border-b border-neutral-200">
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
                          className={`p-3 border-2 text-xs cursor-pointer transition-all flex items-start justify-between gap-3 ${
                            isSelected
                              ? 'border-[#171717] bg-[#F5C542]/20 font-bold'
                              : 'border-neutral-300 bg-white hover:border-neutral-400 text-neutral-800'
                          }`}
                        >
                          <div>
                            <strong className="block text-sm">{pkg.name}</strong>
                            <span className="text-neutral-500 text-[11px] line-clamp-1">{pkg.description}</span>
                          </div>
                          <span className="font-black text-[#E94B35] shrink-0 text-sm">{formatPrice(pkg.price)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Individual Diagnostic Tests */}
                <div className="pt-2">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-[#171717] mb-2 pb-1 border-b border-neutral-200">
                    Individual Blood & Pathology Tests
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
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
                          className={`p-2.5 border text-xs cursor-pointer transition-all flex items-center justify-between gap-2 ${
                            isSelected
                              ? 'border-[#171717] bg-neutral-900 text-white font-bold'
                              : 'border-neutral-300 bg-neutral-50 hover:bg-neutral-100 text-neutral-800'
                          }`}
                        >
                          <div className="truncate">
                            <span className="truncate block font-semibold">{t.name}</span>
                            <span className={`text-[10px] ${isSelected ? 'text-[#F5C542]' : 'text-neutral-500'}`}>{t.sample_type}</span>
                          </div>
                          <span className={`font-bold shrink-0 ${isSelected ? 'text-[#F5C542]' : 'text-[#E94B35]'}`}>
                            {formatPrice(t.price)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Appointment Date, Time & Collection Preference */}
            <div className="border-2 border-[#171717] bg-white">
              <div className="p-4 bg-neutral-100 border-b-2 border-[#171717] flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#E94B35]" />
                <h2 className="font-heading font-black text-sm uppercase tracking-wider text-[#171717]">
                  3. Appointment & Collection Details
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {/* Collection Method Radio */}
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                    Sample Collection Preference <span className="text-[#E94B35]">*</span>
                  </Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                      onClick={() => setValue('collection_method', 'visit_laboratory')}
                      className={`p-4 border-2 cursor-pointer transition-all flex items-start gap-3 ${
                        collectionMethod === 'visit_laboratory'
                          ? 'border-[#171717] bg-neutral-900 text-white'
                          : 'border-neutral-300 bg-white hover:border-neutral-400'
                      }`}
                    >
                      <MapPin className={`w-5 h-5 shrink-0 mt-0.5 ${collectionMethod === 'visit_laboratory' ? 'text-[#F5C542]' : 'text-[#E94B35]'}`} />
                      <div>
                        <strong className="block text-sm font-bold uppercase tracking-wider">Visit Laboratory</strong>
                        <p className={`text-xs mt-1 ${collectionMethod === 'visit_laboratory' ? 'text-neutral-300' : 'text-neutral-600'}`}>
                          Shop No. 4, Millenium Complex, Bhagwan Talkies, Agra
                        </p>
                      </div>
                    </div>

                    <div
                      onClick={() => setValue('collection_method', 'home_collection')}
                      className={`p-4 border-2 cursor-pointer transition-all flex items-start gap-3 ${
                        collectionMethod === 'home_collection'
                          ? 'border-[#171717] bg-neutral-900 text-white'
                          : 'border-neutral-300 bg-white hover:border-neutral-400'
                      }`}
                    >
                      <Home className={`w-5 h-5 shrink-0 mt-0.5 ${collectionMethod === 'home_collection' ? 'text-[#F5C542]' : 'text-[#F5C542]'}`} />
                      <div>
                        <strong className="block text-sm font-bold uppercase tracking-wider">Home Sample Collection</strong>
                        <p className={`text-xs mt-1 ${collectionMethod === 'home_collection' ? 'text-neutral-300' : 'text-neutral-600'}`}>
                          Trained phlebotomist visits your doorstep across Agra
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Date & Time Select */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="appointment_date" className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                      Preferred Date <span className="text-[#E94B35]">*</span>
                    </Label>
                    <Input
                      id="appointment_date"
                      type="date"
                      min={today}
                      className="rounded-none border-2 border-neutral-300 focus:border-[#171717] h-10"
                      {...register('appointment_date')}
                    />
                    {errors.appointment_date && (
                      <p className="text-[11px] text-[#E94B35] font-semibold">{errors.appointment_date.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="appointment_time" className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                      Preferred Time Slot <span className="text-[#E94B35]">*</span>
                    </Label>
                    <select
                      id="appointment_time"
                      className="flex h-10 w-full rounded-none border-2 border-neutral-300 bg-white px-3 py-2 text-xs font-medium focus:border-[#171717] focus:outline-none"
                      {...register('appointment_time')}
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot} {parseInt(slot) < 12 ? 'AM' : 'PM'}
                        </option>
                      ))}
                    </select>
                    {errors.appointment_time && (
                      <p className="text-[11px] text-[#E94B35] font-semibold">{errors.appointment_time.message}</p>
                    )}
                  </div>
                </div>

                {/* Additional Notes */}
                <div className="space-y-1.5 pt-2">
                  <Label htmlFor="notes" className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                    Additional Notes / Address for Home Collection
                  </Label>
                  <Textarea
                    id="notes"
                    rows={3}
                    placeholder="Provide your complete home address for sample collection, landmark, or any clinical instructions..."
                    className="rounded-none border-2 border-neutral-300 focus:border-[#171717]"
                    {...register('notes')}
                  />
                  {errors.notes && (
                    <p className="text-[11px] text-[#E94B35] font-semibold">{errors.notes.message}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Booking Summary (4 Cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-[#171717] text-white border-2 border-[#171717] space-y-6">
              <div className="p-4 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-[#F5C542]" />
                  <h3 className="font-heading font-black text-xs uppercase tracking-wider text-white">
                    Booking Summary
                  </h3>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F5C542]">
                  Pay at Lab / Collection
                </span>
              </div>

              <div className="p-6 pt-0 space-y-6">
                {selectedSummary.length === 0 ? (
                  <div className="py-8 text-center text-xs text-neutral-400 border border-neutral-800 p-4">
                    No tests or packages selected yet. Please select at least one item from the left.
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="max-h-56 overflow-y-auto space-y-2 pr-1 border-b border-neutral-800 pb-3">
                      {selectedSummary.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs py-1 border-b border-neutral-800/60">
                          <span className="font-medium truncate pr-2 text-neutral-300">{item.name}</span>
                          <span className="font-bold text-white shrink-0">{formatPrice(item.price)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 space-y-2 text-xs">
                      <div className="flex justify-between text-neutral-400">
                        <span>Total Items:</span>
                        <span className="text-white font-bold">{selectedSummary.length} investigations</span>
                      </div>
                      <div className="flex justify-between text-base font-black text-white pt-1 border-t border-neutral-800">
                        <span>Estimated Total:</span>
                        <span className="text-[#F5C542] text-xl font-heading">{formatPrice(calculatedTotal)}</span>
                      </div>
                      <p className="text-[10px] text-neutral-400 pt-1">
                        *No prepayment required. Fees collected at the laboratory or during sample collection.
                      </p>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={createBookingMutation.isPending || selectedSummary.length === 0}
                  className="w-full bg-[#E94B35] hover:bg-[#d63f2a] text-white font-bold h-12 text-xs uppercase tracking-wider rounded-none border border-[#E94B35]"
                >
                  <CalendarCheck className="w-4 h-4 mr-2" />
                  {createBookingMutation.isPending ? 'Submitting Booking...' : 'Confirm Booking Request'}
                </Button>

                <div className="p-3 bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-400 space-y-1">
                  <div className="font-bold uppercase tracking-wider text-white text-[10px]">What Happens Next:</div>
                  <p>1. Our lab receives your request.</p>
                  <p>2. Staff verifies fasting requirements via call.</p>
                  <p>3. Specimen processed and report uploaded.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
