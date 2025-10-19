import React from 'react';
import useAppTheme from '@/src/hooks/useAppTheme';
import { shadow } from '@/src/styles/colors';
import { Link, useRouter } from 'expo-router';
import { View } from 'react-native';
import { Text, Button } from 'react-native-paper';

export default function Home() {
  const router = useRouter();
  const { colors, customColors } = useAppTheme();

  function navigateToDetails() {
    router.replace({
      pathname: '/home/details',
      params: { id: '1', title: 'Title' },
    });
  }

  return (
    <View>
      <View>
        <Text>Welcome to Nativewin... NO!!! - HOME</Text>
      </View>

      <View>
        <Text>Conteúdo do Card</Text>
        <Text>Texto secundário</Text>
      </View>

      <Text variant='headlineLarge'>Título Principal</Text>
      <Text variant='bodyMedium'>Texto do corpo</Text>
      <Text variant='labelSmall'>Label pequeno</Text>

      <View>
        <Button
          mode='contained'
          buttonColor={customColors.tertiary[10]}
          textColor={customColors.error[10]}
          onPress={navigateToDetails}>
          Go to details
        </Button>

        <Button
          mode='contained'
          buttonColor={colors.primary}
          textColor={colors.onPrimary}
          contentStyle={shadow(4)}>
          <Link
            href={{
              pathname: '/home/settings',
              params: { id: '2', title: 'Meu Item' },
            }}
            asChild>
            <Text>Go to settings</Text>
          </Link>
        </Button>

        <Button mode='contained' buttonColor={customColors.tertiary[10]} contentStyle={shadow(4)}>
          <Link
            href={{
              pathname: '/home/form',
            }}
            asChild>
            <Text>Go to form</Text>
          </Link>
        </Button>
      </View>
    </View>
  );
}
