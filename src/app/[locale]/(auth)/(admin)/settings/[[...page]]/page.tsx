import { getTranslations } from 'next-intl/server'

import SettingsPageView from '@/view/admin/settings/pages/settings.page'

export async function generateMetadata(props: { params: { locale: string } }) {
	const t = await getTranslations({
		locale: props.params.locale,
		namespace: 'Common.Settings',
	})

	return {
		title: t('meta_title'),
	}
}
const Settings = () => {
	return <SettingsPageView />
}

export default Settings
