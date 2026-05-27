import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Heart } from 'lucide-react-native';
import CustomText from '@components/CustomText';
import { ProductItem } from '@appTypes/main';
import { categoryProductsStyles as styles } from '@styles/main/categoryProductsStyles';
import { COLORS } from '@constants/theme';
import { useProducts } from '@hooks/useProducts';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParamList } from '@appTypes/main';

type Props = NativeStackScreenProps<HomeStackParamList, 'CategoryProducts'>;

const CategoryProductsScreen = ({ navigation, route }: Props) => {
  const { categoryId, categoryName, gender } = route.params;

  const { products, loading } = useProducts(gender, categoryId);
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const renderProductCard = ({ item }: { item: ProductItem }) => {
    const isFavorited = favorites.includes(item.id);
    return (
      <TouchableOpacity
        style={styles.productCard}
        activeOpacity={0.9}
        onPress={() => {
          // Future navigation
        }}
      >
        <TouchableOpacity
          style={styles.favoriteButton}
          activeOpacity={0.8}
          onPress={() => toggleFavorite(item.id)}
        >
          <Heart
            size={16}
            color={isFavorited ? COLORS.error : COLORS.textPrimary}
            fill={isFavorited ? COLORS.error : 'none'}
          />
        </TouchableOpacity>

        <Image source={{ uri: item.imageUrl }} style={styles.productImage} />

        <View style={styles.productDetails}>
          <CustomText
            variant="book"
            size={14}
            color={COLORS.textPrimary}
            numberOfLines={1}
            style={styles.productTitle}
          >
            {item.title}
          </CustomText>
          <View style={styles.priceContainer}>
            <CustomText variant="bold" size={14} color={COLORS.textPrimary}>
              ${item.price.toFixed(2)}
            </CustomText>
            {item.originalPrice && (
              <CustomText
                variant="book"
                size={12}
                color={COLORS.textSecondary}
                style={styles.originalPrice}
              >
                ${item.originalPrice.toFixed(2)}
              </CustomText>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

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
          <ArrowLeft color={COLORS.textPrimary} size={24} />
        </TouchableOpacity>

        <CustomText variant="bold" size={18} color={COLORS.textPrimary}>
          {categoryName}
        </CustomText>

        <View style={styles.headerPlaceholder} />
      </View>

      <View style={styles.productCountText}>
        <CustomText variant="bold" size={16} color={COLORS.textPrimary}>
          {categoryName} ({products.length})
        </CustomText>
      </View>

      {products.length > 0 ? (
        <FlatList
          data={products}
          renderItem={renderProductCard}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.gridContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <CustomText variant="book" size={16} color={COLORS.textSecondary}>
            No products found in this category.
          </CustomText>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CategoryProductsScreen;
