import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from '@constants/theme';
import { horizontalScale, verticalScale } from '@utils/responsive';

export const loginPasswordStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: horizontalScale(SPACING.l),
  },
  header: {
    marginBottom: verticalScale(20),
    marginTop: verticalScale(40),
  },
  backButton: {
    width: horizontalScale(40),
    height: horizontalScale(40),
    borderRadius: horizontalScale(20),
    backgroundColor: COLORS.surface,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  title: {
    marginBottom: verticalScale(32),
  },
  form: {
    flex: 1,
  },
  continueBtn: {
    marginTop: verticalScale(16),
  },
  footer: {
    flexDirection: 'row' as const,
    marginTop: verticalScale(16),
  },
});
