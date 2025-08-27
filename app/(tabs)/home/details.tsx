import { useLocalSearchParams, useRouter } from 'expo-router'
import { View, Text, Pressable } from 'react-native'

export default function Details() {
  const router = useRouter()
  const { id, title } = useLocalSearchParams()

  function navigateToHome() {
    router.replace('/home')
  }

  return (
    <View>
      <Text>DETAILS</Text>

      <Pressable onPress={navigateToHome}>
        <Text>Go to home</Text>
      </Pressable>

      <Text>ID: {id}</Text>
      <Text>Title: {title}</Text>
    </View>
  )
}
