import React, { useState } from 'react';
import { View, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import CustomText from '@components/CustomText';
import AppButton from '@components/AppButton';
import AppInput from '@components/AppInput';
import { COLORS } from '@constants/theme';
import { ArrowLeft } from 'lucide-react-native';
import { getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth';
import { loginPasswordStyles as styles } from '@styles/auth/loginPasswordStyles';

const LoginPasswordScreen = ({ navigation, route }: any) => {
  const { email } = route.params;
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(getAuth(), email, password);
    } catch (error: any) {
      let errorMessage = 'An error occurred during sign in.';
      if (error.code === 'auth/wrong-password') {
        errorMessage = 'Invalid password. Please try again.';
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = 'No user found with this email.';
      }

      Alert.alert('Login Failed', errorMessage);
    } finally {
      setLoading(false);
    }
  };

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
            onChangeText={setPassword}
            secureTextEntry
            autoFocus
          />

          <AppButton
            title="Continue"
            onPress={handleSignIn}
            loading={loading}
            style={styles.continueBtn}
            disabled={!password || loading}
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
