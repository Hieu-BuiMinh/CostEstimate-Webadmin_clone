'use client'

import { AllUsersTable } from '@/view/admin/users/components/tables'
import UserDetailPage from '@/view/admin/users/pages/user-detail.page'
import { UserUpsertPage } from '@/view/admin/users/pages/user-upsert.page'

interface IUsersPageView {
	type?: 'view' | 'edit' | 'create'
}

function UsersPageView({ type }: IUsersPageView) {
	// edit page
	if (type === 'edit') {
		return <UserUpsertPage type={type} />
	}
	// create page
	if (type === 'create') {
		return <UserUpsertPage type={type} />
	}
	// view page
	if (type === 'view') {
		return <UserDetailPage />
	}
	// table page
	return <AllUsersTable />
}

export default UsersPageView
