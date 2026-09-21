import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CategoryBanners({ onSelectCategory }) {
  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        <div className="section-header">
          <p className="section-subtitle">DUAL ESSENTIALS</p>
          <h2 className="section-title">EXPLORE THE COLLECTION</h2>
          <p className="section-description">
            Discover tailored shirts and engineered T-shirts crafted with equal dedication to quality, drape, and enduring style.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem'
        }}>
          {/* SHIRTS PANEL */}
          <div
            onClick={() => onSelectCategory('SHIRTS')}
            style={{
              position: 'relative',
              height: '560px',
              overflow: 'hidden',
              cursor: 'pointer',
              border: '1px solid var(--border-light)',
              borderRadius: '0px',
              group: 'panel'
            }}
            className="category-card"
          >
            <img
              src="https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=1200"
              alt="Luxury Shirts Category"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                filter: 'brightness(0.65) contrast(1.15)',
                transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              className="category-img"
            />
            {/* Gradient Overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(11, 12, 14, 0.95) 0%, rgba(11, 12, 14, 0.2) 60%, transparent 100%)'
            }} />

            {/* Content Overlay */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              padding: '3rem 2.5rem',
              zIndex: 5
            }}>
              <span style={{
                fontSize: '0.725rem',
                letterSpacing: '0.25em',
                color: 'var(--gold-primary)',
                fontWeight: '600',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '0.5rem'
              }}>
                CATEGORICAL FOCUS
              </span>
              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2.8rem',
                color: '#FAF8F5',
                marginBottom: '0.5rem'
              }}>
                SHIRTS
              </h3>
              <p style={{
                fontSize: '1.05rem',
                color: '#D0CECA',
                marginBottom: '2rem',
                fontWeight: '300'
              }}>
                Refined for every occasion.
              </p>

              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                color: 'var(--gold-primary)',
                fontSize: '0.85rem',
                fontWeight: '600',
                letterSpacing: '0.15em',
                textTransform: 'uppercase'
              }}>
                SHOP SHIRTS <ArrowRight size={18} />
              </span>
            </div>
          </div>

          {/* T-SHIRTS PANEL */}
          <div
            onClick={() => onSelectCategory('T-SHIRTS')}
            style={{
              position: 'relative',
              height: '560px',
              overflow: 'hidden',
              cursor: 'pointer',
              border: '1px solid var(--border-light)',
              borderRadius: '0px'
            }}
            className="category-card"
          >
            <img
              src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1200"
              alt="Luxury T-Shirts Category"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                filter: 'brightness(0.65) contrast(1.15)',
                transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              className="category-img"
            />
            {/* Gradient Overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(11, 12, 14, 0.95) 0%, rgba(11, 12, 14, 0.2) 60%, transparent 100%)'
            }} />

            {/* Content Overlay */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              padding: '3rem 2.5rem',
              zIndex: 5
            }}>
              <span style={{
                fontSize: '0.725rem',
                letterSpacing: '0.25em',
                color: 'var(--gold-primary)',
                fontWeight: '600',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '0.5rem'
              }}>
                CATEGORICAL FOCUS
              </span>
              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2.8rem',
                color: '#FAF8F5',
                marginBottom: '0.5rem'
              }}>
                T-SHIRTS
              </h3>
              <p style={{
                fontSize: '1.05rem',
                color: '#D0CECA',
                marginBottom: '2rem',
                fontWeight: '300'
              }}>
                Everyday comfort. Elevated.
              </p>

              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                color: 'var(--gold-primary)',
                fontSize: '0.85rem',
                fontWeight: '600',
                letterSpacing: '0.15em',
                textTransform: 'uppercase'
              }}>
                SHOP T-SHIRTS <ArrowRight size={18} />
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .category-card:hover .category-img {
          transform: scale(1.06);
        }
      `}</style>
    </section>
  );
}
