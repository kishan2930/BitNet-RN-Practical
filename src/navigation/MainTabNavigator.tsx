import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import HomeStackNavigator from './HomeStackNavigator';
import NotificationsScreen from '@screens/main/NotificationsScreen';
import OrdersScreen from '@screens/main/OrdersScreen';
import ProfileScreen from '@screens/main/ProfileScreen';
import { COLORS } from '@constants/theme';
import { Home, Bell, Receipt, User } from 'lucide-react-native';
import { verticalScale } from '@utils/responsive';

const Tab = createBottomTabNavigator();

const getTabBarIcon = (routeName: string, color: string, focused: boolean) => {
  const iconSize = focused ? 26 : 24;
  const strokeWidth = focused ? 2.5 : 2;
  switch (routeName) {
    case 'HomeTab':
      return <Home color={color} size={iconSize} strokeWidth={strokeWidth} />;
    case 'Notifications':
      return <Bell color={color} size={iconSize} strokeWidth={strokeWidth} />;
    case 'Orders':
      return <Receipt color={color} size={iconSize} strokeWidth={strokeWidth} />;
    case 'Profile':
      return <User color={color} size={iconSize} strokeWidth={strokeWidth} />;
    default:
      return null;
  }
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopWidth: 1,
          borderTopColor: COLORS.surface, // Softer, more subtle separator line
          height: Platform.OS === 'ios' ? verticalScale(88) : verticalScale(72),
          paddingBottom: Platform.OS === 'ios' ? verticalScale(28) : verticalScale(12),
          paddingTop: verticalScale(12),
          elevation: 0, // Remove shadow on Android for flat look
          shadowOpacity: 0, // Remove shadow on iOS for flat look
        },
        tabBarIcon: ({ color, focused }) => getTabBarIcon(route.name, color, focused),
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeStackNavigator} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;



