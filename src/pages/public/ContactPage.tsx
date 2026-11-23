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
  AlertTriangle,
  Info 
} from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
        description: 'Thank you for reaching out. Our Agra laboratory team will contact you shortly.',
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
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <PageHeader
        title="Contact Davis Pathology Lab"
        subtitle="We're here to assist you with inquiries, test advice, and home sample collection across Agra."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact Us' },
        ]}
      />

      {/* Contact Assistance Alert */}
      <div className="mb-8 p-4 bg-[#F5C542]/20 border-2 border-[#F5C542] text-xs text-[#171717] flex items-start gap-3">
        <Info className="w-4 h-4 text-[#171717] shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="font-bold uppercase tracking-wider">Direct Assistance:</strong> Our Agra laboratory reception desk is open Monday to Saturday from 7:00 AM to 8:00 PM and Sunday from 8:00 AM to 2:00 PM. For emergency queries, call our helpline directly.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="border-2 border-[#171717] bg-white">
            <div className="p-4 bg-neutral-100 border-b-2 border-[#171717]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#F1654C]">Direct Correspondence</span>
              <h2 className="font-heading font-black text-base uppercase tracking-wider text-[#171717]">
                Send Us an Enquiry
              </h2>
            </div>

            <div className="p-6 sm:p-8">
              {isSuccess && (
                <div className="mb-6 p-4 bg-green-50 border-2 border-green-600 text-green-900 text-xs flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-700 shrink-0" />
                  <div>
                    <strong className="font-bold uppercase">Thank you!</strong> Your message has been logged in our laboratory enquiries register. A representative will contact you.
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                      Full Name <span className="text-[#F1654C]">*</span>
                    </Label>
                    <Input
                      id="name"
                      placeholder="e.g. Ramesh Kumar"
                      className="rounded-none border-2 border-neutral-300 focus:border-[#171717] h-10"
                      {...register('name')}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-[#F1654C] font-semibold">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                      Mobile Number <span className="text-[#F1654C]">*</span>
                    </Label>
                    <Input
                      id="phone"
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className="rounded-none border-2 border-neutral-300 focus:border-[#171717] h-10"
                      {...register('phone')}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-[#F1654C] font-semibold">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                    Email Address <span className="text-neutral-500 font-normal lowercase">(optional)</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="e.g. patient@example.com"
                    className="rounded-none border-2 border-neutral-300 focus:border-[#171717] h-10"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-[#F1654C] font-semibold">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                    Subject <span className="text-[#F1654C]">*</span>
                  </Label>
                  <Input
                    id="subject"
                    placeholder="e.g. Home collection query or test details"
                    className="rounded-none border-2 border-neutral-300 focus:border-[#171717] h-10"
                    {...register('subject')}
                  />
                  {errors.subject && (
                    <p className="text-[11px] text-[#F1654C] font-semibold">{errors.subject.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                    Your Message <span className="text-[#F1654C]">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    rows={4}
                    placeholder="Write your query or specific test requirements here..."
                    className="rounded-none border-2 border-neutral-300 focus:border-[#171717]"
                    {...register('message')}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-[#F1654C] font-semibold">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#F1654C] hover:bg-[#DF472B] text-white font-bold h-12 rounded-none uppercase text-xs tracking-wider border-2 border-[#171717]"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {isSubmitting ? 'Sending Enquiry...' : 'Submit Enquiry'}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Contact Info Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border-2 border-[#171717] bg-[#171717] text-white">
            <div className="p-4 bg-neutral-900 border-b border-neutral-800">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#F5C542]">
                AGRA LABORATORY FACILITY
              </span>
              <h3 className="font-heading font-black text-xl text-white mt-1">
                Davis Pathology Lab
              </h3>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#F1654C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-bold uppercase text-[11px]">Physical Address</strong>
                    <span className="text-neutral-300 leading-relaxed block mt-0.5">
                      Shop No. 4, Millenium Complex, Bhagwan Talkies, Agra, Uttar Pradesh, India
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#F1654C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-bold uppercase text-[11px]">Telephone Inquiries</strong>
                    <span className="text-neutral-300 block mt-0.5">+91 98765 43210</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#F1654C] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-bold uppercase text-[11px]">Email Desk</strong>
                    <span className="text-neutral-300 block mt-0.5">info@davispathology.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-neutral-800">
                  <Clock className="w-5 h-5 text-[#F5C542] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white font-bold uppercase text-[11px]">Operating Hours</strong>
                    <span className="text-neutral-300 block mt-0.5">Monday – Saturday: 7:00 AM – 8:00 PM</span>
                    <span className="text-neutral-400 block">Sunday: 8:00 AM – 2:00 PM</span>
                  </div>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=Shop+No+4+Millenium+Complex+Bhagwan+Talkies+Agra+Uttar+Pradesh"
                target="_blank"
                rel="noopener noreferrer"
                className="block pt-2"
              >
                <Button className="w-full font-bold bg-[#F5C542] hover:bg-[#e4b532] text-[#171717] rounded-none h-11 text-xs uppercase tracking-wider border-2 border-[#171717] gap-2">
                  <MapPin className="w-4 h-4" />
                  Open in Google Maps
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Map with traditional border */}
      <div className="border-2 border-[#171717] overflow-hidden h-80 sm:h-96">
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
