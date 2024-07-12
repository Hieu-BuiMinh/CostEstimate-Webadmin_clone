import { useMutation } from '@tanstack/react-query'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { APP_ROUTER } from '@/common/config'
import { AuthService } from '@/view/auth/services/auth.service'
import type { ISigninWithAutodeskResponseDto } from '@/view/auth/types'

export function useLoginWithAutodesk() {
	const router = useRouter()
	return useMutation({
		mutationKey: ['useLoginWithAutodesk'],
		mutationFn: (_params: { _code: string; _urlCallback: string }) => {
			return AuthService.signinWithAutodesk(_params)
		},
		onSuccess: (res: ISigninWithAutodeskResponseDto) => {
			if (res.statusCode === 200) {
				if (res?.data.length > 0) {
					Cookies.set('accessToken', res?.data[0]?.accessToken || '')
					Cookies.set('refreshToken', res?.data[0]?.refreshToken || '')
					Cookies.set('autodeskAccessToken', res?.data[1]?.accessToken || '')
					Cookies.set('autodeskRefreshToken', res?.data[1]?.refreshToken || '')

					toast.success('Login Google successful!')

					router.push(APP_ROUTER.paths.admin.dashboard.path)
				}
			}
			if (res.statusCode !== 200) {
				toast.error('Authenticating failed')
				router.push(APP_ROUTER.paths.center.signIn.path)
			}
		},
	})
}
