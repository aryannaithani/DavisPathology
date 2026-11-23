import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Activity, LogIn, Lock, Mail, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginSchema, LoginFormData } from '@/schemas';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

export const LoginPage: React.FC = () => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/patient/dashboard';

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const { error } = await signIn(data.email, data.password);
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Sign In Failed',
          description: error.message || 'Invalid email or password. Please try again.',
        });
      } else {
        toast({
          title: 'Welcome Back',
          description: 'Successfully signed in to Davis Pathology Lab.',
        });
        navigate(from, { replace: true });
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
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        {/* Brand Header */}
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
            Sign In to Portal
          </h1>
          <p className="text-xs text-neutral-600">
            Access appointment records, track sample status, and download diagnostic reports.
          </p>
        </div>

        {/* Quick Access Helper Credentials Box */}
        <div className="p-4 bg-[#171717] text-white text-xs space-y-2 border-2 border-[#171717]">
          <div className="flex items-center gap-1.5 text-[#F5C542] font-black text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Quick Access Selection</span>
          </div>
          <p className="text-neutral-400 text-[11px]">
            Select role to pre-fill credentials for immediate review:
          </p>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setValue('email', 'admin@davispathology.com');
                setValue('password', 'AdminPassword123!');
              }}
              className="text-[10px] h-8 bg-neutral-900 border border-neutral-700 text-white hover:bg-neutral-800 rounded-none uppercase font-bold"
            >
              Admin Account
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setValue('email', 'patient@example.com');
                setValue('password', 'PatientPassword123!');
              }}
              className="text-[10px] h-8 bg-neutral-900 border border-neutral-700 text-white hover:bg-neutral-800 rounded-none uppercase font-bold"
            >
              Patient Account
            </Button>
          </div>
        </div>

        {/* Form Container */}
        <div className="border-2 border-[#171717] bg-white">
          <div className="p-4 bg-neutral-100 border-b-2 border-[#171717] flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-[#171717]">Authentication Credentials</span>
            <Lock className="w-3.5 h-3.5 text-[#F1654C]" />
          </div>

          <div className="p-6 sm:p-8 space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                  Email Address <span className="text-[#F1654C]">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="rounded-none border-2 border-neutral-300 focus:border-[#171717] h-11 text-xs"
                    {...register('email')}
                  />
                  <Mail className="absolute right-3 top-3.5 w-4 h-4 text-neutral-400" />
                </div>
                {errors.email && (
                  <p className="text-[11px] text-[#F1654C] font-semibold">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                    Password <span className="text-[#F1654C]">*</span>
                  </Label>
                  <Link
                    to="/forgot-password"
                    className="text-[11px] font-bold text-[#F1654C] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="rounded-none border-2 border-neutral-300 focus:border-[#171717] h-11 text-xs"
                    {...register('password')}
                  />
                  <Lock className="absolute right-3 top-3.5 w-4 h-4 text-neutral-400" />
                </div>
                {errors.password && (
                  <p className="text-[11px] text-[#F1654C] font-semibold">{errors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#F1654C] hover:bg-[#DF472B] text-white font-bold h-12 rounded-none uppercase text-xs tracking-wider border-2 border-[#171717] mt-2"
              >
                <LogIn className="w-4 h-4 mr-2" />
                {isLoading ? 'Signing In...' : 'Sign In to Portal'}
              </Button>
            </form>

            <div className="pt-4 border-t-2 border-neutral-200 text-center text-xs text-neutral-600">
              Don't have a patient account?{' '}
              <Link to="/register" className="font-bold text-[#171717] hover:underline uppercase">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
