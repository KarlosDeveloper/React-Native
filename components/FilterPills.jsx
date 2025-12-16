import { ScrollView, Text, TouchableOpacity } from 'react-native'

export default function FilterPills({ filters, activeFilter, onFilterChange, className = '' }) {
	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			className={`flex-row ${className}`}
			contentContainerStyle={{ paddingHorizontal: 0 }}>
			{filters.map((filter, index) => {
				const isActive = activeFilter === filter.value
				return (
					<TouchableOpacity
						key={filter.value}
						onPress={() => onFilterChange(filter.value)}
						className={`px-4 py-2 rounded-full mr-2 ${isActive ? 'bg-green-500' : 'bg-gray-200'}`}
						style={{
							marginLeft: index === 0 ? 0 : 0,
						}}>
						<Text className={`font-semibold text-sm ${isActive ? 'text-white' : 'text-gray-700'}`}>{filter.label}</Text>
					</TouchableOpacity>
				)
			})}
		</ScrollView>
	)
}
