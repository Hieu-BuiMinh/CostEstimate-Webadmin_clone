export const roles = {
	path: '/roles',
	children: {
		view: (_id: string) => `/roles/view?id=${_id}`,
		edit: (_id: string) => `/roles/edit?id=${_id}`,
		create: '/roles/create',
	},
}
