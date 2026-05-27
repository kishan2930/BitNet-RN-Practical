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
  // ==================== MEN'S PRODUCTS ====================
  // TOP SELLING - MEN
  {
    id: 'prod_harrington_jacket',
    title: "Men's Harrington Jacket",
    price: 148.00,
    originalPrice: null,
    imageUrl: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=500&q=80',
    categoryId: 'hoodies',
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

  // NEW IN - MEN
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

  // OTHER - MEN
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

  // ==================== WOMEN'S PRODUCTS ====================
  // TOP SELLING - WOMEN
  {
    id: 'prod_women_fleece_hoodie',
    title: "Women's Fleece Pullover Hoodie",
    price: 85.00,
    originalPrice: null,
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=500&q=80',
    categoryId: 'hoodies',
    gender: 'women',
    isTopSelling: true,
    isNewIn: false,
    rating: 4.7,
    reviewsCount: 92,
    description: 'This women fleece pullover offers comfortable warmth with a classic silhouette, perfect for lounging or running errands.',
  },
  {
    id: 'prod_women_air_max',
    title: "Women's Air Max Sneakers",
    price: 130.00,
    originalPrice: 160.00,
    imageUrl: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=500&q=80',
    categoryId: 'shoes',
    gender: 'women',
    isTopSelling: true,
    isNewIn: false,
    rating: 4.8,
    reviewsCount: 205,
    description: 'Featuring the iconic Air unit underfoot, these sneakers combine modern style with lightweight, responsive comfort.',
  },
  {
    id: 'prod_women_club_shorts',
    title: "Women's Club Sweat Shorts",
    price: 45.00,
    originalPrice: null,
    imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=500&q=80',
    categoryId: 'shorts',
    gender: 'women',
    isTopSelling: true,
    isNewIn: false,
    rating: 4.5,
    reviewsCount: 46,
    description: 'Stay relaxed in these casual French terry sweat shorts, featuring an elastic tie waistband and side slash pockets.',
  },

  // NEW IN - WOMEN
  {
    id: 'prod_women_tote_bag',
    title: "Women's Premium Tote Bag",
    price: 95.00,
    originalPrice: null,
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=500&q=80',
    categoryId: 'bags',
    gender: 'women',
    isTopSelling: false,
    isNewIn: true,
    rating: 4.6,
    reviewsCount: 28,
    description: 'A spacious, stylish tote bag made of vegan leather. Features zippered pockets and double carry handles.',
  },
  {
    id: 'prod_women_running_shorts',
    title: "Women's Dri-FIT Shorts",
    price: 40.00,
    originalPrice: 50.00,
    imageUrl: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=500&q=80',
    categoryId: 'shorts',
    gender: 'women',
    isTopSelling: false,
    isNewIn: true,
    rating: 4.7,
    reviewsCount: 73,
    description: 'Designed for running, these sweat-wicking shorts feature mesh side panels to keep you cool and dry.',
  },

  // OTHER - WOMEN
  {
    id: 'prod_women_sunglasses',
    title: "Women's Sports Sunglasses",
    price: 50.00,
    originalPrice: null,
    imageUrl: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=500&q=80',
    categoryId: 'accessories',
    gender: 'women',
    isTopSelling: false,
    isNewIn: false,
    rating: 4.4,
    reviewsCount: 15,
    description: 'Polarized athletic sunglasses with anti-slip nose pads, ideal for outdoor workouts, running, or cycling.',
  },
  {
    id: 'prod_women_crop_hoodie',
    title: "Women's Oversized Crop Hoodie",
    price: 95.00,
    originalPrice: null,
    imageUrl: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=500&q=80',
    categoryId: 'hoodies',
    gender: 'women',
    isTopSelling: false,
    isNewIn: false,
    rating: 4.9,
    reviewsCount: 64,
    description: 'Featuring a cropped cut and dropped shoulders, this cozy hoodie blends modern streetwear vibe with lounge comfort.',
  },
  {
    id: 'prod_women_gym_duffel',
    title: "Women's Training Duffel",
    price: 65.00,
    originalPrice: null,
    imageUrl: 'https://images.unsplash.com/photo-1622560480654-d96214fdc887?auto=format&fit=crop&w=500&q=80',
    categoryId: 'bags',
    gender: 'women',
    isTopSelling: false,
    isNewIn: false,
    rating: 4.6,
    reviewsCount: 39,
    description: 'A spacious duffel bag with a dedicated ventilated shoe compartment and water-resistant fabric.',
  },

  // ==================== KIDS' PRODUCTS ====================
  // TOP SELLING - KIDS
  {
    id: 'prod_kids_zip_hoodie',
    title: "Kids' Fleece Zip Hoodie",
    price: 55.00,
    originalPrice: null,
    imageUrl: 'https://images.unsplash.com/photo-1622290319146-7b63df48a635?auto=format&fit=crop&w=500&q=80',
    categoryId: 'hoodies',
    gender: 'kids',
    isTopSelling: true,
    isNewIn: false,
    rating: 4.8,
    reviewsCount: 51,
    description: 'Super soft, warm fleece zip hoodie for children, designed with ribbed cuffs and split kangaroo pockets.',
  },
  {
    id: 'prod_kids_lightweight_sneakers',
    title: "Kids' Star Runner Sneakers",
    price: 65.00,
    originalPrice: 85.00,
    imageUrl: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=500&q=80',
    categoryId: 'shoes',
    gender: 'kids',
    isTopSelling: true,
    isNewIn: false,
    rating: 4.6,
    reviewsCount: 77,
    description: 'Comfortable mesh sneakers with hook-and-loop straps, ideal for school sports and playground fun.',
  },

  // NEW IN - KIDS
  {
    id: 'prod_kids_backpack',
    title: "Kids' Classic School Backpack",
    price: 45.00,
    originalPrice: null,
    imageUrl: 'https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&w=500&q=80',
    categoryId: 'bags',
    gender: 'kids',
    isTopSelling: false,
    isNewIn: true,
    rating: 4.5,
    reviewsCount: 19,
    description: 'Perfect kid-sized school bag featuring double zippered sections and adjustable padded straps.',
  },
  {
    id: 'prod_kids_active_shorts',
    title: "Kids' Active Mesh Shorts",
    price: 28.00,
    originalPrice: null,
    imageUrl: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=500&q=80',
    categoryId: 'shorts',
    gender: 'kids',
    isTopSelling: false,
    isNewIn: true,
    rating: 4.7,
    reviewsCount: 32,
    description: 'Lightweight activewear mesh shorts built to keep kids dry, comfortable, and active.',
  },

  // OTHER - KIDS
  {
    id: 'prod_kids_sun_cap',
    title: "Kids' Metal Logo Cap",
    price: 22.00,
    originalPrice: null,
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=500&q=80',
    categoryId: 'accessories',
    gender: 'kids',
    isTopSelling: false,
    isNewIn: false,
    rating: 4.4,
    reviewsCount: 12,
    description: 'Adjustable strap-back cap for kids with metallic logo and breathable eyelets for sun protection.',
  },
  {
    id: 'prod_kids_pullover_hoodie',
    title: "Kids' Sportswear Pullover",
    price: 50.00,
    originalPrice: null,
    imageUrl: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=500&q=80',
    categoryId: 'hoodies',
    gender: 'kids',
    isTopSelling: false,
    isNewIn: false,
    rating: 4.7,
    reviewsCount: 42,
    description: 'A cozy cotton pullover hoodie with relaxed fit, perfect for layering during chilly playground activities.',
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

    // 1. Check if we already have our representative product (e.g. prod_women_fleece_hoodie) seeded
    const representativeProduct = await productsCollection.doc('prod_women_fleece_hoodie').get();
    if (representativeProduct.data() && !force) {
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
