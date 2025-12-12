import { Ionicons } from '@expo/vector-icons'
import { useEffect, useRef } from 'react'
import { Animated, Dimensions, Easing, View } from 'react-native'

const { width } = Dimensions.get('window')

function MapPin({ delay, targetX, targetY }) {
	const translateY = useRef(new Animated.Value(-50)).current
	const translateX = useRef(new Animated.Value(targetX)).current
	const scale = useRef(new Animated.Value(0.5)).current
	const opacity = useRef(new Animated.Value(0)).current

	useEffect(() => {
		const timer = setTimeout(() => {
			Animated.parallel([
				Animated.timing(opacity, {
					toValue: 1,
					duration: 300,
					useNativeDriver: true,
				}),
				Animated.timing(scale, {
					toValue: 1,
					duration: 300,
					easing: Easing.out(Easing.back(1.5)),
					useNativeDriver: true,
				}),
			]).start()
			Animated.timing(translateY, {
				toValue: targetY,
				duration: 1500,
				easing: Easing.out(Easing.quad),
				useNativeDriver: true,
			}).start()
			Animated.timing(translateX, {
				toValue: targetX,
				duration: 1500,
				easing: Easing.out(Easing.quad),
				useNativeDriver: true,
			}).start()
		}, delay)

		return () => clearTimeout(timer)
	}, [delay, targetX, targetY])

	return (
		<Animated.View
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				zIndex: 10,
				transform: [{ translateY }, { translateX }, { scale }],
				opacity,
			}}>
			<Ionicons name="location" size={40} color="#ef4444" />
		</Animated.View>
	)
}

export default function DubaiMapWithMoney() {
	const pinTargetX = width / 2 - 20
	const pinTargetY = 96

	return (
		<View className="bg-gray-100 rounded-3xl h-48 mb-6 overflow-hidden relative">
			<View className="absolute inset-0 bg-blue-100">
				<View className="absolute inset-0 opacity-30">
					{Array.from({ length: 8 }).map((_, i) => (
						<View key={`h-${i}`} className="absolute left-0 right-0 h-px bg-slate-400" style={{ top: i * 24 }} />
					))}
					{Array.from({ length: 10 }).map((_, i) => (
						<View
							key={`v-${i}`}
							className="absolute top-0 bottom-0 w-px bg-slate-400"
							style={{ left: i * (width / 10) }}
						/>
					))}
				</View>
				<View className="absolute w-5 h-[30px] bg-slate-200 rounded-sm" style={{ top: 40, left: 30 }} />
				<View className="absolute w-[25px] h-10 bg-slate-400 rounded-sm" style={{ top: 30, left: 60 }} />
				<View className="absolute w-[30px] h-[25px] bg-slate-200 rounded-sm" style={{ top: 50, left: 100 }} />
				<View className="absolute w-5 h-[35px] bg-slate-400 rounded-sm" style={{ top: 35, right: 50 }} />
				<View className="absolute w-[25px] h-[30px] bg-slate-200 rounded-sm" style={{ top: 55, right: 80 }} />
			</View>
			<View className="absolute inset-0 pointer-events-none">
				<MapPin delay={500} targetX={pinTargetX} targetY={pinTargetY} />
			</View>
		</View>
	)
}
