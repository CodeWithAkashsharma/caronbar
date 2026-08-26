import { z } from 'zod';

export const bookingFormSchema = z.object({
  // Step 6: Address
  streetAddress: z.string().min(5, 'Street address must be at least 5 characters'),
  locality: z.string().min(2, 'Locality/Area is required'),
  city: z.string().min(2, 'City is required'),
  pincode: z.string().regex(/^\d{5,6}$/, 'Please enter a valid 5 or 6 digit ZIP/Pincode'),
  landmark: z.string().optional(),
  
  // Step 7: Contact
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid 10+ digit phone number'),
  vehicleModel: z.string().min(2, 'Vehicle make and model is required (e.g. 2024 Porsche 911)'),
  licensePlate: z.string().min(3, 'Registration / License plate number is required'),
  specialInstructions: z.string().optional(),
});

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  serviceInterest: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().min(10, 'Enter a valid phone number'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword']
});
