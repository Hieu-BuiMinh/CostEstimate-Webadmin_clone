// GET_ALL_USERS
export interface IGettAllUsersRequestDto {
	PageNumber: string | number
	PageSize: string | number
	textSearch?: string
}

export interface IGettAllUsersResponseDto {
	data: {
		totalItems: number
		items: IUsers[]
	}
	message: string
	statusCode: number
}

interface IUsers {
	id: string
	fullName: string
	phoneNumber: string
	userName: string
	email: string
	createdDate: string
}

// GET_USER_BY_ID
export interface IGettUserByIdResponseDto {
	statusCode: number
	message: string
	data: User
}
interface User {
	id: string
	fullName: string
	phoneNumber: string
	username: string
	email: string
	createdDate: string
}

// UPDATE_USER_INFOR
export interface IUpdateUserInforRequestDto {
	id: string
	fullName: string
	phoneNumber: string
	username: string
	email: string
	createdDate: string
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
