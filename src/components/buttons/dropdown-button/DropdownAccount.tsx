import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import React from 'react'

import { APP_ROUTER } from '@/common/config'
import useAppModal from '@/components/modals/app-modal/store'
import { useLocalStorage } from '@/hooks/custom-hooks'
import SidebarButton from '@/templates/admin-template/components/sidebar-button'
import ModalChangePasswordContent from '@/view/admin/users/components/modals/modal-change-password'

import FallbackImage from '../../fallback-image'

function AccountDropdownTemplate() {
	const { getItem: getLocalStorageItem } = useLocalStorage('mode')
	const router = useRouter()
	const handleClickChangePassword = () => {
		router.push(APP_ROUTER.paths.admin.changePassword.path)
	}
	const { open, close, setModalOptions } = useAppModal()

	const handleOpenEditModal = () => {
		setModalOptions({
			showCloseIcon: false,
			content: <ModalChangePasswordContent onClose={close} />,
		})
		open()
	}

	const accountItems = [
		{
			key: 1,
			className: 'account__section',
			subItems: [
				{
					key: 1.1,
					innerText: 'Template.AdminTemplate.NavBar.switch_account',
					className: 'account__section--button',
					icon: 'sync_alt',
					onClick: handleClickChangePassword,
				},
				{
					key: 1.2,
					innerText: 'Template.AdminTemplate.NavBar.manage_account',
					className: 'account__section--button',
					icon: 'account_circle',
					onClick: handleClickChangePassword,
				},
				{
					key: 1.3,
					innerText: 'Template.AdminTemplate.NavBar.change_password',
					className: 'account__section--button',
					icon: 'key',
					onClick: handleOpenEditModal,
				},
			],
		},
		{
			key: 2,
			className: 'account__section',
			subItems: [
				{
					key: 2.1,
					innerText: 'Template.AdminTemplate.NavBar.profile',
					className: 'account__section--button',
					icon: 'account_circle',
					onClick: handleClickChangePassword,
				},
				{
					key: 2.2,
					innerText: 'Template.AdminTemplate.NavBar.activity',
					className: 'account__section--button',
					icon: 'bookmark_manager',
					onClick: handleClickChangePassword,
				},
			],
		},
		{
			key: 3,
			className: 'account__section',
			subItems: [
				{
					key: 3.1,
					innerText: 'Template.AdminTemplate.NavBar.help',
					className: 'account__section--button',
					icon: 'help',
					onClick: handleClickChangePassword,
				},
				{
					key: 3.2,
					innerText: 'Template.AdminTemplate.NavBar.short_cut',
					className: 'account__section--button',
					icon: 'article_shortcut',
					onClick: handleClickChangePassword,
				},
			],
		},
	]
	return (
		<div>
			{/* <div
				id="dropdownNavbar"
				className={
					getItem() === 'dark'
						? 'account absolute left-[-200px] z-10 w-60 divide-y divide-gray-100 rounded-lg !bg-[#232e3e] font-normal !text-white shadow'
						: `account absolute left-[-200px] z-10 w-60 divide-y divide-gray-100 rounded-lg !bg-white font-normal shadow`
				}
			> */}
			<div
				id="dropdownNavbar"
				className={clsx(
					{
						'account absolute left-[-200px] z-10 w-60 divide-y divide-gray-100 rounded-lg font-normal shadow':
							true,
					},
					{ '!bg-[#232e3e] !text-white': getLocalStorageItem() === 'dark' },
					{ '!bg-white': getLocalStorageItem() === 'light' }
				)}
			>
				<div className="flex items-center p-4">
					<div className="e-avatar e-avatar-circle">
						<FallbackImage
							src="/assets/layout/imgs/user_avt.jpg"
							alt="header_logo"
							width={200}
							height={200}
							className="size-full"
						/>
					</div>
					<div className="pl-4">
						<div>DPUnity</div>
						<div>dpunity@gmail.com</div>
					</div>
				</div>
				{accountItems.map((item) => (
					<div key={item.key} className={item.className} aria-labelledby="dropdownLargeButton">
						{item.subItems.map((it) => (
							<SidebarButton
								key={it.key}
								className={it.className}
								icon={it.icon}
								onClick={it.onClick}
								innerItext={it.innerText}
							/>
						))}
					</div>
				))}
			</div>
		</div>
	)
}

export default AccountDropdownTemplate
