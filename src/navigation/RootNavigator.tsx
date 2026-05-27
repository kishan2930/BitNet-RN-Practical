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
  const [checkedUid, setCheckedUid] = useState<string | null>(null);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [appReady, setAppReady] = useState(false);

  // Derive if we are currently fetching onboarding status for the logged-in user
  const isCheckingOnboarding = user ? checkedUid !== user.uid : false;

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
            setCheckedUid(user.uid);
          },
          error => {
            console.error('Firestore snapshot error:', error);
            setCheckedUid(user.uid);
            setIsOnboardingComplete(false);
          }
        );
      } catch (e) {
        console.error('Firestore initialization error:', e);
        setCheckedUid(user.uid);
        setIsOnboardingComplete(false);
      }
    } else {
      setCheckedUid(null);
      setIsOnboardingComplete(false);
    }

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user]);

  // Show splash screen while loading auth, checking onboarding status, or waiting for minimum splash time
  if (authLoading || isCheckingOnboarding || !appReady) {
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
