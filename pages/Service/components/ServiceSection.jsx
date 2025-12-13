import { Ionicons } from '@expo/vector-icons'
import { Text, View } from 'react-native'

export default function ServiceSection({ icon, title, children, serviceName }) {
	const getTitle = () => {
		if (title) return title
		if (serviceName === 'Sports Massage') return 'What is a sports massage?'
		if (serviceName === 'Floatation Therapy') return 'What is floatation therapy?'
		if (serviceName === 'Assisted Stretching') {
			if (icon === 'star') return 'How will this benefit you?'
			if (icon === 'settings') return 'How does assisted stretching work?'
		}
		if (serviceName === 'Floatation Therapy') {
			if (icon === 'star') return 'What are the benefits of sensory deprivation tank?'
			if (icon === 'settings') return 'How does floatation chamber work?'
		}
		if (icon === 'star') return 'What are the benefits?'
		if (icon === 'settings') return 'How does it work?'
		if (icon === 'time') return 'When should you do this?'
		if (icon === 'people') return 'Who is it recommended for?'
		return 'Section'
	}

	return (
		<View className="bg-white rounded-3xl shadow-lg p-6 mb-4">
			<View className="flex-row items-center mb-4">
				<View className="w-10 h-10 rounded-lg items-center justify-center mr-3">
					<Ionicons name={icon} size={20} color="#10b981" />
				</View>
				<Text className="text-xl font-bold text-gray-900 flex-1">{getTitle()}</Text>
			</View>
			<View className="pl-13">{children}</View>
		</View>
	)
}
