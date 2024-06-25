import { authApiRoute } from '@/common/config/appRoutes/auth'
import { rolesApiRoute } from '@/common/config/appRoutes/roles-dasboard'
import { usersDashboardApiRoute } from '@/common/config/appRoutes/user-dashboard'

export default Object.freeze({
	auth: authApiRoute,
	usersDashboard: usersDashboardApiRoute,
	rolesDashboard: rolesApiRoute,
})
