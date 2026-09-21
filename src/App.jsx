import React, { useState, useEffect } from 'react';
import { INITIAL_PRODUCTS, INITIAL_ORDERS } from './data/mockData';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CategoryBanners from './components/CategoryBanners';
import ProductGrid from './components/ProductGrid';
import ProductDetailModal from './components/ProductDetailModal';
import CraftsmanshipSection from './components/CraftsmanshipSection';
import LookbookSection from './components/LookbookSection';
import CollectionsSection from './components/CollectionsSection';
import BrandStorySection from './components/BrandStorySection';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderTrackingModal from './components/OrderTrackingModal';
import CustomerAccountModal from './components/CustomerAccountModal';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';

export default function App() {
  // --- LOCAL STORAGE PERSISTENCE STATE ---
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('tt_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('tt_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('tt_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('tt_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // --- UI NAVIGATION & MODALS STATE ---
  const [activeNav, setActiveNav] = useState('HOME');
  const [selectedCategory, setSelectedCategory] = useState('ALL'); // ALL, SHIRTS, T-SHIRTS, NEW_ARRIVALS
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // Modals & Drawers Visibility
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [buyNowProduct, setBuyNowProduct] = useState(null); // If direct buy now button pressed
  const [accountOpen, setAccountOpen] = useState(false);
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [checkoutTotals, setCheckoutTotals] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('tt_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('tt_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('tt_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('tt_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Toast notification helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // --- CART ACTIONS ---
  const handleAddToCart = (product, color, size) => {
    const itemSize = size || product.availableSizes[0] || 'M';
    const itemColor = color || product.colors[0]?.name || 'Standard';

    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        item => item.id === product.id && item.selectedSize === itemSize && item.selectedColor === itemColor
      );

      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        return [...prevCart, {
          id: product.id,
          name: product.name,
          category: product.category,
          subCategory: product.subCategory,
          price: product.price,
          selectedSize: itemSize,
          selectedColor: itemColor,
          quantity: 1,
          image: product.images[0]
        }];
      }
    });

    showToast(`Added ${product.name} (${itemSize}) to Bag`);
  };

  const handleUpdateCartQty = (index, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(index);
    } else {
      setCart((prev) => {
        const updated = [...prev];
        updated[index].quantity = newQty;
        return updated;
      });
    }
  };

  const handleRemoveCartItem = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  // --- BUY NOW ACTION ---
  const handleBuyNow = (product, color, size) => {
    const itemSize = size || product.availableSizes[0] || 'M';
    const itemColor = color || product.colors[0]?.name || 'Standard';

    setBuyNowProduct({
      ...product,
      selectedSize: itemSize,
      selectedColor: itemColor
    });
    setCheckoutOpen(true);
  };

  // --- WISHLIST ACTIONS ---
  const handleToggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        showToast(`Removed ${product.name} from Wishlist`);
        return prev.filter(item => item.id !== product.id);
      } else {
        showToast(`Saved ${product.name} to Wishlist`);
        return [...prev, product];
      }
    });
  };

  // --- ORDER PLACEMENT & STOCK DEDUCTION ---
  const handleCompleteOrder = (newOrder) => {
    setOrders(prev => [newOrder, ...prev]);

    // Deduct inventory stock for ordered items
    setProducts((prevProducts) => {
      return prevProducts.map((prod) => {
        const matchingItems = newOrder.items.filter(it => it.productId === prod.id || it.id === prod.id);
        if (matchingItems.length === 0) return prod;

        const updatedStock = { ...prod.stock };
        matchingItems.forEach(item => {
          const key = `${item.color || item.selectedColor}-${item.size || item.selectedSize}`;
          if (updatedStock[key] !== undefined) {
            updatedStock[key] = Math.max(0, updatedStock[key] - item.quantity);
          }
        });
        return { ...prod, stock: updatedStock };
      });
    });

    // Clear cart if completed from cart
    if (!buyNowProduct) {
      setCart([]);
    }
    setBuyNowProduct(null);
  };

  // --- ADMIN ACTIONS ---
  const handleAddProduct = (newProd) => {
    setProducts(prev => [newProd, ...prev]);
    showToast(`Added new product: ${newProd.name}`);
  };

  const handleUpdateProduct = (updatedProd) => {
    setProducts(prev => prev.map(p => p.id === updatedProd.id ? updatedProd : p));
    showToast(`Updated product: ${updatedProd.name}`);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    showToast(`Deleted product from catalog`);
  };

  const handleUpdateStock = (productId, variantKey, newCount) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return { ...p, stock: { ...p.stock, [variantKey]: newCount } };
      }
      return p;
    }));
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    showToast(`Updated Order #${orderId} status to ${newStatus}`);
  };

  const handleResetDemoData = () => {
    if (window.confirm('Reset all catalog products, inventory stock, and orders to original defaults?')) {
      localStorage.removeItem('tt_products');
      localStorage.removeItem('tt_orders');
      setProducts(INITIAL_PRODUCTS);
      setOrders(INITIAL_ORDERS);
      showToast('Catalog & Inventory reset to demo defaults');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)' }}>
      {/* Toast Banner */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 2000,
          background: 'var(--bg-secondary)',
          border: '1px solid var(--gold-primary)',
          color: 'var(--gold-primary)',
          padding: '0.9rem 1.5rem',
          fontSize: '0.85rem',
          fontWeight: '600',
          letterSpacing: '0.08em',
          boxShadow: 'var(--shadow-gold)',
          animation: 'slideUp 0.3s ease'
        }}>
          {toastMessage}
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        cartCount={cart.reduce((a, c) => a + c.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setAccountOpen(true)}
        onOpenAccount={() => setAccountOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onCategorySelect={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('shop-catalog');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Hero Section */}
      <HeroSection
        onShopShirts={() => {
          setSelectedCategory('SHIRTS');
          const el = document.getElementById('shop-catalog');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onShopTshirts={() => {
          setSelectedCategory('T-SHIRTS');
          const el = document.getElementById('shop-catalog');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Shop by Category Dual Panels */}
      <CategoryBanners
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('shop-catalog');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Product Catalog Grid (Shirts & T-Shirts) */}
      <ProductGrid
        products={products}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        onQuickView={(prod) => setQuickViewProduct(prod)}
        onAddToCart={(prod, col) => handleAddToCart(prod, col)}
        onBuyNow={(prod, col) => handleBuyNow(prod, col)}
        wishlist={wishlist}
        onToggleWishlist={handleToggleWishlist}
        searchQuery={searchQuery}
      />

      {/* Craftsmanship Editorial Section */}
      <CraftsmanshipSection />

      {/* Curated Editions Collections */}
      <CollectionsSection
        onSelectCollection={(colName) => {
          setSelectedCategory('ALL');
          const el = document.getElementById('shop-catalog');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Editorial Lookbook */}
      <LookbookSection
        onSelectLook={(look) => {
          const featuredProd = products.find(p => p.id === look.featuredProducts[0]);
          if (featuredProd) setQuickViewProduct(featuredProd);
        }}
      />

      {/* Brand Story Atelier Section */}
      <BrandStorySection />

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          const el = document.getElementById('shop-catalog');
          el?.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenTracking={() => setTrackingOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* --- MODALS & DRAWERS --- */}

      {/* Product Quick View / Details Modal */}
      {quickViewProduct && (
        <ProductDetailModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={(prod, col, sz) => {
            handleAddToCart(prod, col, sz);
            setQuickViewProduct(null);
          }}
          onBuyNow={(prod, col, sz) => {
            setQuickViewProduct(null);
            handleBuyNow(prod, col, sz);
          }}
          isWishlisted={wishlist.some(w => w.id === quickViewProduct.id)}
          onToggleWishlist={handleToggleWishlist}
        />
      )}

      {/* Cart Slide-Out Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={(totals) => {
          setCheckoutTotals(totals);
          setBuyNowProduct(null);
          setCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => {
          setCheckoutOpen(false);
          setBuyNowProduct(null);
        }}
        cart={cart}
        checkoutProduct={buyNowProduct}
        totals={checkoutTotals}
        onCompleteOrder={handleCompleteOrder}
      />

      {/* Live Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={trackingOpen}
        onClose={() => setTrackingOpen(false)}
        orders={orders}
      />

      {/* Customer Account & Wishlist Modal */}
      <CustomerAccountModal
        isOpen={accountOpen}
        onClose={() => setAccountOpen(false)}
        orders={orders}
        wishlist={wishlist}
        onTrackOrder={(ord) => {
          setAccountOpen(false);
          setTrackingOpen(true);
        }}
        onRemoveFromWishlist={handleToggleWishlist}
      />

      {/* Admin Executive Dashboard Modal */}
      <AdminDashboard
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        products={products}
        orders={orders}
        onAddProduct={handleAddProduct}
        onUpdateProduct={handleUpdateProduct}
        onDeleteProduct={handleDeleteProduct}
        onUpdateStock={handleUpdateStock}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onResetDemoData={handleResetDemoData}
      />
    </div>
  );
}
