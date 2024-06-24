'use client'

import type { PageSettingsModel } from '@syncfusion/ej2-react-grids'
import {
	ColumnDirective,
	ColumnsDirective,
	Edit,
	GridComponent,
	Inject,
	Page,
	Toolbar,
} from '@syncfusion/ej2-react-grids'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

import { getPosts } from '@/libs/posts.api'
// import { ThemeContext } from '../dark-mode/ThemeContext';
// import { useTheme } from '../dark-mode/ThemeContext';

const TableComponent = () => {
	const { data } = useQuery({
		queryKey: ['posts', 1],
		queryFn: () => getPosts(),
	})

	// const themeContext = useTheme();
	// const { theme } = themeContext;
	const pageOptions: PageSettingsModel = {
		pageSize: 10,
		pageSizes: true,
	}
	const toolbarOptions = ['Search']
	const editSettings = {
		allowEditing: true,
		allowAdding: false,
		allowDeleting: false,
	}
	return (
		<div className="col-lg-12 control-section">
			<div className="$content-wrapper">
				<div className="row">
					<GridComponent
						dataSource={data}
						toolbar={toolbarOptions}
						editSettings={editSettings}
						allowPaging
						pageSettings={pageOptions}
					>
						<ColumnsDirective>
							<ColumnDirective headerText="ID" field="id" width="40" textAlign="Left" />
							<ColumnDirective headerText="USERID" field="userId" width="40" textAlign="Left" />
							<ColumnDirective headerText="TITLE" field="title" width="100" textAlign="Left" />
							<ColumnDirective headerText="BODY" field="body" width="100" format="C2" textAlign="Left" />
						</ColumnsDirective>

						<Inject services={[Page, Edit, Toolbar]} />
					</GridComponent>
				</div>
			</div>
		</div>
	)
}

export default TableComponent
