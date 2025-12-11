import { Ionicons } from '@expo/vector-icons'
import { Text, TouchableOpacity, View } from 'react-native'

interface BookingHeaderProps {
	serviceName: string
	providerId?: string
	selectedDate?: string
	selectedTime?: string
	onBookNow: () => void
}

export default function BookingHeader({
	serviceName,
	providerId,
	selectedDate,
	selectedTime,
	onBookNow,
}: BookingHeaderProps) {
	return (
		<View className="bg-white px-4 pt-8 pb-8">
			{selectedDate && selectedTime && (
				<View className="mb-6 flex-row gap-2">
					{providerId && (
						<View className="flex-1 items-center bg-white rounded-2xl px-3 py-4 border border-gray-100 shadow-sm">
							<View className="w-10 h-10 rounded-full bg-green-50 items-center justify-center mb-2">
								<Ionicons name="person" size={20} color="#10b981" />
							</View>
							<Text className="text-xs text-gray-500 font-medium mb-1">Provider ID</Text>
							<Text className="text-gray-900 font-bold text-sm text-center">{providerId}</Text>
						</View>
					)}
					<View className="flex-1 items-center bg-white rounded-2xl px-3 py-4 border border-gray-100 shadow-sm">
						<View className="w-10 h-10 rounded-full bg-green-50 items-center justify-center mb-2">
							<Ionicons name="calendar" size={20} color="#10b981" />
						</View>
						<Text className="text-xs text-gray-500 font-medium mb-1">Date</Text>
						<Text className="text-gray-900 font-bold text-sm text-center">{selectedDate}</Text>
					</View>
					<View className="flex-1 items-center bg-white rounded-2xl px-3 py-4 border border-gray-100 shadow-sm">
						<View className="w-10 h-10 rounded-full bg-green-50 items-center justify-center mb-2">
							<Ionicons name="time" size={20} color="#10b981" />
						</View>
						<Text className="text-xs text-gray-500 font-medium mb-1">Time</Text>
						<Text className="text-gray-900 font-bold text-sm text-center">{selectedTime}</Text>
					</View>
				</View>
			)}

			<TouchableOpacity
				onPress={onBookNow}
				className="bg-gray-900 rounded-3xl py-5 px-6 items-center justify-center shadow-lg">
				<Text className="text-white font-bold text-lg">Book Now</Text>
			</TouchableOpacity>
		</View>
	)
}
