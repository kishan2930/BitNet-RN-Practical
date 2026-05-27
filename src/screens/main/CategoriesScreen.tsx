import React from 'react';
import { View, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import CustomText from '@components/CustomText';
import { CategoryItem, Gender } from '@appTypes/main';
import { categoriesStyles as styles } from '@styles/main/categoriesStyles';
import { COLORS } from '@constants/theme';
import { useCategories } from '@hooks/useCategories';
import { moderateScale } from '@utils/responsive';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '@appTypes/main';

type Props = NativeStackScreenProps<HomeStackParamList, 'Categories'>;

const CategoriesScreen = ({ navigation, route }: Props) => {
  const { gender } = route.params;
  const { categories, loading } = useCategories();

  const renderCategoryCard = ({ item }: { item: CategoryItem }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate('CategoryProducts', {
          categoryId: item.id,
          categoryName: item.name,
          gender,
        })
      }
    >
      <Image source={{ uri: item.imageUrl }} style={styles.categoryImage} />
      <CustomText variant="bold" size={16} color={COLORS.textPrimary} style={styles.categoryName}>
        {item.name}
      </CustomText>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <ArrowLeft color={COLORS.textPrimary} size={moderateScale(24)} />
        </TouchableOpacity>

        <CustomText variant="bold" size={18} color={COLORS.textPrimary}>
          Shop by Categories
        </CustomText>

        <View style={styles.headerPlaceholder} />
      </View>

      <FlatList
        data={categories}
        renderItem={renderCategoryCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default CategoriesScreen;
