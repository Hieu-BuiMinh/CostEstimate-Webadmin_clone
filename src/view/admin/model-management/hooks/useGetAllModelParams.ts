import { useQuery } from '@tanstack/react-query'
import Cookies from 'js-cookie'

import { ModelParamsSettingServices } from '@/view/admin/model-management/services/model-param-setting'

export function useGetAllModelParams() {
	const accessToken = Cookies.get('accessToken')

	return useQuery({
		queryKey: ['useGetAllModelParams'],
		enabled: !!accessToken,
		queryFn: () => {
			return ModelParamsSettingServices.getAllModelParam()
		},
	})
}
