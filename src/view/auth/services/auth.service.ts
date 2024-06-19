import type { AxiosResponse } from 'axios'

import { API_ROUTES } from '@/common/config'
import { httpClient } from '@/http'
import type { ILoginRequestDto, ILoginResponseDto, IRegisterRequestDto, IRegisterResponseDto } from '@/view/auth/types'

export const AuthService: any = {
	login: async (_user: ILoginRequestDto) => {
		const response: AxiosResponse<ILoginResponseDto, any> = await httpClient.post(
			API_ROUTES.auth.login,
			{ password: _user.password, username: _user.username },
			{ params: {} }
		)

		return response
	},
	register: async (_user: IRegisterRequestDto) => {
		const response: AxiosResponse<IRegisterResponseDto, any> = await httpClient.post(API_ROUTES.auth.register, {
			password: _user.password,
			username: _user.username,
			fullName: _user.fullName,
			email: _user.email,
			phoneNumber: _user.phoneNumber,
		})

		return response
	},
}
