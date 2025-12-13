import { Stack } from 'expo-router'
import './global.css'

export default function RootLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen name="service/[id]" options={{ headerShown: false, presentation: 'card' }} />
		</Stack>
	)
}
