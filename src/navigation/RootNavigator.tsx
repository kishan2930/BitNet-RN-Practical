import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '@services/AuthContext';
import { getFirestore, doc, onSnapshot } from '@react-native-firebase/firestore';
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';
import OnboardingScreen from '@screens/auth/OnboardingScreen';
import SplashScreen from '@screens/auth/SplashScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { user, loading: authLoading } = useAuth();
  const [checkingOnboarding, setCheckingOnboarding] = useState(true);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [appReady, setAppReady] = useState(false);

  // Minimum duration of 2 seconds for splash screen
  useEffect(() => {
    const timer = setTimeout(() => {
      setAppReady(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    if (user) {
      setCheckingOnboarding(true);

      try {
        const db = getFirestore();

        unsubscribe = onSnapshot(
          doc(db, 'users', user.uid),
          snapshot => {
            if (snapshot?.exists()) {
              setIsOnboardingComplete(!!snapshot.data()?.isOnboardingComplete);
            } else {
              setIsOnboardingComplete(false);
            }
            setCheckingOnboarding(false);
          },
          error => {
            console.error('Firestore snapshot error:', error);
            setCheckingOnboarding(false);
            setIsOnboardingComplete(false);
          }
        );
      } catch (e) {
        console.error('Firestore initialization error:', e);
        setCheckingOnboarding(false);
        setIsOnboardingComplete(false);
      }
    } else {
      setCheckingOnboarding(false);
      setIsOnboardingComplete(false);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user]);

  // Show splash screen while checking auth, loading profile, or waiting for minimum splash time
  if (authLoading || checkingOnboarding || !appReady) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : !isOnboardingComplete ? (
          <Stack.Screen name="OnboardingFlow" component={OnboardingScreen} />
        ) : (
          <Stack.Screen name="Main" component={MainTabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
