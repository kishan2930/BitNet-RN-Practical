import { StyleSheet } from 'react-native';
import { COLORS } from '@constants/theme';
import { horizontalScale, verticalScale } from '@utils/responsive';

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
    width: horizontalScale(175),
    height: verticalScale(80),
  },
});
