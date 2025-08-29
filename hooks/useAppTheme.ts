// hooks/useAppTheme.ts
import { AppTheme } from '@/styles'
import { useTheme } from 'react-native-paper'

const useAppTheme = () => useTheme<AppTheme>()
export default useAppTheme
