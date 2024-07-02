import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { ModelParamsServices } from '@/view/admin/model-management/services/model-param'
import type {
	IInsertParamWithSettingIdRequestDto,
	IInsertParamWithSettingIdResponseDto,
} from '@/view/admin/model-management/types/model-param.type'

export function useInsertParamWithSettingId() {
	const queryClient = useQueryClient()
	return useMutation({
		mutationKey: ['useInsertParamWithSettingId'],
		mutationFn: (_params: IInsertParamWithSettingIdRequestDto) => {
			return ModelParamsServices.insertParamWithSettingId(_params)
		},
		onSuccess: (res: IInsertParamWithSettingIdResponseDto) => {
			if (res?.statusCode === 200) {
				queryClient.invalidateQueries({ queryKey: ['useGetAllModelParams'] })
				queryClient.invalidateQueries({ queryKey: ['useGetModelParamSettingById'] })
				toast.success('Add successfull')
			}
			if (res?.statusCode !== 200) {
				toast.error(res.message)
			}
		},
	})
}
