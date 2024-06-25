import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'

import { RolesDashboardService } from '@/view/admin/roles/services/roles-dashboard.service'

export function useGetRoleById(_id: string) {
	const accessToken = Cookies.get('accessToken')

	return useQuery({
		queryKey: ['useGetRoleById', _id],
		enabled: !!accessToken && _id !== '',
		queryFn: () => {
			return RolesDashboardService.getRoleById(_id)
		},
	})
}
