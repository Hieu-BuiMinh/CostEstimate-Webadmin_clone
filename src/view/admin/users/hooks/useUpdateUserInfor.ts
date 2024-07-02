import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { UsersDashboardService } from '@/view/admin/users/services/users-dashboard.service'
import type { IUpdateUserInforRequestDto, IUpdateUserInforResponseDto } from '@/view/admin/users/types'

export function useUpdateUserInfor() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['useUpdateUserInfor'],
		mutationFn: (_user: IUpdateUserInforRequestDto) => {
			return UsersDashboardService.updateUserInfor(_user)
		},
		onSuccess: (res: IUpdateUserInforResponseDto) => {
			if (res?.statusCode === 200) {
				queryClient.refetchQueries({ queryKey: ['useGetUserById'] })
				queryClient.refetchQueries({ queryKey: ['useGetAllUsersDashBoard'] })
				toast.success('Update successfull')
			}
			if (res?.statusCode !== 200) {
				toast.error(res.message)
			}
		},
	})
}
