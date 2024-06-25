import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { APP_ROUTER } from '@/common/config'
import { RolesDashboardService } from '@/view/admin/roles/services/roles-dashboard.service'
import type { IDeleteUserByIdResponseDto } from '@/view/admin/users/types'

export function useDeleteRoleById() {
	const router = useRouter()
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['useDeleteRoleById'],
		mutationFn: (_id: string) => {
			return RolesDashboardService.deleteRoleById(_id)
		},
		onSuccess: (res: IDeleteUserByIdResponseDto) => {
			if (res?.statusCode === 200) {
				queryClient.invalidateQueries({ queryKey: ['useGettAllUsersDashBoard'] })
				router.push(APP_ROUTER.paths.admin.users.path)
				toast.success('Delete successfull')
			}
			if (res?.statusCode !== 200) {
				toast.error(res.message)
			}
		},
	})
}
