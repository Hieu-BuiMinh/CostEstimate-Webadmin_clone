'use client'

import { ColumnDirective, ColumnsDirective, GridComponent, Inject, Resize } from '@syncfusion/ej2-react-grids'
import React from 'react'

import type { MceModelCostEstimate } from '@/types/Class/ModelCostEstimate/MceModelCostEstimate'
import { CalculatorSizeFile } from '@/utils/BaseUtils'
import { fDateTime } from '@/utils/formatTime'

import { useGetFileModelCostEstimates } from '../hooks/useGetFileModelCostEstimates'
// Định nghĩa các component bên ngoài hàm render
const CostEstimateTemplate = (props: MceModelCostEstimate) => <div>Version {props.costEstimateVersion}</div>
const SizeTemplate = (props: MceModelCostEstimate) => CalculatorSizeFile(props.bucketObject.size)
const DateTemplate = (props: MceModelCostEstimate) => fDateTime(props.bucketObject.createAt)
function ModelManagementPage() {
	const { data, isLoading } = useGetFileModelCostEstimates()

	// console.log(data);

	if (isLoading) {
		return <div>loading...</div>
	}

	/* eslint-enable react/no-unstable-nested-components */
	return (
		<GridComponent dataSource={data?.data} height="100%" allowResizing>
			<ColumnsDirective>
				<ColumnDirective type="checkbox" width="40" minWidth="40" maxWidth="40" />
				<ColumnDirective field="bucketObject.name" headerText="Name Model" minWidth="200" />
				<ColumnDirective
					field="costEstimateVersion"
					headerText="Cost Estimate"
					width="170"
					headerTextAlign="Center"
					template={CostEstimateTemplate}
				/>
				<ColumnDirective
					field="bucketObject.size"
					headerText="Size"
					width="150"
					textAlign="Right"
					headerTextAlign="Center"
					template={SizeTemplate}
				/>
				<ColumnDirective
					field="bucketObject.createAt"
					headerText="Date"
					width="150"
					headerTextAlign="Center"
					template={DateTemplate}
				/>
			</ColumnsDirective>
			<Inject services={[Resize]} />
		</GridComponent>
	)
	/* eslint-enable react/no-unstable-nested-components */
}

export default ModelManagementPage
