import RolesPageView from '@/view/admin/roles/pages/roles.page'

export async function generateMetadata() {
	return {
		title: 'Users',
	}
}

const Users = () => {
	return <RolesPageView />
}

export default Users
