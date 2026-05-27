import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft } from 'lucide-react-native';
import CustomText from '@components/CustomText';
import AppButton from '@components/AppButton';
import EmptyCartIcon from '@assets/emptyOrder.svg';
import { COLORS } from '@constants/theme';
import { cartStyles as styles } from '@styles/main/cartStyles';
import { moderateScale } from '@utils/responsive';

const CartScreen = () => {
  const navigation = useNavigation<any>();

  const handleBack = () => {
    navigation.goBack();
  };

  const handleExplore = () => {
    navigation.navigate('HomeMain');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton} activeOpacity={0.7}>
          <ChevronLeft size={moderateScale(24)} color={COLORS.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Main Empty State Content */}
      <View style={styles.content}>
        <View style={styles.illustrationContainer}>
          <EmptyCartIcon width={100} height={100} />
        </View>

        <CustomText variant="medium" size={24} style={styles.emptyText}>
          Your Cart is Empty
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

export default CartScreen;
