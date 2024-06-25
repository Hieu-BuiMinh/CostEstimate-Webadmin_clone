'use client'

import Cookies from 'js-cookie'
import { redirect } from 'next/navigation'
import React from 'react'

import { APP_ROUTER } from '@/common/config'

interface IAuthTemplate {
	children: React.ReactNode
}

function AuthTemplate({ children }: IAuthTemplate) {
	const accessToken = Cookies.get('accessToken')

	if (accessToken) {
		redirect(APP_ROUTER.paths.admin.dashboard.path)
	}

	return (
		<div className="flex min-h-screen w-screen items-center justify-center bg-[var(--color-template-bg)]">
			{children}
		</div>
	)
}

export default AuthTemplate
