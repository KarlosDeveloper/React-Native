import FilterPills from '@/components/FilterPills'
import BookingsLoyalModal from '@/components/Modal/BookingsLoyalModal'
import SearchBar from '@/components/SearchBar'
import { mockBookings } from '@/constants/bookings'
import { mockCustomer } from '@/constants/customer'
import { mockLoyaltyPoints, mockPointsHistory } from '@/constants/loyalty'
import { mockServicesCarousel } from '@/constants/services'
import BookingsList from '@/pages/Profile/components/BookingsList'
import CustomerHeader from '@/pages/Profile/components/CustomerHeader'
import LoyaltyPointsCard from '@/pages/Profile/components/LoyaltyPointsCard'
import OurServicesCarousel from '@/pages/Profile/components/OurServicesCarousel'
import StatusBadge from '@/pages/Profile/components/StatusBadge'
import { Ionicons } from '@expo/vector-icons'
import * as Notifications from 'expo-notifications'
import { useEffect, useMemo, useRef, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
	}),
})

function formatPoints(points, type) {
	const sign = type === 'earned' ? '+' : '-'
	return `${sign}${points.toLocaleString()} pts`
}

function getServiceIcon(vendor) {
	const vendorLower = vendor.toLowerCase()
	if (vendorLower.includes('massage')) return 'body'
	if (vendorLower.includes('sauna')) return 'flame'
	if (vendorLower.includes('cryo')) return 'snow'
	if (vendorLower.includes('haircut')) return 'cut'
	if (vendorLower.includes('nail')) return 'hand-left'
	return 'construct'
}

export default function Profile() {
	const [modalType, setModalType] = useState(null)
	const notificationListener = useRef()
	const responseListener = useRef()
	const [bookingsSearch, setBookingsSearch] = useState('')
	const [bookingsFilter, setBookingsFilter] = useState('all')
	const [pointsSearch, setPointsSearch] = useState('')
	const [pointsFilter, setPointsFilter] = useState('all')

	const bookingsFilters = [
		{ label: 'All', value: 'all' },
		{ label: 'Upcoming', value: 'upcoming' },
		{ label: 'Past', value: 'past' },
		{ label: 'Cancelled', value: 'cancelled' },
	]

	const pointsFilters = [
		{ label: 'All', value: 'all' },
		{ label: 'Earned', value: 'earned' },
		{ label: 'Spent', value: 'spent' },
	]

	useEffect(() => {
		Notifications.requestPermissionsAsync()

		notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
			console.log('Notification received:', notification)
		})

		responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
			console.log('Notification response:', response)
		})

		return () => {
			Notifications.removeNotificationSubscription(notificationListener.current)
			Notifications.removeNotificationSubscription(responseListener.current)
		}
	}, [])

	const handleSeeAllPointsPress = () => {
		setModalType('points')
	}

	const handleSeeMoreBookingsPress = () => {
		setModalType('bookings')
	}

	const handleTestNotification = async () => {
		try {
			await Notifications.scheduleNotificationAsync({
				content: {
					title: 'Booking Reminder',
					body: 'Your booking is upcoming tomorrow, please confirm',
					sound: true,
					data: { type: 'booking_reminder' },
				},
				trigger: null,
			})
		} catch (error) {
			console.error('Error scheduling notification:', error)
		}
	}

	const filteredBookings = useMemo(() => {
		let filtered = [...mockBookings]

		if (bookingsFilter === 'upcoming') {
			filtered = filtered.filter(b => b.status === 'Confirmed')
		} else if (bookingsFilter === 'past') {
			filtered = filtered.filter(b => b.status === 'Completed')
		} else if (bookingsFilter === 'cancelled') {
			filtered = filtered.filter(b => b.status === 'Cancelled')
		}

		if (bookingsSearch.trim()) {
			const searchLower = bookingsSearch.toLowerCase()
			filtered = filtered.filter(
				b =>
					b.serviceName.toLowerCase().includes(searchLower) ||
					b.date.toLowerCase().includes(searchLower) ||
					b.status.toLowerCase().includes(searchLower)
			)
		}

		return filtered
	}, [bookingsSearch, bookingsFilter])

	const filteredPoints = useMemo(() => {
		let filtered = [...mockPointsHistory]

		if (pointsFilter === 'earned') {
			filtered = filtered.filter(t => t.type === 'earned')
		} else if (pointsFilter === 'spent') {
			filtered = filtered.filter(t => t.type === 'spent')
		}

		if (pointsSearch.trim()) {
			const searchLower = pointsSearch.toLowerCase()
			filtered = filtered.filter(
				t =>
					t.vendor.toLowerCase().includes(searchLower) ||
					t.date.toLowerCase().includes(searchLower) ||
					t.time.toLowerCase().includes(searchLower)
			)
		}

		return filtered
	}, [pointsSearch, pointsFilter])

	const handleCloseModal = () => {
		setModalType(null)
		setBookingsSearch('')
		setBookingsFilter('all')
		setPointsSearch('')
		setPointsFilter('all')
	}

	return (
		<SafeAreaView className="flex-1 bg-gray-100">
			<ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
				<CustomerHeader customer={mockCustomer} />
				<View className="mt-[-20]">
					<LoyaltyPointsCard loyaltyPoints={mockLoyaltyPoints} onSeeAllPress={handleSeeAllPointsPress} />
					<OurServicesCarousel services={mockServicesCarousel} />
					<BookingsList bookings={mockBookings} onSeeMorePress={handleSeeMoreBookingsPress} />
				</View>
				<View className="px-4 pb-6 pt-4">
					<TouchableOpacity
						onPress={handleTestNotification}
						className="bg-green-600 rounded-2xl py-4 px-6 flex-row items-center justify-center shadow-lg"
						style={{
							shadowColor: '#3b82f6',
							shadowOffset: { width: 0, height: 4 },
							shadowOpacity: 0.3,
							shadowRadius: 8,
							elevation: 8,
						}}>
						<Ionicons name="notifications-outline" size={24} color="#ffffff" />
						<Text className="text-white font-bold text-lg ml-2">Test Notification</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>

			{modalType === 'points' && (
				<BookingsLoyalModal
					visible={modalType === 'points'}
					title="Points History"
					subtitle="All your loyalty points transactions"
					icon="trophy"
					iconColor="#10b981"
					onClose={handleCloseModal}>
					<>
						<SearchBar
							value={pointsSearch}
							onChangeText={setPointsSearch}
							placeholder="Search transactions..."
							onClear={() => setPointsSearch('')}
							className="mb-4"
						/>

						<FilterPills
							filters={pointsFilters}
							activeFilter={pointsFilter}
							onFilterChange={setPointsFilter}
							className="mb-6"
						/>
						{filteredPoints.length > 0 ? (
							filteredPoints.map((transaction, index) => {
								const isEarned = transaction.type === 'earned'
								const bgColor = isEarned ? 'bg-green-100' : 'bg-red-100'
								const textColor = isEarned ? 'text-green-600' : 'text-red-600'
								const iconName = getServiceIcon(transaction.vendor)

								return (
									<View
										key={transaction.id}
										className={`flex-row items-center mb-4 pb-4 ${
											index < filteredPoints.length - 1 ? 'border-b border-gray-100' : ''
										}`}>
										<View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${bgColor}`}>
											<Ionicons name={iconName} size={20} color={isEarned ? '#10b981' : '#ef4444'} />
										</View>
										<View className="flex-1">
											<Text className="text-gray-900 font-semibold">{transaction.vendor}</Text>
											<Text className="text-gray-500 text-xs mt-1">
												{transaction.date}, {transaction.time}
											</Text>
										</View>
										<Text className={`font-semibold ${textColor}`}>
											{formatPoints(transaction.points, transaction.type)}
										</Text>
									</View>
								)
							})
						) : (
							<View className="items-center justify-center py-12">
								<Ionicons name="search-outline" size={48} color="#d1d5db" />
								<Text className="text-gray-400 text-lg mt-4">No transactions found</Text>
							</View>
						)}
					</>
				</BookingsLoyalModal>
			)}

			{modalType === 'bookings' && (
				<BookingsLoyalModal
					visible={modalType === 'bookings'}
					title="Recent Bookings"
					subtitle="All your booking history"
					icon="calendar-outline"
					iconColor="#3b82f6"
					onClose={handleCloseModal}>
					<>
						<SearchBar
							value={bookingsSearch}
							onChangeText={setBookingsSearch}
							placeholder="Search bookings..."
							onClear={() => setBookingsSearch('')}
							className="mb-4"
						/>

						<FilterPills
							filters={bookingsFilters}
							activeFilter={bookingsFilter}
							onFilterChange={setBookingsFilter}
							className="mb-6"
						/>
						{filteredBookings.length > 0 ? (
							filteredBookings.map((booking, index) => {
								return (
									<View
										key={booking.id}
										className={`mb-4 pb-4 ${index < filteredBookings.length - 1 ? 'border-b border-gray-100' : ''}`}>
										<View className="flex-row items-start justify-between">
											<View className="flex-row items-center flex-1">
												<View className="w-10 h-10 rounded-lg border-2 border-blue-200 items-center justify-center mr-3 bg-blue-50">
													<Ionicons name="calendar-outline" size={20} color="#3b82f6" />
												</View>
												<View className="flex-1">
													<Text className="text-gray-500 text-sm mb-1">{booking.date}</Text>
													<Text className="text-gray-900 font-semibold text-base">{booking.serviceName}</Text>
												</View>
											</View>
											<StatusBadge status={booking.status} />
										</View>
									</View>
								)
							})
						) : (
							<View className="items-center justify-center py-12">
								<Ionicons name="search-outline" size={48} color="#d1d5db" />
								<Text className="text-gray-400 text-lg mt-4">No bookings found</Text>
							</View>
						)}
					</>
				</BookingsLoyalModal>
			)}
		</SafeAreaView>
	)
}
