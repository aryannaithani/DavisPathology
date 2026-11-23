import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Activity, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
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
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-md">
              <Activity className="w-7 h-7 stroke-[2.5]" />
            </div>
          </Link>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-foreground">
            Reset Password
          </h1>
          <p className="text-xs text-muted-foreground">
            Enter your registered email address and we'll send you a password recovery link.
          </p>
        </div>

        <Card className="border-border shadow-md">
          <CardContent className="p-6 sm:p-8 space-y-5">
            {isSubmitted ? (
              <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-900 text-xs space-y-3">
                <div className="flex items-center gap-2 font-bold text-sm text-green-800">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Reset Instructions Sent
                </div>
                <p>
                  If an account exists for the email provided, a password reset link has been dispatched. Please check your inbox and spam folders.
                </p>
                <div className="pt-2">
                  <Link to="/login">
                    <Button variant="outline" className="w-full text-xs">
                      Back to Sign In
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-semibold">
                    Registered Email Address <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="e.g. yourname@example.com"
                    {...register('email')}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-destructive">{errors.email.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary-600 text-white font-bold h-11 text-sm shadow-sm gap-2"
                >
                  <Mail className="w-4 h-4" />
                  {isLoading ? 'Sending Link...' : 'Send Password Reset Link'}
                </Button>
              </form>
            )}

            <div className="pt-4 border-t border-border text-center">
              <Link
                to="/login"
                className="inline-flex items-center text-xs text-muted-foreground hover:text-foreground font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
                Return to Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
