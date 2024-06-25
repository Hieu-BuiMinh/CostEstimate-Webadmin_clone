export interface UsersColumn {
	id: number
	field: string
	allowSorting?: boolean
	allowSearching?: boolean
	direction?: 'Ascending' | 'Descending'
}
