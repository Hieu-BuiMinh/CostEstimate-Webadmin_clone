import { useMutation } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'

import { AuthService } from '@/view/auth/services/auth.service'
import type { ILoginRequestDto, ILoginResponseDto } from '@/view/auth/types'

export function useAuthLogin() {
	return useMutation({
		mutationKey: ['useAuthLogin'],
		mutationFn: (_user: ILoginRequestDto) => {
			return AuthService.login(_user)
		},
		onSuccess: (res: ILoginResponseDto) => {
			if (res.statusCode === 200) {
				if (res.data.accessToken) Cookies.set('accessToken', res.data.accessToken)
				if (res.data.refreshToken) Cookies.set('refreshToken', res.data.refreshToken)
				toast.success('Login successful!')
			}
			if (res.statusCode !== 200) {
				toast.error('Login failded')
			}
		},
	})
}
