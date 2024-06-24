export interface Column {
	id: number
	field: string
	allowSorting: boolean
	direction: 'Ascending' | 'Descending'
}
