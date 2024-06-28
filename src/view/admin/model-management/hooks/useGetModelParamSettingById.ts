import { useMutation } from '@tanstack/react-query'

import { ModelParamsSettingServices } from '@/view/admin/model-management/services/model-param-setting'

export function useGetModelParamSettingById() {
	return useMutation({
		mutationKey: ['useGetModelParamSettingById'],
		mutationFn: (_id: string) => {
			return ModelParamsSettingServices.getModelParamSettingById(_id)
		},
	})
}
