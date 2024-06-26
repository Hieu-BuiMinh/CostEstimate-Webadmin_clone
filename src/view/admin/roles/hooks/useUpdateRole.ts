import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { RolesDashboardService } from '@/view/admin/roles/services/roles-dashboard.service'
import type { IUpdateRoleInforRequestDto, IUpdateRoleInforResponseDto } from '@/view/admin/roles/types'

export function useUpdateRole() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['useUpdateRole'],
		mutationFn: (_user: IUpdateRoleInforRequestDto) => {
			return RolesDashboardService.updateRole(_user)
		},
		onSuccess: (res: IUpdateRoleInforResponseDto) => {
			if (res?.statusCode === 200) {
				queryClient.invalidateQueries({ queryKey: ['useGetRoleById'] })
				queryClient.invalidateQueries({ queryKey: ['useGetAllRolesDashBoard'] })
				toast.success('Update successfull')
			}
			if (res?.statusCode !== 200) {
				toast.error(res.message)
			}
		},
	})
}
