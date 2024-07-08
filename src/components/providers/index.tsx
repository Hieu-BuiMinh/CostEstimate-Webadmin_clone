import 'react-responsive-modal/styles.css'

import React from 'react'
import { Toaster } from 'react-hot-toast'

import { AppModalProvider } from '@/components/modals'
import NextAuthSessionProvider from '@/components/providers/next-auth-session-provider'
import { ReactQueryClientProvider } from '@/components/providers/query-client-provider/ReactQueryClientProvider'
import ThemeProvider from '@/components/providers/theme-provider'

interface IAppProvider {
	children: React.ReactNode
}

function AppProvider({ children }: IAppProvider) {
	return (
		<ReactQueryClientProvider>
			<NextAuthSessionProvider>
				<ThemeProvider>{children}</ThemeProvider>
			</NextAuthSessionProvider>
			<Toaster />
			<AppModalProvider />
		</ReactQueryClientProvider>
	)
}

export default AppProvider
