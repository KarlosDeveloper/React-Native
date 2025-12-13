import { Image } from 'expo-image'
import { Text, View } from 'react-native'

export default function ServiceImage({ image }) {
	return (
		<View className="relative">
			{image ? (
				<>
					<Image
						source={typeof image === 'string' ? { uri: image } : image}
						contentFit="cover"
						style={{ width: '100%', height: 350 }}
					/>
					<View className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent" />
				</>
			) : (
				<View className="w-full h-[350px] bg-gray-200 items-center justify-center">
					<Text className="text-gray-400">No image</Text>
				</View>
			)}
		</View>
	)
}
