export const rolesApiRoute = {
	insertRole: '/auth/v1/RoleInsert',
	getRolesGridView: '/auth/v1/RoleGetPage',
	getAllRoles: '/auth/v1/RoleGetList',
	getRoleById: (_id: string) => `/auth/v1/RoleGetById/${_id}`,
	updateRole: '/auth/v1/RoleUpdate',
	deleteRoleById: (_id: string) => `/auth/v1/RoleDeleteById/${_id}`,
}
