import React from 'react';
import { View, TextInput, StyleSheet, ViewStyle, TextInputProps } from 'react-native';
import { COLORS } from '@constants/theme';
import { horizontalScale, verticalScale, moderateScale, fontScale } from '@utils/responsive';
import CustomText from './CustomText';

interface AppInputProps extends TextInputProps {
  containerStyle?: ViewStyle;
  icon?: React.ReactNode;
  error?: string;
}

const AppInput: React.FC<AppInputProps> = ({
  containerStyle,
  icon,
  error,
  ...props
}) => {
  const hasError = !!error;

  return (
    <View style={styles.outerContainer}>
      <View style={[
        styles.container,
        hasError && styles.errorContainer,
        containerStyle
      ]}>
        <TextInput
          placeholderTextColor={COLORS.textSecondary}
          style={styles.input}
          {...props}
        />
        {icon && <View style={styles.iconContainer}>{icon}</View>}
      </View>
      {hasError && (
        <CustomText size={12} color={COLORS.error} style={styles.errorText}>
          {error}
        </CustomText>
      )}
    </View>
  );
};

export default AppInput;

const styles = StyleSheet.create({
  outerContainer: {
    width: '100%',
    marginVertical: verticalScale(4),
  },
  container: {
    width: '100%',
    height: verticalScale(48),
    backgroundColor: COLORS.surface,
    borderRadius: moderateScale(8),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(16),
    borderWidth: 1,
    borderColor: 'transparent',
  },
  errorContainer: {
    borderColor: COLORS.error,
    backgroundColor: '#FFF5F5', // Light red background for error state
  },
  input: {
    flex: 1,
    height: '100%',
    color: COLORS.textPrimary,
    fontSize: fontScale(16),
    fontFamily: 'CircularStd-Book',
  },
  iconContainer: {
    marginLeft: horizontalScale(8),
  },
  errorText: {
    marginTop: verticalScale(4),
    marginLeft: horizontalScale(8),
  },
});
