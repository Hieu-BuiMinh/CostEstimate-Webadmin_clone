import { useRouter, useSearchParams } from 'next/navigation'

import { APP_ROUTER } from '@/common/config'
import useAppModal from '@/components/modals/app-modal/store'
import ModalConfirmContent from '@/components/modals/modal-confirm-content'
import { useDeleteRoleById, useGetRoleById } from '@/view/admin/roles/hooks'

function RoleDetailPage() {
	const router = useRouter()
	const params = useSearchParams()
	const { open, close, setModalOptions } = useAppModal()

	const { data: roleData, isLoading: roleDataIsLoading } = useGetRoleById(params.get('id') || '')
	const { mutate: handleDeleteUser } = useDeleteRoleById()

	const handleBack = () => {
		router.push(APP_ROUTER.paths.admin.roles.path)
	}

	const gotoUpdate = () => {
		router.push(APP_ROUTER.paths.admin.roles.children.edit(params.get('id') || ''))
	}

	const handleDelete = () => {
		handleDeleteUser(params.get('id') || '')
	}

	const handleOpenModal = () => {
		setModalOptions({
			showCloseIcon: false,
			content: (
				<ModalConfirmContent
					title="Are you sure to delete this user?"
					message="Confirm Delete"
					onClose={close}
					onConfirm={() => {
						handleDelete()
						close()
					}}
				/>
			),
		})
		open()
	}

	if (roleDataIsLoading) {
		return (
			<div className="flex flex-col gap-5 text-[var(--color-surface-999)]">
				<div className="flex items-center gap-5">
					<button type="button" className="material-symbols-outlined" onClick={handleBack}>
						arrow_back_ios
					</button>
					<span className="text-xl font-semibold">Role information</span>
				</div>
				Loading data...
			</div>
		)
	}

	if (!roleData) {
		return (
			<div className="flex flex-col gap-5 text-[var(--color-surface-999)]">
				<div className="flex items-center gap-5">
					<button type="button" className="material-symbols-outlined" onClick={handleBack}>
						arrow_back_ios
					</button>
					<span className="text-xl font-semibold">Role information</span>
				</div>
				Role not found!
			</div>
		)
	}

	return (
		<div className="flex flex-col gap-5 text-[var(--color-surface-999)]">
			<div className="flex items-center gap-5">
				<button type="button" className="material-symbols-outlined" onClick={handleBack}>
					arrow_back_ios
				</button>
				<span className="text-xl font-semibold">Role information</span>
			</div>

			<div className="mt-5">
				<div className="min-w-0">
					<p className="text-2xl font-bold">{roleData?.name}</p>
					<div className="flex gap-1">
						<span className="material-symbols-outlined">tag</span>
						<p className="line-clamp-1 min-w-0 max-w-[500px]">{params.get('id')}</p>
					</div>
				</div>
			</div>

			<div className="flex justify-end gap-3">
				<button type="button" onClick={gotoUpdate}>
					edit
				</button>
				<button type="button" onClick={handleOpenModal}>
					delete
				</button>
			</div>
		</div>
	)
}

export default RoleDetailPage
