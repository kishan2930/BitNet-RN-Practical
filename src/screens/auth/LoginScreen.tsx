import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import CustomText from '@components/CustomText';
import AppButton from '@components/AppButton';
import AppInput from '@components/AppInput';
import { COLORS, SPACING } from '@constants/theme';
import { horizontalScale, verticalScale } from '@utils/responsive';
import { useAuth } from '@services/AuthContext';
import AppleIcon from '@assets/appleicon.svg';
import GoogleIcon from '@assets/Googleicon.svg';
import FacebookIcon from '@assets/Facebookicon.svg';

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const { loginWithGoogle } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <CustomText variant="bold" size={32} style={styles.title}>
          Sign in
        </CustomText>

        <View style={styles.form}>
          <AppInput
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <AppButton
            title="Continue"
            onPress={() => navigation.navigate('LoginPassword', { email })}
            style={styles.continueBtn}
            disabled={!email}
          />

          <View style={styles.footer}>
            <CustomText size={14} color={COLORS.textPrimary}>
              Don't have an account?{' '}
            </CustomText>
            <TouchableOpacity onPress={() => navigation.navigate('CreateAccount')}>
              <CustomText variant="bold" size={14}>
                Create One
              </CustomText>
            </TouchableOpacity>
          </View>
          </View>

          <View style={styles.separatorContainer}>
          <View style={styles.line} />
          <CustomText style={styles.orText} size={14} color={COLORS.textSecondary}>
            OR
          </CustomText>
          <View style={styles.line} />
          </View>

          <View style={styles.socialSection}>
          <AppButton
            variant="social"
            title="Continue with Apple"
            onPress={() => {}}
            textStyle={{ fontSize: 18 }}
            icon={<AppleIcon width={24} height={24} />}
          />
          <AppButton
            variant="social"
            title="Continue with Google"
            onPress={loginWithGoogle}
            textStyle={{ fontSize: 18 }}
            icon={<GoogleIcon width={24} height={24} />}
          />
          <AppButton
            variant="social"
            title="Continue with Facebook"
            onPress={() => {}}
            textStyle={{ fontSize: 18 }}
            icon={<FacebookIcon width={24} height={24} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: horizontalScale(SPACING.l),
    paddingTop: verticalScale(40),
  },
  title: {
    marginBottom: verticalScale(32),
  },
  form: {
    marginBottom: verticalScale(24),
  },
  continueBtn: {
    marginTop: verticalScale(16),
  },
  footer: {
    flexDirection: 'row',
    marginTop: verticalScale(16),
  },
  socialSection: {
    marginTop: verticalScale(10),
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(10),
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  orText: {
    marginHorizontal: horizontalScale(16),
  },
});
