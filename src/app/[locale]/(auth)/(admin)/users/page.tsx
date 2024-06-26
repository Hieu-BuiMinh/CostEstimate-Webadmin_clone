import { getTranslations } from 'next-intl/server'

import UsersPageView from '@/view/admin/users/pages/users.page'

export async function generateMetadata(props: { params: { locale: string } }) {
	const t = await getTranslations({
		locale: props.params.locale,
		namespace: 'Page.User.UserDashboard',
	})

	return {
		title: t('meta_title'),
	}
}

const Users = () => {
	return <UsersPageView />
}

export default Users
