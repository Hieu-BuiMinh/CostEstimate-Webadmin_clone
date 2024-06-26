import type { BucketObject } from '@/types/BucketObject'

import type { BaseSettingParameter } from '../Base/BaseSettingParameter'

export interface MceModelCostEstimate {
	isUpdate: boolean
	progress: number
	bucketObject: BucketObject
	costEstimateVersion: number
	isSetCostEstimateVersion: boolean
	settingParameter: BaseSettingParameter
	detailSchedules: string[]
	totalSchedule: string
}
