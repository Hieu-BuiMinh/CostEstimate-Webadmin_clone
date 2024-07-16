'use client'

import { useSearchParams } from 'next/navigation'

import ForgotpasswordForm from '@/view/auth/components/forms/forgot-password-form '
import ForgotPasswordResetPageView from '@/view/auth/pages/forgot-password/forgot-password-reset.page'

function ForgotpasswordPageView() {
	const params = useSearchParams()

	if (params.get('email')) {
		return <ForgotPasswordResetPageView />
	}

	return <ForgotpasswordForm />
}

export default ForgotpasswordPageView
