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
	data: { userId: string }
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

// SIGN_IN_WITH_GG
export interface ISigninWithGGResponseDto {
	statusCode: number
	message: string
	data: null | {
		accessToken?: string
		tokenType?: string
		refreshToken?: string
	}
}

// SIGN_UP_WITH_GG
export interface ISignupWithGGRequestDto {
	firstName: string
	lastName: string
	username: string
	email: string
}
export interface ISignupWithGGResponseDto {
	statusCode: number
	message: string
	data: null | {
		accessToken?: string
		tokenType?: string
		refreshToken?: string
	}
}

// SIGN_IN_WITH_AUTODESK
export interface ISigninWithAutodeskResponseDto {
	statusCode: number
	message: string
	data: {
		accessToken: string
		tokenType?: string
		refreshToken: string
		expiresIn?: string
	}[]
}

// USER_REGISTER_OTP_VALIDATION
export interface IUserValidateOTPResponseDto {
	statusCode: number
	message: string
	data: boolean
}

// USER_FORGOT_PASSWORD
export interface IUserForgotPasswordRequestDto {
	callbackUrl: string
	email: string
}
export interface IUserForgotPasswordResponseDto {
	statusCode: number
	message: string
	data: boolean
}

// USER_CHANGE_FORGOT_PASSWORD
export interface IUserChangePasswordByForgotRequestDto {
	email: string
	newPassword: string
	repeatPassword: string
	code: string
}
export interface IUserChangePasswordByForgotResponseDto {
	statusCode: number
	message: string
	data: boolean
}
