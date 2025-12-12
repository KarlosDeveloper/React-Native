import StatusBadge from '@/pages/Profile/components/StatusBadge'
import { Ionicons } from '@expo/vector-icons'
import { Text, View } from 'react-native'

function getServiceIcon(serviceName) {
	const nameLower = serviceName.toLowerCase()
	if (nameLower.includes('massage')) return 'body'
	if (nameLower.includes('sauna')) return 'flame'
	if (nameLower.includes('cryo')) return 'snow'
	if (nameLower.includes('haircut')) return 'cut'
	if (nameLower.includes('nail')) return 'hand-left'
	return 'construct'
}

export default function BookingsList({ bookings }) {
	return (
		<View className="bg-white rounded-2xl mx-4 mb-4 shadow-lg">
			<Text className="text-xl font-bold text-gray-900 px-6 pt-6 pb-4">Bookings</Text>
			<View className="px-6 pb-6">
				{bookings.map((booking, index) => {
					const iconName = getServiceIcon(booking.serviceName)
					const isConfirmed = booking.status === 'Confirmed'
					const isCompleted = booking.status === 'Completed'
					const isCancelled = booking.status === 'Cancelled'
					const iconColor = isCancelled ? '#ef4444' : isCompleted ? '#3b82f6' : '#10b981'
					const bgColor = isCancelled ? 'bg-red-100' : isCompleted ? 'bg-blue-100' : 'bg-green-100'

					return (
						<View
							key={booking.id}
							className={`mb-4 pb-4 ${index < bookings.length - 1 ? 'border-b border-gray-100' : ''}`}>
							<View className="flex-row items-start justify-between">
								<View className="flex-row items-center flex-1">
									<View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${bgColor}`}>
										<Ionicons name={iconName} size={20} color={iconColor} />
									</View>
									<View className="flex-1">
										<Text className="text-gray-500 text-sm mb-1">{booking.date}</Text>
										<Text className="text-gray-900 font-semibold text-base">{booking.serviceName}</Text>
									</View>
								</View>
								<StatusBadge status={booking.status} />
							</View>
						</View>
					)
				})}
			</View>
		</View>
	)
}
