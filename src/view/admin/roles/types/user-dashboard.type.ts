// GET_ALL_ROLES
export interface IGettAllRolesRequestDto {
	PageNumber: string | number
	PageSize: string | number
	FullName?: string
}

export interface IGettAllRolesResponseDto {
	data: {
		totalItems: number
		items: IRoles[]
	}
	message: string
	statusCode: number
}

interface IRoles {
	id: string
	fullName: string
	phoneNumber: string
	userName: string
	email: string
	createdDate: string
}

// GET_ROLE_BY_ID
export interface IGettRoleByIdResponseDto {
	statusCode: number
	message: string
	data: Role
}
interface Role {
	id: string
	fullName: string
	phoneNumber: string
	username: string
	email: string
	createdDate: string
}

// UPDATE_ROLE_INFOR
export interface IUpdateRoleInforRequestDto {
	id: string
	fullName: string
	phoneNumber: string
	username: string
	email: string
	createdDate: string
}
export interface IUpdateRoleInforResponseDto {
	statusCode: number
	message: string
	data: any
}

// GET_ROLE_BY_ID
export interface IDeleteRoleByIdResponseDto {
	statusCode: number
	message: string
	data: any
}
