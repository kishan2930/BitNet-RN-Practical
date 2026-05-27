import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '@services/AuthContext';
import { getFirestore, doc, onSnapshot } from '@react-native-firebase/firestore';
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';
import OnboardingScreen from '@screens/auth/OnboardingScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { user, loading: authLoading } = useAuth();
  const [checkingOnboarding, setCheckingOnboarding] = useState(true);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

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

  if (authLoading || checkingOnboarding) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        <ActivityIndicator size="large" color="#8E6CEF" />
      </View>
    );
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
