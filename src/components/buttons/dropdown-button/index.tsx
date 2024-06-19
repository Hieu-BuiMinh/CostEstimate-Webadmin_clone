import { DropDownButtonComponent } from '@syncfusion/ej2-react-splitbuttons'
import React from 'react'

interface IDropdownButton {
	id: string
	className?: string
	buttonContent: React.ReactNode
	dropDownBlock: React.ReactNode
}

export function DropdownButton({ buttonContent, id, dropDownBlock, className }: IDropdownButton) {
	return (
		<>
			<DropDownButtonComponent cssClass={`e-caret-hide e-flat ${className}`} target={`#${id}`}>
				{buttonContent}
			</DropDownButtonComponent>
			<div id={id}>{dropDownBlock}</div>
		</>
	)
}
