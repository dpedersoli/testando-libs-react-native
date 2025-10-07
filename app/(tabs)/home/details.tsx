import React from 'react';
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
    <View>
      <Text variant="headlineLarge">DETAILS</Text>

      <Button mode="contained" buttonColor="#67E480" onPress={navigateToHome}>
        Go to home
      </Button>

      <Text>ID: {id}</Text>
      <Text>Title: {title}</Text>
    </View>
  );
}
