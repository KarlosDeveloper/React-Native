import { Ionicons } from '@expo/vector-icons'
import { TextInput, TouchableOpacity, View } from 'react-native'

export default function SearchBar({ value, onChangeText, placeholder = 'Search...', onClear, className = '' }) {
	return (
		<View className={`flex-row items-center bg-gray-100 rounded-2xl px-4 py-3 ${className}`}>
			<Ionicons name="search-outline" size={20} color="#6b7280" />
			<TextInput
				className="flex-1 ml-3 text-base text-gray-900"
				placeholder={placeholder}
				placeholderTextColor="#9ca3af"
				value={value}
				onChangeText={onChangeText}
				autoCapitalize="none"
				autoCorrect={false}
			/>
			{value && value.length > 0 && (
				<TouchableOpacity onPress={onClear} className="ml-2">
					<Ionicons name="close-circle" size={20} color="#6b7280" />
				</TouchableOpacity>
			)}
		</View>
	)
}

