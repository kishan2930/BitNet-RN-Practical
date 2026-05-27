import React from 'react';
import { View, TextInput, StyleSheet, ViewStyle, TextInputProps } from 'react-native';
import { COLORS } from '@constants/theme';
import { horizontalScale, verticalScale, moderateScale, fontScale } from '@utils/responsive';

interface AppInputProps extends TextInputProps {
  containerStyle?: ViewStyle;
  icon?: React.ReactNode;
}

const AppInput: React.FC<AppInputProps> = ({
  containerStyle,
  icon,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        placeholderTextColor={COLORS.textSecondary}
        style={styles.input}
        {...props}
      />
      {icon && <View style={styles.iconContainer}>{icon}</View>}
    </View>
  );
};

export default AppInput;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: verticalScale(48),
    backgroundColor: COLORS.surface,
    borderRadius: moderateScale(8),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: horizontalScale(16),
    marginVertical: verticalScale(8),
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
});
