import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function CollectionsSection({ onSelectCollection }) {
  const collections = [
    {
      title: "THE FORMAL EDIT",
      subtitle: "Sharp shirts for work & executive occasions.",
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800",
      tag: "FORMAL SHIRTS"
    },
    {
      title: "THE CASUAL EDIT",
      subtitle: "Relaxed shirts & T-shirts for everyday elegance.",
      image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?auto=format&fit=crop&q=80&w=800",
      tag: "SHIRTS & TEES"
    },
    {
      title: "THE ESSENTIALS",
      subtitle: "Minimal, versatile T-shirts & foundational shirts.",
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800",
      tag: "BASICS & HEAVYWEIGHTS"
    },
    {
      title: "THE PREMIUM EDIT",
      subtitle: "Elevated collection featuring Giza cotton & silk blends.",
      image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=800",
      tag: "LUXURY FABRICS"
    },
    {
      title: "THE WEEKEND EDIT",
      subtitle: "Effortless French linen & textured resort knit tees.",
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800",
      tag: "LINEN & KNITS"
    }
  ];

  return (
    <section id="collections" className="section-padding" style={{ backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-light)' }}>
      <div className="container">
        <div className="section-header">
          <p className="section-subtitle">CURATED EDITIONS</p>
          <h2 className="section-title">THE COLLECTIONS</h2>
          <p className="section-description">
            Tailored capsules created for every modern wardrobe requirement.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem'
        }}>
          {collections.map((col, i) => (
            <div
              key={col.title}
              onClick={() => onSelectCollection(col.title)}
              style={{
                position: 'relative',
                height: '380px',
                overflow: 'hidden',
                cursor: 'pointer',
                border: '1px solid var(--border-light)',
                background: '#121417'
              }}
              className="collection-card"
            >
              <img
                src={col.image}
                alt={col.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.65)',
                  transition: 'transform 0.6s ease'
                }}
                className="collection-img"
              />

              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(11, 12, 14, 0.95) 0%, rgba(11, 12, 14, 0.2) 60%, transparent 100%)'
              }} />

              <div style={{
                position: 'absolute',
                inset: 0,
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                zIndex: 5
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.625rem', letterSpacing: '0.15em', color: 'var(--gold-primary)', fontWeight: '600' }}>
                    {col.tag}
                  </span>
                  <ArrowUpRight size={20} style={{ color: 'var(--gold-primary)' }} />
                </div>

                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.75rem',
                    color: '#FAF8F5',
                    marginBottom: '0.4rem',
                    lineHeight: 1.1
                  }}>
                    {col.title}
                  </h3>
                  <p style={{
                    fontSize: '0.8rem',
                    color: '#B5B9C2',
                    fontWeight: '300'
                  }}>
                    {col.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .collection-card:hover .collection-img {
          transform: scale(1.08);
        }
      `}</style>
    </section>
  );
}
