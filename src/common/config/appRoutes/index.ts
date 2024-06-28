import { authApiRoute } from '@/common/config/appRoutes/auth'
import { modelManagementEndpoint } from '@/common/config/appRoutes/model-management'
import { rolesApiRoute } from '@/common/config/appRoutes/roles-dasboard'
import { usersDashboardApiRoute } from '@/common/config/appRoutes/user-dashboard'

export default Object.freeze({
	auth: authApiRoute,
	usersDashboard: usersDashboardApiRoute,
	rolesDashboard: rolesApiRoute,
	modelManagement: modelManagementEndpoint,
})
