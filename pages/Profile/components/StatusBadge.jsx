import { Text, View } from 'react-native'

const statusColors = {
	Confirmed: 'bg-green-700',
	Completed: 'bg-blue-700',
	Cancelled: 'bg-red-700',
}

export default function StatusBadge({ status }) {
	return (
		<View className={`px-4 py-1.5 rounded-full  ${statusColors[status]}`}>
			<Text className="text-white text-sm font-medium">{status}</Text>
		</View>
	)
}
