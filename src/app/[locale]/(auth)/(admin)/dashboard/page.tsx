import { getTranslations } from 'next-intl/server'

export async function generateMetadata(props: { params: { locale: string } }) {
	const t = await getTranslations({
		locale: props.params.locale,
		namespace: 'Dashboard',
	})

	return {
		title: t('meta_title'),
	}
}

const Dashboard = () => {
	return <div>{12345}</div>
}

export default Dashboard
