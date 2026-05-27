import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { COLORS } from '@constants/theme';
import { horizontalScale, verticalScale, moderateScale } from '@utils/responsive';
import CustomText from './CustomText';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'social';
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
  style,
  textStyle,
  icon,
}) => {
  const isPrimary = variant === 'primary';
  const isSocial = variant === 'social';

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.container,
        isPrimary && styles.primaryContainer,
        isSocial && styles.socialContainer,
        disabled && styles.disabledContainer,
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={isPrimary ? COLORS.white : COLORS.primary} />
      ) : (
        <>
          {icon && (
            <View style={[styles.iconContainer, isSocial && styles.socialIconContainer]}>
              {icon}
            </View>
          )}
          <CustomText
            variant="bold"
            size={16}
            color={isPrimary ? COLORS.white : COLORS.textPrimary}
            style={[styles.text, isSocial && styles.socialText, textStyle]}>
            {title}
          </CustomText>
        </>
      )}
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: verticalScale(48),
    borderRadius: moderateScale(25),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: verticalScale(8),
    position: 'relative',
  },
  primaryContainer: {
    backgroundColor: COLORS.primary,
  },
  socialContainer: {
    backgroundColor: COLORS.surface,
  },
  disabledContainer: {
    backgroundColor: COLORS.textSecondary,
    opacity: 0.6,
  },
  text: {
    textAlign: 'center',
  },
  socialText: {
    fontSize: 16,
  },
  iconContainer: {
    marginRight: horizontalScale(12),
  },
  socialIconContainer: {
    position: 'absolute',
    left: horizontalScale(24),
    marginRight: 0,
  },
});
