import React from 'react';
import { LOOKBOOK_ITEMS } from '../data/mockData';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function LookbookSection({ onSelectLook }) {
  return (
    <section id="lookbook" className="section-padding" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container">
        <div className="section-header">
          <p className="section-subtitle">EDITORIAL STYLING</p>
          <h2 className="section-title">THE LOOKBOOK</h2>
          <p className="section-description">
            Explore curated styling direction across Work, Weekend, Travel, Evening, and Festive occasions.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          {LOOKBOOK_ITEMS.map((look) => (
            <div
              key={look.id}
              onClick={() => onSelectLook(look)}
              style={{
                position: 'relative',
                height: '500px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid var(--border-light)'
              }}
              className="lookbook-card"
            >
              <img
                src={look.image}
                alt={look.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.7) contrast(1.1)',
                  transition: 'transform 0.8s ease'
                }}
                className="lookbook-img"
              />

              {/* Gradient overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(11, 12, 14, 0.95) 0%, rgba(11, 12, 14, 0.2) 60%, transparent 100%)'
              }} />

              {/* Content */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '2.5rem 2rem',
                zIndex: 10
              }}>
                <span style={{
                  background: 'var(--gold-glow)',
                  border: '1px solid var(--border-gold)',
                  color: 'var(--gold-primary)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.15em',
                  padding: '0.25rem 0.6rem',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  display: 'inline-block',
                  marginBottom: '0.75rem'
                }}>
                  {look.category}
                </span>

                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2.2rem',
                  color: '#FAF8F5',
                  marginBottom: '0.4rem',
                  lineHeight: 1.1
                }}>
                  {look.title}
                </h3>

                <p style={{
                  fontSize: '0.875rem',
                  color: '#D0CECA',
                  marginBottom: '1.5rem',
                  fontWeight: '300'
                }}>
                  {look.tagline}
                </p>

                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  letterSpacing: '0.15em',
                  color: 'var(--gold-primary)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  textTransform: 'uppercase'
                }}>
                  EXPLORE LOOK <ArrowRight size={16} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .lookbook-card:hover .lookbook-img {
          transform: scale(1.08);
        }
      `}</style>
    </section>
  );
}
