import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomText from '@components/CustomText';
import AppButton from '@components/AppButton';
import { COLORS } from '@constants/theme';
import { UserService } from '@services/userService';
import { useAuth } from '@services/AuthContext';
import { onboardingStyles as styles } from '@styles/auth/onboardingStyles';
import {
  AGE_RANGES,
  INITIAL_ONBOARDING_FORM,
  OnboardingFormState,
} from '@appTypes/auth';

const OnboardingScreen = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<OnboardingFormState>(
    INITIAL_ONBOARDING_FORM,
  );
  const [loading, setLoading] = useState(false);

  const handleInputChange = <K extends keyof OnboardingFormState>(
    field: K,
    value: OnboardingFormState[K],
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFinish = async () => {
    if (!user) {
      Alert.alert('Error', 'No user found. Please try logging in again.');
      return;
    }

    try {
      setLoading(true);
      await UserService.setUserProfile(user.uid, {
        ...formData,
        isOnboardingComplete: true,
      } as any);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'An error occurred during onboarding.';
      Alert.alert('Onboarding Failed', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <CustomText variant="bold" size={24} style={styles.title}>
          Tell us about yourself
        </CustomText>

        <View style={styles.section}>
          <CustomText size={16} style={styles.label}>
            Who do you shop for?
          </CustomText>
          <View style={styles.row}>
            {(['Men', 'Women'] as const).map(item => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.optionButton,
                  formData.gender === item && styles.activeOption,
                ]}
                onPress={() => handleInputChange('gender', item)}
              >
                <CustomText
                  color={
                    formData.gender === item ? COLORS.white : COLORS.textPrimary
                  }
                  variant="medium"
                >
                  {item}
                </CustomText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <CustomText size={16} style={styles.label}>
            How old are you?
          </CustomText>
          <View style={styles.ageContainer}>
            {AGE_RANGES.map(range => (
              <TouchableOpacity
                key={range}
                style={[
                  styles.ageOption,
                  formData.ageRange === range && styles.activeAgeOption,
                ]}
                onPress={() => handleInputChange('ageRange', range)}
              >
                <CustomText
                  color={
                    formData.ageRange === range
                      ? COLORS.white
                      : COLORS.textPrimary
                  }
                >
                  {range}
                </CustomText>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.footer}>
          <AppButton
            title="Finish"
            onPress={handleFinish}
            loading={loading}
            disabled={!formData.gender || !formData.ageRange || loading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
