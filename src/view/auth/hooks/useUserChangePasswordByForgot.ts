import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { APP_ROUTER } from '@/common/config'
import { AuthService } from '@/view/auth/services/auth.service'
import type { IUserChangePasswordByForgotRequestDto } from '@/view/auth/types'

export function useUserChangePasswordByForgot() {
	const router = useRouter()
	return useMutation({
		mutationKey: ['useUserChangePasswordByForgot'],
		mutationFn: (_data: IUserChangePasswordByForgotRequestDto) => {
			return AuthService.UserChangePasswordByForgot(_data)
		},
		onSuccess: (res: any) => {
			if (res.statusCode === 200) {
				if (res.data) {
					toast.success('Update password successful')
					router.replace(APP_ROUTER.paths.center.signIn.path)
				} else {
					toast.error('Update password failed')
				}
			}
			if (res.statusCode !== 200) {
				toast.error('Update password failed')
			}
		},
	})
}
