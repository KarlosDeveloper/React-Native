import { Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

export default function TabsLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: '#10b981',
				tabBarInactiveTintColor: '#6b7280',
				tabBarStyle: {
					backgroundColor: '#111827',
					borderTopColor: '#1f2937',
					borderTopWidth: 1,
				},
			}}>
			<Tabs.Screen
				name="bookings/index"
				options={{
					title: 'Bookings',
					href: '/bookings',
					tabBarIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} />,
				}}
			/>
			<Tabs.Screen
				name="profile/index"
				options={{
					title: 'Profile',
					href: '/profile',
					tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
				}}
			/>
		</Tabs>
	)
}
