// INSERT_PARAM_WITH_SETTING_ID
export interface IInsertParamWithSettingIdRequestDto {
	modelParamSettingId: string
	modelParamName: string
}
export interface IInsertParamWithSettingIdResponseDto {
	statusCode: number
	message: string
	data: any
}
