import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { APP_ROUTER } from '@/common/config'
import { UsersDashboardService } from '@/view/admin/users/services/users-dashboard.service'
import type { IDeleteUserByIdResponseDto } from '@/view/admin/users/types'

export function useDeleteUserById() {
	const router = useRouter()
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ['useDeleteUserById'],
		mutationFn: (_id: string) => {
			return UsersDashboardService.deleteUserById(_id)
		},
		onSuccess: (res: IDeleteUserByIdResponseDto) => {
			if (res?.statusCode === 200) {
				queryClient.invalidateQueries({ queryKey: ['useGetAllUsersDashBoard'] })
				router.push(APP_ROUTER.paths.admin.users.path)
				toast.success('Delete successfull')
			}
			if (res?.statusCode !== 200) {
				toast.error(res.message)
			}
		},
	})
}
