import { useLocalSearchParams } from 'expo-router'
import { View, Text } from 'react-native'

export default function Settings() {
  const { id, title } = useLocalSearchParams()

  return (
    <View>
      <Text>SETTINGS</Text>
      <Text>Settings para: {title}</Text>
      <Text>ID: {id}</Text>
    </View>
  )
}
