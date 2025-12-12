import { Image } from 'expo-image'
import { useMemo } from 'react'
import { Text, View } from 'react-native'

function getInitials(name) {
	return name
		.split(' ')
		.map(n => n[0])
		.join('')
		.toUpperCase()
}

export default function CustomerHeader({ customer }) {
	const initials = useMemo(() => getInitials(customer.name), [customer.name])

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
					opacity: 0.5,
					zIndex: 1,
				}}
			/>
			<View className="absolute inset-0 bg-gray-900/40" style={{ zIndex: 2 }} />
			<View className="items-center mb-4 relative" style={{ zIndex: 10 }}>
				<View className="w-24 h-24 rounded-full bg-green-600 items-center justify-center mb-3">
					<Text className="text-white text-2xl font-bold">{initials}</Text>
				</View>
				<Text className="text-white text-2xl font-bold mb-1">{customer.name}</Text>
				<Text className="text-gray-300 text-sm">{customer.role}</Text>
				<View className="flex-row items-center mt-1">
					<Text className="text-gray-400 text-xs">📍 {customer.location}</Text>
				</View>
			</View>
		</View>
	)
}
