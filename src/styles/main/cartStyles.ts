import { StyleSheet } from 'react-native';
import { COLORS } from '@constants/theme';
import { horizontalScale, verticalScale, moderateScale } from '@utils/responsive';

export const cartStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    height: verticalScale(56),
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(16),
  },
  backButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(24),
  },
  illustrationContainer: {
    width: moderateScale(100),
    height: moderateScale(100),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(24),
  },
  emptyText: {
    textAlign: 'center',
    marginBottom: verticalScale(24),
    color: COLORS.textPrimary,
  },
  exploreBtn: {
    width: 'auto',
    paddingHorizontal: horizontalScale(32),
    height: verticalScale(52),
    borderRadius: moderateScale(26),
    backgroundColor: COLORS.primary,
  },
});
