import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Activity, UserPlus, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
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
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-md">
              <Activity className="w-7 h-7 stroke-[2.5]" />
            </div>
          </Link>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-foreground">
            Create Patient Account
          </h1>
          <p className="text-xs text-muted-foreground">
            Register to view test bookings, access digital reports, and manage health records.
          </p>
        </div>

        <Card className="border-border shadow-md">
          <CardContent className="p-6 sm:p-8 space-y-5">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-xs font-semibold">
                  Password <span className="text-primary">*</span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="At least 6 characters"
                  {...register('password')}
                />
                {errors.password && (
                  <p className="text-[11px] text-destructive">{errors.password.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="confirm_password" className="text-xs font-semibold">
                  Confirm Password <span className="text-primary">*</span>
                </Label>
                <Input
                  id="confirm_password"
                  type="password"
                  placeholder="Repeat your password"
                  {...register('confirm_password')}
                />
                {errors.confirm_password && (
                  <p className="text-[11px] text-destructive">{errors.confirm_password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary-600 text-white font-bold h-11 text-sm shadow-sm gap-2"
              >
                <UserPlus className="w-4 h-4" />
                {isLoading ? 'Creating Account...' : 'Complete Registration'}
              </Button>
            </form>

            <div className="pt-4 border-t border-border text-center text-xs text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
