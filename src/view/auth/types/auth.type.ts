// LOGIN
export interface ILoginRequestDto {
	username: string
	password: string
}

export interface ILoginResponseDto {
	accessToken: string
	tokenType: string
	refreshToken: string
}

// REGISTER
export interface IRegisterRequestDto {
	fullName: string
	username: string
	password: string
	email: string
	phoneNumber: string
}

export interface IRegisterResponseDto {
	succeeded: true
	errors: any[]
}
