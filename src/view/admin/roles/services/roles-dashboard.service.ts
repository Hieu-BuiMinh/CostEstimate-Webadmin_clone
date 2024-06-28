import { API_ROUTES } from '@/common/config'
import { httpClient } from '@/http'
import type {
	IAddRoleInforRequestDto,
	IAddRoleInforResponseDto,
	IDeleteRoleByIdResponseDto,
	IGetRolesDasboardRequestDto,
	IGetRolesDasboardResponseDto,
	IGettRoleByIdResponseDto,
	IUpdateRoleInforRequestDto,
	IUpdateRoleInforResponseDto,
} from '@/view/admin/roles/types'

export const RolesDashboardService = {
	getRolesGridView: async (_params: IGetRolesDasboardRequestDto) => {
		const response: IGetRolesDasboardResponseDto = await httpClient.get(
			API_ROUTES.rolesDashboard.getRolesGridView,
			{
				params: _params,
			}
		)

		return response?.data
	},
	getAllRoles: async () => {
		const response: IGetRolesDasboardResponseDto = await httpClient.get(API_ROUTES.rolesDashboard.getAllRoles)

		return response?.data
	},
	getRoleById: async (_id: string) => {
		const response: IGettRoleByIdResponseDto = await httpClient.get(API_ROUTES.rolesDashboard.getRoleById(_id))

		return response?.data
	},
	addRole: async (_role: IAddRoleInforRequestDto) => {
		const response: IAddRoleInforResponseDto = await httpClient.post(API_ROUTES.rolesDashboard.insertRole, {
			roleName: _role.roleName,
		})

		return response
	},
	updateRole: async (_role: IUpdateRoleInforRequestDto) => {
		const response: IUpdateRoleInforResponseDto = await httpClient.put(API_ROUTES.rolesDashboard.updateRole, {
			roleId: _role.roleId,
			roleName: _role.roleName,
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
