import React, { useState } from 'react';
import { View, TouchableOpacity, SafeAreaView } from 'react-native';
import CustomText from '@components/CustomText';
import AppButton from '@components/AppButton';
import AppInput from '@components/AppInput';
import { COLORS } from '@constants/theme';
import { useAuth } from '@services/AuthContext';
import AppleIcon from '@assets/appleicon.svg';
import GoogleIcon from '@assets/Googleicon.svg';
import FacebookIcon from '@assets/Facebookicon.svg';
import { loginStyles as styles } from '@styles/auth/loginStyles';

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
            textStyle={{ fontSize: 14 }}
            icon={<AppleIcon width={24} height={24} />}
          />
          <AppButton
            variant="social"
            title="Continue with Google"
            onPress={loginWithGoogle}
            textStyle={{ fontSize: 14 }}
            icon={<GoogleIcon width={24} height={24} />}
          />
          <AppButton
            variant="social"
            title="Continue with Facebook"
            onPress={() => {}}
            textStyle={{ fontSize: 14 }}
            icon={<FacebookIcon width={24} height={24} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
