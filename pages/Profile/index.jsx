import { mockBookings } from '@/constants/bookings'
import { mockCustomer } from '@/constants/customer'
import { mockLoyaltyPoints, mockPointsHistory } from '@/constants/loyalty'
import BookingsList from '@/pages/Profile/components/BookingsList'
import CustomerHeader from '@/pages/Profile/components/CustomerHeader'
import LoyaltyPointsCard from '@/pages/Profile/components/LoyaltyPointsCard'
import PointsHistory from '@/pages/Profile/components/PointsHistory'
import { ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Profile() {
	return (
		<SafeAreaView className="flex-1 bg-gray-100">
			<ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
				<CustomerHeader customer={mockCustomer} />
				<View className="mt-[-20]">
					<LoyaltyPointsCard loyaltyPoints={mockLoyaltyPoints} customer={mockCustomer} />
					<BookingsList bookings={mockBookings} />
					<PointsHistory transactions={mockPointsHistory} />
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}
