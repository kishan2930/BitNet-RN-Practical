import firestore from '@react-native-firebase/firestore';

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  isOnboardingComplete: boolean;
  photoURL?: string;
}

export const UserService = {
  /**
   * Fetches a user profile from Firestore
   */
  getUserProfile: async (uid: string): Promise<UserProfile | null> => {
    const doc = await firestore().collection('users').doc(uid).get();
    return doc.exists ? (doc.data() as UserProfile) : null;
  },

  /**
   * Listens to user profile changes in real-time
   */
  subscribeToUserProfile: (uid: string, onUpdate: (profile: UserProfile | null) => void) => {
    return firestore()
      .collection('users')
      .doc(uid)
      .onSnapshot(
        snapshot => {
          onUpdate(snapshot?.exists ? (snapshot.data() as UserProfile) : null);
        },
        error => {
          console.error('Error subscribing to user profile:', error);
          onUpdate(null);
        }
      );
  },

  /**
   * Creates or updates a user profile
   */
  setUserProfile: async (uid: string, profile: Partial<UserProfile>) => {
    return firestore().collection('users').doc(uid).set(profile, { merge: true });
  },

  /**
   * Specifically updates onboarding status
   */
  completeOnboarding: async (uid: string) => {
    return firestore().collection('users').doc(uid).update({
      isOnboardingComplete: true,
    });
  },
};
