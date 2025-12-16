import { useAuth } from '@/context/AuthContext'
import { Redirect } from 'expo-router'

export default function Index() {
	const { isAuthenticated } = useAuth()

	if (!isAuthenticated) {
		return <Redirect href="/auth/login" />
	}

	return <Redirect href="/(tabs)/bookings" />
}
