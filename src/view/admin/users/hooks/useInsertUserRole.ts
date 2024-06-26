import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { UsersDashboardService } from '@/view/admin/users/services/users-dashboard.service'
import type { IInsertUserRoleRequestDto, IInsertUserRoleResponseDto } from '@/view/admin/users/types'

export function useInsertUserRole() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['useInsertUserRole'],
		mutationFn: (_user: IInsertUserRoleRequestDto) => {
			return UsersDashboardService.insertUserRole(_user)
		},
		onSuccess: (res: IInsertUserRoleResponseDto) => {
			if (res?.statusCode === 200) {
				queryClient.invalidateQueries({ queryKey: ['useGetAllUsersDashBoard'] })
				toast.success('Update role successfull')
			}
			if (res?.statusCode !== 200) {
				toast.error(res.message)
			}
		},
	})
}
