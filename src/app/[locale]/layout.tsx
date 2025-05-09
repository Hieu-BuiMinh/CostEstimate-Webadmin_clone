import '@/public/assets/scss/global.css'
import '@/public/assets/scss/base/base.scss'

import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider, useMessages } from 'next-intl'

import { AppConfig } from '@/utils/AppConfig'

const AppProvider = dynamic(() => import('@/components/providers'), { ssr: false })

export const metadata: Metadata = {
	icons: [
		{
			rel: 'apple-touch-icon',
			url: '/apple-touch-icon.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '32x32',
			url: '/favicon-32x32.png',
		},
		{
			rel: 'icon',
			type: 'image/png',
			sizes: '16x16',
			url: '/favicon-16x16.png',
		},
		{
			rel: 'icon',
			url: '/favicon.ico',
		},
	],
}

export default function RootLayout(props: { children: React.ReactNode; params: { locale: string } }) {
	// Validate that the incoming `locale` parameter is valid
	if (!AppConfig.locales.includes(props.params.locale)) notFound()

	// Using internationalization in Client Components
	const messages = useMessages()

	return (
		<html suppressHydrationWarning lang={props.params.locale}>
			<head>
				{/* eslint-disable-next-line @next/next/no-css-tags */}
				<link id="app-themes-cdn" rel="stylesheet" />
				{/* eslint-disable-next-line @next/next/no-css-tags */}
				{/* eslint-disable-next-line @next/next/google-font-display, @next/next/no-page-custom-font */}
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
				/>
			</head>
			<body suppressHydrationWarning>
				<NextIntlClientProvider locale={props.params.locale} messages={messages}>
					<AppProvider>{props.children}</AppProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}

// Enable edge runtime but you are required to disable the `migrate` function in `src/libs/DB.ts`
// Unfortunately, this also means it will also disable the automatic migration of the database
// And, you will have to manually migrate it with `drizzle-kit push`
// export const runtime = 'edge';
