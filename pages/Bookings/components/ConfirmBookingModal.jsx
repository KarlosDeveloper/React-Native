import { Ionicons } from '@expo/vector-icons'
import { Modal, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import DubaiMapWithMoney from './ExampleMap'

export default function ConfirmBookingModal({
	visible,
	service,
	date,
	time,
	onClose,
	onConfirm,
}) {
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
			<View className="flex-1 bg-black/50">
				<TouchableWithoutFeedback onPress={onClose}>
					<View className="absolute inset-0" />
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback onPress={() => {}}>
					<View className="flex-1 bg-white rounded-t-3xl w-full" style={{ paddingTop: insets.top }}>
						<TouchableOpacity onPress={onClose} className="absolute right-4 z-10 p-2" style={{ top: insets.top + 16 }}>
							<Ionicons name="close" size={24} color="#111827" />
						</TouchableOpacity>
						<ScrollView showsVerticalScrollIndicator={false} className="flex-1">
							<View className="px-6 pt-12 pb-8">
								<Text className="text-3xl font-bold text-gray-900 mb-2">Confirm appointment</Text>
								<Text className="text-base text-gray-600 mb-6">
									Review your appointment details below one last time before booking.
								</Text>
								<DubaiMapWithMoney />
								<View className="bg-gray-50 rounded-3xl p-5 mb-6">
									<View className="flex-row items-center mb-4">
										<View className="w-12 h-12 rounded-full bg-white items-center justify-center mr-4">
											<Ionicons name={service.icon || 'construct-outline'} size={24} color="#111827" />
										</View>
										<View className="flex-1">
											<Text className="text-xs font-semibold text-gray-500 uppercase mb-1">SERVICE</Text>
											<Text className="text-base font-bold text-gray-900">{service.name}</Text>
										</View>
									</View>
									<View className="h-px bg-gray-200 mb-4" />
									<View className="flex-row items-center">
										<View className="w-12 h-12 rounded-full bg-white items-center justify-center mr-4">
											<Ionicons name="calendar-outline" size={24} color="#111827" />
										</View>
										<View className="flex-1">
											<Text className="text-xs font-semibold text-gray-500 uppercase mb-1">DATE & TIME</Text>
											<Text className="text-base font-bold text-gray-900">{formatDateWithTime(date, time)}</Text>
										</View>
									</View>
								</View>
								<TouchableOpacity
									onPress={onConfirm}
									className="bg-gray-900 rounded-3xl py-5 px-6 items-center justify-center">
									<Text className="text-white font-bold text-lg uppercase">Book now</Text>
								</TouchableOpacity>
							</View>
						</ScrollView>
					</View>
				</TouchableWithoutFeedback>
			</View>
		</Modal>
	)
}
