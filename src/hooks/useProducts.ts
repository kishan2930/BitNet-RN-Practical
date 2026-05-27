import { useState, useEffect } from 'react';
import { ProductItem, Gender } from '@appTypes/main';
import { ProductService } from '@services/productService';

export const useProducts = (gender?: Gender, categoryId?: string) => {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = ProductService.subscribeToProducts(data => {
      let filtered = data;
      if (gender) {
        filtered = filtered.filter(p => p.gender === gender);
      }
      if (categoryId) {
        filtered = filtered.filter(p => p.categoryId === categoryId);
      }
      setProducts(filtered);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [gender, categoryId]);

  return { 
    products, 
    loading 
  };
};
