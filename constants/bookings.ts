export type BookingStatus = 'Confirmed' | 'Completed' | 'Cancelled'

export interface Booking {
	id: string
	date: string
	serviceName: string
	status: BookingStatus
}

export const mockBookings: Booking[] = [
	{
		id: '1',
		date: 'April 23, 2024',
		serviceName: 'Haircut',
		status: 'Confirmed',
	},
	{
		id: '2',
		date: 'April 20, 2024',
		serviceName: 'Massage',
		status: 'Completed',
	},
	{
		id: '3',
		date: 'April 14, 2024',
		serviceName: 'Haircut',
		status: 'Completed',
	},
	{
		id: '4',
		date: 'April 8, 2024',
		serviceName: 'Nail Service',
		status: 'Cancelled',
	},
	{
		id: '5',
		date: 'May 1, 2024',
		serviceName: 'Cryo Therapy',
		status: 'Confirmed',
	},
	{
		id: '6',
		date: 'May 5, 2024',
		serviceName: 'IR Sauna',
		status: 'Confirmed',
	},
]
