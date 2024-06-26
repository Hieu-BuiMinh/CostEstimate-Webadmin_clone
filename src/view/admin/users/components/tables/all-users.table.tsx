import type { PageSettingsModel } from '@syncfusion/ej2-react-grids'
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs'
import { useTranslations } from 'next-intl'
import { useCallback, useState } from 'react'

import useAppModal from '@/components/modals/app-modal/store'
import ModalConfirmContent from '@/components/modals/modal-confirm-content'
import ModalUserDetailContent from '@/components/modals/modal-user-detail'
import ModalUserUpdateContent from '@/components/modals/modal-user-update'
import { GridView } from '@/components/table'
import { useGetAllUsersDashBoard } from '@/view/admin/users/hooks'
import { useDeleteUserById } from '@/view/admin/users/hooks/useDeleteUserById'
import type { UsersColumn } from '@/view/admin/users/types/user-column.type'

import type { IUsers } from '../../types'
// import ModalUserDetailContent from '@/components/modals/modal-user-detail'

export function AllUsersTable() {
	const modalTranslate = useTranslations('Common.ModalConfirmDelete')
	const { open, close, setModalOptions } = useAppModal()
	const [search, setSearch] = useState({
		FullName: '',
		PhoneNumber: '',
		Username: '',
		Email: '',
	})

	const [pageSettings, setPageSettings] = useState<PageSettingsModel>({
		currentPage: 1,
		pageSize: 5,
	})

	const { mutate: handleDeleteUser } = useDeleteUserById()

	const { data: tableData } = useGetAllUsersDashBoard({
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
		handleDeleteUser(_id || '')
	}

	const handleOpenModal = (_id: string) => {
		const dataUser = tableData?.items.find((item) => item.id === _id)

		setModalOptions({
			showCloseIcon: false,
			content: (
				<ModalConfirmContent
					title={`${modalTranslate('title')} ${dataUser?.fullName}`}
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

	const handleOpenDetailModal = (_id: string) => {
		const userDataDetail: IUsers | undefined = tableData?.items.find((item) => item.id === _id)
		setModalOptions({
			showCloseIcon: false,
			content: <ModalUserDetailContent userData={userDataDetail} onClose={close} />,
		})
		open()
	}

	const handleOpenEditModal = (_id: string) => {
		const userDataDetail: IUsers | undefined = tableData?.items.find((item) => item.id === _id)
		setModalOptions({
			showCloseIcon: false,
			content: <ModalUserUpdateContent userData={userDataDetail} onClose={close} />,
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

	const columns: UsersColumn[] = [
		{ id: 1, field: 'id', direction: 'Ascending', allowSearching: false },
		{ id: 2, field: 'fullName', direction: 'Ascending', allowSearching: true },
		{ id: 3, field: 'phoneNumber', direction: 'Ascending', allowSearching: true },
		{ id: 4, field: 'username', direction: 'Ascending', allowSearching: true },
		{ id: 5, field: 'email', direction: 'Ascending', allowSearching: true },
		{ id: 6, field: 'createdDate', direction: 'Ascending', allowSearching: false },
	]

	const rowTemplate = (Rows: any) => {
		return (
			<tr
				className="e-rows cursor-pointer"
				onClick={() => {
					handleOpenDetailModal(Rows?.id)
					// router.push(APP_ROUTER.paths.admin.users.children.view(Rows?.id))
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
							handleOpenEditModal(Rows?.id)
							// router.push(APP_ROUTER.paths.admin.users.children.edit(Rows?.id))
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
				{/* <Button
					icon="add"
					innerItext="Add user"
					className="e-outline !w-28"
					onClick={() => {
						router.push(APP_ROUTER.paths.admin.users.children.create)
					}}
				/> */}
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
