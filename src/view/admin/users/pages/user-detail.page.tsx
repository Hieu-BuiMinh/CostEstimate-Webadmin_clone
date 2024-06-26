'use client'

import { ButtonComponent } from '@syncfusion/ej2-react-buttons'
import { useRouter, useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'

import { APP_ROUTER } from '@/common/config'
import useAppModal from '@/components/modals/app-modal/store'
import ModalConfirmContent from '@/components/modals/modal-confirm-content'
import UserInforBadge from '@/view/admin/users/components/users/user-infor-badge'
import { useDeleteUserById } from '@/view/admin/users/hooks/useDeleteUserById'
import { useGetUserById } from '@/view/admin/users/hooks/useGetUserById'

function UserDetailPage() {
	const translate = useTranslations('UserDetail')
	const button = useTranslations('Button')
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
					title={`Are you sure to delete ${userData?.fullName}`}
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
					<span className="text-xl font-semibold">{translate('meta_title')}</span>
				</div>
				{translate('load_data')}
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
					<span className="text-xl font-semibold">{translate('meta_title')}</span>
				</div>
				{translate('user_not_found')}
			</div>
		)
	}

	return (
		<div className="flex flex-col gap-5 text-[var(--color-surface-999)]">
			<div className="flex items-center gap-5">
				<button type="button" className="material-symbols-outlined" onClick={handleBack}>
					arrow_back_ios
				</button>
				<span className="text-xl font-semibold">{translate('meta_title')}</span>
			</div>

			<section className="bordered gap-4">
				<div className="mt-5 w-[500px]">
					<div className="flex w-full items-center gap-3">
						<span className="e-avatar e-avatar-circle shrink-0">
							{userData?.username.substring(0, 2).toUpperCase()}
						</span>

						<div className="min-w-0">
							<p className="text-xl font-bold">{userData?.fullName}</p>
						</div>
					</div>
					<div>
						<UserInforBadge icon="id_card" innerText={userData?.username || ''} />
						<UserInforBadge icon="send" innerText={userData?.email || ''} />
						<UserInforBadge icon="call" innerText={userData?.phoneNumber || ''} />
						<UserInforBadge icon="calendar_month" innerText={userData?.createdDate || ''} />
						<div className="flex justify-end gap-3">
							<ButtonComponent type="submit" className="e-primary w-full" onClick={gotoUpdate}>
								{button('edit')}
							</ButtonComponent>
							<ButtonComponent type="button" className="e-danger w-full" onClick={handleOpenModal}>
								{button('delete')}
							</ButtonComponent>
						</div>
					</div>
				</div>
			</section>
		</div>
	)
}

export default UserDetailPage
