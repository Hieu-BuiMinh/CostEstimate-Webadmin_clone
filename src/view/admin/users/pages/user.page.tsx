'use client'

import type { PageSettingsModel } from '@syncfusion/ej2-react-grids'
import { useCallback, useState } from 'react'

import { GridView } from '@/components/table'
import { useGettAllUsersDashBoard } from '@/view/admin/users/hooks'

function UserPageView() {
	const [pageSettings, setPageSettings] = useState<PageSettingsModel>({
		currentPage: 1,
		pageSize: 5,
	})

	const { data: tableData } = useGettAllUsersDashBoard({
		PageSize: pageSettings.pageSize as number,
		PageNumber: pageSettings.currentPage as number,
	})

	const handleChangeCurrentPage = useCallback((_currentPage: number) => {
		setPageSettings((prev) => {
			return { ...prev, currentPage: _currentPage }
		})
	}, [])

	const handleChangePageSize = useCallback((_pageSize: number) => {
		setPageSettings((prev) => {
			return { ...prev, pageSize: _pageSize, currentPage: 1 }
		})
	}, [])

	return (
		<GridView
			tableData={tableData}
			handleChangeTableCurrentPage={handleChangeCurrentPage}
			handleChangeTablePageSize={handleChangePageSize}
			pageSettings={pageSettings}
		/>
	)
}

export default UserPageView
