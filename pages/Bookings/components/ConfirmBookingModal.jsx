import { Ionicons } from '@expo/vector-icons'
import { Modal, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

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
			<View className="flex-1 bg-black/70">
				<TouchableWithoutFeedback onPress={onClose}>
					<View className="absolute inset-0" />
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback onPress={() => {}}>
					<View
						className="flex-1 bg-white w-full"
						style={{
							paddingTop: insets.top + 16,
							borderTopLeftRadius: 32,
							borderTopRightRadius: 32,
						}}>
						<View className="px-6 pt-5 pb-6">
							<View className="flex-row items-center justify-between mb-2">
								<View className="flex-1">
									<View className="flex-row items-center mb-3">
										<View
											className="w-12 h-12 rounded-2xl bg-green-600 items-center justify-center mr-3 shadow-lg"
											style={{
												shadowColor: '#10b981',
												shadowOffset: { width: 0, height: 4 },
												shadowOpacity: 0.3,
												shadowRadius: 8,
												elevation: 8,
											}}>
											<Ionicons name="checkmark-circle" size={28} color="#ffffff" />
										</View>
										<Text className="text-3xl font-bold text-gray-900">Confirm Booking</Text>
									</View>
									<View style={{ paddingLeft: 60 }}>
										<Text className="text-base text-gray-500">Review your appointment details</Text>
									</View>
								</View>
								<TouchableOpacity
									onPress={onClose}
									className="w-11 h-11 rounded-full bg-gray-100 items-center justify-center ml-3"
									style={{
										shadowColor: '#000',
										shadowOffset: { width: 0, height: 2 },
										shadowOpacity: 0.1,
										shadowRadius: 4,
										elevation: 2,
									}}>
									<Ionicons name="close" size={24} color="#374151" />
								</TouchableOpacity>
							</View>
						</View>

						<View className="h-px bg-gray-100 mx-6 mb-2" />

						<ScrollView showsVerticalScrollIndicator={false} className="flex-1">
							<View className="px-6 pt-6 pb-8">
								<View
									className="bg-white rounded-3xl p-6 mb-6 border-2 border-green-200 shadow-xl"
									style={{
										shadowColor: '#10b981',
										shadowOffset: { width: 0, height: 8 },
										shadowOpacity: 0.15,
										shadowRadius: 16,
										elevation: 12,
									}}>
									<View className="absolute top-0 left-0 right-0 h-1.5 bg-green-600 rounded-t-3xl" />

									<View className="mt-2">
										<View className="flex-row items-start mb-6">
											<View
												className="w-16 h-16 rounded-2xl bg-green-600 items-center justify-center mr-4 shadow-lg"
												style={{
													shadowColor: '#10b981',
													shadowOffset: { width: 0, height: 6 },
													shadowOpacity: 0.4,
													shadowRadius: 12,
													elevation: 10,
												}}>
												<Ionicons name={service.icon || 'construct'} size={32} color="#ffffff" />
											</View>
											<View className="flex-1 pt-1">
												<Text className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">Service</Text>
												<Text className="text-xl font-bold text-gray-900 leading-tight">{service.name}</Text>
											</View>
										</View>

										<View className="h-0.5 bg-green-200 mb-6" />

										<View className="flex-row items-start mb-6">
											<View className="w-16 h-16 rounded-2xl bg-green-50 items-center justify-center mr-4 border-2 border-green-200">
												<Ionicons name="calendar" size={32} color="#10b981" />
											</View>
											<View className="flex-1 pt-1">
												<Text className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">
													Date & Time
												</Text>
												<Text className="text-xl font-bold text-gray-900 leading-tight">
													{formatDateWithTime(date, time)}
												</Text>
											</View>
										</View>

										{service.providerId && (
											<>
												<View className="h-0.5 bg-green-200 mb-6" />
												<View className="flex-row items-start">
													<View className="w-16 h-16 rounded-2xl bg-green-50 items-center justify-center mr-4 border-2 border-green-200">
														<Ionicons name="person" size={32} color="#10b981" />
													</View>
													<View className="flex-1 pt-1">
														<Text className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">
															Provider
														</Text>
														<Text className="text-xl font-bold text-gray-900 leading-tight">{service.providerId}</Text>
													</View>
												</View>
											</>
										)}
									</View>
								</View>

								<View className="bg-gray-50 rounded-3xl p-5 mb-6 border border-gray-200">
									<View className="flex-row items-center">
										<View className="w-10 h-10 rounded-xl bg-green-100 items-center justify-center mr-3">
											<Ionicons name="shield-checkmark" size={20} color="#10b981" />
										</View>
										<View className="flex-1">
											<Text className="text-sm font-bold text-gray-900 mb-1">Secure Booking</Text>
											<Text className="text-xs text-gray-600">Your appointment is confirmed and secure</Text>
										</View>
									</View>
								</View>

								<TouchableOpacity
									onPress={onConfirm}
									className="bg-gray-900 rounded-3xl py-6 px-6 items-center justify-center mb-4 shadow-2xl"
									style={{
										shadowColor: '#000',
										shadowOffset: { width: 0, height: 8 },
										shadowOpacity: 0.4,
										shadowRadius: 16,
										elevation: 12,
									}}>
									<View className="flex-row items-center">
										<Text className="text-white font-bold text-xl mr-3">Confirm Booking</Text>
										<View className="w-8 h-8 rounded-full bg-white/20 items-center justify-center">
											<Ionicons name="checkmark-circle" size={24} color="#ffffff" />
										</View>
									</View>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={onClose}
									className="bg-white rounded-3xl py-5 px-6 items-center justify-center border-2 border-gray-300 shadow-sm"
									style={{
										shadowColor: '#000',
										shadowOffset: { width: 0, height: 2 },
										shadowOpacity: 0.05,
										shadowRadius: 4,
										elevation: 2,
									}}>
									<Text className="text-gray-700 font-bold text-base">Cancel</Text>
								</TouchableOpacity>
							</View>
						</ScrollView>
					</View>
				</TouchableWithoutFeedback>
			</View>
		</Modal>
	)
}
