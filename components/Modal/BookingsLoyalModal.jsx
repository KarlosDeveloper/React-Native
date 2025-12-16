import { Ionicons } from '@expo/vector-icons'
import { Modal, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function BookingsLoyalModal({
	visible,
	title,
	subtitle,
	icon,
	iconColor = '#10b981',
	onClose,
	children,
}) {
	const insets = useSafeAreaInsets()

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
						<View className="px-6 pt-3">
							<View className="flex-row items-center justify-between mb-2">
								<View className="flex-1">
									<View className="flex-row items-center">
										<View
											className="w-12 h-12 rounded-2xl items-center justify-center mr-3 shadow-lg"
											style={{
												backgroundColor: iconColor,
												shadowColor: iconColor,
												shadowOffset: { width: 0, height: 4 },
												shadowOpacity: 0.3,
												shadowRadius: 8,
												elevation: 8,
											}}>
											<Ionicons name={icon} size={28} color="#ffffff" />
										</View>
										<View className="flex-1">
											<Text className="text-3xl font-bold text-gray-900">{title}</Text>
											{subtitle && (
												<View style={{ paddingLeft: 0 }}>
													<Text className="text-base text-gray-500">{subtitle}</Text>
												</View>
											)}
										</View>
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
							<View className="px-6 pt-2 pb-8">{children}</View>
						</ScrollView>
					</View>
				</TouchableWithoutFeedback>
			</View>
		</Modal>
	)
}
