import React from 'react';
import { View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronRight } from 'lucide-react-native';
import { useAuth } from '@services/AuthContext';
import CustomText from '@components/CustomText';
import { COLORS } from '@constants/theme';
import { ProfileMenuItem } from '@appTypes/main';
import { profileStyles as styles } from '@styles/main/profileStyles';

const ProfileScreen = () => {
  const { logout } = useAuth();

  const menuItems: ProfileMenuItem[] = [
    { title: 'Address', onPress: () => {} },
    { title: 'Wishlist', onPress: () => {} },
    { title: 'Payment', onPress: () => {} },
    { title: 'Help', onPress: () => {} },
    { title: 'Support', onPress: () => {} },
  ];

  const handleEdit = () => {
    // Edit profile action
  };

  const handleSignOut = async () => {
    await logout();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Avatar Section */}
        <View style={styles.avatarContainer}>
          <Image
            source={require('@assets/profile_avatar.png')}
            style={styles.avatar}
            resizeMode="cover"
          />
        </View>

        {/* User Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoLeft}>
            <CustomText variant="bold" size={18} style={styles.name}>
              Gilbert Jones
            </CustomText>
            <CustomText size={14} color={COLORS.textSecondary} style={styles.email}>
              Gilbertjones001@gmail.com
            </CustomText>
            <CustomText size={14} style={styles.phone}>
              121-224-7890
            </CustomText>
          </View>
          <TouchableOpacity onPress={handleEdit} style={styles.editBtn}>
            <CustomText variant="bold" size={14} color={COLORS.primary}>
              Edit
            </CustomText>
          </TouchableOpacity>
        </View>

        {/* Settings Menu List */}
        <View style={styles.menuList}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} onPress={item.onPress} style={styles.menuItem}>
              <CustomText variant="medium" size={16} style={styles.menuText}>
                {item.title}
              </CustomText>
              <ChevronRight size={24} color={COLORS.textSecondary} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Sign Out Button */}
        <View style={styles.signOutContainer}>
          <TouchableOpacity onPress={handleSignOut} style={styles.signOutBtn}>
            <CustomText variant="bold" size={16} color={COLORS.error}>
              Sign Out
            </CustomText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
