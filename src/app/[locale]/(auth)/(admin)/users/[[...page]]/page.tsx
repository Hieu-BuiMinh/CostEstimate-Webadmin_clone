import UsersPageView from '@/view/admin/users/pages/users.page'

export async function generateMetadata() {
	return {
		title: 'Users',
	}
}

interface Props {
	params: {
		page?: string[]
	}
}

const Users = ({ params }: Props) => {
	if (Array.isArray(params?.page) && params.page.length > 0) {
		if (params.page.includes('create')) {
			return <UsersPageView type="create" />
		}
		if (params.page.includes('edit')) {
			return <UsersPageView type="edit" />
		}
		if (params.page.includes('view')) {
			return <UsersPageView type="view" />
		}
	}

	return <UsersPageView />
}

export default Users
