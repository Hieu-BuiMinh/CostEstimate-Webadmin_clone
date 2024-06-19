'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

function HomePageView() {
	const router = useRouter()
	const redirectToLogin = () => {
		router.push('/login')
	}

	return (
		<button type="button" onClick={redirectToLogin}>
			Login
		</button>
	)
}

export default HomePageView
