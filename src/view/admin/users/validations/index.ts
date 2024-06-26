import { z } from 'zod'

// const phoneRegex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/

export const UpdateUserFormValidation = z.object({
	firstName: z.string({ message: 'This field is require' }),
	lastName: z.string({ message: 'This field is require' }),
	isReverse: z.string({ message: 'Bạn phải chọn kiểu hiện thị họ tên' }),
})
