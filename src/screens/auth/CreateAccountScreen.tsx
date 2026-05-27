import React, { useState } from 'react';
import { View, TouchableOpacity, SafeAreaView, Alert, ScrollView } from 'react-native';
import CustomText from '@components/CustomText';
import AppButton from '@components/AppButton';
import AppInput from '@components/AppInput';
import { COLORS } from '@constants/theme';
import { ArrowLeft } from 'lucide-react-native';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from '@react-native-firebase/auth';
import { getFirestore, doc, setDoc } from '@react-native-firebase/firestore';
import { createAccountStyles as styles } from '@styles/auth/createAccountStyles';
import { INITIAL_SIGNUP_FORM, SignUpFormState } from '@appTypes/auth';

const CreateAccountScreen = ({ navigation }: any) => {
  const [formData, setFormData] = useState<SignUpFormState>(INITIAL_SIGNUP_FORM);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof SignUpFormState, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSignUp = async () => {
    try {
      setLoading(true);

      const { email, password, firstName, lastName } = formData;
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
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    formData.firstName.trim() !== '' &&
    formData.lastName.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.password.length >= 6;

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
          />

          <AppInput
            placeholder="Lastname"
            value={formData.lastName}
            onChangeText={(val) => handleInputChange('lastName', val)}
          />

          <AppInput
            placeholder="Email Address"
            value={formData.email}
            onChangeText={(val) => handleInputChange('email', val)}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <AppInput
            placeholder="Password"
            value={formData.password}
            onChangeText={(val) => handleInputChange('password', val)}
            secureTextEntry
          />

          <AppButton
            title="Continue"
            onPress={handleSignUp}
            loading={loading}
            style={styles.continueBtn}
            disabled={!isFormValid || loading}
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
