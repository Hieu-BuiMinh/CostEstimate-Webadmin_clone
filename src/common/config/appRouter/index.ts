import { comparisonModel } from '@/common/config/appRouter/admin/comparison-model'
import { costEstimate } from '@/common/config/appRouter/admin/cost-estimate'
import { dashboard } from '@/common/config/appRouter/admin/dashboard'
import { equipment } from '@/common/config/appRouter/admin/equipment'
import { files } from '@/common/config/appRouter/admin/file'
import { modelManagement } from '@/common/config/appRouter/admin/model-management'
import { projectManagement } from '@/common/config/appRouter/admin/project-management'
import { roles } from '@/common/config/appRouter/admin/roles'
import { settings } from '@/common/config/appRouter/admin/settings'
import { systemLog } from '@/common/config/appRouter/admin/system-log'
import { users } from '@/common/config/appRouter/admin/users'

import { changePassword } from './admin/change-password'

const DEFAULT_PATHS = {
	admin: {
		dashboard,
		files,
		settings,
		modelManagement,
		comparisonModel,
		costEstimate,
		equipment,
		projectManagement,
		systemLog,
		users,
		roles,
		changePassword,
	},
	center: {
		signIn: {
			path: '/sign-in',
		},
		signinWithGoogle: {
			path: '/google-authentication',
		},
		signinWithAutodesk: {
			path: '/autodesk-authentication',
		},
		signUp: {
			path: '/sign-up',
		},
		forgotPassword: {
			path: '/forgot-password',
		},
		localApp: {
			path: '/local-app',
			children: {
				signinWithGoogle: {
					path: '/local-app/google-authentication',
				},
				signinWithAutodesk: {
					path: '/local-app/autodesk-authentication',
					children: {
						success_path: '/local-app/autodesk-authentication/success',
					},
				},
			},
		},
	},
	unAuth: {
		root: '/',
	},
	homePage: {
		root: '/',
	},
}

export default Object.freeze({
	paths: DEFAULT_PATHS,
})
