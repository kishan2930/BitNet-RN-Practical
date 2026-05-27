import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar, Image } from 'react-native';
import { COLORS } from '@constants/theme';
import { horizontalScale } from '@utils/responsive';

const SplashScreen = ({ navigation }: any) => {
  // Splash screen timeout - typically would handle initialization here
  // But for now just showing the UI
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
        {/* Placeholder for the Logo - Usually an SVG or PNG from the Figma */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoCircle: {
    width: horizontalScale(100),
    height: horizontalScale(100),
    backgroundColor: 'white',
    borderRadius: horizontalScale(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: horizontalScale(60),
    height: horizontalScale(60),
  },
});
