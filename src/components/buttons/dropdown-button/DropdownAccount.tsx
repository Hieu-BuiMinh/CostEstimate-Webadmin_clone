import { useRouter } from 'next/navigation'
import React from 'react'

import { APP_ROUTER } from '@/common/config'
import SidebarButton from '@/templates/admin-template/components/sidebar-button'

import FallbackImage from '../../fallback-image'

function AccountDropdownTemplate() {
	const router = useRouter()
	const handleClickChangePassword = () => {
		router.push(APP_ROUTER.paths.center.forgotPassword.path)
	}

	const accountItems = [
		{
			key: 1,
			className: 'account__section',
			subItems: [
				{
					key: 1.1,
					innerText: 'Switch Account',
					className: 'account__section--button',
					icon: 'sync_alt',
					onClick: handleClickChangePassword,
				},
				{
					key: 1.2,
					innerText: 'Manage Account',
					className: 'account__section--button',
					icon: 'account_circle',
					onClick: handleClickChangePassword,
				},
				{
					key: 1.3,
					innerText: 'Change Password',
					className: 'account__section--button',
					icon: 'key',
					onClick: handleClickChangePassword,
				},
			],
		},
		{
			key: 2,
			className: 'account__section',
			subItems: [
				{
					key: 2.1,
					innerText: 'Profile and visibility',
					className: 'account__section--button',
					icon: 'account_circle',
					onClick: handleClickChangePassword,
				},
				{
					key: 2.2,
					innerText: 'Activity',
					className: 'account__section--button',
					icon: 'bookmark_manager',
					onClick: handleClickChangePassword,
				},
				{
					key: 2.3,
					innerText: 'Cards',
					className: 'account__section--button',
					icon: 'bookmark_manager',
					onClick: handleClickChangePassword,
				},
				{
					key: 2.4,
					innerText: 'Settings',
					className: 'account__section--button',
					icon: 'settings',
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
					innerText: 'Help',
					className: 'account__section--button',
					icon: 'help',
					onClick: handleClickChangePassword,
				},
				{
					key: 3.2,
					innerText: 'Shortcuts',
					className: 'account__section--button',
					icon: 'article_shortcut',
					onClick: handleClickChangePassword,
				},
			],
		},
		{
			key: 4,
			className: 'account__section',
			subItems: [
				{
					key: 4.1,
					innerText: 'Sign out',
					className: 'account__section--signout',
					icon: 'logout',
					onClick: handleClickChangePassword,
				},
			],
		},
	]
	return (
		<div
			id="dropdownNavbar"
			className="absolute left-[-200px] z-10 w-60 divide-y divide-gray-100 rounded-lg bg-white font-normal shadow dark:divide-gray-600 dark:bg-gray-700"
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
	)
}

export default AccountDropdownTemplate
