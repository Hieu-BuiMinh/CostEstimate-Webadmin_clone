import { ButtonComponent } from '@syncfusion/ej2-react-buttons'
import { useTranslations } from 'next-intl'
import React from 'react'

interface IModalConfirmContent {
	onClose: () => void
	onConfirm?: () => void
	title: string
	message: string
}

function ModalConfirmContent({ onClose, onConfirm, title, message }: IModalConfirmContent) {
	const translate = useTranslations('Common.Button')
	return (
		<div className="flex flex-col gap-5">
			<div className="modal__header">
				<h2>{title}</h2>
			</div>
			<div className="modal__body mb-4">
				<div className="flex items-center">{message}</div>
			</div>
			<div className="flex items-center justify-end gap-3">
				<ButtonComponent cssClass="e-cancel" className="modal__button" onClick={onClose}>
					{translate('cancel')}
				</ButtonComponent>
				<ButtonComponent cssClass="e-warning" className="modal__button" onClick={onConfirm}>
					{translate('delete')}
				</ButtonComponent>
			</div>
		</div>
	)
}

export default ModalConfirmContent
