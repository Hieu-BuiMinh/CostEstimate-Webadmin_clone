// import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns'
// import type { GridComponent as GridComponentType, PageSettingsModel } from '@syncfusion/ej2-react-grids'
// import {
// 	ColumnDirective,
// 	ColumnsDirective,
// 	CommandColumn,
// 	Edit,
// 	Filter,
// 	GridComponent,
// 	Group,
// 	Inject,
// 	PagerComponent,
// 	Resize,
// 	Sort,
// } from '@syncfusion/ej2-react-grids'
// import { memo, useRef } from 'react'

// interface IGridView {
// 	columns: any[]
// 	rowTemplate?: any
// 	allowActionColumn?: boolean
// 	tableData?: {
// 		totalItems: number
// 		items: {}[]
// 	}
// 	pageSettings: PageSettingsModel
// 	handleChangeTableCurrentPage: (_num: number) => void
// 	handleChangeTablePageSize: (_num: number) => void
// }

// function GridView({
// 	columns,
// 	rowTemplate,
// 	allowActionColumn,
// 	tableData,
// 	pageSettings,
// 	handleChangeTableCurrentPage,
// 	handleChangeTablePageSize,
// }: IGridView) {
// 	const grifRef = useRef<GridComponentType | null>(null)

// 	// const sortSettings: SortSettingsModel = {
// 	// 	columns,
// 	// }

// 	const handleChangeCurrentPage = (_currentPage: number) => {
// 		handleChangeTableCurrentPage(_currentPage)
// 	}
// 	const handleChangePageSize = (_pageSize: number) => {
// 		handleChangeTablePageSize(_pageSize)
// 	}

// 	return (
// 		<>
// 			<GridComponent
// 				ref={grifRef}
// 				dataSource={tableData?.items}
// 				rowTemplate={rowTemplate}
// 				allowSorting
// 				// sortSettings={sortSettings}
// 				allowResizing
// 				width={'100%'}
// 			>
// 				<ColumnsDirective>
// 					{columns.map((column) => (
// 						<ColumnDirective
// 							allowSorting={column.allowSorting}
// 							key={column.id}
// 							field={column.field}
// 							width="200"
// 						/>
// 					))}
// 					{allowActionColumn && <ColumnDirective headerText="Actions" width="100" />}
// 				</ColumnsDirective>
// 				<Inject services={[Sort, Filter, Group, Edit, CommandColumn, Resize]} />
// 			</GridComponent>

// 			<div className="flex items-center justify-between gap-3">
// 				<PagerComponent
// 				totalRecordsCount={tableData?.totalItems}
// 					pageSize={pageSettings.pageSize}
// 					currentPage={1} // don't change, this is default value of pagination
// 					click={(e: any) => {
// 						handleChangeCurrentPage(e.currentPage)
// 					}}
// 					className="flex-1 !border-none !bg-transparent"
// 				/>
// 				<DropDownListComponent
// 					onChange={(e: any) => {
// 						handleChangePageSize(e.value as number)
// 					}}
// 					value={pageSettings.pageSize}
// 					width={80}
// 					id="ddlelement"
// 					dataSource={[5, 10, 15, 20]}
// 				/>
// 			</div>
// 		</>
// 	)
// }

// export default memo(GridView)
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns'
import type { GridComponent as GridComponentType, PageSettingsModel } from '@syncfusion/ej2-react-grids'
import {
	ColumnDirective,
	ColumnsDirective,
	CommandColumn,
	Edit,
	Filter,
	GridComponent,
	Group,
	Inject,
	PagerComponent,
	Resize,
	Sort,
} from '@syncfusion/ej2-react-grids'
import { memo, useRef } from 'react'

interface IGridView {
	columns: any[]
	rowTemplate?: any
	allowActionColumn?: boolean
	tableData?: {
		totalItems: number
		items: {}[]
	}
	pageSettings: PageSettingsModel
	handleChangeTableCurrentPage: (_num: number) => void
	handleChangeTablePageSize: (_num: number) => void
}

function GridView({
	columns,
	rowTemplate,
	allowActionColumn,
	tableData,
	pageSettings,
	handleChangeTableCurrentPage,
	handleChangeTablePageSize,
}: IGridView) {
	const gridRef = useRef<GridComponentType | null>(null)

	const handleChangeCurrentPage = (currentPage: number) => {
		handleChangeTableCurrentPage(currentPage)
	}

	const handleChangePageSize = (pageSize: number) => {
		handleChangeTablePageSize(pageSize)
	}

	return (
		<>
			<GridComponent
				ref={gridRef}
				dataSource={tableData?.items}
				rowTemplate={rowTemplate}
				allowSorting
				allowResizing
				width="100%"
			>
				<ColumnsDirective>
					{/* <ColumnDirective headerText="checkbox" minWidth="100" /> */}
					{columns.map((column) => (
						<ColumnDirective
							allowSorting={column.allowSorting}
							key={column.id}
							headerText={column.field || ''}
							maxWidth="200"
						/>
					))}
					{allowActionColumn && <ColumnDirective headerText="Actions" maxWidth="100" />}
				</ColumnsDirective>
				<Inject services={[Sort, Filter, Group, Edit, CommandColumn, Resize]} />
			</GridComponent>

			<div className="mt-4 flex items-center justify-between gap-3">
				<PagerComponent
					totalRecordsCount={tableData?.totalItems || 0}
					pageSize={pageSettings.pageSize}
					currentPage={pageSettings.currentPage}
					click={(e: any) => {
						handleChangeCurrentPage(e.currentPage)
					}}
					className="flex-1 !border-none !bg-transparent"
				/>
				<DropDownListComponent
					onChange={(e: any) => {
						handleChangePageSize(e.value as number)
					}}
					value={pageSettings.pageSize}
					width={80}
					id="ddlelement"
					dataSource={[5, 10, 15, 20]}
				/>
			</div>
		</>
	)
}

export default memo(GridView)
