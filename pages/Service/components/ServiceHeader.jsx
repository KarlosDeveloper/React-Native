import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'

export default function ServiceHeader() {
	const router = useRouter()

	return (
		<View className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
			<TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
				<Ionicons name="arrow-back" size={24} color="#111827" />
			</TouchableOpacity>
			<Text className="text-lg font-semibold text-gray-900">Service Details</Text>
			<View style={{ width: 40 }} />
		</View>
	)
}
