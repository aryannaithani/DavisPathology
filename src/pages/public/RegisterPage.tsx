import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Activity, UserPlus, ShieldCheck, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { registerSchema, RegisterFormData } from '@/schemas';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

export const RegisterPage: React.FC = () => {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const { error } = await signUp(data.email, data.password, data.full_name, data.phone);
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Registration Failed',
          description: error.message || 'Could not complete registration. Please try again.',
        });
      } else {
        toast({
          title: 'Account Created Successfully',
          description: 'Please check your email to verify your account or proceed to login.',
        });
        navigate('/login');
      }
    } catch (err: unknown) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: err instanceof Error ? err.message : 'An unexpected error occurred.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 bg-[#171717] border-2 border-[#171717] flex items-center justify-center text-[#F5C542]">
              <Activity className="w-7 h-7 stroke-[2.5]" />
            </div>
          </Link>
          <div className="text-[11px] font-black uppercase tracking-widest text-[#F1654C]">
            Davis Pathology Lab | Agra
          </div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-[#171717] tracking-tight">
            Create Patient Account
          </h1>
          <p className="text-xs text-neutral-600">
            Register to view test bookings, access digital reports, and manage family records.
          </p>
        </div>

        <div className="border-2 border-[#171717] bg-white">
          <div className="p-4 bg-neutral-100 border-b-2 border-[#171717] flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-[#171717]">Registration Details</span>
            <UserPlus className="w-4 h-4 text-[#F1654C]" />
          </div>

          <div className="p-6 sm:p-8 space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="full_name" className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                  Full Name <span className="text-[#F1654C]">*</span>
                </Label>
                <Input
                  id="full_name"
                  placeholder="e.g. Ramesh Kumar"
                  className="rounded-none border-2 border-neutral-300 focus:border-[#171717] h-10 text-xs"
                  {...register('full_name')}
                />
                {errors.full_name && (
                  <p className="text-[11px] text-[#F1654C] font-semibold">{errors.full_name.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                  Email Address <span className="text-[#F1654C]">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="e.g. patient@example.com"
                  className="rounded-none border-2 border-neutral-300 focus:border-[#171717] h-10 text-xs"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-[11px] text-[#F1654C] font-semibold">{errors.email.message}</p>
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
                  className="rounded-none border-2 border-neutral-300 focus:border-[#171717] h-10 text-xs"
                  {...register('phone')}
                />
                {errors.phone && (
                  <p className="text-[11px] text-[#F1654C] font-semibold">{errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                  Create Password <span className="text-[#F1654C]">*</span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Minimum 8 characters with number & special symbol"
                  className="rounded-none border-2 border-neutral-300 focus:border-[#171717] h-10 text-xs"
                  {...register('password')}
                />
                {errors.password && (
                  <p className="text-[11px] text-[#F1654C] font-semibold">{errors.password.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="confirm_password" className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                  Confirm Password <span className="text-[#F1654C]">*</span>
                </Label>
                <Input
                  id="confirm_password"
                  type="password"
                  placeholder="Repeat your password"
                  className="rounded-none border-2 border-neutral-300 focus:border-[#171717] h-10 text-xs"
                  {...register('confirm_password')}
                />
                {errors.confirm_password && (
                  <p className="text-[11px] text-[#F1654C] font-semibold">{errors.confirm_password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#F1654C] hover:bg-[#DF472B] text-white font-bold h-12 rounded-none uppercase text-xs tracking-wider border-2 border-[#171717] mt-2"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                {isLoading ? 'Creating Account...' : 'Complete Patient Registration'}
              </Button>
            </form>

            <div className="pt-4 border-t-2 border-neutral-200 text-center text-xs text-neutral-600">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-[#171717] hover:underline uppercase">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
