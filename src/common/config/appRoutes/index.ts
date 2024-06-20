import { authApiRoute } from '@/common/config/appRoutes/auth'
import { usersDashboardApiRoute } from '@/common/config/appRoutes/user-dashboard'

export default Object.freeze({
	auth: authApiRoute,
	usersDashboard: usersDashboardApiRoute,
})
