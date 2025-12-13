import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { useRef, useState } from 'react'
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native'

export default function OurServicesCarousel({ services }) {
	const router = useRouter()
	const scrollViewRef = useRef(null)
	const [activeIndex, setActiveIndex] = useState(0)
	const screenWidth = Dimensions.get('window').width
	const cardWidth = screenWidth - 42
	const displayedServices = services.slice(0, 3)

	const handleServicePress = serviceId => {
		router.push(`/service/${serviceId}`)
	}

	const handleScroll = event => {
		const scrollPosition = event.nativeEvent.contentOffset.x
		const index = Math.round(scrollPosition / cardWidth)
		setActiveIndex(index)
	}

	return (
		<View className="mb-4">
			<View className="flex-row items-center justify-between mb-4 px-6">
				<Text className="text-xl font-bold text-gray-900">Our Services</Text>
			</View>
			<View className="mx-6 overflow-hidden">
				<ScrollView
					ref={scrollViewRef}
					horizontal
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					onScroll={handleScroll}
					scrollEventThrottle={16}
					decelerationRate="fast"
					snapToInterval={cardWidth}
					snapToAlignment="start"
					contentContainerStyle={{ padding: 0 }}>
					{displayedServices.map((service, index) => (
						<TouchableOpacity
							key={service.id}
							onPress={() => handleServicePress(service.id)}
							className="overflow-hidden rounded-3xl"
							style={{ width: cardWidth }}>
							<View className="relative">
								{service.image ? (
									<>
										<Image
											source={typeof service.image === 'string' ? { uri: service.image } : service.image}
											contentFit="cover"
											style={{ width: cardWidth, height: 200 }}
										/>
										<View className="absolute inset-0 bg-black/40 rounded-3xl" />
									</>
								) : (
									<View className="w-full h-[200px] bg-gray-200 items-center justify-center">
										<Text className="text-gray-400">No image</Text>
									</View>
								)}
								<View className="absolute bottom-0 left-0 right-0 p-4 rounded-b-3xl">
									<Text className="text-white font-bold text-xl">{service.name}</Text>
								</View>
							</View>
						</TouchableOpacity>
					))}
				</ScrollView>
				<View className="flex-row items-center justify-center mt-4">
					{displayedServices.map((_, index) => (
						<View
							key={index}
							className={`rounded-full mr-2 ${activeIndex === index ? 'bg-green-600' : 'bg-gray-300'}`}
							style={{ width: 8, height: 8 }}
						/>
					))}
				</View>
			</View>
		</View>
	)
}
