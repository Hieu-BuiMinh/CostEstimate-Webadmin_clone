import { getTranslations } from 'next-intl/server'

import ChangePasswordPageView from '@/view/admin/users/pages/change-password.page'

export async function generateMetadata(props: { params: { locale: string } }) {
	const t = await getTranslations({
		locale: props.params.locale,
		namespace: 'ChangePassword',
	})

	return {
		title: t('meta_title'),
	}
}
function ChangePasswordPage() {
	return <ChangePasswordPageView />
}

export default ChangePasswordPage
