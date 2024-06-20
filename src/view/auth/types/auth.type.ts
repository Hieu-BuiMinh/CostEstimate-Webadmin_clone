// LOGIN
export interface ILoginRequestDto {
	usernameOrEmail: string
	password: string
	authType: string | number
}

export interface ILoginResponseDto {
	data: {
		accessToken: string
		tokenType: string
		refreshToken: string
	}
	message: string
	statusCode: number
}

export enum AuthType {
	Username = 1,
	Email = 2,
	Phone = 3,
	Social = 4,
	ADService = 5,
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
	data: {
		succeeded: true
		errors: any[]
	}
	message: string
	statusCode: number
}
