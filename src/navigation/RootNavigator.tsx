import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '@services/AuthContext';
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';
import OnboardingScreen from '@screens/auth/OnboardingScreen';
import SplashScreen from '@screens/auth/SplashScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { user, profile, loading: authLoading, isProfileLoading } = useAuth();
  const [appReady, setAppReady] = useState(false);

  // Minimum duration of 2 seconds for splash screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setAppReady(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Show splash screen while loading auth, profile, or waiting for minimum splash time
  if (authLoading || (user && isProfileLoading) || !appReady) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : !profile?.isOnboardingComplete ? (
          <Stack.Screen name="OnboardingFlow" component={OnboardingScreen} />
        ) : (
          <Stack.Screen name="Main" component={MainTabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
