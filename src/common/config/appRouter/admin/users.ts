export const users = {
	path: '/users',
	children: {
		view: (_id: string) => `/users/view?id=${_id}`,
		edit: (_id: string) => `/users/edit?id=${_id}`,
		create: '/users/create',
	},
}
