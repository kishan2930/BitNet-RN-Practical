import React from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomText from '@components/CustomText';
import AppButton from '@components/AppButton';
import AppInput from '@components/AppInput';
import { COLORS } from '@constants/theme';
import { ArrowLeft } from 'lucide-react-native';
import { getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth';
import { loginPasswordStyles as styles } from '@styles/auth/loginPasswordStyles';
import { useLoginPasswordForm } from '@hooks/useLoginPasswordForm';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@appTypes/auth';

type Props = NativeStackScreenProps<AuthStackParamList, 'LoginPassword'>;

const LoginPasswordScreen = ({ navigation, route }: Props) => {
  const { email } = route.params;

  const handleSignInSubmit = async (passwordInput: string) => {
    try {
      await signInWithEmailAndPassword(getAuth(), email, passwordInput);
    } catch (error: any) {
      let errorMessage = 'An error occurred during sign in.';
      if (
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/invalid-credential'
      ) {
        errorMessage = 'Invalid email or password. Please try again.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'No user found with this email.';
      }
      Alert.alert('Login Failed', errorMessage);
    }
  };

  const {
    password,
    error,
    loading,
    handlePasswordChange,
    handleSubmit,
  } = useLoginPasswordForm(handleSignInSubmit);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ArrowLeft color={COLORS.textPrimary} size={24} />
          </TouchableOpacity>
        </View>

        <CustomText variant="bold" size={32} style={styles.title}>
          Sign in
        </CustomText>

        <View style={styles.form}>
          <AppInput
            placeholder="Password"
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry
            autoFocus
            error={error}
          />

          <AppButton
            title="Continue"
            onPress={handleSubmit}
            loading={loading}
            style={styles.continueBtn}
            disabled={loading}
          />

          <View style={styles.footer}>
            <CustomText size={14} color={COLORS.textPrimary}>
              Forgot Password?{' '}
            </CustomText>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <CustomText variant="bold" size={14}>
                Reset
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginPasswordScreen;
