import { type PageSettingsModel } from '@syncfusion/ej2-react-grids'
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs'
import { DropDownButtonComponent } from '@syncfusion/ej2-react-splitbuttons'
import { useTranslations } from 'next-intl'
import { useCallback, useState } from 'react'

import Button from '@/components/buttons/button'
import useAppModal from '@/components/modals/app-modal/store'
import ModalConfirmContent from '@/components/modals/modal-confirm-content'
import { GridView } from '@/components/table'
import SettingModelModal from '@/view/admin/model-management/components/modals/add-params/setting-model.modal'
import { filesfakeData } from '@/view/admin/model-management/services/data-table.fake'
import { useDeleteRoleById } from '@/view/admin/roles/hooks'

export function ModelManagementTable() {
	const modalTranslate = useTranslations('Common.ModalConfirmDelete')
	const { open, close, setModalOptions } = useAppModal()

	const [, setSearch] = useState({
		FullName: '',
		PhoneNumber: '',
		Username: '',
		Email: '',
	})

	const [pageSettings, setPageSettings] = useState<PageSettingsModel>({
		currentPage: 1,
		pageSize: 15,
	})

	const { mutate: handleDeleteRole } = useDeleteRoleById()

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

	const handleDelete = (_id: string) => {
		handleDeleteRole(_id || '')
	}

	const handleOpenModal = (_id: string) => {
		const dataRole = filesfakeData?.items.find((item) => item.id === _id)
		setModalOptions({
			showCloseIcon: false,
			content: (
				<ModalConfirmContent
					title={`${modalTranslate('title')} ${dataRole?.name_model}`}
					message={`${modalTranslate('message')}`}
					onClose={close}
					onConfirm={() => {
						handleDelete(_id)
						close()
					}}
				/>
			),
		})
		open()
	}
	const handleOpenSettingModelModal = () => {
		setModalOptions({
			showCloseIcon: false,
			content: <SettingModelModal />,
		})
		open()
	}

	const handleChangeSearchingInputs = ({ type, value }: { type: string; value: string }) => {
		switch (type) {
			case 'fullName':
				setSearch((prev) => ({ ...prev, FullName: value }))
				break
			case 'phoneNumber':
				setSearch((prev) => ({ ...prev, PhoneNumber: value }))
				break
			case 'username':
				setSearch((prev) => ({ ...prev, Username: value }))
				break
			case 'email':
				setSearch((prev) => ({ ...prev, Email: value }))
				break

			default:
				break
		}
	}

	const columns = [
		{ id: 2, field: 'id', direction: 'Ascending', allowSearching: false },
		{ id: 3, field: 'name_model', direction: 'Ascending', allowSearching: true },
		{ id: 4, field: 'cost_estimate', direction: 'Ascending', allowSearching: true },
		{ id: 5, field: 'size', direction: 'Ascending', allowSearching: true },
		{ id: 6, field: 'date', direction: 'Ascending', allowSearching: false },
	]

	const onSelect = (event: any, rowId: string) => {
		if (event.item.text === 'Delete') {
			handleOpenModal(rowId)
		}
		if (event.item.text === 'Edit') {
			event.stopPropagation()
		}
	}

	const rowTemplate = (Row: any) => {
		return (
			<tr className="e-rows cursor-pointer">
				{/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
				{/* <td className="e-rowcell" key={Math.random().toString()}>
					<CheckBoxComponent
						type="checkbox"
						cssClass="!text-white"
						change={(e: any) => {
							// eslint-disable-next-line no-console
							console.log(e.checked, Row)
						}}
					/>
				</td> */}
				{columns.map((cell) => {
					// we can switch case in here for image rendering or action button
					if (cell.field === 'size') {
						return (
							<td className="e-rowcell" key={Math.random().toString()}>
								{Row[cell.field]} MB
							</td>
						)
					}
					return (
						<td className="e-rowcell" key={Math.random().toString()}>
							{Row[cell.field]}
						</td>
					)
				})}
				{/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
				<td className="e-rowcell !flex items-center justify-end gap-3">
					<DropDownButtonComponent
						select={(event) => onSelect(event, Row?.id)}
						items={[
							{
								text: 'Edit',
							},
							{
								text: 'Delete',
							},
						]}
						iconCss="e-icons e-menu"
						className="!border-none !shadow-none"
						cssClass="e-caret-hide"
					/>
				</td>
			</tr>
		)
	}

	return (
		<div className="flex flex-col gap-3">
			<div className="flex flex-wrap gap-4">
				<Button
					icon="add"
					innerItext="Parameter"
					className="e-outline !w-32"
					onClick={handleOpenSettingModelModal}
				/>

				{/* eslint-disable-next-line array-callback-return, consistent-return */}
				{columns.map((col): any => {
					if (col.allowSearching) {
						return (
							<TextBoxComponent
								key={col.field}
								width={200}
								type="text"
								value=""
								placeholder={`${col.field}...`}
								onChange={(event: any) => {
									handleChangeSearchingInputs({ type: col.field, value: event.target.value })
								}}
							/>
						)
					}
				})}
			</div>
			<GridView
				columns={columns as any}
				tableData={filesfakeData}
				handleChangeTableCurrentPage={handleChangeCurrentPage}
				handleChangeTablePageSize={handleChangePageSize}
				pageSettings={pageSettings}
				rowTemplate={rowTemplate}
				allowActionColumn
			/>
		</div>
	)
}
