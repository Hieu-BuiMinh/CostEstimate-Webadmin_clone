import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'

import { RolesDashboardService } from '@/view/admin/roles/services/roles-dashboard.service'
import type { IGetRolesDasboardRequestDto } from '@/view/admin/roles/types'

export function useGetAllRolesDashBoard(_params: IGetRolesDasboardRequestDto) {
	const accessToken = Cookies.get('accessToken')

	return useQuery({
		queryKey: ['useGetAllRolesDashBoard', _params],
		enabled: !!accessToken,
		queryFn: () => {
			return RolesDashboardService.getRolesGridView(_params)
		},
	})
}
