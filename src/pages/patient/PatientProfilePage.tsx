import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Phone, Mail, Save, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '@/components/common/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { profileSchema, ProfileFormData } from '@/schemas';
import { useToast } from '@/components/ui/use-toast';

export const PatientProfilePage: React.FC = () => {
  const { user, profile, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: profile?.full_name || '',
      phone: profile?.phone || '',
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setIsSaving(true);
    try {
      const { error } = await updateProfile({
        full_name: data.full_name,
        phone: data.phone,
      });

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Update Failed',
          description: error.message || 'Could not update profile information.',
        });
      } else {
        toast({
          title: 'Profile Updated',
          description: 'Your contact details have been successfully saved.',
        });
      }
    } catch (e: unknown) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: e instanceof Error ? e.message : 'An error occurred.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <PageHeader
        title="Patient Profile"
        subtitle="Manage your personal contact details and communication settings."
      />

      <Card className="border-border shadow-xs">
        <CardContent className="p-6 sm:p-8 space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-semibold">
                Account Email (Non-editable)
              </Label>
              <Input
                id="email"
                type="email"
                value={user?.email || profile?.email || ''}
                disabled
                className="bg-neutral-100 text-muted-foreground cursor-not-allowed"
              />
              <p className="text-[11px] text-muted-foreground">
                Email is permanently linked to your diagnostic record.
              </p>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="full_name" className="text-xs font-semibold">
                Full Name <span className="text-primary">*</span>
              </Label>
              <Input
                id="full_name"
                placeholder="e.g. Ramesh Kumar"
                {...register('full_name')}
              />
              {errors.full_name && (
                <p className="text-[11px] text-destructive">{errors.full_name.message}</p>
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

            <div className="pt-2">
              <Button
                type="submit"
                disabled={isSaving}
                className="bg-primary hover:bg-primary-600 text-white font-bold text-xs gap-2 h-10 px-5"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Saving Changes...' : 'Save Profile Details'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
