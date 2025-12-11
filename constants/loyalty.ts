export interface LoyaltyPoints {
	totalPoints: number
	currency: string
}

export type TransactionType = 'earned' | 'spent'

export interface PointsTransaction {
	id: string
	vendor: string
	date: string
	time: string
	points: number
	type: TransactionType
	icon?: string
}

export const mockLoyaltyPoints: LoyaltyPoints = {
	totalPoints: 12000,
	currency: 'pts',
}

export const mockPointsHistory: PointsTransaction[] = [
	{
		id: '1',
		vendor: 'Massage Service',
		date: '12 Dec',
		time: '13:45',
		points: 500,
		type: 'earned',
	},
	{
		id: '2',
		vendor: 'IR Sauna',
		date: '10 Dec',
		time: '09:30',
		points: 300,
		type: 'earned',
	},
	{
		id: '3',
		vendor: 'Cryo Therapy',
		date: '8 Dec',
		time: '14:20',
		points: 400,
		type: 'earned',
	},
	{
		id: '4',
		vendor: 'Haircut',
		date: '5 Dec',
		time: '16:00',
		points: 200,
		type: 'earned',
	},
	{
		id: '5',
		vendor: 'Massage Service',
		date: '3 Dec',
		time: '11:15',
		points: 500,
		type: 'spent',
	},
	{
		id: '6',
		vendor: 'Nail Service',
		date: '1 Dec',
		time: '15:30',
		points: 250,
		type: 'spent',
	},
	{
		id: '7',
		vendor: 'IR Sauna',
		date: '28 Nov',
		time: '10:00',
		points: 300,
		type: 'earned',
	},
	{
		id: '8',
		vendor: 'Cryo Therapy',
		date: '25 Nov',
		time: '14:45',
		points: 400,
		type: 'earned',
	},
]
