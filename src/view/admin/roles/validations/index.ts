import { z } from 'zod'

export const UpsertRoleFormValidation = z.object({
	roleName: z.string({ message: 'This field is require' }).min(1, 'Role name must be at least 1 characters long'),
})
