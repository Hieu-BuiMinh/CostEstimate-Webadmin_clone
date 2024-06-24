// import { BaseTemplate } from '@/templates/BaseTemplate'

export default function Layout(props: { children: React.ReactNode }) {
	// const t = useTranslations('RootLayout')

	return (
		// eslint-disable-next-line react/jsx-no-useless-fragment
		<>{props.children}</>
	)
}
