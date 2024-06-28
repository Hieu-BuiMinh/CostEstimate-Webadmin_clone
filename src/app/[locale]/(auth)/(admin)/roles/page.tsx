import RolesPageView from '@/view/admin/roles/pages/roles.page'

export async function generateMetadata() {
	return {
		title: 'Roles',
	}
}

const Users = () => {
	return <RolesPageView />
}

export default Users
