import { Customer } from '@/constants/customer'
import { LoyaltyPoints } from '@/constants/loyalty'
import { Ionicons } from '@expo/vector-icons'
import { useMemo } from 'react'
import { Text, View } from 'react-native'
import Svg, { Circle } from 'react-native-svg'

interface LoyaltyPointsCardProps {
	loyaltyPoints: LoyaltyPoints
	customer: Customer
}

const NEXT_REWARD_THRESHOLD = 15000
const CIRCLE_SIZE = 90
const STROKE_WIDTH = 4
const CIRCLE_RADIUS = (CIRCLE_SIZE - STROKE_WIDTH) / 2
const CIRCLE_CENTER = CIRCLE_SIZE / 2
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS

export default function LoyaltyPointsCard({ loyaltyPoints, customer }: LoyaltyPointsCardProps) {
	const { progress, pointsToNextReward, strokeDashoffset } = useMemo(() => {
		const progressValue = Math.min((loyaltyPoints.totalPoints / NEXT_REWARD_THRESHOLD) * 100, 100)
		const pointsToNext = Math.max(NEXT_REWARD_THRESHOLD - loyaltyPoints.totalPoints, 0)
		const progressLength = (progressValue / 100) * CIRCLE_CIRCUMFERENCE
		const dashOffset = CIRCLE_CIRCUMFERENCE - progressLength

		return {
			progress: progressValue,
			pointsToNextReward: pointsToNext,
			strokeDashoffset: dashOffset,
		}
	}, [loyaltyPoints.totalPoints])

	return (
		<View className="mx-4 mb-4 rounded-2xl overflow-hidden shadow-2xl">
			<View className="bg-white p-6 relative overflow-hidden">
				<View className="absolute top-0 right-0 w-40 h-40 bg-green-600/5 rounded-full -mr-20 -mt-20" />
				<View className="absolute bottom-0 left-0 w-32 h-32 bg-green-700/5 rounded-full -ml-16 -mb-16" />
				<View className="relative z-10">
					<Text className="text-gray-900 text-base font-medium mb-6">Loyalty Balance</Text>
					<View className="flex-row items-center mb-6">
						<View className="w-24 h-24 mr-6 relative items-center justify-center transform rotate-90">
							<Svg width={CIRCLE_SIZE} height={CIRCLE_SIZE} className="absolute top-0 left-0">
								<Circle
									cx={CIRCLE_CENTER}
									cy={CIRCLE_CENTER}
									r={CIRCLE_RADIUS}
									stroke="#e5e7eb"
									strokeWidth={STROKE_WIDTH}
									fill="transparent"
								/>
								{progress > 0 && (
									<Circle
										cx={CIRCLE_CENTER}
										cy={CIRCLE_CENTER}
										r={CIRCLE_RADIUS}
										stroke="#10b981"
										strokeWidth={STROKE_WIDTH}
										fill="transparent"
										strokeDasharray={CIRCLE_CIRCUMFERENCE}
										strokeDashoffset={strokeDashoffset}
										strokeLinecap="round"
									/>
								)}
							</Svg>
							<Ionicons
								name="trophy"
								size={32}
								color="#10b981"
								className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform -rotate-90"
							/>
						</View>
						<View className="flex-1">
							<Text className="text-gray-900 text-4xl font-bold mb-1">
								{loyaltyPoints.totalPoints.toLocaleString()}
								<Text className="text-green-600 text-2xl font-semibold">pts</Text>
							</Text>
							<Text className="text-gray-600 text-sm">
								{pointsToNextReward.toLocaleString()} points till your next reward
							</Text>
						</View>
					</View>
					<View className="border-t border-dashed border-gray-200 pt-4">
						<View className="flex-row items-center justify-between">
							<Text className="text-gray-900 text-sm font-medium">{customer.name}</Text>
							<Text className="text-gray-500 text-sm">XXXX {customer.id.padStart(4, '0')}</Text>
						</View>
					</View>
				</View>
			</View>
		</View>
	)
}
