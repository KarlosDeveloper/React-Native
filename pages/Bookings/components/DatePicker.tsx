import { DayTimeSlots } from '@/utils/timeSlots'
import { Ionicons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useEffect, useRef, useState } from 'react'
import { Dimensions, Modal, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'

interface DatePickerProps {
	days: DayTimeSlots[]
	selectedDate: string | null
	onSelectDate: (date: string) => void
	onDateSelected: (date: Date) => void
}

export default function DatePicker({ days, selectedDate, onSelectDate, onDateSelected }: DatePickerProps) {
	const getCurrentIndex = () => {
		if (selectedDate) {
			const index = days.findIndex(day => day.date === selectedDate)
			return index !== -1 ? index : 0
		}
		return 0
	}

	const [currentIndex, setCurrentIndex] = useState(getCurrentIndex())
	const [showDatePicker, setShowDatePicker] = useState(false)
	const [pickerDate, setPickerDate] = useState(new Date())
	const scrollViewRef = useRef<ScrollView>(null)
	const dayPositions = useRef<{ [key: number]: number }>({})

	const scrollToSelectedDay = (index: number) => {
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
		if (selectedDate && days.length > 0) {
			const newIndex = days.findIndex(day => day.date === selectedDate)
			if (newIndex !== -1) {
				setCurrentIndex(newIndex)
				setTimeout(() => {
					scrollToSelectedDay(newIndex)
				}, 200)
			}
		}
	}, [selectedDate, days.length])

	const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
	}

	const formatDateString = (date: Date): string => {
		const year = date.getFullYear()
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const day = String(date.getDate()).padStart(2, '0')
		return `${year}-${month}-${day}`
	}

	const handlePrevious = () => {
		if (currentIndex > 0) {
			const newIndex = currentIndex - 1
			setCurrentIndex(newIndex)
			onSelectDate(days[newIndex].date)
		}
	}

	const handleNext = () => {
		if (currentIndex < days.length - 1) {
			const newIndex = currentIndex + 1
			setCurrentIndex(newIndex)
			onSelectDate(days[newIndex].date)
		}
	}

	const handleDatePress = () => {
		const dateToShow = selectedDate ? new Date(selectedDate) : new Date(days[currentIndex]?.date || new Date())
		setPickerDate(dateToShow)
		setShowDatePicker(true)
	}

	const handleDateChange = (event: any, selectedDate?: Date) => {
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

	const handleDateConfirm = (date: Date) => {
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
		if (selectedDate) {
			const foundDay = days.find(day => day.date === selectedDate)
			if (foundDay) return foundDay
		}
		return days[currentIndex] || days[0]
	}

	const getShortDayName = (dayName: string) => {
		const dayMap: { [key: string]: string } = {
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

	return (
		<View className="bg-white px-4 pt-6 pb-6">
			<Text className="text-xl font-bold text-gray-900 mb-5">Choose date</Text>

			<ScrollView
				ref={scrollViewRef}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingRight: 16 }}>
				{days.map((day, index) => {
					const isSelected = Boolean(selectedDate && day.date === selectedDate)
					const todayStr = formatDateString(new Date())
					const isToday = day.date === todayStr && !isSelected

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
							className={`mr-3 w-20 min-w-[80px] h-24 rounded-3xl items-center justify-center ${
								isSelected ? 'bg-green-600' : isToday ? 'bg-gray-100' : 'bg-white border border-gray-200'
							}`}>
							{isSelected && (
								<View className="absolute top-2 right-2">
									<Ionicons name="time-outline" size={14} color="#ffffff" />
								</View>
							)}
							<Text
								className={`text-xs font-bold mb-1 ${
									isSelected ? 'text-white' : isToday ? 'text-gray-900' : 'text-gray-500'
								}`}>
								{getShortDayName(day.dayName)}
							</Text>
							<Text
								className={`text-xl font-bold ${
									isSelected ? 'text-white' : isToday ? 'text-gray-900' : 'text-gray-900'
								}`}>
								{day.date.split('-')[2]}
							</Text>
						</TouchableOpacity>
					)
				})}
			</ScrollView>

			<TouchableOpacity
				onPress={handleDatePress}
				className="mt-4 flex-row items-center justify-center rounded-3xl px-5 py-3 bg-gray-50 border border-gray-200">
				<Ionicons name="calendar-outline" size={18} color="#111827" />
				<Text className="text-gray-900 ml-2 font-semibold text-sm">
					{selectedDate ? formatDate(selectedDate) : currentDay ? formatDate(currentDay.date) : 'Open calendar'}
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
