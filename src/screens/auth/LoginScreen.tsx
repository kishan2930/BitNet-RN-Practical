import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomText from '@components/CustomText';
import AppButton from '@components/AppButton';
import AppInput from '@components/AppInput';
import { COLORS } from '@constants/theme';
import { useAuth } from '@services/AuthContext';
import { useLoginForm } from '@hooks/useLoginForm';
import AppleIcon from '@assets/appleicon.svg';
import GoogleIcon from '@assets/Googleicon.svg';
import FacebookIcon from '@assets/Facebookicon.svg';
import { loginStyles as styles } from '@styles/auth/loginStyles';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@appTypes/auth';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

const LoginScreen = ({ navigation }: Props) => {
  const { loginWithGoogle } = useAuth();
  const { email, error, handleEmailChange, handleSubmit } = useLoginForm((validEmail: string) => {
    navigation.navigate('LoginPassword', { email: validEmail });
  });

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
            onChangeText={handleEmailChange}
            keyboardType="email-address"
            autoCapitalize="none"
            error={error}
          />

          <AppButton
            title="Continue"
            onPress={handleSubmit}
            style={styles.continueBtn}
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
            icon={<AppleIcon width={24} height={24} />}
          />
          <AppButton
            variant="social"
            title="Continue with Google"
            onPress={loginWithGoogle}
            icon={<GoogleIcon width={24} height={24} />}
          />
          <AppButton
            variant="social"
            title="Continue with Facebook"
            onPress={() => {}}
            icon={<FacebookIcon width={24} height={24} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
