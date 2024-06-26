import { format, formatDistanceToNow, getTime } from 'date-fns'
import { vi } from 'date-fns/locale/vi'
// ----------------------------------------------------------------------

type InputValue = Date | string | number | null

export function fDate(date: InputValue, newFormat?: string) {
	const fm = newFormat || 'dd MMM yyyy'
	return date ? format(new Date(date), fm) : ''
}
export function fDateShort(date: InputValue, newFormat?: string) {
	const fm = newFormat || 'dd/MM/yyyy'
	return date ? format(new Date(date), fm) : ''
}
export function fDateVi(date: InputValue, newFormat?: string) {
	const fmVi = newFormat || 'dd MMMM yyyy'
	return date ? format(new Date(date), fmVi, { locale: vi }) : ''
}
export function fDateTime(date: InputValue, newFormat?: string) {
	const fm = newFormat || 'dd MMM yyyy p'

	return date ? format(new Date(date), fm) : ''
}
export function fDateTimeShort(date: InputValue, newFormat?: string) {
	const fm = newFormat || 'HH:mm dd/MM/yy'

	return date ? format(new Date(date), fm) : ''
}
export function fDateTimeVi(date: InputValue, newFormat?: string) {
	const fm = newFormat || 'dd MMM yyyy p'

	return date ? format(new Date(date), fm, { locale: vi }) : ''
}

export function fTimestamp(date: InputValue) {
	return date ? getTime(new Date(date)) : ''
}

export function fToNow(date: InputValue) {
	return date
		? formatDistanceToNow(new Date(date), {
				addSuffix: true,
			})
		: ''
}
export function fToNowVi(date: InputValue) {
	return date
		? formatDistanceToNow(new Date(date), {
				addSuffix: true,
				locale: vi,
			})
		: ''
}
