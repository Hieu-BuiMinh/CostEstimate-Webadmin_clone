import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { RolesDashboardService } from '@/view/admin/roles/services/roles-dashboard.service'
import type { IUpdateUserInforRequestDto, IUpdateUserInforResponseDto } from '@/view/admin/users/types'

export function useUpdateRole() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['useUpdateRole'],
		mutationFn: (_user: IUpdateUserInforRequestDto) => {
			return RolesDashboardService.updateRole(_user)
		},
		onSuccess: (res: IUpdateUserInforResponseDto) => {
			if (res?.statusCode === 200) {
				queryClient.invalidateQueries({ queryKey: ['useGetUserById'] })
				queryClient.invalidateQueries({ queryKey: ['useGettAllUsersDashBoard'] })
				toast.success('Update successfull')
			}
			if (res?.statusCode !== 200) {
				toast.error(res.message)
			}
		},
	})
}
