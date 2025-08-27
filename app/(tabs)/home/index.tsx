import { View, Text } from '@/components/Themed'
import { Link, useRouter } from 'expo-router'
import { Pressable } from 'react-native'

export default function Home() {
  const router = useRouter()

  function navigateToDetails() {
    router.replace({
      pathname: '/home/details',
      params: { id: '1', title: 'Title' }
    })
  }

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Welcome to Nativewind! - HOME
      </Text>

      <Pressable onPress={navigateToDetails}>
        <Text>Go to details</Text>
      </Pressable>

      <Link
        href={{
          pathname: '/home/settings',
          params: { id: '2', title: 'Meu Item' }
        }}
        asChild
      >
        <Text>Go to settings</Text>
      </Link>
    </View>
  )
}
