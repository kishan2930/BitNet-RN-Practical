import firestore from '@react-native-firebase/firestore';
import { CategoryItem, ProductItem, Gender } from '@appTypes/main';

export const ProductService = {
  /**
   * Listens to categories in real-time
   */
  subscribeToCategories: (onUpdate: (categories: CategoryItem[]) => void) => {
    return firestore()
      .collection('clot_categories')
      .orderBy('displayOrder', 'asc')
      .onSnapshot(
        snapshot => {
          const cats = snapshot.docs.map(doc => ({
            id: doc.id,
            ...(doc.data() as Omit<CategoryItem, 'id'>),
          }));
          onUpdate(cats);
        },
        error => {
          console.error('Error fetching categories:', error);
          onUpdate([]);
        }
      );
  },

  /**
   * Listens to products in real-time
   */
  subscribeToProducts: (onUpdate: (products: ProductItem[]) => void) => {
    return firestore()
      .collection('clot_products')
      .onSnapshot(
        snapshot => {
          const prods = snapshot.docs.map(doc => ({
            id: doc.id,
            ...(doc.data() as Omit<ProductItem, 'id'>),
          }));
          onUpdate(prods);
        },
        error => {
          console.error('Error fetching products:', error);
          onUpdate([]);
        }
      );
  },

  /**
   * Fetches products for a specific category and gender
   */
  getProductsByCategory: async (categoryId: string, gender: Gender): Promise<ProductItem[]> => {
    const snapshot = await firestore()
      .collection('clot_products')
      .where('categoryId', '==', categoryId)
      .where('gender', '==', gender)
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<ProductItem, 'id'>),
    }));
  },
};
