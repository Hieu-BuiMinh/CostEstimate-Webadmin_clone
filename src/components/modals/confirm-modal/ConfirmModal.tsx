// Modal.tsx
import { ButtonComponent } from '@syncfusion/ej2-react-buttons'
import React from 'react'

interface ModalProps {
	show: boolean
	onClose: () => void
	onConfirm?: () => void
	title: string
	message: string
	icon?: string
}

const Modal: React.FC<ModalProps> = ({ show, icon, onClose, onConfirm, title, message }) => {
	if (!show) return null

	return (
		<div className="modal-overlay">
			<div className="modal">
				<div className="modal__header">
					<h2>{title}</h2>
				</div>
				<div className="modal__body mb-4">
					<p className="flex items-center">
						<span
							className="material-symbols-outlined"
							style={{ fontSize: 20, color: 'red', marginRight: '4px' }}
						>
							{icon}
						</span>
						{message}
					</p>
				</div>
				<div className="modal__footer">
					<ButtonComponent cssClass="e-warning" className="modal__button" onClick={onConfirm}>
						Delete
					</ButtonComponent>
					<ButtonComponent cssClass="e-primary" className="modal__button" onClick={onClose}>
						{' '}
						Cancel{' '}
					</ButtonComponent>
				</div>
			</div>
		</div>
	)
}

export default Modal
