import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export interface CategoryItem {
  id: string;
  name: string;
  imageUrl: string;
  displayOrder: number;
}

export interface ProductItem {
  id: string;
  title: string;
  price: number;
  originalPrice: number | null;
  imageUrl: string;
  categoryId: string;
  gender: 'men' | 'women' | 'kids';
  isTopSelling: boolean;
  isNewIn: boolean;
  rating: number;
  reviewsCount: number;
  description: string;
}

export type HomeStackParamList = {
  HomeMain: undefined;
  Categories: undefined;
  CategoryProducts: { categoryId: string; categoryName: string };
};

export type HomeStackNavigationProp = NativeStackNavigationProp<HomeStackParamList>;
