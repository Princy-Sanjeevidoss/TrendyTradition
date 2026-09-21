import React, { useState } from 'react';
import { Heart, Eye, ShoppingBag, Zap, Star } from 'lucide-react';

export default function ProductCard({
  product,
  onQuickView,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');

  const mainImg = product.images[0] || 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf';
  const hoverImg = product.images[1] || mainImg;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-light)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Image Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        paddingTop: '130%', // Luxury editorial aspect ratio 4:5 approx
        overflow: 'hidden',
        backgroundColor: '#16181C'
      }}>
        {/* Main Image */}
        <img
          src={isHovered ? hoverImg : mainImg}
          alt={`${product.name} - ${isHovered ? 'alternate' : 'main'}`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: isHovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
            filter: 'brightness(0.95)'
          }}
        />

        {/* Badges */}
        <div style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.4rem',
          zIndex: 5
        }}>
          {product.isNewArrival && (
            <span className="badge badge-gold">NEW ARRIVAL</span>
          )}
          {product.isFeatured && (
            <span className="badge badge-dark">FEATURED</span>
          )}
        </div>

        {/* Wishlist Button Top Right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            zIndex: 10,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(11, 12, 14, 0.7)',
            backdropFilter: 'blur(4px)',
            border: isWishlisted ? '1px solid var(--gold-primary)' : '1px solid rgba(255, 255, 255, 0.2)',
            color: isWishlisted ? 'var(--gold-primary)' : '#FFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease'
          }}
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart size={18} fill={isWishlisted ? "var(--gold-primary)" : "none"} />
        </button>

        {/* Quick View Button Hover overlay */}
        <div style={{
          position: 'absolute',
          bottom: '1rem',
          left: '1rem',
          right: '1rem',
          zIndex: 10,
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
          transition: 'all 0.3s ease'
        }}>
          <button
            onClick={() => onQuickView(product)}
            style={{
              width: '100%',
              background: 'rgba(11, 12, 14, 0.9)',
              backdropFilter: 'blur(8px)',
              border: '1px solid var(--gold-primary)',
              color: 'var(--gold-primary)',
              padding: '0.65rem 0',
              fontSize: '0.75rem',
              fontWeight: '600',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            <Eye size={16} /> QUICK VIEW
          </button>
        </div>
      </div>

      {/* Details Container */}
      <div style={{ padding: '1.25rem 1.25rem 1.5rem 1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        {/* Category & Rating */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
          <span style={{
            fontSize: '0.675rem',
            letterSpacing: '0.15em',
            color: 'var(--gold-primary)',
            fontWeight: '600',
            textTransform: 'uppercase'
          }}>
            {product.category} • {product.subCategory}
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: '#FFD700' }}>
            <Star size={13} fill="#FFD700" />
            <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{product.rating}</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>({product.reviewsCount})</span>
          </div>
        </div>

        {/* Product Title */}
        <h4
          onClick={() => onQuickView(product)}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.25rem',
            color: 'var(--text-primary)',
            marginBottom: '0.5rem',
            lineHeight: 1.2,
            cursor: 'pointer',
            transition: 'color 0.2s ease'
          }}
          className="product-title-hover"
        >
          {product.name}
        </h4>

        {/* Price Tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.85rem' }}>
          <span style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--text-primary)' }}>
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && (
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textDecoration: 'line-through' }}>
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
          {product.originalPrice && (
            <span style={{ fontSize: '0.675rem', color: '#4CAF50', fontWeight: '600', letterSpacing: '0.05em' }}>
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </span>
          )}
        </div>

        {/* Available Color Swatches */}
        {product.colors && product.colors.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c.name)}
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: c.hex,
                  border: selectedColor === c.name ? '2px solid var(--gold-primary)' : '1px solid rgba(255, 255, 255, 0.3)',
                  outline: selectedColor === c.name ? '2px solid rgba(197, 160, 89, 0.3)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                title={c.name}
              />
            ))}
            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginLeft: '0.2rem' }}>
              {selectedColor || product.colors[0].name}
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div style={{ marginTop: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          <button
            onClick={() => onAddToCart(product, selectedColor || product.colors[0]?.name)}
            style={{
              background: 'transparent',
              border: '1px solid var(--border-light)',
              color: 'var(--text-primary)',
              padding: '0.65rem 0',
              fontSize: '0.7rem',
              fontWeight: '600',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              transition: 'all 0.2s ease'
            }}
            className="cart-btn-hover"
          >
            <ShoppingBag size={14} /> ADD TO CART
          </button>

          <button
            onClick={() => onBuyNow(product, selectedColor || product.colors[0]?.name)}
            style={{
              background: 'var(--gold-primary)',
              border: 'none',
              color: '#000',
              padding: '0.65rem 0',
              fontSize: '0.7rem',
              fontWeight: '700',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem',
              transition: 'all 0.2s ease'
            }}
            className="buynow-btn-hover"
          >
            <Zap size={14} /> BUY NOW
          </button>
        </div>
      </div>

      <style>{`
        .product-title-hover:hover {
          color: var(--gold-primary) !important;
        }
        .cart-btn-hover:hover {
          border-color: var(--gold-primary) !important;
          color: var(--gold-primary) !important;
          background: rgba(197, 160, 89, 0.08) !important;
        }
        .buynow-btn-hover:hover {
          background: #FFFFFF !important;
          color: #000000 !important;
        }
      `}</style>
    </div>
  );
}
