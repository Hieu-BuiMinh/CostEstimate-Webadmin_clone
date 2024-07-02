import { useQuery } from '@tanstack/react-query'

import { ModelParamsSettingServices } from '@/view/admin/model-management/services/model-param-setting'

export function useGetModelParamSettingById(_id?: string) {
	return useQuery({
		queryKey: ['useGetModelParamSettingById', _id],
		enabled: !!_id,
		queryFn: () => {
			return ModelParamsSettingServices.getModelParamSettingById(_id || '')
		},
	})
}
