import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '@screens/auth/SplashScreen';
import OnboardingScreen from '@screens/auth/OnboardingScreen';
import LoginScreen from '@screens/auth/LoginScreen';
import LoginPasswordScreen from '@screens/auth/LoginPasswordScreen';
import CreateAccountScreen from '@screens/auth/CreateAccountScreen';
import ForgotPasswordScreen from '@screens/auth/ForgotPasswordScreen';
import ForgotPasswordMsgScreen from '@screens/auth/ForgotPasswordMsgScreen';
import { AuthStackParamList } from '@appTypes/auth';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="LoginPassword" component={LoginPasswordScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ForgotPasswordMsg" component={ForgotPasswordMsgScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
