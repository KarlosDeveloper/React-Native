import { Ionicons } from '@expo/vector-icons'
import { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default function ServiceDropdown({ services, selectedService, onSelectService }) {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<View className="bg-white px-4 pt-6 pb-6">
			<Text className="text-xl font-bold text-gray-900 mb-4">Select Service</Text>
			<TouchableOpacity
				onPress={() => setIsOpen(!isOpen)}
				className="flex-row items-center justify-between rounded-3xl px-5 py-4 bg-gray-50 border border-gray-200">
				<View className="flex-row items-center flex-1">
					{selectedService?.icon && (
						<Ionicons name={selectedService.icon} size={22} color="#10b981" className="mr-3" />
					)}
					<Text className="text-gray-900 font-semibold text-base">
						{selectedService ? selectedService.name : 'Choose a service'}
					</Text>
				</View>
				<Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={20} color="#111827" />
			</TouchableOpacity>

			{isOpen && (
				<View className="mt-3 rounded-3xl bg-white border border-gray-200 overflow-hidden">
					{services.map((service, index) => (
						<TouchableOpacity
							key={service.id}
							onPress={() => {
								onSelectService(service)
								setIsOpen(false)
							}}
							className={`flex-row items-center px-5 py-4 ${
								index !== services.length - 1 ? 'border-b border-gray-100' : ''
							} ${selectedService?.id === service.id ? 'bg-green-50' : ''}`}>
							{service.icon && (
								<Ionicons
									name={service.icon}
									size={22}
									color={selectedService?.id === service.id ? '#10b981' : '#6b7280'}
									className="mr-3"
								/>
							)}
							<Text
								className={`font-semibold text-base ${
									selectedService?.id === service.id ? 'text-green-600' : 'text-gray-900'
								}`}>
								{service.name}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			)}
		</View>
	)
}
