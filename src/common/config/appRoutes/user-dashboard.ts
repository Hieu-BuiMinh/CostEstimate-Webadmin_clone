export const usersDashboardApiRoute = {
	getAllUsers: '/auth/v1/UserGetAll',
	getUserById: (_id: string) => `/auth/v1/UserGetById/${_id}`,
	updateUserInfor: '/auth/v1/UserUpdate',
	deleteUserById: (_id: string) => `/auth/v1/UserDeleteById/${_id}`,
}
