import { Text, View } from 'react-native'

export default function ServiceTitle({ name }) {
	return (
		<View className="bg-white rounded-3xl shadow-lg p-6 mb-6">
			<Text className="text-3xl font-bold text-gray-900 mb-2">{name}</Text>
			<View className="flex-row items-center mt-2">
				<View className="w-1 h-6 bg-green-600 rounded-full mr-3" />
				<Text className="text-gray-500 text-sm">Premium Service</Text>
			</View>
		</View>
	)
}
