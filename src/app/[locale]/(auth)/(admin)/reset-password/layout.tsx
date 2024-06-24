import React from 'react'

import AuthTemplate from '@/templates/auth-template'

interface IResetPasswordLayout {
	children: React.ReactNode
}

function ResetPasswordLayout({ children }: IResetPasswordLayout) {
	return <AuthTemplate>{children}</AuthTemplate>
}

export default ResetPasswordLayout
