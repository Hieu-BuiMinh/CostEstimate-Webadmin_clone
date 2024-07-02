import { API_ROUTES } from '@/common/config'
import { httpClientModel } from '@/http'
import type {
	IInsertParamWithSettingIdRequestDto,
	IInsertParamWithSettingIdResponseDto,
} from '@/view/admin/model-management/types/model-param.type'

export const ModelParamsServices = {
	insertParamWithSettingId: async (_params: IInsertParamWithSettingIdRequestDto) => {
		const response: IInsertParamWithSettingIdResponseDto = await httpClientModel.post(
			API_ROUTES.modelManagement.modelParam.insertModelParamWithSettingId,
			_params
		)

		return response
	},
}
