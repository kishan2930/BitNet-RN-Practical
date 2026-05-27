import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from '@constants/theme';
import { horizontalScale, verticalScale } from '@utils/responsive';

export const createAccountStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    paddingHorizontal: horizontalScale(SPACING.l),
    paddingBottom: verticalScale(24),
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
    justifyContent: 'center',
    alignItems: 'center',
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
