import React, { useEffect, useState } from 'react';
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
import firestore from '@react-native-firebase/firestore';
import { useAuth } from '@services/AuthContext';
import { seedFirestoreData } from '@utils/firestoreSeeder';
import { COLORS } from '@constants/theme';
import CustomText from '@components/CustomText';
import { CategoryItem, ProductItem, Gender } from '@appTypes/main';
import { homeStyles as styles } from '@styles/main/homeStyles';


const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const { user } = useAuth();

  // Seeding and Fetching States
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [gender, setGender] = useState<Gender>(Gender.MEN);
  const [genderModalVisible, setGenderModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const initAndFetch = async () => {
      try {
        setLoading(true);
        // Trigger seeder first (checks if already seeded internally)
        await seedFirestoreData();

        // Listen to Categories in real-time
        const unsubscribeCategories = firestore()
          .collection('clot_categories')
          .orderBy('displayOrder', 'asc')
          .onSnapshot(
            (snapshot) => {
              if (snapshot) {
                const cats = snapshot.docs.map((doc) => ({
                  id: doc.id,
                  ...(doc.data() as Omit<CategoryItem, 'id'>),
                }));
                setCategories(cats);
              }
            },
            (error) => console.error('Error fetching categories:', error)
          );

        // Listen to Products in real-time
        const unsubscribeProducts = firestore()
          .collection('clot_products')
          .onSnapshot(
            (snapshot) => {
              if (snapshot) {
                const prods = snapshot.docs.map((doc) => ({
                  id: doc.id,
                  ...(doc.data() as Omit<ProductItem, 'id'>),
                }));
                setProducts(prods);
              }
            },
            (error) => console.error('Error fetching products:', error)
          );

        setLoading(false);

        return () => {
          unsubscribeCategories();
          unsubscribeProducts();
        };
      } catch (err) {
        console.error('Error in initAndFetch:', err);
        setLoading(false);
      }
    };

    initAndFetch();
  }, []);

  // Filter lists locally based on gender selection and search query
  const filteredProducts = products.filter(
    (p) =>
      p.gender === gender &&
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const topSellingProducts = filteredProducts.filter((p) => p.isTopSelling);
  const newInProducts = filteredProducts.filter((p) => p.isNewIn);

  const toggleFavorite = (productId: string) => {
    if (favorites.includes(productId)) {
      setFavorites(favorites.filter((id) => id !== productId));
    } else {
      setFavorites([...favorites, productId]);
    }
  };

  const handleGenderSelect = (selectedGender: Gender) => {
    setGender(selectedGender);
    setGenderModalVisible(false);
  };

  // Render a Category Icon
  const renderCategoryIcon = ({ item }: { item: CategoryItem }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate('CategoryProducts', {
          categoryId: item.id,
          categoryName: item.name,
          gender,
        })
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

  // Render a Product Card
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

        {/* Product Info */}
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
        <Image source={{ uri: userAvatar }} style={styles.profileAvatar} />

        <TouchableOpacity
          style={styles.genderSelector}
          activeOpacity={0.7}
          onPress={() => setGenderModalVisible(true)}
        >
          <CustomText variant="bold" size={16} style={styles.genderText}>
            {gender.charAt(0).toUpperCase() + gender.slice(1)}{' '}
          </CustomText>
          <ChevronDown size={16} color={COLORS.textPrimary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.cartButton} activeOpacity={0.8}>
          <ShoppingBag size={18} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <Search size={18} color={COLORS.textSecondary} style={styles.searchIcon} />
          <TextInput
            placeholder="Search"
            placeholderTextColor={COLORS.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
        </View>

        {/* Categories Section */}
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

        {/* Top Selling Section */}
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
              No top selling products found for "{gender}".
            </CustomText>
          </View>
        )}

        {/* New In Section */}
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
              No new products found for "{gender}".
            </CustomText>
          </View>
        )}
      </ScrollView>

      {/* Gender Dropdown Selection Modal */}
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
