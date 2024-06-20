import UserPageView from '@/view/admin/users/pages/user.page'

export async function generateMetadata() {
	return {
		title: 'Users',
	}
}

const Users = () => {
	return <UserPageView />
}

export default Users
