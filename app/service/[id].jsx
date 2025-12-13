import ServiceDetail from '@/pages/Service'
import { useLocalSearchParams } from 'expo-router'

export default function ServiceDetailScreen() {
	const { id } = useLocalSearchParams()
	return <ServiceDetail serviceId={id} />
}
