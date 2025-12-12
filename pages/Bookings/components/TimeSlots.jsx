import { Ionicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default function TimeSlots({
	selectedDay,
	selectedSlot,
	selectedTime,
	onSelectSlot,
	onChangeTime,
}) {
	const [isExpanded, setIsExpanded] = useState(true)

	useEffect(() => {
		if (!selectedTime) {
			setIsExpanded(true)
		}
	}, [selectedTime, selectedDay])

	if (!selectedDay) {
		return (
			<View className="bg-white items-center justify-center p-8 border-b border-gray-200">
				<Text className="text-gray-500">Select a date to view available time slots</Text>
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
		<View className="bg-white">
			<View className="px-4 pt-6 pb-5">
				<Text className="text-xl font-bold text-gray-900 mb-4">Choose time</Text>
				{selectedTime && (
					<View className="flex-row items-center justify-between rounded-3xl px-5 py-4 bg-gray-50 border border-gray-200 mb-4">
						<View className="flex-row items-center flex-1">
							<Ionicons name="time-outline" size={18} color="#111827" />
							<Text className="text-gray-900 ml-3 font-bold text-base">{selectedTime}</Text>
						</View>
						<TouchableOpacity
							onPress={handleChangeTime}
							className="flex-row items-center rounded-2xl px-4 py-2 bg-white border border-gray-300">
							<Ionicons name="pencil-outline" size={16} color="#111827" />
							<Text className="text-gray-900 ml-2 font-semibold text-sm">Change</Text>
						</TouchableOpacity>
					</View>
				)}
			</View>
			{shouldShowList && (
				<View className="px-4 pb-6">
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
									className={`w-[30%] min-w-[100px] rounded-3xl px-5 py-4 border ${
										isSelected
											? 'bg-green-600 border-green-600'
											: isAvailable
												? 'bg-white border-gray-200'
												: 'bg-gray-50 border-gray-200 opacity-50'
									}`}>
									<Text
										className={`text-center font-bold text-base ${
											isSelected ? 'text-white' : isAvailable ? 'text-gray-900' : 'text-gray-400'
										}`}>
										{slot.time}
									</Text>
								</TouchableOpacity>
							)
						})}
					</View>
				</View>
			)}
		</View>
	)
}
