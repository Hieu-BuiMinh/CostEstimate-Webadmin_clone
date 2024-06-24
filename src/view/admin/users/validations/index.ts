import { z } from 'zod'

// const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/

export const UpdateUserFormValidation = z.object({
	fullName: z.string({ message: 'This field is require' }).min(1, 'Fullname must be at least 1 characters long'),
	username: z.string({ message: 'This field is require' }).refine((value) => /^[a-z0-9]+$/.test(value), {
		message: 'Username must only contain lowercase letters and numbers',
	}),
	// email: z.string({ message: 'This field is require' }).email('Invalid e-mail format'),
	// phoneNumber: z.string().regex(phoneRegex, 'Invalid phone number!').optional(),
})
