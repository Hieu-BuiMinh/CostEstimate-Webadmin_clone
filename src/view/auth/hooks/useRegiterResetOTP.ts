import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { AuthService } from '@/view/auth/services/auth.service'

export function useRegiterResetOTP() {
	return useMutation({
		mutationKey: ['useRegiterResetOTP'],
		mutationFn: ({ _userId }: { _userId: string }) => {
			return AuthService.UserResetOTP({ _userId })
		},
		onSuccess: (res: any) => {
			if (res.statusCode === 200) {
				if (res.data) {
					toast.success('Resend successful')
				} else {
					toast.error('Resend failed')
				}
			}
			if (res.statusCode !== 200) {
				toast.error('Resend failed')
			}
		},
	})
}
