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
	firstname: string
	lastname: string
	username: string
	password: string
	email: string
	phoneNumber: string
}

export interface IRegisterResponseDto {
	data: any
	message: string
	statusCode: number
}

// RESET PASSWORD
export interface IResetPasswordRequestDto {
	password: string
	confirmPassword: string
}

export interface IResetPasswordResponseDto {
	succeeded: true
	errors: any[]
}

export enum AuthEnum {
	authType = 1,
}
