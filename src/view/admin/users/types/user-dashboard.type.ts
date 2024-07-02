// GET_ALL_USERS
export interface IGettAllUsersRequestDto {
	PageNumber: string | number
	PageSize: string | number
	FullName?: string
	Email?: string
	Username?: string
	PhoneNumber?: string
}

export interface IGettAllUsersResponseDto {
	data: {
		totalItems: number
		items: IUsers[]
	}
	message: string
	statusCode: number
}

export interface IUsers {
	id: string
	firstName: string
	lastName: string
	fullName: string
	phoneNumber: string
	username: string
	email: string
	createdDate: string
	userRoles: string | string[]
}

// GET_USER_BY_ID
export interface IGettUserByIdResponseDto {
	statusCode: number
	message: string
	data: IUsers
}
// interface User {
// 	id: string
// 	firstName: string
// 	lastName: string
// 	fullName: string
// 	phoneNumber: string
// 	username: string
// 	email: string
// 	createdDate: string
// }

// UPDATE_USER_INFOR
export interface IUpdateUserInforRequestDto {
	id: string
	firstName: string
	lastName: string
	isReverse: boolean
}
export interface IUpdateUserInforResponseDto {
	statusCode: number
	message: string
	data: any
}

// GET_USER_BY_ID
export interface IDeleteUserByIdResponseDto {
	statusCode: number
	message: string
	data: any
}

// INSERT_USER_ROLE

export interface IInsertUserRoleRequestDto {
	userId: string
	roleIds: string[]
}
export interface IInsertUserRoleResponseDto {
	statusCode: number
	message: string
	data: any
}
