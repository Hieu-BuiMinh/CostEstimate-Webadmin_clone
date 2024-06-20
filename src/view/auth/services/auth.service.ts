import { API_ROUTES } from '@/common/config'
import { httpClient } from '@/http'
import {
	AuthType,
	type ILoginRequestDto,
	type ILoginResponseDto,
	type IRegisterRequestDto,
	type IRegisterResponseDto,
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
			password: _user.password,
			username: _user.username,
			fullName: _user.fullName,
			email: _user.email,
			phoneNumber: _user.phoneNumber,
		})

		return response
	},
}
