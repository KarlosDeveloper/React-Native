import { Ionicons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Dimensions, Modal, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'

export default function DatePicker({ days = [], selectedDate, onSelectDate, onDateSelected }) {
	const getCurrentIndex = () => {
		if (!days || days.length === 0) return 0
		if (selectedDate) {
			const index = days.findIndex(day => day.date === selectedDate)
			return index !== -1 ? index : 0
		}
		return 0
	}

	const [currentIndex, setCurrentIndex] = useState(() => getCurrentIndex())
	const [showDatePicker, setShowDatePicker] = useState(false)
	const [pickerDate, setPickerDate] = useState(new Date())
	const scrollViewRef = useRef(null)
	const dayPositions = useRef({})

	const scrollToSelectedDay = index => {
		const position = dayPositions.current[index]
		const screenWidth = Dimensions.get('window').width
		const cardWidth = 85

		if (position !== undefined && scrollViewRef.current) {
			const scrollPosition = Math.max(0, position - screenWidth / 2 + cardWidth / 2)
			scrollViewRef.current.scrollTo({
				x: scrollPosition,
				animated: true,
			})
		} else {
			const scrollPosition = Math.max(0, index * cardWidth - screenWidth / 2 + cardWidth / 2)
			scrollViewRef.current?.scrollTo({
				x: scrollPosition,
				animated: true,
			})
		}
	}

	useEffect(() => {
		if (selectedDate && days && days.length > 0) {
			const newIndex = days.findIndex(day => day.date === selectedDate)
			if (newIndex !== -1) {
				setCurrentIndex(newIndex)
				setTimeout(() => {
					scrollToSelectedDay(newIndex)
				}, 200)
			}
		}
	}, [selectedDate, days?.length])

	const formatDate = dateString => {
		const date = new Date(dateString)
		const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
	}

	const formatDateString = date => {
		const year = date.getFullYear()
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const day = String(date.getDate()).padStart(2, '0')
		return `${year}-${month}-${day}`
	}

	const handlePrevious = () => {
		if (!days || days.length === 0) return
		if (currentIndex > 0) {
			const newIndex = currentIndex - 1
			setCurrentIndex(newIndex)
			onSelectDate(days[newIndex].date)
		}
	}

	const handleNext = () => {
		if (!days || days.length === 0) return
		if (currentIndex < days.length - 1) {
			const newIndex = currentIndex + 1
			setCurrentIndex(newIndex)
			onSelectDate(days[newIndex].date)
		}
	}

	const handleDatePress = () => {
		const dateToShow = selectedDate
			? new Date(selectedDate)
			: days && days.length > 0 && days[currentIndex]
			? new Date(days[currentIndex].date)
			: new Date()
		setPickerDate(dateToShow)
		setShowDatePicker(true)
	}

	const handleDateChange = (event, selectedDate) => {
		if (Platform.OS === 'android') {
			setShowDatePicker(false)
		}

		if (selectedDate) {
			setPickerDate(selectedDate)
			if (Platform.OS === 'android') {
				handleDateConfirm(selectedDate)
			}
		}
	}

	const handleDateConfirm = date => {
		const dateString = formatDateString(date)
		onDateSelected(date)
		onSelectDate(dateString)

		if (Platform.OS === 'ios') {
			setShowDatePicker(false)
		}
	}

	const handleCancel = () => {
		setShowDatePicker(false)
	}

	const getCurrentDay = () => {
		if (!days || days.length === 0) return null
		if (selectedDate) {
			const foundDay = days.find(day => day.date === selectedDate)
			if (foundDay) return foundDay
		}
		return days[currentIndex] || days[0] || null
	}

	const getShortDayName = dayName => {
		const dayMap = {
			SUN: 'Sun',
			MON: 'Mon',
			TUE: 'Tue',
			WED: 'Wed',
			THU: 'Thu',
			FRI: 'Fri',
			SAT: 'Sat',
		}
		return dayMap[dayName] || dayName
	}

	const currentDay = getCurrentDay()

	const dayCards = useMemo(() => {
		if (!days || days.length === 0) return null

		const todayStr = formatDateString(new Date())
		return days.map((day, index) => {
					const isSelected = Boolean(selectedDate && day.date === selectedDate)
					const isToday = day.date === todayStr && !isSelected

			const backgroundColor = isSelected ? '#10b981' : isToday ? '#f0fdf4' : '#f9fafb'
			const borderColor = isSelected ? '#10b981' : isToday ? '#86efac' : '#e5e7eb'
			const borderWidth = isSelected ? 0 : isToday ? 2 : 1
			const textColor = isSelected ? '#ffffff' : isToday ? '#15803d' : '#6b7280'
			const numberColor = isSelected ? '#ffffff' : isToday ? '#15803d' : '#111827'

					return (
						<TouchableOpacity
							key={`day-${day.date}`}
							onLayout={event => {
								const { x } = event.nativeEvent.layout
								dayPositions.current[index] = x
							}}
							onPress={() => {
								setCurrentIndex(index)
								onSelectDate(day.date)
							}}
					className="mr-3 w-20 min-w-[80px] h-28 rounded-2xl items-center justify-center"
					style={{
						backgroundColor,
						borderColor,
						borderWidth,
						transform: [{ scale: isSelected ? 1.05 : 1 }],
						shadowColor: isSelected ? '#000' : 'transparent',
						shadowOffset: isSelected ? { width: 0, height: 4 } : { width: 0, height: 0 },
						shadowOpacity: isSelected ? 0.3 : 0,
						shadowRadius: isSelected ? 8 : 0,
						elevation: isSelected ? 8 : 0,
					}}>
							{isSelected && (
								<View className="absolute top-2 right-2">
							<View
								className="w-5 h-5 rounded-full items-center justify-center"
								style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
								<Ionicons name="checkmark" size={12} color="#ffffff" />
							</View>
								</View>
							)}
					<Text className="text-xs font-bold mb-1" style={{ color: textColor }}>
								{getShortDayName(day.dayName)}
							</Text>
					<Text className="text-2xl font-bold mb-1" style={{ color: numberColor }}>
								{day.date.split('-')[2]}
							</Text>
					{isToday && !isSelected && (
						<View className="w-1.5 h-1.5 rounded-full mt-1" style={{ backgroundColor: '#10b981' }} />
					)}
						</TouchableOpacity>
					)
		})
	}, [days, selectedDate, onSelectDate, formatDateString, getShortDayName])

	return (
		<View className="px-6 pt-6 pb-4">
			<View className="mb-5">
				<Text className="text-2xl font-bold text-gray-900 mb-1">Step 2: Pick a Date</Text>
				<Text className="text-sm text-gray-500">Choose your preferred appointment date</Text>
			</View>

			<View className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100">
				{!days || days.length === 0 ? (
					<View className="py-8 items-center">
						<Text className="text-gray-500 text-base">No dates available</Text>
					</View>
				) : (
					<ScrollView
						ref={scrollViewRef}
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={{ paddingRight: 16, paddingLeft: 4 }}>
						{dayCards}
			</ScrollView>
				)}
			</View>

			<TouchableOpacity
				onPress={handleDatePress}
				className="mt-4 flex-row items-center justify-center rounded-2xl px-5 py-3.5 bg-white border-2 border-gray-200 shadow-sm">
				<Ionicons name="calendar-outline" size={20} color="#10b981" />
				<Text className="text-gray-900 ml-2 font-semibold text-base">
					{selectedDate
						? formatDate(selectedDate)
						: currentDay && currentDay.date
						? formatDate(currentDay.date)
						: 'Browse Calendar'}
				</Text>
			</TouchableOpacity>

			{Platform.OS === 'ios' && showDatePicker && (
				<Modal transparent visible={showDatePicker} animationType="slide">
					<View className="flex-1 justify-end bg-black/50">
						<View className="bg-white rounded-t-3xl p-6 pb-8">
							<View className="flex-row justify-between items-center mb-6">
								<TouchableOpacity onPress={handleCancel} className="px-4 py-2">
									<Text className="text-gray-600 text-base font-medium">Cancel</Text>
								</TouchableOpacity>
								<Text className="text-gray-900 text-xl font-bold">Select Date</Text>
								<TouchableOpacity
									onPress={() => handleDateConfirm(pickerDate)}
									className="px-4 py-2 bg-green-600 rounded-lg">
									<Text className="text-white text-base font-semibold">Done</Text>
								</TouchableOpacity>
							</View>
							<View className="bg-white rounded-xl overflow-hidden">
								<DateTimePicker
									value={pickerDate}
									mode="date"
									display="inline"
									onChange={handleDateChange}
									minimumDate={new Date()}
									textColor="#111827"
									accentColor="#10b981"
									themeVariant="light"
								/>
							</View>
						</View>
					</View>
				</Modal>
			)}

			{Platform.OS === 'android' && showDatePicker && (
				<DateTimePicker
					value={pickerDate}
					mode="date"
					display="default"
					onChange={handleDateChange}
					minimumDate={new Date()}
				/>
			)}
		</View>
	)
}
