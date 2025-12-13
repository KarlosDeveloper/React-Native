import { Ionicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default function TimeSlots({ selectedDay, selectedSlot, selectedTime, onSelectSlot, onChangeTime }) {
	const [isExpanded, setIsExpanded] = useState(true)

	useEffect(() => {
		if (!selectedTime) {
			setIsExpanded(true)
		}
	}, [selectedTime, selectedDay])

	if (!selectedDay) {
		return (
			<View className="px-6 pt-6 pb-4">
				<View className="bg-white rounded-3xl p-8 items-center justify-center border border-gray-100">
					<View className="w-16 h-16 rounded-full bg-gray-100 items-center justify-center mb-4">
						<Ionicons name="time-outline" size={32} color="#9ca3af" />
					</View>
					<Text className="text-gray-500 text-base font-medium">Select a date to view available time slots</Text>
				</View>
			</View>
		)
	}

	const shouldShowList = isExpanded && !selectedTime

	const handleSlotSelect = (slotId, time) => {
		onSelectSlot(slotId, time)
		setIsExpanded(false)
	}

	const handleChangeTime = () => {
		onChangeTime()
		setIsExpanded(true)
	}

	return (
		<View className="px-6 pt-6 pb-4">
			<View className="mb-5">
				<Text className="text-2xl font-bold text-gray-900 mb-1">Step 3: Select Time</Text>
				<Text className="text-sm text-gray-500">Pick your preferred time slot</Text>
			</View>

			{selectedTime && (
				<View className="bg-white rounded-3xl px-6 py-5 border-2 border-green-200 shadow-lg mb-4">
					<View className="flex-row items-center justify-between">
						<View className="flex-row items-center flex-1">
							<View className="w-12 h-12 rounded-xl bg-green-600 items-center justify-center mr-4">
								<Ionicons name="time" size={24} color="#ffffff" />
							</View>
							<View>
								<Text className="text-xs font-semibold text-green-600 uppercase mb-1">Selected Time</Text>
								<Text className="text-xl font-bold text-gray-900">{selectedTime}</Text>
							</View>
						</View>
						<TouchableOpacity
							onPress={handleChangeTime}
							className="flex-row items-center rounded-xl px-4 py-2.5 bg-gray-100">
							<Ionicons name="pencil" size={16} color="#374151" />
							<Text className="text-gray-700 ml-2 font-semibold text-sm">Change</Text>
						</TouchableOpacity>
					</View>
				</View>
			)}

			{shouldShowList && (
				<View className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm">
					<Text className="text-sm font-semibold text-gray-500 mb-4 px-2">Available Times</Text>
					<View className="flex-row flex-wrap gap-3">
						{selectedDay.slots.map(slot => {
							const isSelected = selectedSlot === slot.id
							const isAvailable = slot.available

							return (
								<TouchableOpacity
									key={slot.id}
									onPress={() => {
										if (isAvailable) {
											handleSlotSelect(slot.id, slot.time)
										}
									}}
									disabled={!isAvailable}
									className={`w-[30%] min-w-[100px] rounded-2xl px-4 py-4 border-2 ${
										isSelected
											? 'bg-green-600 border-green-600 shadow-lg'
											: isAvailable
											? 'bg-white border-gray-200'
											: 'bg-gray-50 border-gray-200 opacity-50'
									}`}
									style={{
										transform: [{ scale: isSelected ? 1.05 : 1 }],
									}}>
									<Text
										className={`text-center font-bold text-base ${
											isSelected ? 'text-white' : isAvailable ? 'text-gray-900' : 'text-gray-400'
										}`}>
										{slot.time}
									</Text>
									{isSelected && (
										<View className="absolute top-1 right-1">
											<View className="w-5 h-5 rounded-full bg-white/30 items-center justify-center">
												<Ionicons name="checkmark" size={12} color="#ffffff" />
											</View>
										</View>
									)}
								</TouchableOpacity>
							)
						})}
					</View>
				</View>
			)}
		</View>
	)
}
