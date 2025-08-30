import useAppTheme from '@/hooks/useAppTheme';
import { shadow } from '@/styles/colors';
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
    <View className="flex-1 bg-light-background dark:bg-dark-background">
      <View className="bg-primary-dark dark:bg-primary-light p-4">
        <Text className="p-4 rounded-lg bg-onPrimary-dark dark:bg-onPrimary-light border-outline-20 shadow-md">
          Welcome to Nativewind! - HOME
        </Text>
      </View>

      <View className="bg-light-surface dark:bg-dark-surface m-4 p-4 rounded-lg">
        <Text className="text-light-foreground dark:text-dark-foreground text-lg">
          Conteúdo do Card
        </Text>
        <Text className="text-light-comment dark:text-dark-comment mt-2">Texto secundário</Text>
      </View>

      <Text variant="headlineLarge">Título Principal</Text>
      <Text variant="bodyMedium">Texto do corpo</Text>
      <Text variant="labelSmall">Label pequeno</Text>

      <View className="px-4 space-y-2">
        <Button
          mode="contained"
          buttonColor={customColors.tertiary[10]}
          textColor={customColors.error[10]}
          className="mb-2"
          onPress={navigateToDetails}>
          Go to details
        </Button>

        <Button
          mode="contained"
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

        <Button
          mode="contained"
          buttonColor={customColors.tertiary[10]}
          contentStyle={shadow(4)}
          className="mt-2">
          <Link
            href={{
              pathname: '/home/form',
              params: { id: '2', title: 'Meu Item' },
            }}
            asChild>
            <Text>Go to form</Text>
          </Link>
        </Button>
      </View>
    </View>
  );
}
