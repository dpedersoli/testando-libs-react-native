import { DefaultTheme, DarkTheme } from '@react-navigation/native'

export const NavigationLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#643cbb',
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#212529',
    border: '#707c84',
    notification: '#E96379'
  }
}

export const NavigationDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#8a65dc',
    background: '#191622',
    card: '#44475a',
    text: '#E1E1E6',
    border: '#707c84',
    notification: '#E96379'
  }
}
