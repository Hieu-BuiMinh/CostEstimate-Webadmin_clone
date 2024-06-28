import { API_ROUTES } from '@/common/config'
import { httpClient } from '@/http'
import {
	type IChangePasswordRequestDto,
	type IChangePasswordResponseDto,
} from '@/view/admin/users/types/user-change-password.type'

export const UsersChangePasswordService: any = {
	changePassword: async (_user: IChangePasswordRequestDto) => {
		const response: IChangePasswordResponseDto = await httpClient.post(
			API_ROUTES.usersDashboard.changePasswordUser,
			{
				userId: _user.userId,
				OldPassword: _user.OldPassword,
				NewPassword: _user.NewPassword,
				RepeatPassword: _user.RepeatPassword,
			}
		)
		return response
	},
}
