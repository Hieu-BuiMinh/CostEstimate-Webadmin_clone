import type { IParameter } from '../Class/Base/Parameters/IParameter'
import type { EnumParameterType, EnumUnitType } from '../Class/Base/Parameters/IParameterFormat'

export interface SqlFvParameter extends IParameter {
	category: string
	name: string
	dataType: EnumParameterType
	unitType: EnumUnitType
	value: any
}
