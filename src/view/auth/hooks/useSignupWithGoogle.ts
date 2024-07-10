import { useMutation } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { APP_ROUTER } from '@/common/config'
import { AuthService } from '@/view/auth/services/auth.service'
import type { ISignupWithGGRequestDto, ISignupWithGGResponseDto } from '@/view/auth/types'

export function useSignupWithGoogle() {
	const router = useRouter()

	return useMutation({
		mutationKey: ['useSignupWithGoogle'],
		mutationFn: (_user: ISignupWithGGRequestDto) => {
			return AuthService.signupWithGG(_user)
		},
		onSuccess: (res: ISignupWithGGResponseDto) => {
			if (res.statusCode === 200) {
				if (res?.data === null) {
					toast.error('Login failed')
					router.push(APP_ROUTER.paths.center.signIn.path)
				} else if (res?.data?.accessToken && res.data.refreshToken) {
					Cookies.set('accessToken', res?.data?.accessToken)
					Cookies.set('refreshToken', res.data.refreshToken)
					toast.success('Login Google successful!')
					router.push(APP_ROUTER.paths.admin.dashboard.path)
				}
			}
			if (res.statusCode !== 200) {
				toast.error('Login failed')
				// router.push(APP_ROUTER.paths.homePage.root)
			}
		},
	})
}
