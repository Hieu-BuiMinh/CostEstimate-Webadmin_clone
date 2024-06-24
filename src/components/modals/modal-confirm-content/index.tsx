import { ButtonComponent } from '@syncfusion/ej2-react-buttons'
import React from 'react'

interface IModalConfirmContent {
	onClose: () => void
	onConfirm?: () => void
	title: string
	message: string
}

function ModalConfirmContent({ onClose, onConfirm, title, message }: IModalConfirmContent) {
	return (
		<div className="flex flex-col gap-5">
			<div className="modal__header">
				<h2>{title}</h2>
			</div>
			<div className="modal__body mb-4">
				<p className="flex items-center">{message}</p>
			</div>
			<div className="flex items-center justify-end gap-3">
				<ButtonComponent cssClass="e-primary" className="modal__button" onClick={onClose}>
					Cancel
				</ButtonComponent>
				<ButtonComponent cssClass="e-warning" className="modal__button" onClick={onConfirm}>
					Delete
				</ButtonComponent>
			</div>
		</div>
	)
}

export default ModalConfirmContent
