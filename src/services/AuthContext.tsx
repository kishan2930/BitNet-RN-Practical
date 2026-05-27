import React, { createContext, useState, useEffect, useContext } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

interface AuthContextType {
  user: FirebaseAuthTypes.User | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [loading, setLoading] = useState(true);

  // Handle user state changes
  function onAuthStateChanged(userState: FirebaseAuthTypes.User | null) {
    setUser(userState);
    if (loading) setLoading(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    // Configure Google Sign-In
    GoogleSignin.configure({
      webClientId: '492847460022-jiat6jv0t6j6ucg2t705960vijbgddaf.apps.googleusercontent.com', 
    });

    return subscriber; // unsubscribe on unmount
  }, []);

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      // For v13+, signIn returns a response with a data property
      const response = await GoogleSignin.signIn();
      const idToken = response.data?.idToken;

      if (!idToken) {
        throw new Error('No ID Token found');
      }

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await auth().signOut();
      await GoogleSignin.signOut();
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
