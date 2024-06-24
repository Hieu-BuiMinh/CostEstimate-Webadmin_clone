import { useRouter, useSearchParams } from 'next/navigation'

import { APP_ROUTER } from '@/common/config'
import useAppModal from '@/components/modals/app-modal/store'
import ModalConfirmContent from '@/components/modals/modal-confirm-content'
import UserInforBadge from '@/view/admin/users/components/users/user-infor-badge'
import { useDeleteUserById } from '@/view/admin/users/hooks/useDeleteUserById'
import { useGetUserById } from '@/view/admin/users/hooks/useGetUserById'

function UserDetailPage() {
	const router = useRouter()
	const params = useSearchParams()
	const { open, close, setModalOptions } = useAppModal()

	const { data: userData, isLoading: userDataIsLoading } = useGetUserById(params.get('id') || '')
	const { mutate: handleDeleteUser } = useDeleteUserById()

	const handleBack = () => {
		router.push(APP_ROUTER.paths.admin.users.path)
	}

	const gotoUpdate = () => {
		router.push(APP_ROUTER.paths.admin.users.children.edit(params.get('id') || ''))
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

	if (userDataIsLoading) {
		return (
			<div className="flex flex-col gap-5 text-[var(--color-surface-999)]">
				<div className="flex items-center gap-5">
					<button type="button" className="material-symbols-outlined" onClick={handleBack}>
						arrow_back_ios
					</button>
					<span className="text-xl font-semibold">User information</span>
				</div>
				Loading data...
			</div>
		)
	}

	if (!userData) {
		return (
			<div className="flex flex-col gap-5 text-[var(--color-surface-999)]">
				<div className="flex items-center gap-5">
					<button type="button" className="material-symbols-outlined" onClick={handleBack}>
						arrow_back_ios
					</button>
					<span className="text-xl font-semibold">User information</span>
				</div>
				User not found!
			</div>
		)
	}

	return (
		<div className="flex flex-col gap-5 text-[var(--color-surface-999)]">
			<div className="flex items-center gap-5">
				<button type="button" className="material-symbols-outlined" onClick={handleBack}>
					arrow_back_ios
				</button>
				<span className="text-xl font-semibold">User information</span>
			</div>

			<div className="mt-5">
				<div className="flex w-full items-center gap-3">
					<span className="e-avatar e-avatar-circle shrink-0">
						{userData?.username.substring(0, 2).toUpperCase()}
					</span>

					<div className="min-w-0">
						<p className="text-2xl font-bold">{userData?.fullName}</p>
						<div className="flex gap-1">
							<span className="material-symbols-outlined">tag</span>
							<p className="line-clamp-1 min-w-0 max-w-[500px]">{params.get('id')}</p>
						</div>
					</div>
				</div>

				<div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
					<UserInforBadge icon="id_card" innerText={userData?.username || ''} />
					<UserInforBadge icon="send" innerText={userData?.email || ''} />
					<UserInforBadge icon="call" innerText={userData?.phoneNumber || ''} />
					<UserInforBadge icon="calendar_month" innerText={userData?.createdDate || ''} />
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

export default UserDetailPage
