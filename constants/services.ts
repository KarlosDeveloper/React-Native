export interface Service {
	id: string
	name: string
	providerId?: string
	icon?: string
}

export const mockServices: Service[] = [
	{ id: '1', name: 'Massage', providerId: 'M001', icon: 'body-outline' },
	{ id: '2', name: 'Cryo Therapy', providerId: 'C001', icon: 'snow-outline' },
	{ id: '3', name: 'IR Sauna', providerId: 'I001', icon: 'flame-outline' },
	{ id: '4', name: 'Haircut', providerId: 'H001', icon: 'cut-outline' },
	{ id: '5', name: 'Nail Service', providerId: 'N001', icon: 'hand-left-outline' },
]
