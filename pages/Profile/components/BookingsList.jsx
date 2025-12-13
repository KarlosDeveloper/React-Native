import StatusBadge from '@/pages/Profile/components/StatusBadge'
import { Ionicons } from '@expo/vector-icons'
import { Text, TouchableOpacity, View } from 'react-native'

export default function BookingsList({ bookings }) {
	const activeCount = bookings.filter(b => b.status === 'Confirmed').length
	const pastCount = bookings.filter(b => b.status === 'Completed' || b.status === 'Cancelled').length

	return (
		<View className="bg-white rounded-2xl mx-4 mb-4 shadow-lg">
			<View className="px-6 pt-6 pb-4">
				<View className="flex-row items-center justify-between mb-2">
					<Text className="text-xl font-bold text-gray-900">Recent bookings</Text>
					<TouchableOpacity>
						<Text className="text-blue-600 text-base font-medium">Add new</Text>
					</TouchableOpacity>
				</View>
				<Text className="text-gray-500 text-sm">
					{activeCount} active • {pastCount} past
				</Text>
			</View>
			<View className="px-6">
				{bookings.map((booking, index) => {
					return (
						<View
							key={booking.id}
							className={`mb-4 pb-4 ${index < bookings.length - 1 ? 'border-b border-gray-100' : ''}`}>
							<View className="flex-row items-start justify-between">
								<View className="flex-row items-center flex-1">
									<View className="w-10 h-10 rounded-lg border-2 border-blue-200 items-center justify-center mr-3 bg-blue-50">
										<Ionicons name="calendar-outline" size={20} color="#3b82f6" />
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
			<View className="px-6 pb-6">
				<TouchableOpacity className="items-end">
					<Text className="text-blue-600 text-base font-medium">See more</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}
