import { z } from 'zod'

export const UpdateRoleFormValidation = z.object({
	fullName: z.string({ message: 'This field is require' }).min(1, 'Fullname must be at least 1 characters long'),
	username: z.string({ message: 'This field is require' }).refine((value) => /^[a-z0-9]+$/.test(value), {
		message: 'Username must only contain lowercase letters and numbers',
	}),
})
