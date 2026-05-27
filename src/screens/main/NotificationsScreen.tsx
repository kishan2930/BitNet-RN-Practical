import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import CustomText from '@components/CustomText';
import AppButton from '@components/AppButton';
import NotificationBellIcon from '@assets/bell-notificationTab.svg';
import { notificationsStyles as styles } from '@styles/main/notificationsStyles';

const NotificationsScreen = () => {
  const navigation = useNavigation<any>();

  const handleExplore = () => {
    navigation.navigate('HomeTab');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <CustomText variant="bold" size={18} style={styles.headerTitle}>
          Notifications
        </CustomText>
      </View>

      {/* Main Empty State Content */}
      <View style={styles.content}>
        <View style={styles.illustrationContainer}>
          <NotificationBellIcon width={100} height={100} />
        </View>

        <CustomText variant="medium" size={24} style={styles.emptyText}>
          No Notification yet
        </CustomText>

        <AppButton
          title="Explore Categories"
          onPress={handleExplore}
          style={styles.exploreBtn}
        />
      </View>
    </SafeAreaView>
  );
};

export default NotificationsScreen;
