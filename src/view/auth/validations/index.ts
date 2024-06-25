import { z } from 'zod'

const phoneRegex = /^(\+?\d{1,3}[\s-]?)?(\(?\d{2,4}\)?[\s-]?)?[\d\s-]{7,15}$/
// +123 456 7890
// 123-456-7890
// (123) 456-7890
// 123 456 7890
// 1234567890
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?=.*\d).{8,}$/

export const LoginFormValidation = z.object({
	usernameOrEmail: z
		.string({ message: 'This field is required' })
		.min(5, 'Username or Email must be at least 5 characters long')
		.refine((value) => /\S+@\S+\.\S+/.test(value) || /^[a-zA-Z0-9]+$/.test(value), {
			message: 'Consider using an email format',
		}),
	password: z.string({ message: 'This field is required' }).refine((value) => passwordRegex.test(value), {
		message:
			'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character',
	}),
	remember: z.boolean(),
})

export const SignUpFormValidation = z.object({
	firstname: z.string({ message: 'This field is require' }).min(1, { message: 'This field is require' }),
	lastname: z.string({ message: 'This field is require' }).min(1, { message: 'This field is require' }),
	email: z.string({ message: 'This field is require' }).email('Invalid e-mail format'),
	username: z
		.string({ message: 'This field is require' })
		.min(5, { message: 'Username must be at least 5 characters' }),
	password: z.string({ message: 'This field is required' }).refine((value) => passwordRegex.test(value), {
		message:
			'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character',
	}),
	phoneNumber: z
		.string()
		.optional()
		.refine(
			(value) => {
				if (!value) return true
				return phoneRegex.test(value)
			},
			{ message: 'Invalid phone number' }
		),
})

export const TestLoginFormValidation = z.object({
	username: z.string({ message: 'This field is required' }).min(5, 'Password must be at least 5 characters long'),
	password: z.string({ message: 'This field is required' }).min(8, 'Password must be at least 8 characters long'),
	remember: z.boolean(),
	gender: z.string({ message: 'This field is required' }),
	birth: z.date({ message: 'This field is required' }),
	contact: z.string({ message: 'This field is required' }),
})

export const ResetPasswordFormValidation = z
	.object({
		curPassword: z.string().min(8, 'Password must be at least 8 characters long'),
		password: z.string().min(8, 'Password must be at least 8 characters long'),
		confirmPassword: z.string().min(8, 'Password must be at least 8 characters long'),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	})
