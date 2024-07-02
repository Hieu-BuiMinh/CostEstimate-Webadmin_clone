// GET_ALL_ROLES
export interface IGetRolesDasboardRequestDto {
	PageNumber: string | number
	PageSize: string | number
	Name?: string
}

export interface IGetRolesDasboardResponseDto {
	data: {
		totalItems: number
		items: Pick<IRole, 'id' | 'name' | 'createdDate'>[]
	}
	message: string
	statusCode: number
}

export interface IGetAllResponseDto {
	data: IParamRole[]
	message: string
	statusCode: number
}

interface IParamRole {
	id: string
	name: string
	modifiedDate: string
}

export interface IGetRolesResponseDto {
	data: string[]
}

// ADD_ROLE_INFOR
export interface IAddRoleInforRequestDto {
	roleName: string
}
export interface IAddRoleInforResponseDto {
	statusCode: number
	message: string
	data: any
}

// GET_ROLE_BY_ID
export interface IGettRoleByIdResponseDto {
	statusCode: number
	message: string
	data: IRole
}
export interface IRole {
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
	roleId: string
	roleName: string
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
