import React, { createContext, useState, useEffect, useContext } from 'react';
import { Alert } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { UserService, UserProfile } from './userService';

interface AuthContextType {
  user: FirebaseAuthTypes.User | null;
  profile: UserProfile | null;
  loading: boolean;
  isProfileLoading: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isProfileLoading, setIsProfileLoading] = useState(false);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((userState) => {
      setUser(userState);
      if (loading) setLoading(false);
    });

    GoogleSignin.configure({
      webClientId: '492847460022-jiat6jv0t6j6ucg2t705960vijbgddaf.apps.googleusercontent.com',
    });

    return subscriber;
  }, []);

  useEffect(() => {
    let unsubscribeProfile: (() => void) | undefined;

    if (user) {
      setIsProfileLoading(true);
      unsubscribeProfile = UserService.subscribeToUserProfile(user.uid, (data) => {
        setProfile(data);
        setIsProfileLoading(false);
      });
    } else {
      setProfile(null);
      setIsProfileLoading(false);
    }

    return () => {
      if (unsubscribeProfile) unsubscribeProfile();
    };
  }, [user]);

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      const response = await GoogleSignin.signIn();
      const idToken = response.data?.idToken;

      if (!idToken) {
        throw new Error('No ID Token found');
      }

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const result = await auth().signInWithCredential(googleCredential);

      // Check if user document exists via UserService
      const existingProfile = await UserService.getUserProfile(result.user.uid);

      if (!existingProfile) {
        const displayName = result.user.displayName || '';
        const nameParts = displayName.trim().split(/\s+/);
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        await UserService.setUserProfile(result.user.uid, {
          firstName,
          lastName,
          email: result.user.email || '',
          createdAt: new Date().toISOString(),
          isOnboardingComplete: false,
        });
      }
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'code' in error) {
        const errorCode = error.code;
        if (errorCode === statusCodes.SIGN_IN_CANCELLED) {
          console.log('Google Sign-In was cancelled by the user.');
        } else if (errorCode === statusCodes.IN_PROGRESS) {
          console.log('Google Sign-In is already in progress.');
        } else if (errorCode === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          Alert.alert('Google Play Services', 'Google Play Services are not available or outdated.');
        } else {
          console.error('Google Sign-In failed:', error);
          const message = 'message' in error ? String(error.message) : 'An error occurred during Google Sign-In.';
          Alert.alert('Google Sign-In Error', message);
        }
      } else {
        console.error('Google Sign-In failed:', error);
        Alert.alert('Google Sign-In Error', 'An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await auth().signOut();
      await GoogleSignin.signOut();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, isProfileLoading, loginWithGoogle, logout }}>
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
