import { therapists } from '@/constants/therapists'
import { Image } from 'expo-image'
import { useRef, useState } from 'react'
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native'

export default function TherapistCarousel({ selectedTherapist, onSelectTherapist }) {
	const scrollViewRef = useRef(null)
	const [activeIndex, setActiveIndex] = useState(0)
	const screenWidth = Dimensions.get('window').width
	const cardWidth = 100
	const spacing = 12

	const handleScroll = event => {
		const scrollPosition = event.nativeEvent.contentOffset.x
		const index = Math.round(scrollPosition / (cardWidth + spacing))
		setActiveIndex(index)
	}

	return (
		<View className="px-6 pt-8 pb-4">
			<View className="mb-5">
				<Text className="text-2xl font-bold text-gray-900 mb-1">Choose Therapist</Text>
				<Text className="text-sm text-gray-500">Select your preferred therapist</Text>
			</View>

			<ScrollView
				ref={scrollViewRef}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingRight: 16 }}
				onScroll={handleScroll}
				scrollEventThrottle={16}>
				{therapists.map((therapist, index) => {
					const isSelected = selectedTherapist?.id === therapist.id

					return (
						<TouchableOpacity
							key={therapist.id}
							onPress={() => onSelectTherapist(therapist)}
							className="items-center mr-3"
							style={{ width: cardWidth }}>
							<View
								className={`rounded-full overflow-hidden border-4 ${
									isSelected ? 'border-green-600' : 'border-gray-200'
								}`}
								style={{
									width: cardWidth,
									height: cardWidth,
									shadowColor: isSelected ? '#10b981' : '#000',
									shadowOffset: { width: 0, height: isSelected ? 6 : 2 },
									shadowOpacity: isSelected ? 0.3 : 0.1,
									shadowRadius: isSelected ? 12 : 4,
									elevation: isSelected ? 8 : 2,
								}}>
								<Image source={therapist.avatar} contentFit="cover" style={{ width: '100%', height: '100%' }} />
							</View>
							<Text
								className={`mt-3 text-center font-semibold text-base ${
									isSelected ? 'text-green-600' : 'text-gray-900'
								}`}>
								{therapist.name}
							</Text>
						</TouchableOpacity>
					)
				})}
			</ScrollView>
		</View>
	)
}
