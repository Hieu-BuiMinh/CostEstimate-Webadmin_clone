import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { type IHttpResponseDto } from '@/http/types/http.response'
import { UsersChangePasswordService } from '@/view/admin/users/services/user-change-password.service'
import {
	type IChangePasswordRequestDto,
	type IChangePasswordResponseDto,
} from '@/view/admin/users/types/user-change-password.type'

export default function useUserChangePassword() {
	return useMutation({
		mutationKey: ['useUserChangePassword'],
		mutationFn: (_user: IChangePasswordRequestDto) => {
			return UsersChangePasswordService.changePassword(_user)
		},
		onSuccess: (res: IHttpResponseDto<IChangePasswordResponseDto>) => {
			if (res.statusCode === 200) {
				toast.success('Change password successful!')
			}
			if (res.statusCode !== 200) {
				toast.error(res.message)
			}
		},
	})
}
