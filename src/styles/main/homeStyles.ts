import { StyleSheet } from 'react-native';
import { COLORS, SPACING } from '@constants/theme';
import { horizontalScale, verticalScale, moderateScale } from '@utils/responsive';

export const homeStyles = StyleSheet.create({
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
  profileAvatar: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
  },
  genderSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(16),
    borderRadius: moderateScale(20),
  },
  genderText: {
    color: COLORS.textPrimary,
  },
  cartButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: verticalScale(40),
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderRadius: moderateScale(24),
    marginHorizontal: horizontalScale(SPACING.m),
    paddingHorizontal: horizontalScale(SPACING.m),
    height: verticalScale(44),
    marginTop: verticalScale(SPACING.s),
    marginBottom: verticalScale(SPACING.m),
  },
  searchIcon: {
    marginRight: horizontalScale(8),
  },
  searchInput: {
    flex: 1,
    height: '100%',
    color: COLORS.textPrimary,
    fontSize: 16,
    padding: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(SPACING.m),
    marginBottom: verticalScale(SPACING.m),
    marginTop: verticalScale(SPACING.s),
  },
  categoriesList: {
    paddingLeft: horizontalScale(SPACING.m),
    paddingBottom: verticalScale(SPACING.s),
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: horizontalScale(20),
  },
  categoryImageContainer: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    backgroundColor: COLORS.surface,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: verticalScale(8),
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  categoryLabel: {
    color: COLORS.textPrimary,
  },
  productsList: {
    paddingLeft: horizontalScale(SPACING.m),
    paddingBottom: verticalScale(SPACING.m),
  },
  productCard: {
    width: horizontalScale(160),
    backgroundColor: COLORS.surface,
    borderRadius: moderateScale(16),
    marginRight: horizontalScale(16),
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
    paddingHorizontal: horizontalScale(SPACING.m),
    paddingVertical: verticalScale(SPACING.m),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: moderateScale(24),
    borderTopRightRadius: moderateScale(24),
    padding: moderateScale(24),
    paddingBottom: verticalScale(40),
  },
  modalTitle: {
    marginBottom: verticalScale(16),
    textAlign: 'center',
  },
  genderOption: {
    paddingVertical: verticalScale(16),
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surface,
    alignItems: 'center',
  },
  genderOptionSelected: {
    backgroundColor: 'rgba(142, 108, 239, 0.05)',
  },
});
