// GET_ALL_ROLES
export interface IGettAllRolesRequestDto {
	PageNumber: string | number
	PageSize: string | number
	Name?: string
}

export interface IGettAllRolesResponseDto {
	data: {
		totalItems: number
		items: Pick<IRole, 'id' | 'name' | 'createdDate'>[]
	}
	message: string
	statusCode: number
}

// interface IRoles {
// 	id: string
// 	name: string
// 	createdDate: string
// }

// GET_ROLE_BY_ID
export interface IGettRoleByIdResponseDto {
	statusCode: number
	message: string
	data: IRole
}
interface IRole {
	createdDate: string
	createdBy: string
	modifiedDate: any
	modifiedBy: any
	deletedDate: any
	deletedBy: any
	rolePermissions: any
	id: string
	name: string
	normalizedName: any
	concurrencyStamp: any
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
