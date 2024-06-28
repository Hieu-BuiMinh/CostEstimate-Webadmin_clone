import { API_ROUTES } from '@/common/config'
import { httpClientModel } from '@/http'
import type {
	IGetAllModelParamResponseDto,
	IGetModelParamSettingResponseDto,
} from '@/view/admin/model-management/types/model-param-setting.type'

export const ModelParamsSettingServices = {
	getAllModelParam: async () => {
		const response: IGetAllModelParamResponseDto = await httpClientModel.get(
			API_ROUTES.modelManagement.getAllModelParam
		)

		return response?.data
	},
	getModelParamSettingById: async (_id: string) => {
		const response: IGetModelParamSettingResponseDto = await httpClientModel.get(
			API_ROUTES.modelManagement.getModelParamSettingById(_id)
		)

		return response?.data
	},
}
