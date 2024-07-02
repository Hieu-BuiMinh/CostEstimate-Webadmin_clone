import { API_ROUTES } from '@/common/config'
import { httpClientModel } from '@/http'

import type { IGetAllFileResponseDto } from '../types/file-management.type'

export const FileService: any = {
	fileManagementGetAll: async () => {
		const response: IGetAllFileResponseDto = await httpClientModel.get(
			API_ROUTES.fileManagement.getAllFileManagement
		)

		return response?.data
	},
}
