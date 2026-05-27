import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from '@constants/theme';
import { horizontalScale, verticalScale, moderateScale } from '@utils/responsive';

export const categoryProductsStyles = StyleSheet.create({
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
  productCountText: {
    paddingHorizontal: horizontalScale(SPACING.m),
    marginTop: verticalScale(SPACING.s),
    marginBottom: verticalScale(SPACING.m),
  },
  gridContent: {
    paddingHorizontal: horizontalScale(SPACING.s), // slightly less padding so margin on grid cards looks perfect
    paddingBottom: verticalScale(40),
  },
  productCard: {
    flex: 0.5, // 2-column grid card takes half width
    backgroundColor: COLORS.surface,
    borderRadius: moderateScale(16),
    margin: horizontalScale(6),
    overflow: 'hidden',
    position: 'relative',
  },
  favoriteButton: {
    position: 'absolute',
    top: verticalScale(8),
    right: horizontalScale(8),
    width: moderateScale(28),
    height: moderateScale(28),
    borderRadius: moderateScale(14),
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    // Shadow for iOS
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: verticalScale(160),
    resizeMode: 'cover',
  },
  productDetails: {
    padding: moderateScale(10),
  },
  productTitle: {
    marginBottom: verticalScale(4),
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  originalPrice: {
    textDecorationLine: 'line-through',
    marginLeft: horizontalScale(8),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: verticalScale(80),
  },
});
