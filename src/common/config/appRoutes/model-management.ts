export const modelManagementEndpoint = {
	getAllModelParam: '/cost-est/v1/ModelParamSettingGetAll',
	getModelParamSettingById: (_id: string) => `/cost-est/v1/ModelParamSettingGetById/${_id}`,
}
