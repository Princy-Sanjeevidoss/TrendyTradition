// Mock Data for TRENDYTRADITION Luxury Menswear

export const INITIAL_PRODUCTS = [
  // --- SHIRTS ---
  {
    id: "shirt-01",
    name: "Royal Oxford Formal Shirt",
    category: "SHIRTS",
    subCategory: "Formal Shirts",
    price: 3499,
    originalPrice: 4299,
    rating: 4.9,
    reviewsCount: 128,
    isNewArrival: true,
    isFeatured: true,
    collection: "THE FORMAL EDIT",
    fit: "Tailored Slim",
    fabric: "100% Egyptian Giza Cotton (80s Two-Ply)",
    description: "Crafted from elite Egyptian Giza cotton with a crisp royal oxford weave. Engineered with Italian mother-of-pearl buttons, split back yoke, and dual-fused convertible cuffs for an impeccable silhouette in boardroom meetings.",
    careInstructions: "Machine wash cold inside out with mild detergent. Warm iron while damp. Dry clean recommended for optimal press longevity.",
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Crisp White", hex: "#FFFFFF" },
      { name: "Powder Blue", hex: "#B0C4DE" },
      { name: "Midnight Navy", hex: "#1A2536" }
    ],
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=1000"
    ],
    stock: {
      "Crisp White-S": 12, "Crisp White-M": 25, "Crisp White-L": 18, "Crisp White-XL": 10, "Crisp White-XXL": 5,
      "Powder Blue-S": 8, "Powder Blue-M": 15, "Powder Blue-L": 12, "Powder Blue-XL": 6, "Powder Blue-XXL": 4,
      "Midnight Navy-S": 10, "Midnight Navy-M": 20, "Midnight Navy-L": 15, "Midnight Navy-XL": 8, "Midnight Navy-XXL": 3
    }
  },
  {
    id: "shirt-02",
    name: "Pure French Riviera Linen Shirt",
    category: "SHIRTS",
    subCategory: "Linen Shirts",
    price: 3999,
    originalPrice: 4899,
    rating: 4.8,
    reviewsCount: 94,
    isNewArrival: true,
    isFeatured: true,
    collection: "THE WEEKEND EDIT",
    fit: "Relaxed Fit",
    fabric: "100% Pure Normandy Flax Linen",
    description: "Lightweight, breathable luxury crafted from certified organic Normandy flax. Garment-washed for instant softness that naturally character-wrinkles into effortless coastal luxury.",
    careInstructions: "Hand wash or gentle machine cycle in cool water. Hang dry in shade. Do not tumble dry.",
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Natural Sand", hex: "#D7C4B7" },
      { name: "Sage Olive", hex: "#708238" },
      { name: "Pristine White", hex: "#FDFBF7" }
    ],
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?auto=format&fit=crop&q=80&w=1000"
    ],
    stock: {
      "Natural Sand-S": 5, "Natural Sand-M": 14, "Natural Sand-L": 10, "Natural Sand-XL": 8, "Natural Sand-XXL": 2,
      "Sage Olive-S": 6, "Sage Olive-M": 11, "Sage Olive-L": 9, "Sage Olive-XL": 4, "Sage Olive-XXL": 3,
      "Pristine White-S": 10, "Pristine White-M": 18, "Pristine White-L": 16, "Pristine White-XL": 9, "Pristine White-XXL": 5
    }
  },
  {
    id: "shirt-03",
    name: "Artisanal Paisley Printed Silk-Cotton Shirt",
    category: "SHIRTS",
    subCategory: "Printed Shirts",
    price: 3799,
    originalPrice: 4499,
    rating: 4.7,
    reviewsCount: 76,
    isNewArrival: false,
    isFeatured: true,
    collection: "THE PREMIUM EDIT",
    fit: "Regular Fit",
    fabric: "70% Cotton, 30% Mulberry Silk",
    description: "An opulent statement piece featuring hand-designed heritage paisley motifs printed on silk-infused cotton. Finished with subtle gold-accented buttons and a curved hem suitable for untucked elegance.",
    careInstructions: "Dry clean only. Cool iron on reverse using press cloth.",
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Espresso & Gold", hex: "#3B2F2F" },
      { name: "Deep Amber", hex: "#7E3817" }
    ],
    images: [
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=1000"
    ],
    stock: {
      "Espresso & Gold-S": 7, "Espresso & Gold-M": 12, "Espresso & Gold-L": 10, "Espresso & Gold-XL": 5, "Espresso & Gold-XXL": 2,
      "Deep Amber-S": 4, "Deep Amber-M": 9, "Deep Amber-L": 8, "Deep Amber-XL": 3, "Deep Amber-XXL": 1
    }
  },
  {
    id: "shirt-04",
    name: "Classic Bengal Striped Casual Shirt",
    category: "SHIRTS",
    subCategory: "Checks & Stripes",
    price: 2999,
    originalPrice: 3599,
    rating: 4.9,
    reviewsCount: 152,
    isNewArrival: false,
    isFeatured: false,
    collection: "THE CASUAL EDIT",
    fit: "Regular Fit",
    fabric: "100% Fine Poplin Cotton",
    description: "Versatile stripe patterns rendered on light poplin cotton. Designed with a button-down collar and soft unstructured cuffs for work-to-weekend transition.",
    careInstructions: "Machine wash lukewarm. Tumble dry low.",
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Navy/White", hex: "#1D2A44" },
      { name: "Charcoal/Ivory", hex: "#2E2E2E" }
    ],
    images: [
      "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=1000"
    ],
    stock: {
      "Navy/White-S": 15, "Navy/White-M": 30, "Navy/White-L": 25, "Navy/White-XL": 14, "Navy/White-XXL": 6,
      "Charcoal/Ivory-S": 10, "Charcoal/Ivory-M": 18, "Charcoal/Ivory-L": 12, "Charcoal/Ivory-XL": 7, "Charcoal/Ivory-XXL": 4
    }
  },
  {
    id: "shirt-05",
    name: "Executive Micro-Check Cotton Shirt",
    category: "SHIRTS",
    subCategory: "Formal Shirts",
    price: 3299,
    originalPrice: 3999,
    rating: 4.8,
    reviewsCount: 89,
    isNewArrival: true,
    isFeatured: false,
    collection: "THE FORMAL EDIT",
    fit: "Tailored Slim",
    fabric: "100% Supima Cotton",
    description: "Refined micro-check weave tailored from extra-long staple Supima cotton. Anti-wrinkle finish retains structure through full travel days.",
    careInstructions: "Machine wash cold. Medium heat iron.",
    availableSizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Sky Check", hex: "#4682B4" },
      { name: "Graphite Check", hex: "#36454F" }
    ],
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=1000"
    ],
    stock: {
      "Sky Check-S": 9, "Sky Check-M": 16, "Sky Check-L": 11, "Sky Check-XL": 5, "Sky Check-XXL": 2,
      "Graphite Check-S": 7, "Graphite Check-M": 14, "Graphite Check-L": 10, "Graphite Check-XL": 6, "Graphite Check-XXL": 3
    }
  },

  // --- T-SHIRTS ---
  {
    id: "tshirt-01",
    name: "Heavyweight 280 GSM Oversized T-Shirt",
    category: "T-SHIRTS",
    subCategory: "Oversized T-Shirts",
    price: 2199,
    originalPrice: 2799,
    rating: 4.9,
    reviewsCount: 210,
    isNewArrival: true,
    isFeatured: true,
    collection: "THE ESSENTIALS",
    fit: "Oversized Fit",
    fabric: "100% Combed Compact Heavyweight Cotton (280 GSM)",
    description: "Architectural silhouette cut from 280 GSM compact ring-spun cotton. Features dropped shoulders, a pre-shrunk anti-roll 1.25\" ribbed collar, and seamless side panels for street-luxury draping.",
    careInstructions: "Cold wash inside out. Lay flat to dry or tumble dry low speed. Warm iron avoiding print if applicable.",
    availableSizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    colors: [
      { name: "Stealth Black", hex: "#0F0F10" },
      { name: "Vintage Ivory", hex: "#F3EFE6" },
      { name: "Mocha Espresso", hex: "#3D312A" }
    ],
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=1000"
    ],
    stock: {
      "Stealth Black-S": 20, "Stealth Black-M": 35, "Stealth Black-L": 40, "Stealth Black-XL": 25, "Stealth Black-XXL": 15, "Stealth Black-XXXL": 8,
      "Vintage Ivory-S": 15, "Vintage Ivory-M": 28, "Vintage Ivory-L": 30, "Vintage Ivory-XL": 18, "Vintage Ivory-XXL": 10, "Vintage Ivory-XXXL": 5,
      "Mocha Espresso-S": 12, "Mocha Espresso-M": 22, "Mocha Espresso-L": 25, "Mocha Espresso-XL": 14, "Mocha Espresso-XXL": 8, "Mocha Espresso-XXXL": 4
    }
  },
  {
    id: "tshirt-02",
    name: "Luxury Mercerized Pima Cotton Polo T-Shirt",
    category: "T-SHIRTS",
    subCategory: "Polo T-Shirts",
    price: 2999,
    originalPrice: 3699,
    rating: 4.9,
    reviewsCount: 165,
    isNewArrival: true,
    isFeatured: true,
    collection: "THE PREMIUM EDIT",
    fit: "Tailored Fit",
    fabric: "100% Double-Mercerized Peruvian Pima Cotton",
    description: "Double-mercerized process creates a silky shine and rich depth of color. Features a self-fabric knit collar with clean hidden placket and contrast mother-of-pearl buttons.",
    careInstructions: "Machine wash cold delicate cycle. Dry flat. Do not bleach.",
    availableSizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    colors: [
      { name: "Obsidian Black", hex: "#121212" },
      { name: "Champagne Beige", hex: "#E6D7C3" },
      { name: "Deep Forest Green", hex: "#1B3B2B" }
    ],
    images: [
      "https://images.unsplash.com/photo-1625910513413-3fc215c0e176?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1000"
    ],
    stock: {
      "Obsidian Black-S": 10, "Obsidian Black-M": 20, "Obsidian Black-L": 25, "Obsidian Black-XL": 15, "Obsidian Black-XXL": 8, "Obsidian Black-XXXL": 4,
      "Champagne Beige-S": 8, "Champagne Beige-M": 16, "Champagne Beige-L": 18, "Champagne Beige-XL": 10, "Champagne Beige-XXL": 6, "Champagne Beige-XXXL": 2,
      "Deep Forest Green-S": 6, "Deep Forest Green-M": 14, "Deep Forest Green-L": 15, "Deep Forest Green-XL": 8, "Deep Forest Green-XXL": 4, "Deep Forest Green-XXXL": 2
    }
  },
  {
    id: "tshirt-03",
    name: "Minimalist Essential Crewneck T-Shirt",
    category: "T-SHIRTS",
    subCategory: "Basic T-Shirts",
    price: 1699,
    originalPrice: 1999,
    rating: 4.8,
    reviewsCount: 340,
    isNewArrival: false,
    isFeatured: false,
    collection: "THE ESSENTIALS",
    fit: "Regular Fit",
    fabric: "100% Organic Supima Cotton (200 GSM)",
    description: "The flawless foundational tee. Crafted with ultra-soft long staple organic Supima cotton that maintains shape and deep color wash after wash.",
    careInstructions: "Machine wash cold with like colors. Line dry recommended.",
    availableSizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    colors: [
      { name: "Optic White", hex: "#FFFFFF" },
      { name: "Charcoal Grey", hex: "#383838" },
      { name: "Oatmeal Heather", hex: "#E2DDD5" }
    ],
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1000"
    ],
    stock: {
      "Optic White-S": 30, "Optic White-M": 50, "Optic White-L": 60, "Optic White-XL": 40, "Optic White-XXL": 20, "Optic White-XXXL": 10,
      "Charcoal Grey-S": 25, "Charcoal Grey-M": 40, "Charcoal Grey-L": 45, "Charcoal Grey-XL": 30, "Charcoal Grey-XXL": 15, "Charcoal Grey-XXXL": 8,
      "Oatmeal Heather-S": 20, "Oatmeal Heather-M": 30, "Oatmeal Heather-L": 35, "Oatmeal Heather-XL": 20, "Oatmeal Heather-XXL": 10, "Oatmeal Heather-XXXL": 5
    }
  },
  {
    id: "tshirt-04",
    name: "Monogram Heritage Graphic T-Shirt",
    category: "T-SHIRTS",
    subCategory: "Graphic T-Shirts",
    price: 2399,
    originalPrice: 2899,
    rating: 4.7,
    reviewsCount: 88,
    isNewArrival: true,
    isFeatured: true,
    collection: "THE CASUAL EDIT",
    fit: "Relaxed Fit",
    fabric: "100% Heavyweight Cotton (240 GSM)",
    description: "Features subtle high-density rubberized crest embossing on the chest and refined typographic back print inspired by classical luxury architecture.",
    careInstructions: "Wash inside out. Do not iron directly on graphic motif.",
    availableSizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    colors: [
      { name: "Raw Espresso", hex: "#261E1A" },
      { name: "Stone Slate", hex: "#5C6267" }
    ],
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1000"
    ],
    stock: {
      "Raw Espresso-S": 10, "Raw Espresso-M": 20, "Raw Espresso-L": 22, "Raw Espresso-XL": 12, "Raw Espresso-XXL": 6, "Raw Espresso-XXXL": 3,
      "Stone Slate-S": 8, "Stone Slate-M": 15, "Stone Slate-L": 18, "Stone Slate-XL": 10, "Stone Slate-XXL": 5, "Stone Slate-XXXL": 2
    }
  },
  {
    id: "tshirt-05",
    name: "Elevated Textured Knit Resort Polo",
    category: "T-SHIRTS",
    subCategory: "Everyday Essentials",
    price: 3199,
    originalPrice: 3899,
    rating: 4.9,
    reviewsCount: 112,
    isNewArrival: false,
    isFeatured: true,
    collection: "THE WEEKEND EDIT",
    fit: "Relaxed Fit",
    fabric: "85% Combed Cotton, 15% Linen Texture Knit",
    description: "A hybrid between a knitted polo and casual resort tee. Breathable textured open-knit construction ideal for tropical luxury warm weather.",
    careInstructions: "Hand wash gently in cool water. Lay flat to dry on towel.",
    availableSizes: ["S", "M", "L", "XL", "XXL", "XXXL"],
    colors: [
      { name: "Ecru Ivory", hex: "#FAF3E0" },
      { name: "Terracotta Earth", hex: "#C86D51" }
    ],
    images: [
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1625910513413-3fc215c0e176?auto=format&fit=crop&q=80&w=1000"
    ],
    stock: {
      "Ecru Ivory-S": 12, "Ecru Ivory-M": 22, "Ecru Ivory-L": 25, "Ecru Ivory-XL": 15, "Ecru Ivory-XXL": 8, "Ecru Ivory-XXXL": 4,
      "Terracotta Earth-S": 9, "Terracotta Earth-M": 16, "Terracotta Earth-L": 18, "Terracotta Earth-XL": 10, "Terracotta Earth-XXL": 5, "Terracotta Earth-XXXL": 2
    }
  }
];

export const INITIAL_ORDERS = [
  {
    id: "TT-89421",
    customerName: "Vikramaditya Sharma",
    email: "vikram@example.com",
    phone: "+91 98765 43210",
    date: "2026-09-20T14:30:00Z",
    status: "SHIPPED", // ORDER PLACED -> CONFIRMED -> PACKED -> SHIPPED -> OUT FOR DELIVERY -> DELIVERED
    paymentMethod: "UPI (Google Pay)",
    paymentStatus: "PAID",
    totalAmount: 5698,
    trackingNumber: "BD9823014IN",
    courier: "BlueDart Express",
    estimatedDelivery: "24 Sep 2026",
    address: {
      addressLine: "Flat 402, Royal Residency, Indiranagar",
      area: "10th Main Road",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560038",
      landmark: "Near Metro Station"
    },
    items: [
      {
        productId: "shirt-01",
        name: "Royal Oxford Formal Shirt",
        category: "SHIRTS",
        color: "Crisp White",
        size: "M",
        price: 3499,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=1000"
      },
      {
        productId: "tshirt-01",
        name: "Heavyweight 280 GSM Oversized T-Shirt",
        category: "T-SHIRTS",
        color: "Stealth Black",
        size: "L",
        price: 2199,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1000"
      }
    ]
  },
  {
    id: "TT-89419",
    customerName: "Ananya Mehta",
    email: "ananya.m@example.com",
    phone: "+91 99887 76655",
    date: "2026-09-19T09:15:00Z",
    status: "DELIVERED",
    paymentMethod: "HDFC Credit Card",
    paymentStatus: "PAID",
    totalAmount: 3999,
    trackingNumber: "DLV7741029IN",
    courier: "Delhivery Surface",
    estimatedDelivery: "21 Sep 2026",
    address: {
      addressLine: "B-12, Pinnacle Towers, Bandra West",
      area: "Linking Road",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400050",
      landmark: "Opposite Shoppers Stop"
    },
    items: [
      {
        productId: "shirt-02",
        name: "Pure French Riviera Linen Shirt",
        category: "SHIRTS",
        color: "Natural Sand",
        size: "L",
        price: 3999,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=1000"
      }
    ]
  }
];

export const LOOKBOOK_ITEMS = [
  {
    id: "look-1",
    title: "The Executive Monolith",
    tagline: "Tailored Oxford Shirt + Raw Japanese Denim",
    category: "Work & Formal",
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=1200",
    featuredProducts: ["shirt-01"]
  },
  {
    id: "look-2",
    title: "Riviera Sundown",
    tagline: "Pure Normandy Linen Shirt + Cream Trousers",
    category: "Travel & Resort",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=1200",
    featuredProducts: ["shirt-02"]
  },
  {
    id: "look-3",
    title: "Minimalist Monochromes",
    tagline: "Heavyweight 280 GSM Tee + Tailored Trousers",
    category: "Weekend & Casual",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1200",
    featuredProducts: ["tshirt-01"]
  },
  {
    id: "look-4",
    title: "Club & Evening Elegance",
    tagline: "Mercerized Pima Polo + Silk-Blend Printed Shirt",
    category: "Evening & Festive",
    image: "https://images.unsplash.com/photo-1625910513413-3fc215c0e176?auto=format&fit=crop&q=80&w=1200",
    featuredProducts: ["tshirt-02", "shirt-03"]
  }
];

export const CRAFTSMANSHIP_POINTS = {
  SHIRTS: [
    {
      title: "Italian Mother-of-Pearl Buttons",
      description: "Carved from genuine Australian Pinctada oyster shell with 4-hole cross stitching.",
      image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "18 Stitches Per Inch Precision",
      description: "Single-needle ultra-fine side seams prevent puckering and maintain structural perfection.",
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "German Freudenberg Interlining",
      description: "Dual-fused collar stays ensuring sharp, non-wilt collars that keep crisp after 100+ washes.",
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Split Yoke Architecture",
      description: "Cut at a 45-degree angle to stretch naturally across shoulders for uninhibited movement.",
      image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?auto=format&fit=crop&q=80&w=600"
    }
  ],
  TSHIRTS: [
    {
      title: "280 GSM Heavyweight Ring-Spun Cotton",
      description: "Densely woven compact yarns provide high structure, zero sheer, and soft handfeel.",
      image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Pre-Shrunk 1.25\" Anti-Roll Ribbed Collar",
      description: "Reinforced twin-needle stitching prevents collar neck baconing or sagging over time.",
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Peruvian Double Mercerization",
      description: "Bio-polished and mercerized twice for satin drape, rich luster, and zero pilling.",
      image: "https://images.unsplash.com/photo-1625910513413-3fc215c0e176?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Internal Velvet Neck Taping",
      description: "Soft velvet back tape conceals seam friction for luxury comfort against skin.",
      image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=600"
    }
  ]
};
