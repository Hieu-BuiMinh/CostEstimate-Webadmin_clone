import { z } from 'zod'

export const InsertRoleFormValidation = z.object({
	roleName: z
		.string({ message: 'Validation.Role.Insert.role_name.require_message' })
		.min(1, 'Validation.Role.Insert.role_name.invalid_message'),
})

export const UpdateRoleFormValidation = z.object({
	roleId: z.string(),
	roleName: z
		.string({ message: 'Validation.Role.Update.role_name.require_message' })
		.min(1, 'Validation.Role.Update.role_name.invalid_message'),
})
