import React from 'react'

// import AuthTemplate from '@/templates/auth-template'
// import { AdminTemplate } from '@/templates/admin-template'

interface IChangePasswordLayout {
	children: React.ReactNode
}

function ChangePasswordLayout({ children }: IChangePasswordLayout) {
	return <div>{children}</div>
}

export default ChangePasswordLayout
