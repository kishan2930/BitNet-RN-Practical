import firestore from '@react-native-firebase/firestore';

const CATEGORIES = [
  {
    id: 'hoodies',
    name: 'Hoodies',
    imageUrl: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=300&q=80',
    displayOrder: 1,
  },
  {
    id: 'shorts',
    name: 'Shorts',
    imageUrl: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=300&q=80',
    displayOrder: 2,
  },
  {
    id: 'shoes',
    name: 'Shoes',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&q=80',
    displayOrder: 3,
  },
  {
    id: 'bags',
    name: 'Bags',
    imageUrl: 'https://images.unsplash.com/photo-1622560480654-d96214fdc887?auto=format&fit=crop&w=300&q=80',
    displayOrder: 4,
  },
  {
    id: 'accessories',
    name: 'Accessories',
    imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=300&q=80',
    displayOrder: 5,
  },
];

const PRODUCTS = [
  // TOP SELLING
  {
    id: 'prod_harrington_jacket',
    title: "Men's Harrington Jacket",
    price: 148.00,
    originalPrice: null,
    imageUrl: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=500&q=80',
    categoryId: 'hoodies', // Put under hoodies for previewing or general browse
    gender: 'men',
    isTopSelling: true,
    isNewIn: false,
    rating: 4.8,
    reviewsCount: 84,
    description: 'A clean, classic layering piece, this Harrington jacket is crafted from soft cotton blend with a classic collar and full zip closure.',
  },
  {
    id: 'prod_cirro_slides',
    title: "Max Cirro Men's Slides",
    price: 55.00,
    originalPrice: 100.97,
    imageUrl: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=500&q=80',
    categoryId: 'shoes',
    gender: 'men',
    isTopSelling: true,
    isNewIn: false,
    rating: 4.5,
    reviewsCount: 142,
    description: 'Whether it is post-workout or a casual stroll, the Max Cirro Slides offer plush underfoot cushioning and a sporty strap design.',
  },
  {
    id: 'prod_club_fleece_shorts',
    title: "Men's Club Fleece Shorts",
    price: 66.00,
    originalPrice: null,
    imageUrl: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=500&q=80',
    categoryId: 'shorts',
    gender: 'men',
    isTopSelling: true,
    isNewIn: false,
    rating: 4.6,
    reviewsCount: 95,
    description: 'Made with soft fleece material, these shorts feature an elastic waistband, side pockets, and a clean, relaxed silhouette.',
  },

  // NEW IN
  {
    id: 'prod_sportswear_tee',
    title: "Nike Sportswear Essential Tee",
    price: 35.00,
    originalPrice: null,
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=500&q=80',
    categoryId: 'accessories',
    gender: 'men',
    isTopSelling: false,
    isNewIn: true,
    rating: 4.4,
    reviewsCount: 38,
    description: 'An everyday classic tee made from lightweight, breathable cotton for ultimate comfort.',
  },
  {
    id: 'prod_fleece_joggers',
    title: "Nike Club Fleece Joggers",
    price: 75.00,
    originalPrice: 90.00,
    imageUrl: 'https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&w=500&q=80',
    categoryId: 'shorts',
    gender: 'men',
    isTopSelling: false,
    isNewIn: true,
    rating: 4.7,
    reviewsCount: 110,
    description: 'A wardrobe staple, these joggers combine classic style with the soft comfort of fleece for an elevated, everyday look.',
  },

  // CATEGORY SPECIFIC: HOODIES
  {
    id: 'prod_fleece_pullover_green',
    title: "Men's Fleece Pullover Hoodie",
    price: 100.00,
    originalPrice: null,
    imageUrl: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=500&q=80',
    categoryId: 'hoodies',
    gender: 'men',
    isTopSelling: false,
    isNewIn: false,
    rating: 4.9,
    reviewsCount: 240,
    description: 'Stay warm and stylish in this premium green fleece pullover. Features a drawstring hood and kangaroo front pocket.',
  },
  {
    id: 'prod_skate_hoodie_black',
    title: 'Fleece Pullover Skate Hoodie',
    price: 150.97,
    originalPrice: null,
    imageUrl: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=500&q=80',
    categoryId: 'hoodies',
    gender: 'men',
    isTopSelling: false,
    isNewIn: false,
    rating: 4.7,
    reviewsCount: 198,
    description: 'Designed specifically for skaters, this durable pullover hoodie offers freedom of movement and extra reinforcement.',
  },
  {
    id: 'prod_skate_hoodie_yellow',
    title: 'Fleece Skate Hoodie',
    price: 110.00,
    originalPrice: null,
    imageUrl: 'https://images.unsplash.com/photo-1609873814058-a8928924184a?auto=format&fit=crop&w=500&q=80',
    categoryId: 'hoodies',
    gender: 'men',
    isTopSelling: false,
    isNewIn: false,
    rating: 4.6,
    reviewsCount: 75,
    description: 'Bright and energetic, this yellow skate hoodie is crafted from breathable loopback French terry cotton.',
  },
  {
    id: 'prod_ice_dye_hoodie',
    title: "Men's Ice-Dye Pullover Hoodie",
    price: 128.97,
    originalPrice: null,
    imageUrl: 'https://images.unsplash.com/photo-1563170351-be82bc888bb4?auto=format&fit=crop&w=500&q=80',
    categoryId: 'hoodies',
    gender: 'men',
    isTopSelling: false,
    isNewIn: false,
    rating: 4.8,
    reviewsCount: 52,
    description: 'Each hoodie features a unique ice-dye pattern, making it a one-of-a-kind addition to your sportswear rotation.',
  },
];

/**
 * Seeds the Firestore database with initial categories and products.
 * Checks for existing categories first to prevent double seeding.
 */
export const seedFirestoreData = async (force = false) => {
  try {
    const categoriesCollection = firestore().collection('clot_categories');
    const productsCollection = firestore().collection('clot_products');

    // 1. Check if we already have categories seeded
    const categorySnapshot = await categoriesCollection.limit(1).get();
    if (!categorySnapshot.empty && !force) {
      console.log('Firestore is already seeded with Clot categories and products. Skipping.');
      return;
    }

    console.log('Seeding Firestore with Clot categories...');
    // Seed Categories
    const categoryPromises = CATEGORIES.map((category) =>
      categoriesCollection.doc(category.id).set(category)
    );
    await Promise.all(categoryPromises);
    console.log('Successfully seeded categories.');

    console.log('Seeding Firestore with Clot products...');
    // Seed Products
    const productPromises = PRODUCTS.map((product) =>
      productsCollection.doc(product.id).set(product)
    );
    await Promise.all(productPromises);
    console.log('Successfully seeded products.');
    
  } catch (error) {
    console.error('Error seeding Firestore data:', error);
  }
};
