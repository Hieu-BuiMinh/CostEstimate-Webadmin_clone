export const authApiRoute = {
	login: '/auth/v1/UserLogin',
	register: '/auth/v1/UserRegister',
	resetPassword: 'auth/v1/UserChangePassword',
	signinWithGG: 'auth/v1/UsersigninWithGoogle',
	signupWithGG: 'auth/v1/UserSignUpWithGoogle',
	signinWithAutodesk: 'auth/v1/UserSigninWithAutoDesk',
	userResetOTP: (userId: string) => `auth/v1/UserResetOTP?userId=${userId}`,
	userValidateOTP: 'auth/v1/UserValidateOTP',
	userForgotPassword: 'auth/v1/UserForgotPassword',
	userChangePasswordByForgot: 'auth/v1/UserChangePasswordByForgot',
}
