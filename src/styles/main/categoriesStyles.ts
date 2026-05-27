import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from '@constants/theme';
import { horizontalScale, verticalScale, moderateScale } from '@utils/responsive';

export const categoriesStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(SPACING.m),
    paddingVertical: verticalScale(SPACING.s),
  },
  backButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerPlaceholder: {
    width: moderateScale(40),
  },
  listContent: {
    paddingHorizontal: horizontalScale(SPACING.m),
    paddingTop: verticalScale(SPACING.m),
    paddingBottom: verticalScale(40),
  },
  categoryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: moderateScale(12),
    padding: moderateScale(12),
    marginBottom: verticalScale(12),
  },
  categoryImage: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
    marginRight: horizontalScale(16),
    resizeMode: 'cover',
  },
  categoryName: {
    flex: 1,
  },
});
