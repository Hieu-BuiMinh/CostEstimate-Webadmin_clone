// export interface IChangePasswordRequestDto{
//     oldPassword: string
//     curPassword: string
//     confirmPassword: string
// }

// export interface IChangePasswordResponseDto {
// 	statusCode: number
//     message: string
// }

export interface IChangePasswordRequestDto {
	OldPassword: string
	NewPassword: string
	RepeatPassword: string
}

export interface IChangePasswordResponseDto {
	succeeded: true
	errors: any[]
}
