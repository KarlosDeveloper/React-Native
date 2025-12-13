import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default function ServiceDropdown({ services, selectedService, onSelectService }) {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<View className="px-6 pt-8 pb-4">
			<View className="mb-5">
				<Text className="text-2xl font-bold text-gray-900 mb-1">Step 1: Choose Service</Text>
				<Text className="text-sm text-gray-500">Select the service you'd like to book</Text>
			</View>

			{!selectedService ? (
				<View style={{ gap: 12 }}>
					{services.map(service => (
						<TouchableOpacity
							key={service.id}
							onPress={() => onSelectService(service)}
							className="bg-white rounded-3xl px-6 py-5 border-2 border-gray-100 shadow-sm">
							<View className="flex-row items-center">
								<View className="w-14 h-14 rounded-2xl bg-green-50 items-center justify-center mr-4">
									{service.icon && <Ionicons name={service.icon} size={26} color="#10b981" />}
								</View>
								<View className="flex-1">
									<Text className="text-lg font-bold text-gray-900 mb-1">{service.name}</Text>
									<Text className="text-sm text-gray-500">Tap to select</Text>
								</View>
								<Ionicons name="chevron-forward" size={20} color="#9ca3af" />
							</View>
						</TouchableOpacity>
					))}
				</View>
			) : (
				<View>
					<TouchableOpacity
						onPress={() => setIsOpen(!isOpen)}
						className="bg-white rounded-3xl px-6 py-5 border-2 border-green-200 shadow-lg">
						<View className="flex-row items-center">
							<View className="w-14 h-14 rounded-2xl bg-green-600 items-center justify-center mr-4">
								{selectedService.icon && <Ionicons name={selectedService.icon} size={26} color="#ffffff" />}
							</View>
							<View className="flex-1">
								<Text className="text-xs font-semibold text-green-600 uppercase mb-1">Selected Service</Text>
								<Text className="text-lg font-bold text-gray-900">{selectedService.name}</Text>
							</View>
							<TouchableOpacity
								onPress={() => {
									onSelectService(null)
									setIsOpen(false)
								}}
								className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center ml-2">
								<Ionicons name="close" size={18} color="#6b7280" />
							</TouchableOpacity>
						</View>
					</TouchableOpacity>

					{isOpen && (
						<View className="mt-3 bg-white rounded-3xl border-2 border-gray-100 overflow-hidden shadow-lg">
							{services
								.filter(s => s.id !== selectedService.id)
								.map((service, index) => (
									<TouchableOpacity
										key={service.id}
										onPress={() => {
											onSelectService(service)
											setIsOpen(false)
										}}
										className={`flex-row items-center px-6 py-4 ${
											index !== services.length - 2 ? 'border-b border-gray-100' : ''
										}`}>
										<View className="w-12 h-12 rounded-xl bg-gray-50 items-center justify-center mr-4">
											{service.icon && <Ionicons name={service.icon} size={22} color="#6b7280" />}
										</View>
										<Text className="font-semibold text-base text-gray-900 flex-1">{service.name}</Text>
										<Ionicons name="chevron-forward" size={18} color="#9ca3af" />
									</TouchableOpacity>
								))}
						</View>
					)}
				</View>
			)}
		</View>
	)
}
