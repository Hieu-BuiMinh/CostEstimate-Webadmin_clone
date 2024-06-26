import type { BlzTextAlign } from '../../Blazors/EnumBlazors'

export interface IParameterFormat {
	textAlign: BlzTextAlign
	round: EnumRoundUnit
	dataType: EnumParameterType
	unitType: EnumUnitType
}

export enum EnumRoundUnit {
	None = '<None>',
	R0 = '0',
	R1 = '0.1',
	R2 = '0.01',
	R3 = '0.001',
	R4 = '0.0001',
	R5 = '0.00001',
	R6 = '0.000001',
	R7 = '0.0000001',
	R8 = '0.00000001',
	R9 = '0.000000001',
}

// // Tuỳ chọn: nếu bạn cần lấy mô tả từ giá trị enum, bạn có thể sử dụng một đối tượng ánh xạ như sau:
// const EnumRoundUnitDescriptions: { [key in EnumRoundUnit]: string } = {
//     [EnumRoundUnit.None]: "<None>",
//     [EnumRoundUnit.R0]: "0",
//     [EnumRoundUnit.R1]: "0.1",
//     [EnumRoundUnit.R2]: "0.01",
//     [EnumRoundUnit.R3]: "0.001",
//     [EnumRoundUnit.R4]: "0.0001",
//     [EnumRoundUnit.R5]: "0.00001",
//     [EnumRoundUnit.R6]: "0.000001",
//     [EnumRoundUnit.R7]: "0.0000001",
//     [EnumRoundUnit.R8]: "0.00000001",
//     [EnumRoundUnit.R9]: "0.000000001",
// };

export enum EnumParameterType {
	None = 0,
	Double = 3,
	Int = 11,
	String = 20,
	URL = 100,
}

export enum EnumUnitType {
	None = 0,
	Default = 1,
	// Currency
	Currency = 100,
	Currency_Dollar = 101,
	Currency_VND = 102,
	// Length
	Length = 200,
	Length_Mm = 201,
	Length_M = 202,
	Length_Feet = 203,
	Length_Inches = 204,
	// Angle
	Angle = 300,
	Angle_Degrees = 301,
	// Area

	// Volumn
}
