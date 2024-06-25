'use client'

import { AllRolesTable } from '@/view/admin/roles/components/tables'
import RoleDetailPage from '@/view/admin/roles/pages/role-detail.page'
import { RoleUpsertPage } from '@/view/admin/roles/pages/role-upsert.page'

interface IRolesPageView {
	type?: 'view' | 'edit' | 'create'
}

function RolesPageView({ type }: IRolesPageView) {
	// edit page
	if (type === 'edit') {
		return <RoleUpsertPage type={type} />
	}
	// create page
	if (type === 'create') {
		return <RoleUpsertPage type={type} />
	}
	// view page
	if (type === 'view') {
		return <RoleDetailPage />
	}
	// table page
	return <AllRolesTable />
}

export default RolesPageView
