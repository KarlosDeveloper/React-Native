import { mockServices, Service } from '@/constants/services'
import { DayTimeSlots, generateDaysWithSlots, generateTimeSlots } from '@/utils/timeSlots'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import BookingHeader from './components/BookingHeader'
import ConfirmBookingModal from './components/ConfirmBookingModal'
import DatePicker from './components/DatePicker'
import ServiceDropdown from './components/ServiceDropdown'
import TimeSlots from './components/TimeSlots'

export default function Bookings() {
	const [selectedService, setSelectedService] = useState<Service | null>(null)
	const [selectedDate, setSelectedDate] = useState<string | null>(null)
	const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
	const [selectedTime, setSelectedTime] = useState<string | null>(null)
	const [showConfirmModal, setShowConfirmModal] = useState(false)

	const generateDaysUntilEndOfMonth = (): DayTimeSlots[] => {
		const today = new Date()
		const currentMonth = today.getMonth()
		const currentYear = today.getFullYear()
		const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
		const todayDate = today.getDate()
		const daysCount = lastDayOfMonth - todayDate + 1
		return generateDaysWithSlots(daysCount)
	}

	const [daysWithSlots, setDaysWithSlots] = useState<DayTimeSlots[]>(() => generateDaysUntilEndOfMonth())

	useFocusEffect(
		useCallback(() => {
			return () => {
				setSelectedService(null)
				setSelectedDate(null)
				setSelectedSlot(null)
				setSelectedTime(null)
			}
		}, [])
	)

	const handleSelectService = (service: Service) => {
		setSelectedService(service)
		setSelectedSlot(null)
		setSelectedTime(null)
	}

	const handleSelectDate = (date: string) => {
		setSelectedDate(date)
		setSelectedSlot(null)
		setSelectedTime(null)
	}

	const formatDateString = (date: Date): string => {
		const year = date.getFullYear()
		const month = String(date.getMonth() + 1).padStart(2, '0')
		const day = String(date.getDate()).padStart(2, '0')
		return `${year}-${month}-${day}`
	}

	const handleDateSelected = (date: Date) => {
		const dateString = formatDateString(date)
		const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
		const existingIndex = daysWithSlots.findIndex(day => day.date === dateString)

		if (existingIndex === -1) {
			const selectedDateObj = new Date(date)
			const selectedMonth = selectedDateObj.getMonth()
			const selectedYear = selectedDateObj.getFullYear()
			const selectedDay = selectedDateObj.getDate()
			const lastDayOfSelectedMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate()
			const newDays: DayTimeSlots[] = []

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

	const handleSelectSlot = (slotId: string, time: string) => {
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
		setSelectedService(null)
		setSelectedDate(null)
		setSelectedSlot(null)
		setSelectedTime(null)
	}

	const handleCloseModal = () => {
		setShowConfirmModal(false)
	}

	const selectedDay = selectedDate ? daysWithSlots.find(day => day.date === selectedDate) || null : null

	const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
		return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
	}

	return (
		<SafeAreaView className="flex-1 bg-white">
			<ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
				<ServiceDropdown
					services={mockServices}
					selectedService={selectedService}
					onSelectService={handleSelectService}
				/>
				<DatePicker
					days={daysWithSlots}
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
				<BookingHeader
					serviceName={selectedService?.name || 'Select Service'}
					providerId={selectedService?.providerId}
					selectedDate={selectedDate ? formatDate(selectedDate) : undefined}
					selectedTime={selectedTime || undefined}
					onBookNow={handleBookNow}
				/>
			</ScrollView>
			<ConfirmBookingModal
				visible={showConfirmModal}
				service={selectedService}
				date={selectedDate}
				time={selectedTime}
				onClose={handleCloseModal}
				onConfirm={handleConfirmBooking}
			/>
		</SafeAreaView>
	)
}
