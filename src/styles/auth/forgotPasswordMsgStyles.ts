import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from '@constants/theme';
import { horizontalScale, verticalScale } from '@utils/responsive';

export const forgotPasswordMsgStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: horizontalScale(SPACING.l),
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: verticalScale(24),
  },
  title: {
    textAlign: 'center',
    marginBottom: verticalScale(32),
    lineHeight: verticalScale(34),
  },
  button: {
    width: horizontalScale(160),
  },
});
