'use client'

import { SessionProvider } from 'next-auth/react'
import React from 'react'

function NextAuthSessionProvider({ children }: { children: React.ReactNode }) {
	return <SessionProvider session={null}>{children}</SessionProvider>
}

export default NextAuthSessionProvider
