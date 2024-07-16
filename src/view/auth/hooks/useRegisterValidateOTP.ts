import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { APP_ROUTER } from '@/common/config'
import { AuthService } from '@/view/auth/services/auth.service'

export function useRegisterValidateOTP() {
	const router = useRouter()
	return useMutation({
		mutationKey: ['useRegisterValidateOTP'],
		mutationFn: ({ codeOTP, userId }: { codeOTP: string; userId: string }) => {
			return AuthService.UserValidateOTP({
				_codeOTP: codeOTP,
				_userId: userId,
			})
		},
		onSuccess: (res: any) => {
			if (res.statusCode === 200) {
				if (res.data) {
					router.push(APP_ROUTER.paths.center.signIn.path)
				} else {
					toast.error('Verify failed')
				}
			}
			if (res.statusCode !== 200) {
				toast.error('Verify failed')
			}
		},
	})
}
