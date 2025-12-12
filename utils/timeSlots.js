function formatTime(hour) {
	if (hour === 0) return '12:00 AM'
	if (hour < 12) return `${hour}:00 AM`
	if (hour === 12) return '12:00 PM'
	return `${hour - 12}:00 PM`
}

function formatDateString(date) {
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = String(date.getDate()).padStart(2, '0')
	return `${year}-${month}-${day}`
}

export function generateTimeSlots() {
	const slots = []
	const startHour = 8
	const endHour = 16

	for (let hour = startHour; hour <= endHour; hour++) {
		const timeString = formatTime(hour)
		slots.push({
			id: `slot-${hour}`,
			time: timeString,
			available: true,
		})
	}

	return slots
}

export function generateDaysWithSlots(daysCount = 7) {
	const days = []
	const today = new Date()
	const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

	for (let i = 0; i < daysCount; i++) {
		const date = new Date(today)
		date.setDate(today.getDate() + i)
		const dateString = formatDateString(date)
		const dayName = dayNames[date.getDay()]

		days.push({
			date: dateString,
			dayName: dayName,
			slots: generateTimeSlots(),
		})
	}

	return days
}
