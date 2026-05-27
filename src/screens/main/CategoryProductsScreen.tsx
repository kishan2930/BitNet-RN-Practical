import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowLeft, Heart } from 'lucide-react-native';
import firestore from '@react-native-firebase/firestore';
import CustomText from '@components/CustomText';
import { ProductItem, Gender } from '@appTypes/main';
import { categoryProductsStyles as styles } from '@styles/main/categoryProductsStyles';
import { COLORS } from '@constants/theme';

const CategoryProductsScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { categoryId, categoryName, gender } = route.params || { categoryId: '', categoryName: 'Products', gender: Gender.MEN };

  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    if (!categoryId) {
      setLoading(false);
      return;
    }

    // Listen to Category Products in real-time
    const unsubscribe = firestore()
      .collection('clot_products')
      .where('categoryId', '==', categoryId)
      .where('gender', '==', gender)
      .onSnapshot(
        (snapshot) => {
          if (snapshot) {
            const prods = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...(doc.data() as Omit<ProductItem, 'id'>),
            }));
            setProducts(prods);
          }
          setLoading(false);
        },
        (error) => {
          console.error('Error fetching category products in CategoryProductsScreen:', error);
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, [categoryId, gender]);

  const toggleFavorite = (productId: string) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter((id) => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  const renderProductCard = ({ item }: { item: ProductItem }) => {
    const isFavorited = favorites.includes(item.id);
    return (
      <TouchableOpacity
        style={styles.productCard}
        activeOpacity={0.9}
        onPress={() => {
          // Can navigate to details in future steps
        }}
      >
        {/* Favorite Icon */}
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

        {/* Product Image */}
        <Image source={{ uri: item.imageUrl }} style={styles.productImage} />

        {/* Product Details */}
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
      {/* Header */}
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

      {/* Subheader / Count */}
      <View style={styles.productCountText}>
        <CustomText variant="bold" size={16} color={COLORS.textPrimary}>
          {categoryName} ({products.length})
        </CustomText>
      </View>

      {/* Grid of Products */}
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
