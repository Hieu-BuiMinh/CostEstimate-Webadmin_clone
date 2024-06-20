// GET_ALL_USERS
export interface IGettAllUsersRequestDto {
	PageNumber: string | number
	PageSize: string | number
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
