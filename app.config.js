import { withGradleProperties } from '@expo/config-plugins';

const appJson = {
  expo: {
    name: 'testando-libs',
    slug: 'testando-libs',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'testandolibs',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    splash: {
      image: './assets/images/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      edgeToEdgeEnabled: true,
      package: 'com.dpms.testandolibs',
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: ['expo-router', 'expo-font'],
    experiments: {
      typedRoutes: true,
    },
  },
};

export default withGradleProperties(appJson, [
  { key: 'org.gradle.internal.nativeinterface.windows.enableLongPaths', value: 'true' },
  { key: 'android.enableAapt2', value: 'false' },
]);
