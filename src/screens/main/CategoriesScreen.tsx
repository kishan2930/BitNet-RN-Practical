import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';
import firestore from '@react-native-firebase/firestore';
import CustomText from '@components/CustomText';
import { CategoryItem, Gender } from '@appTypes/main';
import { categoriesStyles as styles } from '@styles/main/categoriesStyles';
import { COLORS } from '@constants/theme';

const CategoriesScreen = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { gender } = route.params || { gender: Gender.MEN };
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to Categories in real-time
    const unsubscribe = firestore()
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
          setLoading(false);
        },
        (error) => {
          console.error('Error fetching categories in CategoriesScreen:', error);
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, []);

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
          Shop by Categories
        </CustomText>

        {/* Empty view to center the title */}
        <View style={styles.headerPlaceholder} />
      </View>

      {/* Categories Vertical List */}
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
