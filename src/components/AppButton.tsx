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
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <CustomText
            variant="medium"
            size={16}
            color={isPrimary ? COLORS.white : COLORS.textPrimary}
            style={[styles.text, textStyle]}>
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
  },
  primaryContainer: {
    backgroundColor: COLORS.primary,
  },
  socialContainer: {
    backgroundColor: COLORS.surface,
    justifyContent: 'flex-start',
    paddingHorizontal: horizontalScale(20),
  },
  disabledContainer: {
    backgroundColor: COLORS.textSecondary,
    opacity: 0.6,
  },
  text: {
    textAlign: 'center',
  },
  iconContainer: {
    marginRight: horizontalScale(12),
  },
});
