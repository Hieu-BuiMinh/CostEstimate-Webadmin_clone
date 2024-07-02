// GET_ALL_MODEL_PARAMS
export interface IGetAllModelParamSettingResponseDto {
	statusCode: number
	message: string
	data: Param[]
}

interface Param {
	id: string
	name: string
	createdDate: string
	modelParamDtos?: any
}

// GET_MODEL_PARAM_SETTING_BY_ID
export interface IGetModelParamSettingResponseDto {
	statusCode: number
	message: string
	data: Model
}
interface Model {
	id: string
	name: string
	createdDate: string
	modelParamDtos: ModelParams[]
}
interface ModelParams {
	id: string
	name: string
	createdDate: string
}
// INSERT_MODEL_PARAM_SETTING
export interface ICreateModelParamSettingResquestDto {
	name: string
}
export interface ICreateModelParamSettingResponseDto {
	statusCode: number
	message: string
	data: any
}
