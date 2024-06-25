'use client'

import { AllRolesTable } from '@/view/admin/roles/components/tables'
import UserDetailPage from '@/view/admin/users/pages/user-detail.page'
import { UserUpsertPage } from '@/view/admin/users/pages/user-upsert.page'

interface IRolesPageView {
	type?: 'view' | 'edit' | 'create'
}

function RolesPageView({ type }: IRolesPageView) {
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
	return <AllRolesTable />
}

export default RolesPageView
