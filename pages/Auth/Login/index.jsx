import Spinner from '@/components/Spinner'
import { useAuth } from '@/context/AuthContext'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import {
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const SMS_CODE = '111111'

export default function Login() {
	const router = useRouter()
	const { login } = useAuth()
	const [showSplash, setShowSplash] = useState(true)
	const [phoneNumber, setPhoneNumber] = useState('')
	const [smsCode, setSmsCode] = useState(['', '', '', '', '', ''])
	const [isLoading, setIsLoading] = useState(false)
	const [showSmsInput, setShowSmsInput] = useState(false)
	const inputRefs = useRef([])

	useEffect(() => {
		const timeout = setTimeout(() => {
			setShowSplash(false)
		}, 2000)

		return () => clearTimeout(timeout)
	}, [])

	const handlePhoneSubmit = () => {
		Keyboard.dismiss()
		if (phoneNumber.length >= 9) {
			setIsLoading(true)
			setTimeout(() => {
				setIsLoading(false)
				setShowSmsInput(true)
			}, 1500)
		}
	}

	const handleSmsCodeChange = (index, value) => {
		if (value.length > 1) return

		const newCode = [...smsCode]
		newCode[index] = value.replace(/[^0-9]/g, '')
		setSmsCode(newCode)

		if (value && index < 5) {
			inputRefs.current[index + 1]?.focus()
		}

		if (newCode.every(digit => digit !== '') && newCode.join('') === SMS_CODE) {
			handleLogin()
		}
	}

	const handleKeyPress = (index, key) => {
		if (key === 'Backspace' && !smsCode[index] && index > 0) {
			inputRefs.current[index - 1]?.focus()
		}
	}

	const handleLogin = () => {
		Keyboard.dismiss()
		setIsLoading(true)
		setTimeout(() => {
			setIsLoading(false)
			login()
			router.replace('/(tabs)/bookings')
		}, 1000)
	}

	const dismissKeyboard = () => {
		Keyboard.dismiss()
	}

	if (showSplash) {
		return (
			<SafeAreaView className="flex-1 bg-black">
				<View className="flex-1">
					<Image
						source={require('@/assets/screen.jpg')}
						contentFit="cover"
						style={{ width: '100%', height: '100%', position: 'absolute' }}
					/>
					<View className="absolute inset-0 bg-black/40" />
					<View className="absolute inset-0 items-center justify-center">
						<View className="w-24 h-24 rounded-full bg-white/20 items-center justify-center mb-6 backdrop-blur">
							<Ionicons name="lock-closed" size={48} color="#ffffff" />
						</View>
						<Text className="text-white text-3xl font-bold mb-2">Welcome</Text>
						<Text className="text-white/90 text-lg">Loading...</Text>
					</View>
					<View className="absolute bottom-20 left-0 right-0 items-center">
						<Spinner color="#ffffff" />
					</View>
				</View>
			</SafeAreaView>
		)
	}

	return (
		<SafeAreaView className="flex-1 bg-gray-50">
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				className="flex-1"
				keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
				<TouchableWithoutFeedback onPress={dismissKeyboard}>
					<ScrollView
						className="flex-1"
						contentContainerStyle={{ flexGrow: 1 }}
						keyboardShouldPersistTaps="handled"
						showsVerticalScrollIndicator={false}>
						<View className="flex-1 px-6 pt-12">
							{!showSmsInput ? (
								<View className="flex-1 justify-center">
									<View className="items-center mb-12">
										<View className="w-20 h-20 rounded-full bg-green-600 items-center justify-center mb-6">
											<Ionicons name="phone-portrait" size={40} color="#ffffff" />
										</View>
										<Text className="text-3xl font-bold text-gray-900 mb-2">Enter Phone Number</Text>
										<Text className="text-gray-500 text-center">We'll send you a verification code</Text>
									</View>

									<View className="mb-6">
										<Text className="text-gray-700 font-semibold mb-2">Phone Number</Text>
										<TouchableWithoutFeedback onPress={() => {}}>
											<View className="flex-row items-center bg-white rounded-2xl px-4 py-4 border-2 border-gray-200">
												<View className="mr-3">
													<Ionicons name="call-outline" size={24} color="#6b7280" />
												</View>
												<TextInput
													className="flex-1 text-lg"
													placeholder="+48 123 456 789"
													value={phoneNumber}
													onChangeText={setPhoneNumber}
													keyboardType="phone-pad"
													returnKeyType="done"
													autoFocus
													onSubmitEditing={handlePhoneSubmit}
												/>
											</View>
										</TouchableWithoutFeedback>
									</View>

									<TouchableOpacity
										onPress={handlePhoneSubmit}
										disabled={phoneNumber.length < 9 || isLoading}
										activeOpacity={0.8}
										className={`bg-green-600 rounded-2xl py-4 items-center ${
											phoneNumber.length < 9 || isLoading ? 'opacity-50' : ''
										}`}>
										{isLoading ? (
											<Spinner color="#ffffff" />
										) : (
											<Text className="text-white font-bold text-lg">Send Code</Text>
										)}
									</TouchableOpacity>
								</View>
							) : (
								<View className="flex-1 justify-center">
									<View className="items-center mb-12">
										<View className="w-20 h-20 rounded-full bg-green-600 items-center justify-center mb-6">
											<Ionicons name="lock-closed" size={40} color="#ffffff" />
										</View>
										<Text className="text-3xl font-bold text-gray-900 mb-2">Enter Verification Code</Text>
										<Text className="text-gray-500 text-center">We sent a code to {phoneNumber}</Text>
									</View>

									<TouchableWithoutFeedback onPress={dismissKeyboard}>
										<View className="mb-8">
											<View className="flex-row justify-between">
												{smsCode.map((digit, index) => (
													<TextInput
														key={index}
														ref={ref => (inputRefs.current[index] = ref)}
														className="w-14 h-16 bg-white rounded-xl border-2 border-gray-300 text-center text-2xl font-bold text-gray-900"
														value={digit}
														onChangeText={value => handleSmsCodeChange(index, value)}
														onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent.key)}
														keyboardType="number-pad"
														returnKeyType="done"
														maxLength={1}
														selectTextOnFocus
													/>
												))}
											</View>
										</View>
									</TouchableWithoutFeedback>

									<View className="items-center mb-6">
										<Text className="text-gray-500 text-sm mb-2">Didn't receive the code?</Text>
										<TouchableOpacity onPress={dismissKeyboard}>
											<Text className="text-green-600 font-semibold">Resend Code</Text>
										</TouchableOpacity>
									</View>

									<TouchableOpacity
										onPress={handleLogin}
										disabled={smsCode.some(digit => !digit) || isLoading}
										activeOpacity={0.8}
										className={`bg-green-600 rounded-2xl py-4 items-center ${
											smsCode.some(digit => !digit) || isLoading ? 'opacity-50' : ''
										}`}>
										{isLoading ? (
											<Spinner color="#ffffff" />
										) : (
											<Text className="text-white font-bold text-lg">Verify & Login</Text>
										)}
									</TouchableOpacity>

									<TouchableOpacity
										onPress={() => {
											Keyboard.dismiss()
											setShowSmsInput(false)
											setSmsCode(['', '', '', '', '', ''])
										}}
										className="mt-4 items-center">
										<Text className="text-gray-500">Change Phone Number</Text>
									</TouchableOpacity>
								</View>
							)}
						</View>
					</ScrollView>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</SafeAreaView>
	)
}
