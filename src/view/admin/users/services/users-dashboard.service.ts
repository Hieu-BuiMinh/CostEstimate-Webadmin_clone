import { API_ROUTES } from '@/common/config'
import { httpClient } from '@/http'
import type { IGettAllUsersRequestDto, IGettAllUsersResponseDto } from '@/view/admin/users/types'

export const UsersDashboardService = {
	getALlUsers: async (_params: IGettAllUsersRequestDto) => {
		const response: IGettAllUsersResponseDto = await httpClient.get(API_ROUTES.usersDashboard.getAllUsers, {
			params: _params,
		})

		return response?.data
	},
}
