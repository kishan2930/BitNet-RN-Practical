import React, { useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import { COLORS } from '@constants/theme';
import ClotLogo from '@assets/clot-Logo.svg';
import { splashStyles as styles } from '@styles/auth/splashStyles';
import { horizontalScale, verticalScale } from '@utils/responsive';

const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <View style={styles.logoContainer}>
        <ClotLogo width={horizontalScale(175)} height={verticalScale(80)} />
      </View>
    </View>
  );
};

export default SplashScreen;
