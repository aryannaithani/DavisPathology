import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Activity, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { forgotPasswordSchema, ForgotPasswordFormData } from '@/schemas';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

export const ForgotPasswordPage: React.FC = () => {
  const { resetPassword } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      const { error } = await resetPassword(data.email);
      if (error) {
        toast({
          variant: 'destructive',
          title: 'Reset Request Failed',
          description: error.message || 'Could not send reset link. Please check the email.',
        });
      } else {
        setIsSubmitted(true);
        toast({
          title: 'Reset Link Sent',
          description: 'Instructions to reset your password have been emailed.',
        });
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
            Reset Password
          </h1>
          <p className="text-xs text-neutral-600">
            Enter your registered email address and we'll dispatch password recovery instructions.
          </p>
        </div>

        <div className="border-2 border-[#171717] bg-white">
          <div className="p-4 bg-neutral-100 border-b-2 border-[#171717] flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-[#171717]">Password Recovery</span>
            <Mail className="w-4 h-4 text-[#F1654C]" />
          </div>

          <div className="p-6 sm:p-8 space-y-4">
            {isSubmitted ? (
              <div className="p-4 bg-green-50 border-2 border-green-600 text-green-900 text-xs space-y-3">
                <div className="flex items-center gap-2 font-black text-sm text-green-900 uppercase">
                  <CheckCircle2 className="w-5 h-5 text-green-700" />
                  Reset Instructions Sent
                </div>
                <p className="leading-relaxed">
                  If an account exists for the email provided, a password reset link has been dispatched. Please check your inbox and spam folders.
                </p>
                <div className="pt-2">
                  <Link to="/login">
                    <Button variant="outline" className="w-full text-xs uppercase font-bold rounded-none border-2 border-[#171717] h-10">
                      Back to Sign In
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-[#171717]">
                    Registered Email Address <span className="text-[#F1654C]">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="patient@example.com"
                    className="rounded-none border-2 border-neutral-300 focus:border-[#171717] h-11 text-xs"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-[#F1654C] font-semibold">{errors.email.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#F1654C] hover:bg-[#DF472B] text-white font-bold h-12 rounded-none uppercase text-xs tracking-wider border-2 border-[#171717]"
                >
                  {isLoading ? 'Sending Link...' : 'Send Password Reset Link'}
                </Button>

                <div className="pt-2 text-center">
                  <Link
                    to="/login"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-600 hover:text-[#171717] uppercase"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back to Sign In
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
