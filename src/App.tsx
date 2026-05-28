import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from '@navigation/RootNavigator';
import { AuthProvider } from '@services/AuthContext';

const App = (): React.JSX.Element => {
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
