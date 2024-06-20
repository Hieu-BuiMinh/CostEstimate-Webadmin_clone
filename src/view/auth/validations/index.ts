import { z } from 'zod'

const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/

export const LoginFormValidation = z.object({
	usernameOrEmail: z
		.string({ message: 'This field is require' })
		.min(5, 'Password must be at least 5 characters long'),
	password: z.string({ message: 'This field is required' }).min(8, 'Password must be at least 8 characters long'),
	remember: z.boolean(),
})

export const SignUpFormValidation = z.object({
	fullName: z.string({ message: 'This field is require' }),
	username: z.string({ message: 'This field is require' }).refine((value) => /^[a-z0-9]+$/.test(value), {
		message: 'Username must only contain lowercase letters and numbers',
	}),
	password: z.string({ message: 'This field is require' }).min(8, 'Password must be at least 8 characters long'),
	email: z.string({ message: 'This field is require' }).email('Invalid e-mail format'),
	phoneNumber: z.string().regex(phoneRegex, 'Invalid phone number!'),
})

export const TestLoginFormValidation = z.object({
	// username: z.string({ message: 'This field is required' }).email('Invalid e-mail format'),
	username: z.string({ message: 'This field is required' }).min(5, 'Password must be at least 5 characters long'),
	password: z.string({ message: 'This field is required' }).min(8, 'Password must be at least 8 characters long'),
	remember: z.boolean(),
	gender: z.string({ message: 'This field is required' }),
	birth: z.date({ message: 'This field is required' }),
	contact: z.string({ message: 'This field is required' }),
})
