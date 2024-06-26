import type { SqlFvParameter } from '@/types/SQLiteEntity/SqlFvParameter'

export interface BaseSettingParameter {
	isUpdate: boolean
	name: string
	guid: string
	parameters: SqlFvParameter[]
}
