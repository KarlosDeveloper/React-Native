import { Text, View } from 'react-native'

export default function TechniqueCard({ technique, index }) {
	return (
		<View className="mb-4 bg-gray-50 rounded-2xl p-4">
			<View className="flex-row items-start">
				<View className="w-6 h-6 rounded-full bg-green-600 items-center justify-center mr-3 mt-0.5">
					<Text className="text-white text-xs font-bold">{index + 1}</Text>
				</View>
				<View className="flex-1">
					<Text className="text-base text-gray-900 font-bold mb-1">{technique.name}</Text>
					<Text className="text-sm text-gray-600 leading-6">{technique.description}</Text>
				</View>
			</View>
		</View>
	)
}
