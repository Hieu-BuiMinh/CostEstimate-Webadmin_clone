export const modelManagementEndpoint = {
	modelParamSetting: {
		getAllModelParam: '/cost-est/v1/ModelParamSettingGetAll',
		getModelParamSettingById: (_id: string) => `/cost-est/v1/ModelParamSettingGetById/${_id}`,
		insertModelParamSetting: '/cost-est/v1/ModelParamSettingCreate',
	},
	modelParam: {
		insertModelParamWithSettingId: '/cost-est/v1/InsertParamWithSettingId',
	},
}
