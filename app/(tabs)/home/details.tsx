import { useLocalSearchParams, useRouter } from 'expo-router';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';

export default function Details() {
  const router = useRouter();
  const { id, title } = useLocalSearchParams();

  function navigateToHome() {
    router.replace('/home');
  }

  return (
    <View className="px-4 space-y-2">
      <Text variant="headlineLarge">DETAILS</Text>

      <Button mode="contained" buttonColor="#67E480" className="mb-2" onPress={navigateToHome}>
        Go to home
      </Button>

      <Text>ID: {id}</Text>
      <Text>Title: {title}</Text>
    </View>
  );
}
