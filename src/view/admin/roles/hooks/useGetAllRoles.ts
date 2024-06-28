import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'

import { RolesDashboardService } from '@/view/admin/roles/services/roles-dashboard.service'

export function useGetAllRoles() {
	const accessToken = Cookies.get('accessToken')

	return useQuery({
		queryKey: ['useGetAllRoles'],
		enabled: !!accessToken,
		queryFn: () => {
			return RolesDashboardService.getAllRoles()
		},
	})
}
