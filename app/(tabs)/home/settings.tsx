import { useLocalSearchParams } from 'expo-router'
import { View } from 'react-native'
import { Text } from 'react-native-paper'

export default function Settings() {
  const { id, title } = useLocalSearchParams()

  return (
    <View className="px-4 space-y-2">
      <Text variant="headlineLarge">SETTINGS</Text>

      <Text>Settings para Title "{title}"</Text>
      <Text>ID: {id}</Text>
    </View>
  )
}
