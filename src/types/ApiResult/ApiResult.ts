export interface ApiResult<T> {
	IsSuccessed: boolean
	Message: string
	Data: T
}
