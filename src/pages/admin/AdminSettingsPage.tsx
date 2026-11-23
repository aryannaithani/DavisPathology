import React, { useState } from 'react';
import { Settings, Save, MapPin, Phone, Mail, Clock, MessageSquare, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

export const AdminSettingsPage: React.FC = () => {
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  // Form state
  const [labName, setLabName] = useState('Davis Pathology Lab');
  const [address, setAddress] = useState('Shop No. 4, Millenium Complex, Bhagwan Talkies, Agra, Uttar Pradesh');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [email, setEmail] = useState('info@davispathology.com');
  const [whatsapp, setWhatsapp] = useState('919999999999');
  const [weekdayHours, setWeekdayHours] = useState('7:00 AM – 8:00 PM');
  const [sundayHours, setSundayHours] = useState('8:00 AM – 2:00 PM');
  const [tagline, setTagline] = useState('Accurate Diagnostics. Affordable Healthcare. Quick Results.');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: 'Settings Saved Successfully',
        description: 'Laboratory parameters and contact configurations have been updated.',
      });
    }, 600);
  };

  return (
    <div className="max-w-4xl space-y-6">
      <PageHeader
        title="Laboratory Configuration Settings"
        subtitle="Manage public laboratory information, contact channels, operating hours, and operational policies."
      />

      <form onSubmit={handleSave} className="space-y-6">
        {/* Business Identity */}
        <Card className="border-border shadow-xs">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-heading font-bold text-base text-foreground pb-2 border-b border-border">
              Business Identity & Branding
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Laboratory Name</Label>
                <Input value={labName} onChange={(e) => setLabName(e.target.value)} />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Brand Tagline</Label>
                <Input value={tagline} onChange={(e) => setTagline(e.target.value)} />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold">Physical Facility Address (Agra)</Label>
              <Textarea
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Channels */}
        <Card className="border-border shadow-xs">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-heading font-bold text-base text-foreground pb-2 border-b border-border">
              Contact & Digital Channels
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Official Phone Number</Label>
                <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Official Email</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">WhatsApp Number (with country code)</Label>
                <Input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Operating Hours */}
        <Card className="border-border shadow-xs">
          <CardContent className="p-6 space-y-4">
            <h3 className="font-heading font-bold text-base text-foreground pb-2 border-b border-border">
              Laboratory Operating Hours
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Monday to Saturday</Label>
                <Input value={weekdayHours} onChange={(e) => setWeekdayHours(e.target.value)} />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-semibold">Sunday Timings</Label>
                <Input value={sundayHours} onChange={(e) => setSundayHours(e.target.value)} />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSaving}
            className="bg-primary hover:bg-primary-600 text-white font-bold text-xs gap-2 h-11 px-6 shadow-sm"
          >
            <Save className="w-4 h-4" />
            {isSaving ? 'Saving Configurations...' : 'Save All Settings'}
          </Button>
        </div>
      </form>
    </div>
  );
};
