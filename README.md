# Clot - Elegant E-Commerce React Native App

Clot is a modern, premium, and fully responsive e-commerce mobile application built with **React Native (v0.85.3)**, **TypeScript**, and **Firebase (Auth & Firestore)**. The application is designed to run smoothly on both Android and iOS devices, accommodating various screen sizes from small smartphones to large tablets.

---

## 📱 Features

- **Splash Screen**: Initial loading screen with a minimum 2-second delay to ensure smooth loading and user authentication state resolution.
- **Onboarding Flow**: A visual walkthrough highlighting the store's primary benefits before introducing the login options.
- **Firebase Authentication**:
  - Secure **Email & Password** Sign-Up and Sign-In.
  - One-tap **Google Sign-In** powered by Firebase and `@react-native-google-signin/google-signin`.
- **E-Commerce Home Screen**:
  - Horizontal scrolling product categories.
  - "Top Selling" and "New In" product listings.
  - Interactive grid layouts.
- **Product Categories Screen**: Browse products filtered by category and gender.
- **Tab Navigation**: Clean, persistent navigation bar mapping out:
  - **Home** (Product feed and stack navigation).
  - **Notifications** (System & activity updates).
  - **Orders** (User order history).
  - **Profile** (Account management & user information).
- **Responsive Layout**: Custom scaling functions (`horizontalScale`, `verticalScale`, `fontScale`, and `isTablet`) to adapt to different layouts and screen dimensions dynamically.
- **Automated Seeding**: Seamlessly populates the Cloud Firestore database with products and categories upon first launch.

---

## 🛠️ Tech Stack & Key Dependencies

- **Core**: React Native (0.85.3), React (19.2.3), TypeScript
- **Backend Services**:
  - `@react-native-firebase/app`: Firebase core integration
  - `@react-native-firebase/auth`: User credentials and Google Sign-In backend
  - `@react-native-firebase/firestore`: Cloud Firestore for categories and product inventories
- **Social Login**: `@react-native-google-signin/google-signin`
- **Navigation**:
  - `@react-navigation/native` & `@react-navigation/native-stack`
  - `@react-navigation/bottom-tabs`
- **Icons & Styling**: `lucide-react-native`, `phosphor-react-native`, and `react-native-svg`

---

## 📋 Prerequisites & Environment Setup

Before starting, ensure your local development machine is configured for React Native development:

### 1. General Tools

- **Node.js**: `v22.11.0` or higher (configured in `package.json`).
- **npm** or **yarn** package manager.
- **Ruby & Bundler**: Required for installing iOS dependencies (CocoaPods).

### 2. Android Configuration

- **Java Development Kit (JDK)**: JDK 17 (recommended for React Native 0.85+).
- **Android Studio**: Install Android SDK, Android SDK Platform, and Android Virtual Device (AVD) or set up a physical Android device with USB debugging enabled.

### 3. iOS Configuration (macOS only)

- **Xcode**: Version 15 or higher.
- **Command Line Tools** installed in Xcode.
- **CocoaPods** installed.

> [!NOTE]
> Follow the official React Native [Environment Setup Guide](https://reactnative.dev/docs/set-up-your-environment) for details on configuring environmental variables (`ANDROID_HOME`, PATH, etc.).

---

## 🚀 Setup & Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/kishan2930/BitNet-RN-Practical.git
cd BitNet-RN-Practical
```

### Step 2: Install Node Dependencies

```bash
npm install
```

### Step 3: Install iOS CocoaPods Dependencies (Mac Only)

If you are developing for iOS, navigate to the `ios` directory (or use bundler from the root) to install native pods:

```bash
# Verify bundler and install Podfile tools
bundle install

# Install the pods
bundle exec pod install
```

---

## 🏃‍♂️ Running the Application

Ensure you have an active simulator running or a physical device connected.

### Step 1: Start the Metro Bundler

Start the Metro development server in its own terminal window:

```bash
npm start
```

### Step 2: Run on Target Platform

Open a separate terminal window and launch the app:

#### For Android:

```bash
npm run android
```

#### For iOS (macOS only):

```bash
npm run ios
```

---

## 📂 Project Structure

The project code is neatly modularized inside the `src` folder:

```
src/
├── assets/         # App assets, images, and fonts
├── components/     # Reusable UI components (buttons, cards, inputs, loaders)
├── constants/      # App-wide constants (theme.ts, layouts)
├── hooks/          # Custom React Hooks
├── navigation/     # Navigation stacks and tabs (RootNavigator, AuthNavigator, etc.)
├── screens/        # Screen components split into:
│   ├── auth/       # Auth screens: Splash, Onboarding, Login, Register, Forgot Password
│   └── main/       # Core app screens: Home, Cart, Profile, CategoryProducts, etc.
├── services/       # External service layers (AuthContext, firestore APIs)
├── styles/         # Global styles and styling helper configurations
├── types/          # TypeScript interface and type declarations
└── utils/          # Helper modules:
    ├── responsive.ts     # Dynamic layouts & scaling for Mobile & Tablets
    └── firestoreSeeder.ts # Automatic seeding script for categories and products
```

---

## 📐 Responsive UI Implementation

This project implements a grid/layout scaling method configured in `src/utils/responsive.ts`.

- Use **`horizontalScale(width)`** for scaling component widths, padding-horizontal, and margin-horizontal.
- Use **`verticalScale(height)`** for scaling component heights, padding-vertical, margin-vertical, and icon placements.
- Use **`fontScale(size)`** for text sizes to scale smoothly without breaking on large screens or tablets.
- Use **`isTablet`** boolean for conditional screen layouts, enabling side-by-side grids or multi-column interfaces when on wider screens.

---

## 🔧 Troubleshooting & Tips

### Clear Metro & Build Cache

If you encounter caching errors or build issues:

```bash
# Clear Metro cache
npm start -- --clear

# Reset node_modules
rm -rf node_modules && npm install
```

### Android Build Issues

Clean the Gradle build files inside the android directory:

```bash
cd android
./gradlew clean
cd ..
npm run android
```

### iOS CocoaPods Clean

Reinstall all native dependencies:

```bash
cd ios
rm -rf Pods Podfile.lock
pod cache clean --all
bundle exec pod install
cd ..
```
