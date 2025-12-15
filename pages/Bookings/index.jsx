import { mockServices } from '@/constants/services'
import { generateDaysWithSlots, generateTimeSlots } from '@/utils/timeSlots'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import BookingHeader from './components/BookingHeader'
import ConfirmBookingModal from './components/ConfirmBookingModal'
import DatePicker from './components/DatePicker'
import ServiceDropdown from './components/ServiceDropdown'
import TherapistCarousel from './components/TherapistCarousel'
import TimeSlots from './components/TimeSlots'

export default function Bookings() {
	const [selectedTherapist, setSelectedTherapist] = useState(null)
	const [selectedService, setSelectedService] = useState(null)
	const [selectedDate, setSelectedDate] = useState(null)
	const [selectedSlot, setSelectedSlot] = useState(null)
	const [selectedTime, setSelectedTime] = useState(null)
	const [showConfirmModal, setShowConfirmModal] = useState(false)

	const generateDaysUntilEndOfMonth = () => {
		const today = new Date()
		const currentMonth = today.getMonth()
		const currentYear = today.getFullYear()
		const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
		const todayDate = today.getDate()
		const daysCount = lastDayOfMonth - todayDate + 1
		return generateDaysWithSlots(daysCount)
	}

	const [daysWithSlots, setDaysWithSlots] = useState(() => generateDaysUntilEndOfMonth())

	useFocusEffect(
		useCallback(() => {
			setSelectedTherapist(null)
			setSelectedService(null)
			setSelectedDate(null)
			setSelectedSlot(null)
			setSelectedTime(null)
			setShowConfirmModal(false)
		}, [])
	)

	const handleSelectService = service => {
		setSelectedService(service)
		setSelectedSlot(null)
		setSelectedTime(null)
	}

	const handleSelectDate = date => {
		setSelectedDate(date)
		setSelectedSlot(null)
		setSelectedTime(null)
	}

	const formatDateString = date => {
		const year = date.getFullYear()
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const day = String(date.getDate()).padStart(2, '0')
		return `${year}-${month}-${day}`
	}

	const handleDateSelected = date => {
		const dateString = formatDateString(date)
		const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
		const existingIndex = daysWithSlots.findIndex(day => day.date === dateString)

		if (existingIndex === -1) {
			const selectedDateObj = new Date(date)
			const selectedMonth = selectedDateObj.getMonth()
			const selectedYear = selectedDateObj.getFullYear()
			const selectedDay = selectedDateObj.getDate()
			const lastDayOfSelectedMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate()
			const newDays = []

			for (let i = selectedDay; i <= lastDayOfSelectedMonth; i++) {
				const currentDay = new Date(selectedYear, selectedMonth, i)
				const currentDateString = formatDateString(currentDay)
				const dayExists = daysWithSlots.find(day => day.date === currentDateString)
				if (!dayExists) {
					newDays.push({
						date: currentDateString,
						dayName: dayNames[currentDay.getDay()],
						slots: generateTimeSlots(),
					})
				}
			}

			const updatedDays = [...daysWithSlots, ...newDays].sort(
				(a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
			)
			setDaysWithSlots(updatedDays)
			setSelectedDate(dateString)
		} else {
			setSelectedDate(dateString)
		}

		setSelectedSlot(null)
		setSelectedTime(null)
	}

	const handleSelectSlot = (slotId, time) => {
		setSelectedSlot(slotId)
		setSelectedTime(time)
	}

	const handleChangeTime = () => {
		setSelectedSlot(null)
		setSelectedTime(null)
	}

	const handleBookNow = () => {
		if (!selectedService || !selectedDate || !selectedSlot) return
		setShowConfirmModal(true)
	}

	const handleConfirmBooking = () => {
		if (!selectedService || !selectedDate || !selectedSlot || !selectedTime) return
		console.log('Booking confirmed:', {
			service: selectedService.name,
			date: selectedDate,
			slot: selectedSlot,
			time: selectedTime,
		})
		setShowConfirmModal(false)
		setSelectedTherapist(null)
		setSelectedService(null)
		setSelectedDate(null)
		setSelectedSlot(null)
		setSelectedTime(null)
	}

	const handleCloseModal = () => {
		setShowConfirmModal(false)
	}

	const selectedDay = selectedDate ? daysWithSlots.find(day => day.date === selectedDate) || null : null

	const formatDate = dateString => {
		const date = new Date(dateString)
		const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
	}

	const getProgress = () => {
		let steps = 0
		if (selectedService) steps++
		if (selectedDate) steps++
		if (selectedSlot && selectedTime) steps++
		return steps
	}

	const progress = getProgress()

	return (
		<SafeAreaView className="flex-1 bg-gray-50">
			<View className="bg-white pt-4 pb-3 px-6 border-b border-gray-100">
				<Text className="text-3xl font-bold text-gray-900 mb-1">Book Appointment</Text>
				<Text className="text-base text-gray-500">Choose your service, date & time</Text>
				<View className="mt-6 flex-row items-center justify-center">
					{[1, 2, 3].map((step, index) => {
						const isCompleted = index < progress
						const isCurrent = index === progress
						return (
							<View key={step} className="flex-row items-center">
								<View
									className={`w-8 h-8 rounded-full items-center justify-center ${
										isCompleted ? 'bg-green-600' : isCurrent ? 'bg-green-100' : 'bg-gray-200'
									}`}>
									{isCompleted ? (
										<Text className="text-white font-bold text-sm">✓</Text>
									) : (
										<Text className={`font-bold text-sm ${isCurrent ? 'text-green-600' : 'text-gray-400'}`}>
											{step}
										</Text>
									)}
								</View>
								{index < 2 && <View className={`w-12 h-1 mx-2 ${isCompleted ? 'bg-green-600' : 'bg-gray-200'}`} />}
							</View>
						)
					})}
				</View>
			</View>
			<ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
				<TherapistCarousel selectedTherapist={selectedTherapist} onSelectTherapist={setSelectedTherapist} />
				<ServiceDropdown
					services={mockServices}
					selectedService={selectedService}
					onSelectService={handleSelectService}
				/>
				{selectedService && (
					<>
						<DatePicker
							days={daysWithSlots || []}
							selectedDate={selectedDate}
							onSelectDate={handleSelectDate}
							onDateSelected={handleDateSelected}
						/>
						<TimeSlots
							selectedDay={selectedDay}
							selectedSlot={selectedSlot}
							selectedTime={selectedTime}
							onSelectSlot={handleSelectSlot}
							onChangeTime={handleChangeTime}
						/>
					</>
				)}
				<BookingHeader
					serviceName={selectedService?.name || 'Select Service'}
					providerId={selectedService?.providerId}
					selectedTherapist={selectedTherapist}
					selectedDate={selectedDate ? formatDate(selectedDate) : undefined}
					selectedTime={selectedTime || undefined}
					onBookNow={handleBookNow}
				/>
			</ScrollView>
			<ConfirmBookingModal
				visible={showConfirmModal}
				service={selectedService}
				therapist={selectedTherapist}
				date={selectedDate}
				time={selectedTime}
				onClose={handleCloseModal}
				onConfirm={handleConfirmBooking}
			/>
		</SafeAreaView>
	)
}
