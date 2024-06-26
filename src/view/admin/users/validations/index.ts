import { z } from 'zod'

// const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/

export const UpdateUserFormValidation = z.object({
	firstName: z
		.string({ message: 'Validation.User.UpdateUser.firstname.required_message' })
		.min(1, { message: 'Validation.User.UpdateUser.firstname.required_message' }),
	lastName: z
		.string({ message: 'Validation.User.UpdateUser.lastname.required_message' })
		.min(1, { message: 'Validation.User.UpdateUser.lastname.required_message' }),
	isReverse: z.string({ message: 'Validation.User.UpdateUser.isreverse.required_message' }).optional(),
})
