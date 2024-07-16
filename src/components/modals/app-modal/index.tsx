'use client'

import { Modal } from 'react-responsive-modal'

import useAppModal from '@/components/modals/app-modal/store'
import { useLocalStorage } from '@/hooks/custom-hooks'

export function AppModalProvider() {
	const { getItem } = useLocalStorage('mode')

	const { isOpen, content, showCloseIcon, close, classNames } = useAppModal((state) => ({
		isOpen: state.isOpen,
		title: state.title,
		content: state.content,
		showCloseIcon: state.showCloseIcon,
		classNames: state.classNames,

		open: state.open,
		close: state.close,
		setModalOptions: state.setModalOptions,
	}))

	return (
		<Modal
			classNames={{
				modal:
					getItem() === 'dark'
						? `bg-[#232e3e] text-white ${classNames.modal}`
						: `bg-white ${classNames.modal}`,
				overlay: classNames.overlay,
			}}
			open={isOpen}
			onClose={close}
			center
			showCloseIcon={showCloseIcon}
			focusTrapped={false}
		>
			{/* <h2>{title}</h2> */}
			<div>{content}</div>
		</Modal>
	)
}
