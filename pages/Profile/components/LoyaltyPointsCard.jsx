import { Ionicons } from '@expo/vector-icons'
import { Text, View } from 'react-native'

export default function LoyaltyPointsCard({ loyaltyPoints }) {
	return (
		<View className="mx-4 mb-4 rounded-2xl overflow-hidden shadow-lg">
			<View className="bg-white p-6">
				<View className="flex-row items-center">
					<View className="w-20 h-20 rounded-full border-4 border-green-600 items-center justify-center mr-5">
						<Ionicons name="trophy" size={36} color="#10b981" />
					</View>
					<View className="flex-1">
						<Text className="text-gray-500 text-xs font-semibold uppercase mb-2">LOYALTY BALANCE</Text>
						<Text className="text-gray-900 text-4xl font-bold mb-2">
							{loyaltyPoints.totalPoints.toLocaleString()}
							<Text className="text-green-600 text-3xl font-bold"> pts</Text>
						</Text>
						<Text className="text-gray-400 text-sm">
							{loyaltyPoints.servicesUsed} Services used • {loyaltyPoints.clientsReferred} Clients referred
						</Text>
					</View>
				</View>
			</View>
		</View>
	)
}
