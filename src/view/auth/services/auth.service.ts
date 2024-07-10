import { API_ROUTES } from '@/common/config'
import { httpClient } from '@/http'
import {
	AuthType,
	type ILoginRequestDto,
	type ILoginResponseDto,
	type IRegisterRequestDto,
	type IRegisterResponseDto,
	type IResetPasswordRequestDto,
	type IResetPasswordResponseDto,
	type ISigninWithGGResponseDto,
	type ISignupWithGGRequestDto,
	type ISignupWithGGResponseDto,
} from '@/view/auth/types'

export const AuthService: any = {
	login: async (_user: Omit<ILoginRequestDto, 'authType'>) => {
		// format user data before call api
		let data = null
		if (_user.usernameOrEmail.includes('@')) {
			data = { ..._user, authType: AuthType.Email }
		} else {
			data = { ..._user, authType: AuthType.Username }
		}

		const response: ILoginResponseDto = await httpClient.post(API_ROUTES.auth.login, data)

		return response
	},
	register: async (_user: IRegisterRequestDto) => {
		const response: IRegisterResponseDto = await httpClient.post(API_ROUTES.auth.register, {
			firstName: _user.firstname,
			lastName: _user.lastname,
			password: _user.password,
			username: _user.username,
			email: _user.email,
			phoneNumber: _user.phoneNumber,
		})

		return response
	},
	resetPassword: async (_user: IResetPasswordRequestDto) => {
		const response: IResetPasswordResponseDto = await httpClient.post(API_ROUTES.auth.resetPassword, {
			password: _user.password,
			confirmPassword: _user.confirmPassword,
		})
		return response
	},
	signinWithGG: async (_email: string) => {
		const response: ISigninWithGGResponseDto = await httpClient.post(API_ROUTES.auth.signinWithGG, {
			email: _email,
		})
		return response
	},
	signupWithGG: async (_user: ISignupWithGGRequestDto) => {
		const response: ISignupWithGGResponseDto = await httpClient.post(API_ROUTES.auth.signupWithGG, {
			firstName: _user.firstName,
			lastName: _user.lastName,
			username: _user.username,
			email: _user.email,
		})
		return response
	},
	signinWithAutodesk: async (_code: string) => {
		const response: ISignupWithGGResponseDto = await httpClient.post(API_ROUTES.auth.signinWithAutodesk, {
			code: _code,
		})
		return response
	},
}
