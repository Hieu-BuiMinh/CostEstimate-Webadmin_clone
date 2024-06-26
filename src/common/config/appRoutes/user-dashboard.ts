export const usersDashboardApiRoute = {
	getAllUsers: '/auth/v1/UserGetAll',
	changePasswordUser: '/auth/v1/UserChangePassword',
	getUserById: (_id: string) => `/auth/v1/UserGetById/${_id}`,
	updateUserInfor: '/auth/v1/UserUpdate',
	deleteUserById: (_id: string) => `/auth/v1/UserDeleteById/${_id}`,
	insertUserRole: '/auth/v1/InsertRolesByUserId',
}
