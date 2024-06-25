import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'

import { RolesDashboardService } from '@/view/admin/roles/services/roles-dashboard.service'
import type { IGettAllRolesRequestDto } from '@/view/admin/roles/types'

export function useGetAllRolesDashBoard(_params: IGettAllRolesRequestDto) {
	const accessToken = Cookies.get('accessToken')

	return useQuery({
		queryKey: ['useGetAllRolesDashBoard', _params],
		enabled: !!accessToken,
		queryFn: () => {
			return RolesDashboardService.getALlRoles(_params)
		},
	})
}
