import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from '@navigation/RootNavigator';
import { AuthProvider } from '@services/AuthContext';
import { seedFirestoreData } from '@utils/firestoreSeeder';

const App = (): React.JSX.Element => {
  useEffect(() => {
    // Seed data if needed
    seedFirestoreData();
  }, []);

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
        <RootNavigator />
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;
