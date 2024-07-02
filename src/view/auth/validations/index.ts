import { z } from 'zod'

const phoneRegex = /^(\+?\d{1,3}[\s-]?)?(\(?\d{2,4}\)?[\s-]?)?[\d\s-]{7,15}$/
// +123 456 7890
// 123-456-7890
// (123) 456-7890
// 123 456 7890
// 1234567890
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?=.*\d).{8,}$/
const usernameRegex = /^[a-z][a-z0-9]*$/
const nameRegex = /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂÂÊÔêôưăâ ]+$/
// const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+=[\]{};':"\\|,.<>/?`~\-]).{8,}$/

export const LoginFormValidation = z.object({
	usernameOrEmail: z
		.string({ message: 'Validation.Auth.SignIn.username_or_email.required_message' })
		.refine((value) => /\S+@\S+\.\S+/.test(value) || /^[a-zA-Z0-9]+$/.test(value), {
			message: 'Validation.Auth.SignIn.username_or_email.invalid_message',
		}),
	password: z
		.string({ message: 'Validation.Auth.SignIn.password.required_message' })
		.refine((value) => passwordRegex.test(value), {
			message: 'Validation.Auth.SignIn.password.invalid_message',
		}),
	remember: z.boolean(),
})

export const SignUpFormValidation = z.object({
	firstname: z
		.string({ message: 'Validation.Auth.SignUp.firstname.required_message' })
		.min(1, { message: 'Validation.Auth.SignUp.firstname.required_message' })
		.refine((value) => nameRegex.test(value), {
			message: 'Validation.Auth.SignUp.firstname.invalid_message',
		}),
	lastname: z
		.string({ message: 'Validation.Auth.SignUp.lastname.required_message' })
		.min(1, { message: 'Validation.Auth.SignUp.lastname.required_message' })
		.refine((value) => nameRegex.test(value), {
			message: 'Validation.Auth.SignUp.lastname.invalid_message',
		}),
	email: z
		.string({ message: 'Validation.Auth.SignUp.email.required_message' })
		.email('Validation.Auth.SignUp.email.invalid_message'),
	username: z
		.string({ message: 'Validation.Auth.SignUp.username.required_message' })
		.min(5, { message: 'Validation.Auth.SignUp.username.invalid_message' })
		.refine((value) => usernameRegex.test(value), {
			message: 'Validation.Auth.SignUp.username.invalid_message',
		}),
	password: z
		.string({ message: 'Validation.Auth.SignUp.password.required_message' })
		.refine((value) => passwordRegex.test(value), {
			message: 'Validation.Auth.SignUp.password.invalid_message',
		}),
	phoneNumber: z
		.string()
		.optional()
		.refine(
			(value) => {
				if (!value) return true
				return phoneRegex.test(value)
			},
			{ message: 'Validation.Auth.SignUp.phonenumber.required_message' }
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
		OldPassword: z
			.string()
			.min(8, 'Validation.User.ChangePassword.password.invalid_message')
			.refine((value) => passwordRegex.test(value), {
				message: 'Validation.User.ChangePassword.password.invalid_message',
			}),
		NewPassword: z
			.string()
			.min(8, 'Validation.User.ChangePassword.password.invalid_message')
			.refine((value) => passwordRegex.test(value), {
				message: 'Validation.User.ChangePassword.password.invalid_message',
			}),
		RepeatPassword: z
			.string()
			.min(8, 'Validation.User.ChangePassword.password.invalid_message')
			.refine((value) => passwordRegex.test(value), {
				message: 'Validation.User.ChangePassword.password.invalid_message',
			}),
	})
	.refine((data) => data.NewPassword === data.RepeatPassword, {
		message: 'Validation.User.ChangePassword.password.match_message',
		path: ['RepeatPassword'],
	})

export const ChangePasswordFormValidation = z
	.object({
		userId: z.string(),
		OldPassword: z
			.string()
			.min(8, 'Validation.User.ChangePassword.password.invalid_message')
			.refine((value) => passwordRegex.test(value), {
				message: 'Validation.User.ChangePassword.password.invalid_message',
			}),
		NewPassword: z
			.string()
			.min(8, 'Validation.User.ChangePassword.password.invalid_message')
			.refine((value) => passwordRegex.test(value), {
				message: 'Validation.User.ChangePassword.password.invalid_message',
			}),
		RepeatPassword: z
			.string()
			.min(8, 'Validation.User.ChangePassword.password.invalid_message')
			.refine((value) => passwordRegex.test(value), {
				message: 'Validation.User.ChangePassword.password.invalid_message',
			}),
	})
	.refine((data) => data.NewPassword === data.RepeatPassword, {
		message: 'Validation.User.ChangePassword.password.match_message',
		path: ['RepeatPassword'],
	})
