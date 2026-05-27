import { useState, useEffect } from 'react';
import { CategoryItem } from '@appTypes/main';
import { ProductService } from '@services/productService';

export const useCategories = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = ProductService.subscribeToCategories(data => {
      setCategories(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { categories, loading };
};
