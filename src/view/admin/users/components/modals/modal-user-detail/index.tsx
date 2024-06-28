import { useTranslations } from 'next-intl'
import React from 'react'

import UserInforBadge from '@/view/admin/users/components/users/user-infor-badge'
import type { IUsers } from '@/view/admin/users/types'

interface IModalConfirmContent {
	onClose: () => void
	userData: IUsers | undefined
}

function ModalUserDetailContent({ onClose, userData }: IModalConfirmContent) {
	// const translate = useTranslations('U')
	const translate = useTranslations('Page.User.UserDetail')
	return (
		<div className="flex flex-col text-[var(--color-surface-999)]">
			<div className="flex items-center justify-between gap-5">
				<div className="text-xl font-semibold">{translate('meta_title')}</div>
				<div className="text-xl font-semibold">
					<button
						type="button"
						className="material-symbols-outlined cursor-pointer"
						onClick={onClose}
						style={{ fontSize: 24 }}
					>
						close
					</button>
				</div>
			</div>
			<section className="bordered gap-4">
				<div className="mt-5">
					<div className="mb-4 flex w-full items-center gap-3">
						<span className="e-avatar e-avatar-circle shrink-0">
							{userData?.firstName.substring(0, 2).toUpperCase()}
						</span>

						<div className="min-w-0">
							<p className="text-xl font-bold">{userData?.fullName}</p>
						</div>
					</div>
					<div className="flex flex-wrap">
						<UserInforBadge icon="id_card" innerText={userData?.firstName || ''} />
						<UserInforBadge icon="id_card" innerText={userData?.lastName || ''} />
						<UserInforBadge icon="id_card" innerText={userData?.username || ''} />
						<UserInforBadge icon="send" innerText={userData?.email || ''} />
						<UserInforBadge icon="call" innerText={userData?.phoneNumber || ''} />
						<UserInforBadge icon="calendar_month" innerText={userData?.createdDate || ''} />
					</div>
				</div>
			</section>
		</div>
	)
}

export default ModalUserDetailContent
