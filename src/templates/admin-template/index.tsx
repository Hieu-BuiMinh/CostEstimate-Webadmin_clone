'use client'

// import './style.css'

import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { APP_ROUTER } from '@/common/config'
import { useResponsiveDevice } from '@/hooks/custom-hooks/useMediaquery'
import AdminNavbar from '@/templates/admin-template/components/admin-navbar'
import AdminSidebar from '@/templates/admin-template/components/admin-sidebar'

interface IAdminTemplate {
	children: React.ReactNode
}

const initData = {
	bodyExpand: false,
	sidebarData: {
		sections: {
			navigator: [
				{
					innerText: 'Template.AdminTemplate.SideBar.dashboard',
					icon: 'dashboard',
					path: '/dashboard',
					key: 'nav_00',
				},
				{ innerText: 'Template.AdminTemplate.SideBar.user', icon: 'group', path: '/users', key: 'nav_01' },
				{
					innerText: 'Template.AdminTemplate.SideBar.role',
					icon: 'admin_panel_settings',
					path: '/roles',
					key: 'nav_02',
				},
				{ innerText: 'Template.AdminTemplate.SideBar.file', icon: 'draft', path: '/file', key: 'nav_03' },
				{
					innerText: 'Template.AdminTemplate.SideBar.model',
					icon: 'more_horiz',
					path: '/model-management',
					key: 'nav_04',
				},
				{
					innerText: 'Template.AdminTemplate.SideBar.compare_model',
					icon: 'compare_arrows',
					path: '/comparison-model',
					key: 'nav_05',
				},
				{
					innerText: 'Template.AdminTemplate.SideBar.cost_estimate',
					icon: 'function',
					path: '/cost-estimate',
					key: 'nav_06',
				},
				{
					innerText: 'Template.AdminTemplate.SideBar.equipment',
					icon: 'settings',
					path: '/equipment',
					key: 'nav_07',
				},
				{
					innerText: 'Template.AdminTemplate.SideBar.project',
					icon: 'format_list_bulleted',
					path: '/project-management',
					key: 'nav_08',
				},
				{
					innerText: 'Template.AdminTemplate.SideBar.system_log',
					icon: 'history',
					path: '/system-log',
					key: 'nav_09',
				},
			],
			settings: [
				{
					innerText: 'Template.AdminTemplate.SideBar.setting',
					icon: 'settings',
					path: '/settings',
					key: 'setting_01',
				},
				{
					innerText: 'Template.AdminTemplate.SideBar.sign_out',
					icon: 'logout',
					path: '',
					key: 'user_setting_02',
					type: 'logout',
				},
			],
		},
	},
	navbarData: {
		sections: {
			userSetting: [
				{ innerText: 'Setting', icon: 'settings', path: '/settings', key: 'user_setting_01' },
				{ innerText: 'Logout', icon: 'logout', path: '', key: 'user_setting_02' },
			],
		},
	},
}

const AdminTemplateContext = createContext({
	templateState: initData,
	handleToggleSidebar: () => null,
	handleLogout: () => null,
})

const useAdminTemplateContext = () => {
	const context = useContext(AdminTemplateContext)

	if (!context) {
		throw new Error('useAdminTemplateContext must be used in AdminTemplateContext.Provider.')
	}
	return context
}

function AdminTemplate({ children }: IAdminTemplate) {
	const { data: session } = useSession()
	const accessToken = Cookies.get('accessToken')
	const router = useRouter()
	const device = useResponsiveDevice()

	const [templateState, setTemplateState] = useState<typeof initData>(initData)

	const handleToggleSidebar = () => {
		setTemplateState((prev) => {
			return { ...prev, bodyExpand: !prev.bodyExpand }
		})
		return null
	}

	const handleLogout = () => {
		Cookies.remove('accessToken')
		Cookies.remove('refreshToken')
		Cookies.remove('autodeskAccessToken')
		Cookies.remove('autodeskRefreshToken')
		if (session?.user?.email) {
			signOut({ callbackUrl: APP_ROUTER.paths.center.signIn.path })
			return null
		}
		router.push(APP_ROUTER.paths.center.signIn.path)
		return null
	}

	const value = useMemo(() => {
		return { templateState, handleToggleSidebar, handleLogout }
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (accessToken) {
		const decoded = jwtDecode(accessToken)
		const currentTime = Date.now() / 1000
		const expire = decoded?.exp as number
		if (expire < currentTime) {
			handleLogout()
		}
	} else {
		handleLogout()
	}

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		if (device === 'desktop') {
			setTemplateState((prev) => {
				return { ...prev, bodyExpand: false }
			})
		}
		if (device === 'tablet') {
			setTemplateState((prev) => {
				return { ...prev, bodyExpand: true }
			})
		}
	}, [device])

	return (
		<AdminTemplateContext.Provider value={value}>
			<div className="admin__template">
				<AdminNavbar />

				<div className={`admin__body p-5 ${templateState.bodyExpand && 'admin__body--open'}`}>
					<AdminSidebar bodyExpand={templateState.bodyExpand} handleToggleSidebar={handleToggleSidebar} />
					{children}
				</div>
			</div>
		</AdminTemplateContext.Provider>
	)
}

export { AdminTemplate, useAdminTemplateContext }
