import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export enum Gender {
  MEN = 'men',
  WOMEN = 'women',
  KIDS = 'kids',
}

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
  gender: Gender;
  isTopSelling: boolean;
  isNewIn: boolean;
  rating: number;
  reviewsCount: number;
  description: string;
}

export type HomeStackParamList = {
  HomeMain: undefined;
  Categories: { gender: Gender };
  CategoryProducts: { categoryId: string; categoryName: string; gender: Gender };
};

export type HomeStackNavigationProp = NativeStackNavigationProp<HomeStackParamList>;
