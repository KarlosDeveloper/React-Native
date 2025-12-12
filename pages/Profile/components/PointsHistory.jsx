import { Ionicons } from '@expo/vector-icons'
import { Text, TouchableOpacity, View } from 'react-native'

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

export default function PointsHistory({ transactions }) {
	return (
		<View className="bg-white rounded-2xl mx-4 mb-4 shadow-lg">
			<Text className="text-xl font-bold text-gray-900 px-6 pt-6 pb-4">History</Text>
			<View className="px-6">
				{transactions.map((transaction, index) => {
					const isEarned = transaction.type === 'earned'
					const bgColor = isEarned ? 'bg-green-100' : 'bg-red-100'
					const textColor = isEarned ? 'text-green-600' : 'text-red-600'

					const iconName = getServiceIcon(transaction.vendor)

					return (
						<View
							key={transaction.id}
							className={`flex-row items-center mb-4 pb-4 ${index < transactions.length - 1 ? 'border-b border-gray-100' : ''}`}>
							<View className={`w-10 h-10 rounded-full items-center justify-center mr-3 ${bgColor}`}>
								<Ionicons name={iconName} size={20} color={isEarned ? '#10b981' : '#ef4444'} />
							</View>
							<View className="flex-1">
								<Text className="text-gray-900 font-semibold">{transaction.vendor}</Text>
								<Text className="text-gray-500 text-xs mt-1">
									{transaction.date}, {transaction.time}
								</Text>
							</View>
							<Text className={`font-semibold ${textColor}`}>{formatPoints(transaction.points, transaction.type)}</Text>
						</View>
					)
				})}
			</View>
			<TouchableOpacity className="mx-6 mb-6 pt-4 border-t border-gray-100">
				<Text className="text-center text-green-600 font-semibold text-base">Show more</Text>
			</TouchableOpacity>
		</View>
	)
}
