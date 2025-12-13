import { Ionicons } from '@expo/vector-icons'
import { Text, TouchableOpacity, View } from 'react-native'

export default function BookingHeader({ serviceName, providerId, selectedDate, selectedTime, onBookNow }) {
	const isReady = selectedDate && selectedTime && serviceName !== 'Select Service'

	return (
		<View className="px-6 pt-6 pb-8">
			{isReady && (
				<View className="bg-green-50 rounded-3xl p-6 mb-6 border-2 border-green-200 shadow-lg">
					<View className="flex-row items-center mb-5">
						<View className="w-12 h-12 rounded-2xl bg-green-600 items-center justify-center mr-4">
							<Ionicons name="checkmark-circle" size={28} color="#ffffff" />
						</View>
						<View className="flex-1">
							<Text className="text-lg font-bold text-gray-900 mb-1">Ready to Book!</Text>
							<Text className="text-sm text-gray-600">Review your selection below</Text>
						</View>
					</View>

					<View className="bg-white/80 rounded-2xl p-4 mb-4">
						<View className="flex-row items-center mb-3">
							<View className="w-10 h-10 rounded-xl bg-green-100 items-center justify-center mr-3">
								<Ionicons name="construct" size={20} color="#10b981" />
							</View>
							<View className="flex-1">
								<Text className="text-xs font-semibold text-gray-500 uppercase mb-1">Service</Text>
								<Text className="text-base font-bold text-gray-900">{serviceName}</Text>
							</View>
						</View>
						{providerId && (
							<View className="flex-row items-center mb-3">
								<View className="w-10 h-10 rounded-xl bg-green-100 items-center justify-center mr-3">
									<Ionicons name="person" size={20} color="#10b981" />
								</View>
								<View className="flex-1">
									<Text className="text-xs font-semibold text-gray-500 uppercase mb-1">Provider</Text>
									<Text className="text-base font-bold text-gray-900">{providerId}</Text>
								</View>
							</View>
						)}
						<View className="flex-row items-center">
							<View className="w-10 h-10 rounded-xl bg-green-100 items-center justify-center mr-3">
								<Ionicons name="calendar" size={20} color="#10b981" />
							</View>
							<View className="flex-1">
								<Text className="text-xs font-semibold text-gray-500 uppercase mb-1">Date & Time</Text>
								<Text className="text-base font-bold text-gray-900">
									{selectedDate} • {selectedTime}
								</Text>
							</View>
						</View>
					</View>
				</View>
			)}

			<TouchableOpacity
				onPress={onBookNow}
				disabled={!isReady}
				className={`rounded-3xl py-5 px-6 items-center justify-center shadow-xl ${
					isReady ? 'bg-gray-900' : 'bg-gray-300'
				}`}
				style={{
					shadowColor: isReady ? '#000' : '#000',
					shadowOffset: { width: 0, height: 4 },
					shadowOpacity: isReady ? 0.3 : 0.1,
					shadowRadius: 8,
					elevation: 8,
				}}>
				<View className="flex-row items-center">
					<Text className={`font-bold text-lg ${isReady ? 'text-white' : 'text-gray-500'}`}>
						{isReady ? 'Confirm Booking' : 'Complete Selection'}
					</Text>
					{isReady && <Ionicons name="arrow-forward" size={20} color="#ffffff" className="ml-2" />}
				</View>
			</TouchableOpacity>
		</View>
	)
}
