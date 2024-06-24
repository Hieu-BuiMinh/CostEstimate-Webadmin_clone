import { ButtonComponent } from '@syncfusion/ej2-react-buttons'
import clsx from 'clsx'
import React from 'react'

interface IButton {
	justIcon?: boolean
	innerItext?: string
	icon?: string
	className?: string
	onClick?: () => void
}

function Button({ innerItext, icon, onClick, className, justIcon }: IButton) {
	return (
		<ButtonComponent
			className={className}
			onClick={onClick}
			style={{ outline: 'none', boxShadow: 'none' }}
			cssClass="e-flat h-[33px] w-full flex item-center p-0"
		>
			<div
				className={clsx(
					{ 'flex w-full items-center text-xs': true },
					{ 'gap-3': !justIcon },
					{ 'justify-center': justIcon }
				)}
			>
				<span className="material-symbols-outlined" style={{ fontSize: 20 }}>
					{icon}
				</span>
				{innerItext && !justIcon && <span className="truncate">{innerItext}</span>}
			</div>
		</ButtonComponent>
	)
}

export default Button
