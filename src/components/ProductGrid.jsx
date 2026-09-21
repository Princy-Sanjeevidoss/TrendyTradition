import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';

export default function ProductGrid({
  products,
  selectedCategory,
  onSelectCategory,
  onQuickView,
  onAddToCart,
  onBuyNow,
  wishlist,
  onToggleWishlist,
  searchQuery
}) {
  const [activeSubCategory, setActiveSubCategory] = useState('ALL');
  const [selectedSize, setSelectedSize] = useState('ALL');
  const [selectedFit, setSelectedFit] = useState('ALL');
  const [selectedCollection, setSelectedCollection] = useState('ALL');
  const [priceSort, setPriceSort] = useState('FEATURED'); // FEATURED, NEWEST, PRICE_LOW, PRICE_HIGH, POPULAR
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const shirtSubCategories = [
    'ALL', 'Formal Shirts', 'Casual Shirts', 'Linen Shirts', 'Cotton Shirts', 'Printed Shirts', 'Checks & Stripes', 'Premium Shirts'
  ];

  const tshirtSubCategories = [
    'ALL', 'Basic T-Shirts', 'Premium T-Shirts', 'Oversized T-Shirts', 'Polo T-Shirts', 'Printed T-Shirts', 'Graphic T-Shirts', 'Everyday Essentials'
  ];

  const availableSizes = ['ALL', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
  const fits = ['ALL', 'Tailored Slim', 'Regular Fit', 'Relaxed Fit', 'Oversized Fit'];
  const collections = ['ALL', 'THE FORMAL EDIT', 'THE CASUAL EDIT', 'THE ESSENTIALS', 'THE PREMIUM EDIT', 'THE WEEKEND EDIT'];

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Main category filter
      if (selectedCategory === 'SHIRTS' && p.category !== 'SHIRTS') return false;
      if (selectedCategory === 'T-SHIRTS' && p.category !== 'T-SHIRTS') return false;
      if (selectedCategory === 'NEW_ARRIVALS' && !p.isNewArrival) return false;

      // SubCategory filter
      if (activeSubCategory !== 'ALL' && p.subCategory !== activeSubCategory) return false;

      // Size filter
      if (selectedSize !== 'ALL' && !p.availableSizes.includes(selectedSize)) return false;

      // Fit filter
      if (selectedFit !== 'ALL' && p.fit !== selectedFit) return false;

      // Collection filter
      if (selectedCollection !== 'ALL' && p.collection !== selectedCollection) return false;

      // Search Query
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchCategory = p.category.toLowerCase().includes(q);
        const matchSub = p.subCategory.toLowerCase().includes(q);
        const matchFabric = p.fabric.toLowerCase().includes(q);
        const matchCollection = p.collection.toLowerCase().includes(q);
        if (!matchName && !matchCategory && !matchSub && !matchFabric && !matchCollection) return false;
      }

      return true;
    }).sort((a, b) => {
      if (priceSort === 'PRICE_LOW') return a.price - b.price;
      if (priceSort === 'PRICE_HIGH') return b.price - a.price;
      if (priceSort === 'POPULAR') return b.reviewsCount - a.reviewsCount;
      if (priceSort === 'NEWEST') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, selectedCategory, activeSubCategory, selectedSize, selectedFit, selectedCollection, priceSort, searchQuery]);

  const currentSubList = selectedCategory === 'SHIRTS'
    ? shirtSubCategories
    : selectedCategory === 'T-SHIRTS'
    ? tshirtSubCategories
    : ['ALL'];

  return (
    <section id="shop-catalog" className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        {/* Main Category Header Selector */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '2.5rem',
          textAlign: 'center'
        }}>
          <p className="section-subtitle">THE CATALOG</p>
          <h2 className="section-title">THE CURATED COLLECTION</h2>

          {/* Primary Equal Tabs: ALL, SHIRTS, T-SHIRTS */}
          <div style={{
            display: 'inline-flex',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-gold)',
            padding: '0.35rem',
            borderRadius: '2px',
            marginTop: '1rem',
            gap: '0.35rem'
          }}>
            <button
              onClick={() => { onSelectCategory('ALL'); setActiveSubCategory('ALL'); }}
              style={{
                padding: '0.7rem 1.8rem',
                fontSize: '0.8rem',
                fontWeight: '600',
                letterSpacing: '0.15em',
                color: selectedCategory === 'ALL' ? '#000' : 'var(--text-primary)',
                background: selectedCategory === 'ALL' ? 'var(--gold-primary)' : 'transparent',
                transition: 'all 0.25s ease'
              }}
            >
              ALL ITEMS ({products.length})
            </button>

            <button
              onClick={() => { onSelectCategory('SHIRTS'); setActiveSubCategory('ALL'); }}
              style={{
                padding: '0.7rem 1.8rem',
                fontSize: '0.8rem',
                fontWeight: '600',
                letterSpacing: '0.15em',
                color: selectedCategory === 'SHIRTS' ? '#000' : 'var(--text-primary)',
                background: selectedCategory === 'SHIRTS' ? 'var(--gold-primary)' : 'transparent',
                transition: 'all 0.25s ease'
              }}
            >
              SHIRTS ({products.filter(p => p.category === 'SHIRTS').length})
            </button>

            <button
              onClick={() => { onSelectCategory('T-SHIRTS'); setActiveSubCategory('ALL'); }}
              style={{
                padding: '0.7rem 1.8rem',
                fontSize: '0.8rem',
                fontWeight: '600',
                letterSpacing: '0.15em',
                color: selectedCategory === 'T-SHIRTS' ? '#000' : 'var(--text-primary)',
                background: selectedCategory === 'T-SHIRTS' ? 'var(--gold-primary)' : 'transparent',
                transition: 'all 0.25s ease'
              }}
            >
              T-SHIRTS ({products.filter(p => p.category === 'T-SHIRTS').length})
            </button>
          </div>
        </div>

        {/* Sub-Category Pills (if Shirts or T-Shirts selected) */}
        {selectedCategory !== 'ALL' && selectedCategory !== 'NEW_ARRIVALS' && (
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            overflowX: 'auto',
            paddingBottom: '1rem',
            marginBottom: '2rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {currentSubList.map((sub) => (
              <button
                key={sub}
                onClick={() => setActiveSubCategory(sub)}
                style={{
                  padding: '0.45rem 1.1rem',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  letterSpacing: '0.1em',
                  borderRadius: '20px',
                  border: activeSubCategory === sub ? '1px solid var(--gold-primary)' : '1px solid rgba(255,255,255,0.1)',
                  color: activeSubCategory === sub ? 'var(--gold-primary)' : 'var(--text-secondary)',
                  background: activeSubCategory === sub ? 'rgba(197, 160, 89, 0.12)' : 'var(--bg-secondary)',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                {sub}
              </button>
            ))}
          </div>
        )}

        {/* Filter & Sorting Action Bar */}
        <div style={{
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          padding: '1rem 0',
          borderTop: '1px solid var(--border-light)',
          borderBottom: '1px solid var(--border-light)',
          marginBottom: '2.5rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          {/* Left: Filter Toggle & Results Count */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <button
              onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                border: '1px solid var(--border-gold)',
                color: 'var(--gold-primary)',
                padding: '0.5rem 1rem',
                fontSize: '0.75rem',
                fontWeight: '600',
                letterSpacing: '0.12em',
                background: 'rgba(197, 160, 89, 0.05)'
              }}
            >
              <SlidersHorizontal size={16} /> FILTERS
            </button>

            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Showing <strong>{filteredProducts.length}</strong> styles
            </span>
          </div>

          {/* Right: Sorting Select */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', letterSpacing: '0.1em' }}>SORT BY:</span>
            <select
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value)}
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                color: 'var(--text-primary)',
                padding: '0.5rem 1rem',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-sans)',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="FEATURED">Featured</option>
              <option value="NEWEST">New Arrivals</option>
              <option value="PRICE_LOW">Price: Low to High</option>
              <option value="PRICE_HIGH">Price: High to Low</option>
              <option value="POPULAR">Popularity</option>
            </select>
          </div>
        </div>

        {/* Collapsible Filter Bar / Panel */}
        {filterDrawerOpen && (
          <div style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-gold)',
            padding: '1.5rem',
            marginBottom: '2.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            animation: 'fadeIn 0.3s ease'
          }}>
            {/* Filter by Size */}
            <div>
              <label style={{ fontSize: '0.7rem', color: 'var(--gold-primary)', letterSpacing: '0.15em', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>
                SIZE
              </label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-tertiary)', color: '#FFF', border: '1px solid var(--border-light)' }}
              >
                {availableSizes.map(sz => <option key={sz} value={sz}>{sz === 'ALL' ? 'All Sizes' : sz}</option>)}
              </select>
            </div>

            {/* Filter by Fit */}
            <div>
              <label style={{ fontSize: '0.7rem', color: 'var(--gold-primary)', letterSpacing: '0.15em', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>
                FIT SILHOUETTE
              </label>
              <select
                value={selectedFit}
                onChange={(e) => setSelectedFit(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-tertiary)', color: '#FFF', border: '1px solid var(--border-light)' }}
              >
                {fits.map(f => <option key={f} value={f}>{f === 'ALL' ? 'All Fits' : f}</option>)}
              </select>
            </div>

            {/* Filter by Collection */}
            <div>
              <label style={{ fontSize: '0.7rem', color: 'var(--gold-primary)', letterSpacing: '0.15em', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>
                EDITORIAL COLLECTION
              </label>
              <select
                value={selectedCollection}
                onChange={(e) => setSelectedCollection(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', background: 'var(--bg-tertiary)', color: '#FFF', border: '1px solid var(--border-light)' }}
              >
                {collections.map(c => <option key={c} value={c}>{c === 'ALL' ? 'All Collections' : c}</option>)}
              </select>
            </div>

            {/* Reset Filters */}
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button
                onClick={() => {
                  setSelectedSize('ALL');
                  setSelectedFit('ALL');
                  setSelectedCollection('ALL');
                  setActiveSubCategory('ALL');
                }}
                style={{
                  width: '100%',
                  padding: '0.55rem',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  color: 'var(--gold-primary)',
                  border: '1px solid var(--gold-primary)',
                  background: 'transparent',
                  fontWeight: '600'
                }}
              >
                RESET ALL FILTERS
              </button>
            </div>
          </div>
        )}

        {/* Product Grid Render */}
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 0' }}>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--text-secondary)' }}>
              No products found matching your current filter selection.
            </p>
            <button
              onClick={() => {
                onSelectCategory('ALL');
                setActiveSubCategory('ALL');
                setSelectedSize('ALL');
                setSelectedFit('ALL');
                setSelectedCollection('ALL');
              }}
              className="btn-outline-gold"
              style={{ marginTop: '1.5rem' }}
            >
              CLEAR FILTERS
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {filteredProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
                onBuyNow={onBuyNow}
                isWishlisted={wishlist.some(w => w.id === p.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
