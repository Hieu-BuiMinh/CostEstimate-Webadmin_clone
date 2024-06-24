'use client'

import { Modal } from 'react-responsive-modal'

import useAppModal from '@/components/modals/app-modal/store'

export function AppModalProvider() {
	const { isOpen, title, content, showCloseIcon, close } = useAppModal((state) => ({
		isOpen: state.isOpen,
		title: state.title,
		content: state.content,
		showCloseIcon: state.showCloseIcon,

		open: state.open,
		close: state.close,
		setModalOptions: state.setModalOptions,
	}))

	return (
		<Modal open={isOpen} onClose={close} center showCloseIcon={showCloseIcon}>
			<h2>{title}</h2>
			<p>{content}</p>
		</Modal>
	)
}
