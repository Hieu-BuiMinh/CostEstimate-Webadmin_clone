import UsersPageView from '@/view/admin/users/pages/users.page'

export async function generateMetadata() {
	return {
		title: 'Users',
	}
}

const Users = () => {
	return <UsersPageView />
}

export default Users
