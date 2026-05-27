import React, { useState } from 'react';
import { View, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import CustomText from '@components/CustomText';
import AppButton from '@components/AppButton';
import AppInput from '@components/AppInput';
import { COLORS } from '@constants/theme';
import { ArrowLeft } from 'lucide-react-native';
import { getAuth, sendPasswordResetEmail } from '@react-native-firebase/auth';
import { forgotPasswordStyles as styles } from '@styles/auth/forgotPasswordStyles';

const ForgotPasswordScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    try {
      setLoading(true);
      await sendPasswordResetEmail(getAuth(), email);
      navigation.navigate('ForgotPasswordMsg');
    } catch (error: any) {
      Alert.alert('Error', 'Failed to send reset email.');
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
          Forgot Password
        </CustomText>

        <View style={styles.form}>
          <AppInput
            placeholder="Enter Email Address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <AppButton
            title="Continue"
            onPress={handleReset}
            loading={loading}
            style={styles.continueBtn}
            disabled={!email || loading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
