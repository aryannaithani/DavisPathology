import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  AlertTriangle 
} from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { contactSchema, ContactFormData } from '@/schemas';
import { submitContactEnquiry } from '@/services/contact';
import { useToast } from '@/components/ui/use-toast';

export const ContactPage: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await submitContactEnquiry(data);
      setIsSuccess(true);
      toast({
        title: 'Enquiry Received',
        description: 'Thank you for reaching out. Our team will contact you shortly.',
      });
      reset();
    } catch (err: unknown) {
      toast({
        variant: 'destructive',
        title: 'Error Submitting Enquiry',
        description: err instanceof Error ? err.message : 'Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <PageHeader
        title="Contact Davis Pathology Lab"
        subtitle="We're here to assist you with inquiries, test advice, and home sample collection."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact Us' },
        ]}
      />

      {/* Demonstration Alert */}
      <div className="mb-8 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-amber-900">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong>Demonstration Information:</strong> The phone numbers and emails displayed below are placeholders for development and demonstration purposes.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
        {/* Contact Form */}
        <div className="lg:col-span-7">
          <Card className="border-border shadow-xs">
            <CardContent className="p-6 sm:p-8">
              <div className="mb-6">
                <h2 className="font-heading font-bold text-xl text-foreground">Send Us a Message</h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Fill in your details and our team will get in touch with you promptly.
                </p>
              </div>

              {isSuccess && (
                <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-900 text-xs flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                  <div>
                    <strong>Thank you!</strong> Your message has been recorded. Our laboratory coordinator will contact you.
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-xs font-semibold">
                      Full Name <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="e.g. Ramesh Kumar"
                      {...register('name')}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-destructive">{errors.name.message}</p>
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

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-semibold">
                    Email Address <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="e.g. patient@example.com"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-destructive">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="subject" className="text-xs font-semibold">
                    Subject <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="subject"
                    placeholder="e.g. Home collection query or test details"
                    {...register('subject')}
                  />
                  {errors.subject && (
                    <p className="text-[11px] text-destructive">{errors.subject.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="message" className="text-xs font-semibold">
                    Your Message <span className="text-primary">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    rows={4}
                    placeholder="Write your query or specific test requirements here..."
                    {...register('message')}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-destructive">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary-600 text-white font-semibold gap-2 h-11"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? 'Sending Enquiry...' : 'Submit Enquiry'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Info Details */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="border-border bg-neutral-900 text-white shadow-xs">
            <CardContent className="p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-secondary">
                  Laboratory Details
                </span>
                <h3 className="font-heading font-bold text-xl text-white mt-1">
                  Davis Pathology Lab
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-semibold">Physical Location</strong>
                    <span className="text-neutral-300">
                      Shop No. 4, Millenium Complex, Bhagwan Talkies, Agra, Uttar Pradesh, India
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-semibold">Phone Inquiries</strong>
                    <span className="text-neutral-300">+91 98765 43210 (Demonstration)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-semibold">Email Communication</strong>
                    <span className="text-neutral-300">info@davispathology.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-neutral-800">
                  <Clock className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-semibold">Operating Hours</strong>
                    <span className="text-neutral-300 block">Monday – Saturday: 7:00 AM – 8:00 PM</span>
                    <span className="text-neutral-400">Sunday: 8:00 AM – 2:00 PM</span>
                  </div>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=Shop+No+4+Millenium+Complex+Bhagwan+Talkies+Agra+Uttar+Pradesh"
                target="_blank"
                rel="noopener noreferrer"
                className="block pt-2"
              >
                <Button variant="secondary" className="w-full font-bold bg-secondary hover:bg-amber-400 text-neutral-900 gap-2">
                  <MapPin className="w-4 h-4" />
                  Get Google Maps Directions
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Embedded Map */}
      <div className="rounded-2xl overflow-hidden border border-border shadow-xs h-80 sm:h-96">
        <iframe
          title="Davis Pathology Lab Agra Map"
          src="https://maps.google.com/maps?q=Shop%20No.%204,%20Millenium%20Complex,%20Bhagwan%20Talkies,%20Agra,%20Uttar%20Pradesh&t=&z=15&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
        />
      </div>
    </div>
  );
};
