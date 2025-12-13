import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { useMemo } from 'react'
import { Text, View } from 'react-native'

function formatPhoneNumber(number) {
	if (!number) return ''
	const cleaned = number.replace(/\D/g, '')
	if (cleaned.length === 9) {
		return `+48 ${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`
	}
	return number
}

export default function CustomerHeader({ customer }) {
	const formattedPhone = useMemo(() => formatPhoneNumber(customer.number), [customer.number])

	return (
		<View className="bg-gray-900 pb-8 pt-12 px-4 relative overflow-hidden">
			<Image
				source={require('@/assets/background.png')}
				contentFit="cover"
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					zIndex: 1,
				}}
			/>
			<View className="absolute inset-0 bg-gray-900/40" style={{ zIndex: 2 }} />
			<View className="items-center mb-4 relative" style={{ zIndex: 10 }}>
				<View className="w-24 h-24 rounded-full items-center justify-center mb-4 overflow-hidden bg-white">
					<Image
						source={require('@/assets/logo-reStart.png')}
						contentFit="contain"
						style={{ width: '100%', height: '100%' }}
					/>
				</View>
				<Text className="text-white text-2xl font-bold mb-3">{customer.name}</Text>
				<View className="flex-row items-center">
					<Ionicons name="call-outline" size={14} color="#9ca3af" />
					<Text className="text-gray-400 text-base ml-2">{formattedPhone}</Text>
				</View>
			</View>
		</View>
	)
}
