import React, { useState, useMemo } from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Modal,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Search, ShoppingBag, Heart, ChevronDown } from 'lucide-react-native';
import { useAuth } from '@services/AuthContext';
import { useCategories } from '@hooks/useCategories';
import { useProducts } from '@hooks/useProducts';
import { COLORS } from '@constants/theme';
import CustomText from '@components/CustomText';
import { CategoryItem, ProductItem, Gender } from '@appTypes/main';
import { homeStyles as styles } from '@styles/main/homeStyles';
import { moderateScale } from '@utils/responsive';

import { HomeStackNavigationProp } from '@appTypes/main';

const HomeScreen = () => {
  const navigation = useNavigation<HomeStackNavigationProp>();
  const { user } = useAuth();

  // Data Hooks
  const { categories, loading: categoriesLoading } = useCategories();
  const [gender, setGender] = useState<Gender>(Gender.MEN);
  const { products, loading: productsLoading } = useProducts(gender);

  // UI States
  const [genderModalVisible, setGenderModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);

  const loading = categoriesLoading || productsLoading;

  // Filter lists locally based on search query
  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  const topSellingProducts = useMemo(() => 
    filteredProducts.filter((p) => p.isTopSelling), 
  [filteredProducts]);

  const newInProducts = useMemo(() => 
    filteredProducts.filter((p) => p.isNewIn), 
  [filteredProducts]);

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const handleGenderSelect = (selectedGender: Gender) => {
    setGender(selectedGender);
    setGenderModalVisible(false);
  };

  const renderCategoryIcon = ({ item }: { item: CategoryItem }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate('Categories', { gender })
      }
    >
      <View style={styles.categoryImageContainer}>
        <Image source={{ uri: item.imageUrl }} style={styles.categoryImage} />
      </View>
      <CustomText variant="medium" size={13} style={styles.categoryLabel}>
        {item.name}
      </CustomText>
    </TouchableOpacity>
  );

  const renderProductCard = ({ item }: { item: ProductItem }) => {
    const isFavorited = favorites.includes(item.id);
    return (
      <TouchableOpacity
        style={styles.productCard}
        activeOpacity={0.9}
        onPress={() => {
          // Future: navigation.navigate('ProductDetails', { productId: item.id })
        }}
      >
        <TouchableOpacity
          style={styles.favoriteButton}
          activeOpacity={0.8}
          onPress={() => toggleFavorite(item.id)}
        >
          <Heart
            size={moderateScale(16)}
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

  const userAvatar = user?.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80';

  if (loading && categories.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Image source={{ uri: userAvatar }} style={styles.profileAvatar} />

        <TouchableOpacity
          style={styles.genderSelector}
          activeOpacity={0.7}
          onPress={() => setGenderModalVisible(true)}
        >
          <CustomText variant="bold" size={16} style={styles.genderText}>
            {gender.charAt(0).toUpperCase() + gender.slice(1)}{' '}
          </CustomText>
          <ChevronDown size={moderateScale(16)} color={COLORS.textPrimary} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cartButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Cart')}
        >
          <ShoppingBag size={moderateScale(18)} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.searchBarContainer}>
          <Search size={moderateScale(18)} color={COLORS.textSecondary} style={styles.searchIcon} />
          <TextInput
            placeholder="Search"
            placeholderTextColor={COLORS.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </View>

        <View style={styles.sectionHeader}>
          <CustomText variant="bold" size={18}>
            Categories
          </CustomText>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.navigate('Categories', { gender })}
          >
            <CustomText variant="medium" size={16} color={COLORS.primary}>
              See All
            </CustomText>
          </TouchableOpacity>
        </View>

        <FlatList
          data={categories}
          renderItem={renderCategoryIcon}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />

        <View style={styles.sectionHeader}>
          <CustomText variant="bold" size={18}>
            Top Selling
          </CustomText>
          <TouchableOpacity activeOpacity={0.6}>
            <CustomText variant="medium" size={16} color={COLORS.primary}>
              See All
            </CustomText>
          </TouchableOpacity>
        </View>

        {topSellingProducts.length > 0 ? (
          <FlatList
            data={topSellingProducts}
            renderItem={renderProductCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsList}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <CustomText variant="book" size={14} color={COLORS.textSecondary}>
              {productsLoading ? 'Loading products...' : `No top selling products found for "${gender}".`}
            </CustomText>
          </View>
        )}

        <View style={styles.sectionHeader}>
          <CustomText variant="bold" size={18}>
            New In
          </CustomText>
          <TouchableOpacity activeOpacity={0.6}>
            <CustomText variant="medium" size={16} color={COLORS.primary}>
              See All
            </CustomText>
          </TouchableOpacity>
        </View>

        {newInProducts.length > 0 ? (
          <FlatList
            data={newInProducts}
            renderItem={renderProductCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.productsList}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <CustomText variant="book" size={14} color={COLORS.textSecondary}>
              {productsLoading ? 'Loading products...' : `No new products found for "${gender}".`}
            </CustomText>
          </View>
        )}
      </ScrollView>

      <Modal
        visible={genderModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setGenderModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setGenderModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <CustomText variant="bold" size={18} style={styles.modalTitle}>
              Select Category
            </CustomText>
            {([Gender.MEN, Gender.WOMEN, Gender.KIDS] as const).map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.genderOption,
                  gender === item && styles.genderOptionSelected,
                ]}
                onPress={() => handleGenderSelect(item)}
              >
                <CustomText
                  variant={gender === item ? 'bold' : 'book'}
                  size={16}
                  color={gender === item ? COLORS.primary : COLORS.textPrimary}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </CustomText>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;
