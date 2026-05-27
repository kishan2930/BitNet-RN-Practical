import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from '@constants/theme';
import { horizontalScale, verticalScale, moderateScale } from '@utils/responsive';

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: verticalScale(40),
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: verticalScale(24),
    marginBottom: verticalScale(24),
  },
  avatar: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(40),
    backgroundColor: COLORS.surface,
  },
  infoCard: {
    backgroundColor: COLORS.surface,
    borderRadius: moderateScale(8),
    marginHorizontal: horizontalScale(SPACING.m),
    padding: moderateScale(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(24),
  },
  infoLeft: {
    flex: 1,
  },
  name: {
    marginBottom: verticalScale(4),
  },
  email: {
    marginBottom: verticalScale(2),
  },
  phone: {
    color: COLORS.textSecondary,
  },
  editBtn: {
    paddingLeft: horizontalScale(16),
  },
  menuList: {
    paddingHorizontal: horizontalScale(SPACING.m),
    marginBottom: verticalScale(32),
  },
  menuItem: {
    backgroundColor: COLORS.surface,
    borderRadius: moderateScale(8),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(16),
    paddingHorizontal: horizontalScale(16),
    marginBottom: verticalScale(8),
  },
  menuText: {
    color: COLORS.textPrimary,
  },
  signOutContainer: {
    alignItems: 'center',
    marginTop: verticalScale(12),
    marginBottom: verticalScale(24),
  },
  signOutBtn: {
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(24),
  },
});
