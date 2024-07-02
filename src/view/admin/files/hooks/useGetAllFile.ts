import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'

import { FileService } from '../services/file.service'

export function useGetAllFile() {
	const accessToken = Cookies.get('accessToken')

	return useQuery({
		queryKey: ['useGetAllFile'],
		enabled: !!accessToken,
		queryFn: () => {
			return FileService.fileManagementGetAll()
		},
	})
}
