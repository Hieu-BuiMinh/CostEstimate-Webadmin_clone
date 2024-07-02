import { API_ROUTES } from '@/common/config'
import { httpClientModel } from '@/http'
import type {
	ICreateModelParamSettingResponseDto,
	ICreateModelParamSettingResquestDto,
	IGetAllModelParamSettingResponseDto,
	IGetModelParamSettingResponseDto,
} from '@/view/admin/model-management/types/model-param-setting.type'

export const ModelParamsSettingServices = {
	getAllModelParam: async () => {
		const response: IGetAllModelParamSettingResponseDto = await httpClientModel.get(
			API_ROUTES.modelManagement.modelParamSetting.getAllModelParam
		)

		return response?.data
	},
	getModelParamSettingById: async (_id: string) => {
		const response: IGetModelParamSettingResponseDto = await httpClientModel.get(
			API_ROUTES.modelManagement.modelParamSetting.getModelParamSettingById(_id)
		)

		return response?.data
	},
	insertModelParamSetting: async (_modelParamSetting: ICreateModelParamSettingResquestDto) => {
		const response: ICreateModelParamSettingResponseDto = await httpClientModel.post(
			API_ROUTES.modelManagement.modelParamSetting.insertModelParamSetting,

			_modelParamSetting
		)

		return response
	},
}
