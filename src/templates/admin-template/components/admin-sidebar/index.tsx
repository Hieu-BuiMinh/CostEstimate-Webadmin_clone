import Link from 'next/link'

import { useAdminTemplateContext } from '@/templates/admin-template'
import SidebarButton from '@/templates/admin-template/components/sidebar-button'

interface IAdminSidebar {
	bodyExpand: boolean
	handleToggleSidebar: () => void
}

function AdminSidebar({ bodyExpand, handleToggleSidebar }: IAdminSidebar) {
	const adminTemplateContext = useAdminTemplateContext()

	return (
		<div className={`admin__sidebar-component ${bodyExpand && 'admin__sidebar-component--open'}`}>
			<div className="admin__sidebar-body">
				<section className="flex w-full flex-col items-end justify-between gap-3 p-[10px]">
					<button
						type="button"
						onClick={handleToggleSidebar}
						className="e-flat !flex h-[33px] w-[35px] !border-[var(--color-primary)] !p-0"
						style={{ border: bodyExpand ? '' : 'none' }}
					>
						<span
							style={{ fontSize: 20 }}
							className="material-symbols-outlined m-auto text-[var(--color-primary)]"
						>
							{bodyExpand ? 'keyboard_double_arrow_right' : 'keyboard_double_arrow_left'}
						</span>
					</button>

					{adminTemplateContext.templateState.sidebarData.sections.navigator.map((nav) => {
						return (
							<Link className="w-full" href={nav.path} key={nav.key}>
								<SidebarButton justIcon={bodyExpand} innerItext={nav.innerText} icon={nav.icon} />
							</Link>
						)
					})}
				</section>

				<section className="flex w-full flex-col gap-3 p-[10px]">
					{adminTemplateContext.templateState.sidebarData.sections.settings.map((nav) => {
						if (nav?.type === 'logout') {
							return (
								<SidebarButton
									justIcon={bodyExpand}
									key={nav.key}
									innerItext={nav.innerText}
									icon={nav.icon}
									onClick={() => adminTemplateContext.handleLogout()}
								/>
							)
						}
						return (
							<Link className="w-full" href={nav.path} key={nav.key}>
								<SidebarButton justIcon={bodyExpand} innerItext={nav.innerText} icon={nav.icon} />
							</Link>
						)
					})}
				</section>
			</div>
		</div>
	)
}

export default AdminSidebar
