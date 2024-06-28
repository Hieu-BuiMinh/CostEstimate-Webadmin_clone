import Modal from 'react-responsive-modal'

import { useLocalStorage } from '@/hooks/custom-hooks'

interface IInnerModal {
	children?: React.ReactNode
	isOpen: boolean
	close: () => void
}

export function InnerModal({ children, isOpen, close }: IInnerModal) {
	const { getItem } = useLocalStorage('mode')

	return (
		<Modal
			classNames={{
				modal: getItem() === 'dark' ? 'bg-[#232e3e] text-white' : 'bg-white',
			}}
			showCloseIcon={false}
			open={isOpen}
			onClose={close}
			center
			focusTrapped={false}
		>
			{children}
		</Modal>
	)
}
