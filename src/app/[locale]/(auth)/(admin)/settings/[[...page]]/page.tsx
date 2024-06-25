import SettingsPageView from '@/view/admin/settings/pages/settings.page'

export async function generateMetadata() {
	return {
		title: 'Users',
	}
}

const Settings = () => {
	return <SettingsPageView />
}

export default Settings
