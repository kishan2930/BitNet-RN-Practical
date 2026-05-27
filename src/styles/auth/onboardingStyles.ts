import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from '@constants/theme';
import { horizontalScale, verticalScale, moderateScale } from '@utils/responsive';

export const onboardingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    paddingHorizontal: horizontalScale(SPACING.l),
    paddingTop: verticalScale(40),
    paddingBottom: verticalScale(20),
  },
  title: {
    marginBottom: verticalScale(32),
  },
  section: {
    marginBottom: verticalScale(32),
  },
  label: {
    marginBottom: verticalScale(16),
  },
  row: {
    flexDirection: 'row' as const,
    gap: horizontalScale(12),
  },
  optionButton: {
    flex: 1,
    height: verticalScale(50),
    backgroundColor: COLORS.surface,
    borderRadius: moderateScale(25),
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  activeOption: {
    backgroundColor: COLORS.primary,
  },
  ageContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: moderateScale(16),
    padding: moderateScale(8),
  },
  ageOption: {
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(16),
    borderRadius: moderateScale(8),
  },
  activeAgeOption: {
    backgroundColor: COLORS.primary,
  },
  footer: {
    marginTop: verticalScale(40),
  },
});
