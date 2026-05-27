import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// --- Navigation Types ---

export type AuthStackParamList = {
  Splash: undefined;
  Login: undefined;
  LoginPassword: { email: string };
  CreateAccount: undefined;
  Onboarding: undefined;
  ForgotPassword: undefined;
  ForgotPasswordMsg: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  OnboardingFlow: undefined;
  Main: undefined;
};

export type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

// --- Form State Types ---

export interface SignUpFormState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface OnboardingFormState {
  gender: 'Men' | 'Women' | null;
  ageRange: string | null;
}

// --- Firestore Document Types ---

export interface UserDocument {
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  isOnboardingComplete: boolean;
  gender?: 'Men' | 'Women' | null;
  ageRange?: string | null;
}

// --- Constants ---

export const AGE_RANGES = ['18-24', '25-34', '35-44', '45-54', '55+'] as const;

export const INITIAL_SIGNUP_FORM: SignUpFormState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

export const INITIAL_ONBOARDING_FORM: OnboardingFormState = {
  gender: null,
  ageRange: null,
};
