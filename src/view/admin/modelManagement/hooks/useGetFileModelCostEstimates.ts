import { useQuery } from '@tanstack/react-query'

import { ModelManagementService } from '../services/model-management.service'

export function useGetFileModelCostEstimates() {
	return useQuery({
		queryKey: ['getFileModelCostEstimates'],
		queryFn: () => {
			return ModelManagementService.getFileModelCostEstimates()
		},
		refetchOnWindowFocus: false,
	})
}
