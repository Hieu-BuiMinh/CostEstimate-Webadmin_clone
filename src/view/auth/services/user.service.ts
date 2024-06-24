import type { AxiosResponse } from 'axios'

import { API_ROUTES } from '@/common/config'
import { httpClient } from '@/http'
import type { ILoginRequestDto, ILoginResponseDto } from '@/view/auth/types'

export const UserService: any = {
	getAllUser: async (_user: ILoginRequestDto) => {
		const response: AxiosResponse<ILoginResponseDto, any> = await httpClient.post(
			API_ROUTES.auth.login,
			{ password: _user.password, username: _user.usernameOrEmail, authType: 1 },
			{ params: {} }
		)

		return response
	},
}
