import { API_ROUTES } from '@/common/config'
import { httpClient } from '@/http'
import type {
	IDeleteRoleByIdResponseDto,
	IGettAllRolesRequestDto,
	IGettAllRolesResponseDto,
	IGettRoleByIdResponseDto,
	IUpdateRoleInforRequestDto,
	IUpdateRoleInforResponseDto,
} from '@/view/admin/roles/types'

export const RolesDashboardService = {
	getALlRoles: async (_params: IGettAllRolesRequestDto) => {
		const response: IGettAllRolesResponseDto = await httpClient.get(API_ROUTES.rolesDashboard.getAllRoles, {
			params: _params,
		})

		return response?.data
	},
	getRoleById: async (_id: string) => {
		const response: IGettRoleByIdResponseDto = await httpClient.get(API_ROUTES.rolesDashboard.getRoleById(_id))

		return response?.data
	},
	updateRole: async (_user: IUpdateRoleInforRequestDto) => {
		const response: IUpdateRoleInforResponseDto = await httpClient.put(API_ROUTES.rolesDashboard.updateRole, {
			id: _user.id,
			username: _user.username,
			fullName: _user.fullName,
			email: _user.email,
			phoneNumber: _user.phoneNumber,
		})

		return response
	},
	deleteRoleById: async (_id: string) => {
		const response: IDeleteRoleByIdResponseDto = await httpClient.delete(
			API_ROUTES.rolesDashboard.deleteRoleById(_id)
		)

		return response
	},
}
