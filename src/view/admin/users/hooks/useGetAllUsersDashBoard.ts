import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'

import { UsersDashboardService } from '@/view/admin/users/services/users-dashboard.service'
import type { IGettAllUsersRequestDto } from '@/view/admin/users/types'

export function useGetAllUsersDashBoard(_params: IGettAllUsersRequestDto) {
	const accessToken = Cookies.get('accessToken')

	return useQuery({
		queryKey: ['useGetAllUsersDashBoard', _params],
		enabled: !!accessToken,
		queryFn: () => {
			return UsersDashboardService.getALlUsers(_params)
		},
	})
}
