import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'

import { RolesDashboardService } from '@/view/admin/roles/services/roles-dashboard.service'
import type { IGettAllUsersRequestDto } from '@/view/admin/users/types'

export function useGetAllRolesDashBoard(_params: IGettAllUsersRequestDto) {
	const accessToken = Cookies.get('accessToken')

	return useQuery({
		queryKey: ['useGetAllRolesDashBoard', _params],
		enabled: !!accessToken,
		queryFn: () => {
			return RolesDashboardService.getALlRoles(_params)
		},
	})
}
