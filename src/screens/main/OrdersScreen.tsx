import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import CustomText from '@components/CustomText';
import AppButton from '@components/AppButton';
import OrdersCartIcon from '@assets/check-out-ordersTab.svg';
import { ordersStyles as styles } from '@styles/main/ordersStyles';

const OrdersScreen = () => {
  const navigation = useNavigation<any>();

  const handleExplore = () => {
    navigation.navigate('HomeTab');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <CustomText variant="bold" size={18} style={styles.headerTitle}>
          Orders
        </CustomText>
      </View>

      {/* Main Empty State Content */}
      <View style={styles.content}>
        <View style={styles.illustrationContainer}>
          <OrdersCartIcon width={100} height={100} />
        </View>

        <CustomText variant="medium" size={24} style={styles.emptyText}>
          No Orders yet
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

export default OrdersScreen;
