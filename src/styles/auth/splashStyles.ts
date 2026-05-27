import { StyleSheet } from 'react-native';
import { COLORS } from '@constants/theme';
import { horizontalScale } from '@utils/responsive';

export const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoCircle: {
    width: horizontalScale(100),
    height: horizontalScale(100),
    backgroundColor: 'white',
    borderRadius: horizontalScale(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: horizontalScale(60),
    height: horizontalScale(60),
  },
});
