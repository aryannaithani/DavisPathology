import { z } from 'zod';

export const bookingSchema = z.object({
  patient_name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  email: z
    .string()
    .email('Enter a valid email address')
    .optional()
    .or(z.literal('')),
  age: z
    .number({ invalid_type_error: 'Enter a valid age' })
    .int('Age must be a whole number')
    .min(0, 'Age must be at least 0')
    .max(150, 'Enter a valid age'),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Please select a gender',
  }),
  selected_tests: z
    .array(z.string())
    .optional(),
  selected_packages: z
    .array(z.string())
    .optional(),
  appointment_date: z
    .string()
    .min(1, 'Please select an appointment date'),
  appointment_time: z
    .string()
    .min(1, 'Please select a preferred time'),
  collection_method: z.enum(['visit_laboratory', 'home_collection'], {
    required_error: 'Please select a collection method',
  }),
  notes: z.string().max(500, 'Notes must be less than 500 characters').optional(),
}).refine(
  (data) => {
    const tests = data.selected_tests?.length ?? 0;
    const packages = data.selected_packages?.length ?? 0;
    return tests + packages > 0;
  },
  {
    message: 'Please select at least one test or package',
    path: ['selected_tests'],
  }
);

export type BookingFormData = z.infer<typeof bookingSchema>;

export const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  full_name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Enter a valid email address'),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(72, 'Password must be less than 72 characters'),
  confirm_password: z.string(),
}).refine((data) => data.password === data.confirm_password, {
  message: 'Passwords do not match',
  path: ['confirm_password'],
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email('Enter a valid email address'),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  email: z.string().email('Enter a valid email address'),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  subject: z
    .string()
    .min(2, 'Subject must be at least 2 characters')
    .max(200, 'Subject must be less than 200 characters'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const testSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  category_id: z.string().min(1, 'Category is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  sample_type: z.string().min(2, 'Sample type is required'),
  preparation: z.string().min(5, 'Preparation instructions are required'),
  turnaround_time: z.string().min(2, 'Turnaround time is required'),
  price: z.number().min(1, 'Price must be greater than 0'),
  is_active: z.boolean(),
});

export type TestFormData = z.infer<typeof testSchema>;

export const packageSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().min(1, 'Price must be greater than 0'),
  preparation: z.string().min(5, 'Preparation instructions are required'),
  is_active: z.boolean(),
  test_ids: z.array(z.string()).min(1, 'At least one test must be included'),
});

export type PackageFormData = z.infer<typeof packageSchema>;

export const profileSchema = z.object({
  full_name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
