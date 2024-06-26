import { enableRipple } from '@syncfusion/ej2-base'
import Image from 'next/image'

import { DropdownButton } from '@/components/buttons'
import AccountDropdownTemplate from '@/components/buttons/dropdown-button/DropdownAccount'
import FallbackImage from '@/components/fallback-image'
import { useAdminTemplateContext } from '@/templates/admin-template'

enableRipple(true)

function AdminNavbar() {
	const { handleToggleSidebar } = useAdminTemplateContext()

	return (
		<div className="admin__navbar-component">
			<section className="flex items-center justify-between gap-3">
				<button
					type="button"
					onClick={handleToggleSidebar}
					className="material-symbols-outlined"
					style={{ fontSize: 34 }}
				>
					menu
				</button>
				<Image
					src="/assets/layout/imgs/header_logo.svg"
					alt="header_logo"
					width={10}
					height={10}
					priority
					className="size-auto"
				/>
			</section>
			<section className="flex items-center justify-center gap-4">
				<DropdownButton
					id="noti"
					className="!border-none !bg-transparent !p-0 !shadow-none"
					buttonContent={
						<span className="e-avatar e-avatar-circle">
							<FallbackImage
								src="/assets/layout/imgs/user_avt.jpg"
								alt="header_logo"
								width={200}
								height={200}
								className="size-full"
							/>
						</span>
					}
					dropDownBlock={<AccountDropdownTemplate />}
				/>
			</section>
		</div>
	)
}

export default AdminNavbar
