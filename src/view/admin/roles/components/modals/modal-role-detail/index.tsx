'use client'

import { useTranslations } from 'next-intl'
import React from 'react'

import type { IRole } from '../../../types'

interface IModalConfirmContent {
	onClose: () => void
	dataRole?: IRole
}

function ModalRoleDetailContent({ onClose, dataRole }: IModalConfirmContent) {
	// const translate = useTranslations('U')
	const translate = useTranslations('Page.Role.Detail')
	console.log(dataRole?.name)
	return (
		<div className="flex flex-col text-[var(--color-surface-999)]">
			<div className="flex items-center justify-between gap-5">
				<div className="text-xl font-semibold">{translate('title')}</div>
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
			<section className="bordered gap-4" />
		</div>
	)
}

export default ModalRoleDetailContent
