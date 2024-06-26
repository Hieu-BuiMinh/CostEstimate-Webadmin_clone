import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { APP_ROUTER } from '@/common/config'
import { RolesDashboardService } from '@/view/admin/roles/services/roles-dashboard.service'
import type { IAddRoleInforRequestDto, IAddRoleInforResponseDto } from '@/view/admin/roles/types'

export function useAddRole() {
	const queryClient = useQueryClient()
	const router = useRouter()

	return useMutation({
		mutationKey: ['useAddRole'],
		mutationFn: (_role: IAddRoleInforRequestDto) => {
			return RolesDashboardService.addRole(_role)
		},
		onSuccess: (res: IAddRoleInforResponseDto) => {
			if (res?.statusCode === 200) {
				queryClient.invalidateQueries({ queryKey: ['useGetRoleById'] })
				queryClient.invalidateQueries({ queryKey: ['useGetAllRolesDashBoard'] })
				router.push(APP_ROUTER.paths.admin.roles.path)
				toast.success('Add successfull')
			}
			if (res?.statusCode !== 200) {
				toast.error(res.message)
			}
		},
	})
}
