import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns'
import type { PageSettingsModel, SortSettingsModel } from '@syncfusion/ej2-react-grids'
import {
	ColumnDirective,
	ColumnsDirective,
	Filter,
	GridComponent,
	Group,
	Inject,
	PagerComponent,
	Sort,
} from '@syncfusion/ej2-react-grids'
import { memo } from 'react'

interface IGridView {
	tableData?: {
		totalItems: number
		items: {}[]
	}
	pageSettings: PageSettingsModel
	handleChangeTableCurrentPage: (_num: number) => void
	handleChangeTablePageSize: (_num: number) => void
}

function GridView({ tableData, handleChangeTableCurrentPage, handleChangeTablePageSize, pageSettings }: IGridView) {
	const sortSettings: SortSettingsModel = {
		columns: [
			{ field: 'id', direction: 'Ascending' },
			{ field: 'fullName', direction: 'Ascending' },
			{ field: 'phoneNumber', direction: 'Ascending' },
			{ field: 'userName', direction: 'Ascending' },
			{ field: 'email', direction: 'Ascending' },
			{ field: 'createdDate', direction: 'Ascending' },
		],
	}

	const handleChangeCurrentPage = (_currentPage: number) => {
		handleChangeTableCurrentPage(_currentPage)
	}
	const handleChangePageSize = (_pageSize: number) => {
		handleChangeTablePageSize(_pageSize)
	}

	return (
		<>
			<GridComponent dataSource={tableData?.items} allowSorting sortSettings={sortSettings}>
				<ColumnsDirective>
					<ColumnDirective field="id" width="100" />
					<ColumnDirective field="fullName" width="100" />
					<ColumnDirective field="phoneNumber" width="100" />
					<ColumnDirective field="userName" width="100" format="C2" />
					<ColumnDirective field="email" width="100" />
					<ColumnDirective field="createdDate" width="100" />
				</ColumnsDirective>
				<Inject services={[Sort, Filter, Group]} />
			</GridComponent>

			<div className="flex items-center justify-between gap-3">
				<PagerComponent
					totalRecordsCount={tableData?.totalItems || 1}
					pageSize={pageSettings.pageSize}
					click={(e: any) => {
						handleChangeCurrentPage(e.currentPage)
					}}
					className="flex-1 !border-none"
				/>
				<DropDownListComponent
					onChange={(e: any) => {
						handleChangePageSize(e.value as number)
					}}
					value={pageSettings.pageSize}
					width={100}
					id="ddlelement"
					dataSource={[5, 10, 15, 20]}
				/>
			</div>
		</>
	)
}

export default memo(GridView)
