import { API_ROUTES } from '@/common/config'
import { httpClient } from '@/http'
import type {
	IDeleteUserByIdResponseDto,
	IGettAllUsersRequestDto,
	IGettAllUsersResponseDto,
	IGettUserByIdResponseDto,
	IInsertUserRoleRequestDto,
	IInsertUserRoleResponseDto,
	IUpdateUserInforRequestDto,
	IUpdateUserInforResponseDto,
} from '@/view/admin/users/types'

export const UsersDashboardService = {
	getALlUsers: async (_params: IGettAllUsersRequestDto) => {
		const response: IGettAllUsersResponseDto = await httpClient.get(API_ROUTES.usersDashboard.getAllUsers, {
			params: _params,
		})

		return response?.data
	},
	getUserById: async (_id: string) => {
		const response: IGettUserByIdResponseDto = await httpClient.get(API_ROUTES.usersDashboard.getUserById(_id))

		return response?.data
	},
	updateUserInfor: async (_user: IUpdateUserInforRequestDto) => {
		const response: IUpdateUserInforResponseDto = await httpClient.put(API_ROUTES.usersDashboard.updateUserInfor, {
			id: _user.id,
			firstName: _user.firstName,
			lastName: _user.lastName,
			isReverse: _user.isReverse,
		})

		return response
	},
	deleteUserById: async (_id: string) => {
		const response: IDeleteUserByIdResponseDto = await httpClient.delete(
			API_ROUTES.usersDashboard.deleteUserById(_id)
		)

		return response
	},
	insertUserRole: async (_user: IInsertUserRoleRequestDto) => {
		const response: IInsertUserRoleResponseDto = await httpClient.post(API_ROUTES.usersDashboard.insertUserRole, {
			userId: _user.userId,
			roleIds: _user.roleIds,
		})

		return response
	},
}
