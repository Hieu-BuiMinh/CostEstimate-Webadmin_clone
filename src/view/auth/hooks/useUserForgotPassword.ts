import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { AuthService } from '@/view/auth/services/auth.service'
import type { IUserForgotPasswordRequestDto } from '@/view/auth/types'

export function useUserForgotPassword() {
	return useMutation({
		mutationKey: ['useUserForgotPassword'],
		mutationFn: (_data: IUserForgotPasswordRequestDto) => {
			return AuthService.UserForgotPassword(_data)
		},
		onSuccess: (res: any) => {
			if (res.statusCode === 200) {
				if (res.data) {
					toast.success('Send verify email successful')
				} else {
					toast.error('Send verify email failed')
				}
			}
			if (res.statusCode !== 200) {
				toast.error('Send verify email failed')
			}
		},
	})
}
