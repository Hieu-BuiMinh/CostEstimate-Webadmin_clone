import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'

import { UsersDashboardService } from '@/view/admin/users/services/users-dashboard.service'

export function useGetUserById(_id: string) {
	const accessToken = Cookies.get('accessToken')

	return useQuery({
		queryKey: ['useGetUserById', _id],
		enabled: !!accessToken && _id !== '',
		queryFn: () => {
			return UsersDashboardService.getUserById(_id)
		},
	})
}
