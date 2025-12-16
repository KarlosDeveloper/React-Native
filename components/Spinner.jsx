import { ActivityIndicator, View } from 'react-native'

export default function Spinner({ size = 'large', color = '#10b981', className = '' }) {
	return (
		<View className={`items-center justify-center ${className}`}>
			<ActivityIndicator size={size} color={color} />
		</View>
	)
}

