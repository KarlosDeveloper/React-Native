import { mockServicesCarousel } from '@/constants/services'
import RecommendedForList from '@/pages/Service/components/RecommendedForList'
import ServiceHeader from '@/pages/Service/components/ServiceHeader'
import ServiceImage from '@/pages/Service/components/ServiceImage'
import ServiceSection from '@/pages/Service/components/ServiceSection'
import ServiceTitle from '@/pages/Service/components/ServiceTitle'
import TechniqueCard from '@/pages/Service/components/TechniqueCard'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ServiceDetail({ serviceId }) {
	const service = mockServicesCarousel.find(s => s.id === serviceId)

	if (!service) {
		return (
			<SafeAreaView className="flex-1 bg-white">
				<View className="flex-1 items-center justify-center p-6">
					<Text className="text-gray-500 text-lg">Service not found</Text>
					<TouchableOpacity className="mt-4">
						<Text className="text-blue-600">Go back</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		)
	}

	return (
		<SafeAreaView className="flex-1 bg-gray-50">
			<View className="flex-1">
				<ServiceHeader />
				<ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
					<ServiceImage image={service.image} />
					<View className="px-6 py-6 -mt-8">
						<ServiceTitle name={service.name} />
						{service.description && typeof service.description === 'object' ? (
							<View>
								{service.description.whatIs && (
									<ServiceSection icon="information-circle" serviceName={service.name}>
										<Text className="text-base text-gray-600 leading-7">{service.description.whatIs}</Text>
									</ServiceSection>
								)}
								{service.description.benefits && (
									<ServiceSection icon="star" serviceName={service.name}>
										<Text className="text-base text-gray-600 leading-7">{service.description.benefits}</Text>
									</ServiceSection>
								)}
								{service.description.whenToDo && (
									<ServiceSection icon="time" serviceName={service.name}>
										<Text className="text-base text-gray-600 leading-7">{service.description.whenToDo}</Text>
									</ServiceSection>
								)}
								{service.description.howItWorks && (
									<ServiceSection icon="settings" serviceName={service.name}>
										{typeof service.description.howItWorks === 'string' ? (
											<Text className="text-base text-gray-600 leading-7">{service.description.howItWorks}</Text>
										) : (
											<>
												<Text className="text-base text-gray-600 leading-7 mb-4">
													{service.description.howItWorks.intro}
												</Text>
												{service.description.howItWorks.techniques && (
													<View>
														{service.description.howItWorks.techniques.map((technique, index) => (
															<TechniqueCard key={index} technique={technique} index={index} />
														))}
													</View>
												)}
											</>
										)}
									</ServiceSection>
								)}
								{service.description.recommendedFor && (
									<ServiceSection icon="people" serviceName={service.name}>
										<RecommendedForList items={service.description.recommendedFor} />
									</ServiceSection>
								)}
							</View>
						) : service.description ? (
							<View className="bg-white rounded-3xl shadow-lg p-6">
								<Text className="text-base text-gray-600 leading-7">{service.description}</Text>
							</View>
						) : null}
					</View>
				</ScrollView>
			</View>
		</SafeAreaView>
	)
}
