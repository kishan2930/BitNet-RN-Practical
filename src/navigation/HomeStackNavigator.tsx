import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@screens/main/HomeScreen';
import CategoriesScreen from '@screens/main/CategoriesScreen';
import CategoryProductsScreen from '@screens/main/CategoryProductsScreen';
import CartScreen from '@screens/main/CartScreen';

import { HomeStackParamList } from '@appTypes/main';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="CategoryProducts" component={CategoryProductsScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
