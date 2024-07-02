import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { ModelParamsSettingServices } from '@/view/admin/model-management/services/model-param-setting'
import type {
	ICreateModelParamSettingResponseDto,
	ICreateModelParamSettingResquestDto,
} from '@/view/admin/model-management/types/model-param-setting.type'

export function useInsertModelParamsSetting() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['useInsertModelParamsSetting'],
		mutationFn: (_modelParamSetting: ICreateModelParamSettingResquestDto) => {
			return ModelParamsSettingServices.insertModelParamSetting(_modelParamSetting)
		},
		onSuccess: (res: ICreateModelParamSettingResponseDto) => {
			if (res?.statusCode === 200) {
				queryClient.invalidateQueries({ queryKey: ['useGetAllModelParams'] })
				toast.success('Add successfull')
			}
			if (res?.statusCode !== 200) {
				toast.error(res.message)
			}
		},
	})
}
