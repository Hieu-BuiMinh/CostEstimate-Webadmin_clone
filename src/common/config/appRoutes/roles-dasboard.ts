export const rolesApiRoute = {
	insertRole: '/auth/v1/RoleInsert',
	getAllRoles: '/auth/v1/RoleGetAll',
	getRoleById: (_id: string) => `/auth/v1/RoleGetById/${_id}`,
	updateRole: '/auth/v1/RoleUpdate',
	deleteRoleById: (_id: string) => `/auth/v1/RoleDeleteById/${_id}`,
}
