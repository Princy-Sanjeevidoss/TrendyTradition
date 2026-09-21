import React, { useState } from 'react';
import { CRAFTSMANSHIP_POINTS } from '../data/mockData';
import { Sparkles, Check } from 'lucide-react';

export default function CraftsmanshipSection() {
  const [activeTab, setActiveTab] = useState('SHIRTS');

  const points = CRAFTSMANSHIP_POINTS[activeTab] || [];

  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--bg-tertiary)', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
      <div className="container">
        <div className="section-header">
          <p className="section-subtitle">ARTISANAL HERITAGE</p>
          <h2 className="section-title">DETAILS THAT DEFINE THE DIFFERENCE</h2>
          <p className="section-description">
            From 18-stitch-per-inch Italian tailored seams to 280 GSM compact ring-spun combed cotton, every detail is engineered for perfection.
          </p>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3.5rem' }}>
          <div style={{
            display: 'inline-flex',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-gold)',
            padding: '0.35rem',
            borderRadius: '2px',
            gap: '0.5rem'
          }}>
            <button
              onClick={() => setActiveTab('SHIRTS')}
              style={{
                padding: '0.8rem 2.2rem',
                fontSize: '0.85rem',
                fontWeight: '600',
                letterSpacing: '0.15em',
                color: activeTab === 'SHIRTS' ? '#000' : 'var(--text-primary)',
                background: activeTab === 'SHIRTS' ? 'var(--gold-primary)' : 'transparent',
                transition: 'all 0.3s ease'
              }}
            >
              SHIRT CRAFTSMANSHIP
            </button>

            <button
              onClick={() => setActiveTab('TSHIRTS')}
              style={{
                padding: '0.8rem 2.2rem',
                fontSize: '0.85rem',
                fontWeight: '600',
                letterSpacing: '0.15em',
                color: activeTab === 'TSHIRTS' ? '#000' : 'var(--text-primary)',
                background: activeTab === 'TSHIRTS' ? 'var(--gold-primary)' : 'transparent',
                transition: 'all 0.3s ease'
              }}
            >
              T-SHIRT ARCHITECTURE
            </button>
          </div>
        </div>

        {/* 4 Feature Points Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {points.map((pt, idx) => (
            <div
              key={idx}
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-light)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.3s ease'
              }}
              className="craft-card"
            >
              <div style={{
                position: 'relative',
                height: '240px',
                overflow: 'hidden',
                backgroundColor: '#0D0E10'
              }}>
                <img
                  src={pt.image}
                  alt={pt.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'brightness(0.85) contrast(1.1)',
                    transition: 'transform 0.6s ease'
                  }}
                  className="craft-img"
                />
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  background: 'rgba(11, 12, 14, 0.8)',
                  backdropFilter: 'blur(4px)',
                  border: '1px solid var(--border-gold)',
                  color: 'var(--gold-primary)',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '0.8rem'
                }}>
                  0{idx + 1}
                </div>
              </div>

              <div style={{ padding: '1.75rem' }}>
                <h4 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.45rem',
                  color: 'var(--text-primary)',
                  marginBottom: '0.75rem'
                }}>
                  {pt.title}
                </h4>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6
                }}>
                  {pt.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .craft-card:hover {
          border-color: var(--border-gold) !important;
          transform: translateY(-5px);
        }
        .craft-card:hover .craft-img {
          transform: scale(1.08);
        }
      `}</style>
    </section>
  );
}
