import React, { useEffect } from 'react';
import { View, StatusBar, Image } from 'react-native';
import { COLORS } from '@constants/theme';
import { splashStyles as styles } from '@styles/auth/splashStyles';

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
        <View style={styles.logoCircle}>
          <Image
            source={require('@assets/clot-Logo.svg')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
};

export default SplashScreen;
