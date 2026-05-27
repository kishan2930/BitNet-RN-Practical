import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Guideline sizes are based on standard iPhone 11/13 screen (375x812)
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

/**
 * Scales size based on screen width
 */
export const horizontalScale = (size: number) => (SCREEN_WIDTH / guidelineBaseWidth) * size;

/**
 * Scales size based on screen height
 */
export const verticalScale = (size: number) => (SCREEN_HEIGHT / guidelineBaseHeight) * size;

/**
 * Moderate scale for things like padding/margins that shouldn't scale too aggressively
 */
export const moderateScale = (size: number, factor = 0.5) => size + (horizontalScale(size) - size) * factor;

/**
 * Detects if the device is a tablet
 */
export const isTablet = SCREEN_WIDTH >= 600;

/**
 * Scales font sizes based on screen size with moderation
 */
export const fontScale = (size: number) => {
  const scale = SCREEN_WIDTH / guidelineBaseWidth;
  // Apply moderated scaling for fonts (lower factor on tablet, slightly higher on phone)
  const factor = isTablet ? 0.35 : 0.65;
  const newSize = size + (horizontalScale(size) - size) * factor;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export { SCREEN_WIDTH, SCREEN_HEIGHT };

