import { Text, View } from 'react-native'

export default function RecommendedForList({ items }) {
	return (
		<View>
			{items.map((item, index) => (
				<View key={index} className="mb-3 flex-row items-start">
					<View className="w-2 h-2 rounded-full bg-green-600 mr-3 mt-2" />
					<Text className="text-base text-gray-600 leading-7 flex-1">{item}</Text>
				</View>
			))}
		</View>
	)
}
