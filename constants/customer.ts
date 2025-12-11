export interface Customer {
	id: string
	name: string
	role: string
	location: string
	avatar?: string
}

export const mockCustomer: Customer = {
	id: '1',
	name: 'Karol S.',
	role: 'Junior Software Engineer',
	location: 'Katowice',
}
