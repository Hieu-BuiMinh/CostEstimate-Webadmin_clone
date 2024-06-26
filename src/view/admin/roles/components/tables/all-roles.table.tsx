import type { PageSettingsModel } from '@syncfusion/ej2-react-grids'
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useCallback, useState } from 'react'

import { APP_ROUTER } from '@/common/config'
import Button from '@/components/buttons/button'
import useAppModal from '@/components/modals/app-modal/store'
import ModalConfirmContent from '@/components/modals/modal-confirm-content'
import { GridView } from '@/components/table'
import { useDeleteRoleById, useGetAllRolesDashBoard } from '@/view/admin/roles/hooks'

export function AllRolesTable() {
	const modalTranslate = useTranslations('Common.ModalConfirmDelete')
	const router = useRouter()
	const { open, close, setModalOptions } = useAppModal()
	const [search, setSearch] = useState({
		Name: '',
		CreatedDate: '',
	})

	const [pageSettings, setPageSettings] = useState<PageSettingsModel>({
		currentPage: 1,
		pageSize: 5,
	})

	const { mutate: handleDeleteRole } = useDeleteRoleById()

	const { data: tableData } = useGetAllRolesDashBoard({
		PageSize: pageSettings.pageSize as number,
		PageNumber: pageSettings.currentPage as number,
		...search,
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

	const handleDelete = (_id: string) => {
		handleDeleteRole(_id || '')
	}

	const handleOpenModal = (_id: string) => {
		const dataRole = tableData?.items.find((item) => item.id === _id)
		setModalOptions({
			showCloseIcon: false,
			content: (
				<ModalConfirmContent
					title={`${modalTranslate('title')} ${dataRole?.name}`}
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

	const handleChangeSearchingInputs = ({ type, value }: { type: string; value: string }) => {
		switch (type) {
			case 'name':
				setSearch((prev) => ({ ...prev, Name: value }))
				break
			case 'createdDate':
				setSearch((prev) => ({ ...prev, CreatedDate: value }))
				break

			default:
				break
		}
	}

	const columns = [
		{ id: 1, field: 'id', direction: 'Ascending', allowSearching: false },
		{ id: 2, field: 'name', direction: 'Ascending', allowSearching: true },
		{ id: 3, field: 'createdDate', direction: 'Ascending', allowSearching: true },
	]

	const rowTemplate = (Rows: any) => {
		return (
			<tr
				className="e-rows cursor-pointer"
				onClick={() => {
					router.push(APP_ROUTER.paths.admin.roles.children.view(Rows?.id))
				}}
			>
				{columns.map((cell) => {
					// we can switch case in here for image rendering or action button
					return (
						<td className="e-rowcell" key={Math.random().toString()}>
							{Rows[cell.field]}
						</td>
					)
				})}
				<td className="e-rowcell !flex items-center justify-end gap-3">
					<button
						onClick={(event) => {
							event.stopPropagation()
							router.push(APP_ROUTER.paths.admin.roles.children.edit(Rows?.id))
						}}
						type="button"
						className="material-symbols-outlined text-green-400"
					>
						edit
					</button>
					<button
						onClick={(event) => {
							event.stopPropagation()
							handleOpenModal(Rows?.id)
						}}
						type="button"
						className="material-symbols-outlined text-red-400"
					>
						delete
					</button>
				</td>
			</tr>
		)
	}

	return (
		<div className="flex flex-col gap-3">
			<div className="flex flex-wrap gap-4">
				<Button
					icon="add"
					innerItext="Add role"
					className="e-outline !w-28"
					onClick={() => {
						router.push(APP_ROUTER.paths.admin.roles.children.create)
					}}
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
				tableData={tableData}
				handleChangeTableCurrentPage={handleChangeCurrentPage}
				handleChangeTablePageSize={handleChangePageSize}
				pageSettings={pageSettings}
				rowTemplate={rowTemplate}
				allowActionColumn
			/>
		</div>
	)
}
