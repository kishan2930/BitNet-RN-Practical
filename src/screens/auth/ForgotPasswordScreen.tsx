import React from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomText from '@components/CustomText';
import AppButton from '@components/AppButton';
import AppInput from '@components/AppInput';
import { COLORS } from '@constants/theme';
import { ArrowLeft } from 'lucide-react-native';
import { getAuth, sendPasswordResetEmail } from '@react-native-firebase/auth';
import { forgotPasswordStyles as styles } from '@styles/auth/forgotPasswordStyles';
import { useForgotPasswordForm } from '@hooks/useForgotPasswordForm';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@appTypes/auth';

type Props = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen = ({ navigation }: Props) => {
  const handleResetSubmit = async (emailInput: string) => {
    try {
      await sendPasswordResetEmail(getAuth(), emailInput);
      navigation.navigate('ForgotPasswordMsg');
    } catch (error: any) {
      Alert.alert('Error', 'Failed to send reset email.');
    }
  };

  const {
    email,
    error,
    loading,
    handleEmailChange,
    handleSubmit,
  } = useForgotPasswordForm(handleResetSubmit);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ArrowLeft color={COLORS.textPrimary} size={24} />
          </TouchableOpacity>
        </View>

        <CustomText variant="bold" size={32} style={styles.title}>
          Forgot Password
        </CustomText>

        <View style={styles.form}>
          <AppInput
            placeholder="Enter Email Address"
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
            autoCapitalize="none"
            error={error}
          />

          <AppButton
            title="Continue"
            onPress={handleSubmit}
            loading={loading}
            style={styles.continueBtn}
            disabled={loading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
