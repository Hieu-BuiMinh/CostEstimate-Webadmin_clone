import { API_ROUTES } from '@/common/config'
import { httpClient } from '@/http'
import type {
	IInsertParamWithSettingIdRequestDto,
	IInsertParamWithSettingIdResponseDto,
} from '@/view/admin/model-management/types/model-param.type'

export const ModelParamsServices = {
	insertParamWithSettingId: async (_params: IInsertParamWithSettingIdRequestDto) => {
		const response: IInsertParamWithSettingIdResponseDto = await httpClient.post(
			API_ROUTES.modelManagement.modelParam.insertModelParamWithSettingId,
			_params
		)

		return response
	},
}
