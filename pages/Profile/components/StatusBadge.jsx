import { Text, View } from 'react-native'

const statusColors = {
	Confirmed: 'bg-green-600',
	Completed: 'bg-blue-600',
	Cancelled: 'bg-red-600',
}

export default function StatusBadge({ status }) {
	return (
		<View className={`px-3 py-1 rounded-full ${statusColors[status]}`}>
			<Text className="text-white text-xs font-semibold">{status}</Text>
		</View>
	)
}
