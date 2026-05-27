import React from 'react';
import { View, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomText from '@components/CustomText';
import AppButton from '@components/AppButton';
import AppInput from '@components/AppInput';
import { COLORS } from '@constants/theme';
import { ArrowLeft } from 'lucide-react-native';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from '@react-native-firebase/auth';
import { getFirestore, doc, setDoc } from '@react-native-firebase/firestore';
import { createAccountStyles as styles } from '@styles/auth/createAccountStyles';
import { SignUpFormState } from '@appTypes/auth';
import { useSignUpForm } from '@hooks/useSignUpForm';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@appTypes/auth';

type Props = NativeStackScreenProps<AuthStackParamList, 'CreateAccount'>;

const CreateAccountScreen = ({ navigation }: Props) => {
  const handleSignUpSubmit = async (data: SignUpFormState) => {
    try {
      const { email, password, firstName, lastName } = data;
      const response = await createUserWithEmailAndPassword(getAuth(), email, password);
      const uid = response.user.uid;

      await updateProfile(response.user, {
        displayName: `${firstName} ${lastName}`,
      });

      const db = getFirestore();
      await setDoc(doc(db, 'users', uid), {
        firstName,
        lastName,
        email,
        createdAt: new Date().toISOString(),
        isOnboardingComplete: false,
      });
    } catch (error: any) {
      let errorMessage = 'An error occurred during account creation.';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'That email address is already in use!';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'That email address is invalid!';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'The password is too weak.';
      }

      Alert.alert('Registration Failed', errorMessage);
    }
  };

  const {
    formData,
    errors,
    loading,
    handleInputChange,
    handleSubmit,
  } = useSignUpForm(handleSignUpSubmit);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <ArrowLeft color={COLORS.textPrimary} size={24} />
          </TouchableOpacity>
        </View>

        <CustomText variant="bold" size={32} style={styles.title}>
          Create Account
        </CustomText>

        <View style={styles.form}>
          <AppInput
            placeholder="Firstname"
            value={formData.firstName}
            onChangeText={(val) => handleInputChange('firstName', val)}
            error={errors.firstName}
          />

          <AppInput
            placeholder="Lastname"
            value={formData.lastName}
            onChangeText={(val) => handleInputChange('lastName', val)}
            error={errors.lastName}
          />

          <AppInput
            placeholder="Email Address"
            value={formData.email}
            onChangeText={(val) => handleInputChange('email', val)}
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />

          <AppInput
            placeholder="Password"
            value={formData.password}
            onChangeText={(val) => handleInputChange('password', val)}
            secureTextEntry
            error={errors.password}
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateAccountScreen;
