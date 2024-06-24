import type { PageSettingsModel } from '@syncfusion/ej2-react-grids'
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

import { APP_ROUTER } from '@/common/config'
import Button from '@/components/buttons/button'
import useAppModal from '@/components/modals/app-modal/store'
import ModalConfirmContent from '@/components/modals/modal-confirm-content'
import { GridView } from '@/components/table'
import { useGetAllUsersDashBoard } from '@/view/admin/users/hooks'
import { useDeleteUserById } from '@/view/admin/users/hooks/useDeleteUserById'
import type { UsersColumn } from '@/view/admin/users/types/user-column.type'

export function AllUsersTable() {
	const router = useRouter()
	const { open, close, setModalOptions } = useAppModal()
	const [searchValue, setSearchValue] = useState<string>('')
	const [pageSettings, setPageSettings] = useState<PageSettingsModel>({
		currentPage: 1,
		pageSize: 5,
	})

	const { mutate: handleDeleteUser } = useDeleteUserById()

	const { data: tableData } = useGetAllUsersDashBoard({
		PageSize: pageSettings.pageSize as number,
		PageNumber: pageSettings.currentPage as number,
		textSearch: searchValue || '',
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
		handleDeleteUser(_id || '')
	}

	const handleOpenModal = (_id: string) => {
		setModalOptions({
			showCloseIcon: false,
			content: (
				<ModalConfirmContent
					title="Are you sure to delete this user?"
					message="Confirm Delete"
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

	const columns: UsersColumn[] = [
		{ id: 1, field: 'id', direction: 'Ascending', allowSorting: true },
		{ id: 2, field: 'fullName', direction: 'Ascending', allowSorting: true },
		{ id: 3, field: 'phoneNumber', direction: 'Ascending', allowSorting: false },
		{ id: 4, field: 'username', direction: 'Ascending', allowSorting: true },
		{ id: 5, field: 'email', direction: 'Ascending', allowSorting: false },
		{ id: 6, field: 'createdDate', direction: 'Ascending', allowSorting: true },
	]

	const rowTemplate = (Rows: any) => {
		return (
			<tr
				className="e-rows cursor-pointer"
				onClick={() => {
					router.push(APP_ROUTER.paths.admin.users.children.view(Rows?.id))
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
							router.push(APP_ROUTER.paths.admin.users.children.edit(Rows?.id))
						}}
						type="button"
						className="material-symbols-outlined border text-green-400"
					>
						edit
					</button>
					<button
						onClick={(event) => {
							event.stopPropagation()
							handleOpenModal(Rows?.id)
						}}
						type="button"
						className="material-symbols-outlined border text-red-400"
					>
						delete
					</button>
				</td>
			</tr>
		)
	}

	return (
		<div className="flex flex-col gap-3">
			<div className="flex gap-4">
				<Button
					icon="add"
					innerItext="Add user"
					className="e-outline !w-28"
					onClick={() => {
						router.push(APP_ROUTER.paths.admin.users.children.create)
					}}
				/>
				<TextBoxComponent
					width={200}
					type="text"
					value={searchValue}
					placeholder="Search..."
					onChange={(event: any) => {
						setSearchValue(event.target.value)
					}}
				/>
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
