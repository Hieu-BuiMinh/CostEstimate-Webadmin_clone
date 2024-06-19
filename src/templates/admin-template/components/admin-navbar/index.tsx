import './style.css'

import { enableRipple } from '@syncfusion/ej2-base'
import { ButtonComponent } from '@syncfusion/ej2-react-buttons'
import { DropDownButtonComponent } from '@syncfusion/ej2-react-splitbuttons'
import Image from 'next/image'

import { DropdownButton } from '@/components/buttons'
import FallbackImage from '@/components/fallback-image'
import { useAdminTemplateContext } from '@/templates/admin-template'

enableRipple(true)

function AdminNavbar() {
	const { handleToggleSidebar } = useAdminTemplateContext()

	return (
		<div className="admin__navbar-component">
			<section className="flex items-center justify-between gap-3">
				<ButtonComponent
					onClick={handleToggleSidebar}
					className="material-symbols-outlined e-flat !flex !p-0"
					style={{ fontSize: 34 }}
				>
					menu
				</ButtonComponent>
				<Image
					src="/assets/layout/imgs/header_logo.svg"
					alt="header_logo"
					width={10}
					height={10}
					className="size-auto"
				/>
			</section>
			<section className="flex items-center justify-center gap-4">
				<div id="target">item 123</div>
				<DropDownButtonComponent cssClass="e-caret-hide e-flat" target="#target">
					<span className="material-symbols-outlined m-auto !flex">notifications</span>
				</DropDownButtonComponent>

				<DropdownButton
					id="noti"
					buttonContent={<span className="material-symbols-outlined m-auto !flex">notifications</span>}
					dropDownBlock={<div>123</div>}
				/>

				<span className="e-avatar e-avatar-circle">
					<FallbackImage
						src="/assets/layout/imgs/user_avt.jpg"
						alt="header_logo"
						width={200}
						height={200}
						className="size-full"
					/>
				</span>
			</section>
		</div>
	)
}

export default AdminNavbar
