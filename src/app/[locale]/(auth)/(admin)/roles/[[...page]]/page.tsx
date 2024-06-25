import RolesPageView from '@/view/admin/roles/pages/roles.page'

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
			return <RolesPageView type="create" />
		}
		if (params.page.includes('edit')) {
			return <RolesPageView type="edit" />
		}
		if (params.page.includes('view')) {
			return <RolesPageView type="view" />
		}
	}

	return <RolesPageView />
}

export default Users
