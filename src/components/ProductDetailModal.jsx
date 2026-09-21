import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, Zap, Ruler, ShieldCheck, RefreshCw, Truck } from 'lucide-react';
import SizeGuideModal from './SizeGuideModal';

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist
}) {
  if (!product) return null;

  const [selectedImg, setSelectedImg] = useState(product.images[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.availableSizes[0] || 'M');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const imageLabels = ['Front View', 'Back View', 'Model View', 'Fabric Detail'];

  const handleAdd = () => {
    if (!selectedSize) {
      setErrorMsg('Please select a size');
      return;
    }
    setErrorMsg('');
    onAddToCart(product, selectedColor, selectedSize);
  };

  const handleBuy = () => {
    if (!selectedSize) {
      setErrorMsg('Please select a size before proceeding to Buy Now');
      return;
    }
    setErrorMsg('');
    onBuyNow(product, selectedColor, selectedSize);
  };

  return (
    <>
      <div className="modal-backdrop" onClick={onClose}>
        <div
          className="modal-content"
          onClick={(e) => e.stopPropagation()}
          style={{ maxWidth: '1100px', width: '92%', borderRadius: '0px', padding: 0 }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              zIndex: 30,
              background: 'rgba(0,0,0,0.6)',
              color: '#FFF',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.2)'
            }}
          >
            <X size={20} />
          </button>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          }}>
            {/* LEFT: Image Gallery */}
            <div style={{
              background: '#14161A',
              padding: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem'
            }}>
              {/* Main Preview Image */}
              <div style={{
                position: 'relative',
                width: '100%',
                paddingTop: '125%',
                overflow: 'hidden',
                backgroundColor: '#0D0E10'
              }}>
                <img
                  src={selectedImg || product.images[0]}
                  alt={product.name}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'brightness(0.95)'
                  }}
                />
              </div>

              {/* Thumbnails */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
                {product.images.slice(0, 4).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImg(img)}
                    style={{
                      position: 'relative',
                      paddingTop: '100%',
                      border: selectedImg === img ? '2px solid var(--gold-primary)' : '1px solid rgba(255,255,255,0.1)',
                      overflow: 'hidden',
                      cursor: 'pointer'
                    }}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${idx + 1}`}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                    <span style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: 'rgba(0,0,0,0.7)',
                      color: '#FFF',
                      fontSize: '0.55rem',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      padding: '2px 0'
                    }}>
                      {imageLabels[idx] || `View ${idx + 1}`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT: Product Specs & Actions */}
            <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column' }}>
              {/* Category & Rating */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.725rem', letterSpacing: '0.2em', color: 'var(--gold-primary)', fontWeight: '600', textTransform: 'uppercase' }}>
                  {product.category} • {product.subCategory}
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem', color: '#FFD700' }}>
                  <Star size={16} fill="#FFD700" />
                  <span style={{ color: '#FFF', fontWeight: '700' }}>{product.rating}</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#FAF8F5', marginBottom: '1rem', lineHeight: 1.1 }}>
                {product.name}
              </h2>

              {/* Pricing */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', textDecoration: 'line-through' }}>
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="badge badge-gold">
                    SAVE {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                )}
              </div>

              {/* Fit & Fabric Badges */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', padding: '0.4rem 0.8rem', fontSize: '0.75rem', color: '#FFF' }}>
                  <strong>FIT:</strong> {product.fit}
                </div>
                <div style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', padding: '0.4rem 0.8rem', fontSize: '0.75rem', color: '#FFF' }}>
                  <strong>FABRIC:</strong> {product.fabric}
                </div>
              </div>

              {/* Description */}
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                {product.description}
              </p>

              {/* Color Selector */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--gold-primary)', fontWeight: '600', display: 'block', marginBottom: '0.6rem' }}>
                  SELECT COLOR: <span style={{ color: '#FFF' }}>{selectedColor}</span>
                </label>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        padding: '0.4rem 0.8rem',
                        border: selectedColor === c.name ? '1px solid var(--gold-primary)' : '1px solid rgba(255,255,255,0.1)',
                        background: selectedColor === c.name ? 'rgba(197, 160, 89, 0.12)' : 'var(--bg-tertiary)',
                        color: '#FFF',
                        fontSize: '0.8rem'
                      }}
                    >
                      <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: c.hex, border: '1px solid #FFF' }} />
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                  <label style={{ fontSize: '0.75rem', letterSpacing: '0.15em', color: 'var(--gold-primary)', fontWeight: '600' }}>
                    SELECT SIZE:
                  </label>
                  <button
                    onClick={() => setShowSizeGuide(true)}
                    style={{ color: 'var(--gold-primary)', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: '600' }}
                  >
                    <Ruler size={14} /> SIZE GUIDE
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {product.availableSizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => { setSelectedSize(sz); setErrorMsg(''); }}
                      style={{
                        minWidth: '48px',
                        height: '44px',
                        border: selectedSize === sz ? '2px solid var(--gold-primary)' : '1px solid rgba(255,255,255,0.15)',
                        background: selectedSize === sz ? 'var(--gold-primary)' : 'var(--bg-tertiary)',
                        color: selectedSize === sz ? '#000' : '#FFF',
                        fontWeight: '700',
                        fontSize: '0.85rem',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {sz}
                    </button>
                  ))}
                </div>

                {errorMsg && (
                  <p style={{ color: '#FF5252', fontSize: '0.8rem', marginTop: '0.5rem', fontWeight: '600' }}>
                    {errorMsg}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: 'auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <button
                    onClick={handleAdd}
                    className="btn-secondary"
                    style={{ padding: '1.1rem 1rem', fontSize: '0.8rem' }}
                  >
                    <ShoppingBag size={16} /> ADD TO CART
                  </button>

                  <button
                    onClick={handleBuy}
                    className="btn-primary"
                    style={{ padding: '1.1rem 1rem', fontSize: '0.8rem' }}
                  >
                    <Zap size={16} /> BUY NOW
                  </button>
                </div>

                <button
                  onClick={() => onToggleWishlist(product)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: isWishlisted ? 'var(--gold-primary)' : 'var(--text-secondary)',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    letterSpacing: '0.1em'
                  }}
                >
                  <Heart size={16} fill={isWishlisted ? "var(--gold-primary)" : "none"} />
                  {isWishlisted ? 'IN YOUR WISHLIST' : 'ADD TO WISHLIST'}
                </button>
              </div>

              {/* Guarantees */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '0.5rem',
                borderTop: '1px solid var(--border-light)',
                marginTop: '1.75rem',
                paddingTop: '1rem',
                fontSize: '0.675rem',
                color: 'var(--text-secondary)',
                textAlign: 'center'
              }}>
                <div>
                  <Truck size={16} style={{ color: 'var(--gold-primary)', marginBottom: '0.2rem' }} />
                  <div>Free Express Shipping</div>
                </div>
                <div>
                  <RefreshCw size={16} style={{ color: 'var(--gold-primary)', marginBottom: '0.2rem' }} />
                  <div>14 Days Easy Returns</div>
                </div>
                <div>
                  <ShieldCheck size={16} style={{ color: 'var(--gold-primary)', marginBottom: '0.2rem' }} />
                  <div>100% Authentic Quality</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSizeGuide && (
        <SizeGuideModal
          category={product.category}
          onClose={() => setShowSizeGuide(false)}
        />
      )}
    </>
  );
}
