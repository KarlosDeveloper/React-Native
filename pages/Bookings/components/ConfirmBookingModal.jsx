import { Ionicons } from '@expo/vector-icons'
import { Modal, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import DubaiMapWithMoney from './ExampleMap'

export default function ConfirmBookingModal({ visible, service, date, time, onClose, onConfirm }) {
	const insets = useSafeAreaInsets()

	if (!service || !date || !time) {
		return (
			<Modal visible={false} transparent>
				<View />
			</Modal>
		)
	}

	const formatDateWithTime = (dateStr, timeStr) => {
		const date = new Date(dateStr)
		const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		return `${months[date.getMonth()]} ${date.getDate()}, ${timeStr} (~1.5 hr)`
	}

	return (
		<Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
			<View className="flex-1 bg-black/60">
				<TouchableWithoutFeedback onPress={onClose}>
					<View className="absolute inset-0" />
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback onPress={() => {}}>
					<View
						className="flex-1 bg-white w-full"
						style={{
							paddingTop: insets.top + 20,
							borderTopLeftRadius: 40,
							borderTopRightRadius: 40,
						}}>
						{/* Header */}
						<View className="px-6 pb-4 border-b border-gray-100">
							<View className="flex-row items-center justify-between mb-4">
								<View className="flex-1">
									<Text className="text-3xl font-bold text-gray-900 mb-2">Confirm Booking</Text>
									<Text className="text-base text-gray-500">Review your appointment details</Text>
								</View>
								<TouchableOpacity
									onPress={onClose}
									className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center">
									<Ionicons name="close" size={22} color="#374151" />
								</TouchableOpacity>
							</View>
						</View>

						<ScrollView showsVerticalScrollIndicator={false} className="flex-1">
							<View className="px-6 pt-6 pb-8">
								{/* Map */}
								<View className="mb-6 rounded-3xl overflow-hidden shadow-lg">
									<DubaiMapWithMoney />
								</View>

								{/* Booking Summary Card */}
								<View className="bg-green-50 rounded-3xl p-6 mb-6 border-2 border-green-200 shadow-lg">
									<View className="flex-row items-center mb-5">
										<View className="w-14 h-14 rounded-2xl bg-green-600 items-center justify-center mr-4">
											<Ionicons name={service.icon || 'construct'} size={28} color="#ffffff" />
										</View>
										<View className="flex-1">
											<Text className="text-xs font-semibold text-green-600 uppercase mb-1">Service</Text>
											<Text className="text-xl font-bold text-gray-900">{service.name}</Text>
										</View>
									</View>

									<View className="h-px bg-green-200 mb-5" />

									<View className="flex-row items-center">
										<View className="w-14 h-14 rounded-2xl bg-white items-center justify-center mr-4 shadow-sm">
											<Ionicons name="calendar" size={28} color="#10b981" />
										</View>
										<View className="flex-1">
											<Text className="text-xs font-semibold text-green-600 uppercase mb-1">Date & Time</Text>
											<Text className="text-xl font-bold text-gray-900">{formatDateWithTime(date, time)}</Text>
										</View>
									</View>

									{service.providerId && (
										<>
											<View className="h-px bg-green-200 my-5" />
											<View className="flex-row items-center">
												<View className="w-14 h-14 rounded-2xl bg-white items-center justify-center mr-4 shadow-sm">
													<Ionicons name="person" size={28} color="#10b981" />
												</View>
												<View className="flex-1">
													<Text className="text-xs font-semibold text-green-600 uppercase mb-1">Provider</Text>
													<Text className="text-xl font-bold text-gray-900">{service.providerId}</Text>
												</View>
											</View>
										</>
									)}
								</View>

								{/* Action Buttons */}
								<TouchableOpacity
									onPress={onConfirm}
									className="bg-gray-900 rounded-3xl py-5 px-6 items-center justify-center mb-4 shadow-xl"
									style={{
										shadowColor: '#000',
										shadowOffset: { width: 0, height: 4 },
										shadowOpacity: 0.3,
										shadowRadius: 8,
										elevation: 8,
									}}>
									<View className="flex-row items-center">
										<Text className="text-white font-bold text-lg mr-2">Confirm Booking</Text>
										<Ionicons name="checkmark-circle" size={22} color="#ffffff" />
									</View>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={onClose}
									className="bg-white rounded-3xl py-4 px-6 items-center justify-center border-2 border-gray-200">
									<Text className="text-gray-700 font-semibold text-base">Cancel</Text>
								</TouchableOpacity>
							</View>
						</ScrollView>
					</View>
				</TouchableWithoutFeedback>
			</View>
		</Modal>
	)
}
