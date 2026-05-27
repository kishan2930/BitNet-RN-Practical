import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { FONTS, COLORS } from '@constants/theme';
import { fontScale } from '@utils/responsive';

interface CustomTextProps extends TextProps {
  variant?: 'bold' | 'medium' | 'book';
  size?: number;
  color?: string;
}

const CustomText: React.FC<CustomTextProps> = ({
  children,
  style,
  variant = 'book',
  size = 16,
  color = COLORS.textPrimary,
  ...props
}) => {
  const getFontWeight = () => {
    switch (variant) {
      case 'bold':
        return '700';
      case 'medium':
        return '500';
      default:
        return '400';
    }
  };

  return (
    <Text
      style={[
        {
          fontFamily: FONTS[variant],
          fontSize: fontScale(size),
          color: color,
          fontWeight: getFontWeight(), // Fallback for when font file is missing
        },
        style,
      ]}
      {...props}>
      {children}
    </Text>
  );
};

export default CustomText;
