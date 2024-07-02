import { z } from 'zod'

// const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
const nameRegex =
	/^[a-zA-ÁÀẢÃẠáàảãạÂẤẦẨẪẬâấầẩẫậĂẮẰẲẴẶăắằẳẵặĐđÉÈẺẼẸéèẻẽẹÊẾỀỂỄỆêếềểễệÓÒỎÕỌóòỏõọÔỐỒỔỖỘôốồổỗộƠỚỜỞỠỢơớờởỡợÍÌỈĨỊíìỉĩịÚÙỦŨỤúùủũụƯỨỪỬỮỰưứừửữựÝỲỶỸỴýỳỷỹỵ ]+$/
export const UpdateUserFormValidation = z.object({
	firstName: z
		.string({ message: 'Validation.User.UpdateUser.firstname.required_message' })
		.min(1, { message: 'Validation.User.UpdateUser.firstname.invalid_message' })
		.refine((value) => nameRegex.test(value), {
			message: 'Validation.User.UpdateUser.firstname.invalid_message',
		}),
	lastName: z
		.string({ message: 'Validation.User.UpdateUser.lastname.required_message' })
		.min(1, { message: 'Validation.User.UpdateUser.lastname.invalid_message' })
		.refine((value) => nameRegex.test(value), {
			message: 'Validation.User.UpdateUser.firstname.invalid_message',
		}),
	isReverse: z.string({ message: 'Validation.User.UpdateUser.isreverse.required_message' }).optional(),
})
export const UserRoleFormValidation = z.object({
	userId: z.string(),
	roleIds: z.array(z.string()),
})
