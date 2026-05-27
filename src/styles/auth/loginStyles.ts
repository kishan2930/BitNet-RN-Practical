import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from '@constants/theme';
import { horizontalScale, verticalScale } from '@utils/responsive';

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: horizontalScale(SPACING.l),
    paddingTop: verticalScale(40),
  },
  title: {
    marginBottom: verticalScale(32),
  },
  form: {
    marginBottom: verticalScale(16),
  },
  continueBtn: {
    marginTop: verticalScale(16),
  },
  footer: {
    flexDirection: 'row' as const,
    marginTop: verticalScale(16),
  },
  socialSection: {
    marginTop: verticalScale(24),
  },
  separatorContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    marginVertical: verticalScale(24),
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  orText: {
    marginHorizontal: horizontalScale(16),
  },
});
