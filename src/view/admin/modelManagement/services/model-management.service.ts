import { API_ROUTES } from '@/common/config'
import { httpClientForge } from '@/http'
import type { ApiResult } from '@/types/ApiResult/ApiResult'
import type { MceModelCostEstimate } from '@/types/Class/ModelCostEstimate/MceModelCostEstimate'

export const ModelManagementService = {
	getFileModelCostEstimates: async () => {
		const response = await httpClientForge.get<ApiResult<MceModelCostEstimate[]>>(
			API_ROUTES.ModelManager.getFileModelCostEstimates,
			{}
		)
		return response
	},
}
