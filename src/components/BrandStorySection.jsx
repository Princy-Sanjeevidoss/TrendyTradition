import React from 'react';
import { ShieldCheck, Feather, Award, HeartHandshake } from 'lucide-react';

export default function BrandStorySection() {
  return (
    <section id="brand-story" className="section-padding" style={{ backgroundColor: 'var(--bg-primary)', position: 'relative' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '4rem',
          alignItems: 'center'
        }}>
          {/* Left: Cinematic Editorial Image Stack */}
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'relative',
              width: '90%',
              height: '520px',
              border: '1px solid var(--border-gold)',
              overflow: 'hidden'
            }}>
              <img
                src="https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=1200"
                alt="TRENDYTRADITION Atelier Craftsmanship"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.8) contrast(1.1)'
                }}
              />
            </div>

            {/* Overlapping Floating Badge */}
            <div style={{
              position: 'absolute',
              bottom: '-2rem',
              right: '0',
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-gold)',
              padding: '2rem',
              maxWidth: '280px',
              boxShadow: 'var(--shadow-subtle)'
            }}>
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '2.5rem',
                color: 'var(--gold-primary)',
                display: 'block',
                lineHeight: 1,
                fontWeight: '700'
              }}>
                100%
              </span>
              <span style={{
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                color: '#FFF',
                textTransform: 'uppercase',
                display: 'block',
                marginTop: '0.5rem',
                fontWeight: '600'
              }}>
                EGYPTIAN GIZA & PERUVIAN PIMA QUALITY GUARANTEE
              </span>
            </div>
          </div>

          {/* Right: Narrative */}
          <div>
            <p className="section-subtitle" style={{ textAlign: 'left' }}>THE ATELIER MANIFESTO</p>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              marginBottom: '1.5rem'
            }}>
              WHERE TRADITION MEETS MODERN STYLE
            </h2>

            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '1.05rem',
              lineHeight: 1.7,
              marginBottom: '1.5rem',
              fontWeight: '300'
            }}>
              At <strong>TRENDYTRADITION</strong>, we believe true luxury lies in restraint. We reject fast-fashion shortcuts, choosing instead to elevate the foundational pillars of every modern gentleman’s wardrobe: <strong>the Shirt and the T-Shirt</strong>.
            </p>

            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '1rem',
              lineHeight: 1.7,
              marginBottom: '2.5rem',
              fontWeight: '300'
            }}>
              Each piece begins with zero-compromise raw materials — certified Giza 80s cotton, double-mercerized Pima, and pure Normandy flax linen. Tailored with meticulous architectural precision, our garments empower confidence through silent elegance.
            </p>

            {/* 4 Brand Pillars Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.75rem'
            }}>
              <div style={{ borderLeft: '2px solid var(--gold-primary)', paddingLeft: '1rem' }}>
                <Award size={22} style={{ color: 'var(--gold-primary)', marginBottom: '0.4rem' }} />
                <h4 style={{ color: '#FFF', fontSize: '1rem', marginBottom: '0.2rem' }}>QUALITY</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Long-staple organic cottons built to outlast seasons.</p>
              </div>

              <div style={{ borderLeft: '2px solid var(--gold-primary)', paddingLeft: '1rem' }}>
                <Feather size={22} style={{ color: 'var(--gold-primary)', marginBottom: '0.4rem' }} />
                <h4 style={{ color: '#FFF', fontSize: '1rem', marginBottom: '0.2rem' }}>COMFORT</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Pre-shrunk, bio-polished handfeel with zero skin friction.</p>
              </div>

              <div style={{ borderLeft: '2px solid var(--gold-primary)', paddingLeft: '1rem' }}>
                <ShieldCheck size={22} style={{ color: 'var(--gold-primary)', marginBottom: '0.4rem' }} />
                <h4 style={{ color: '#FFF', fontSize: '1rem', marginBottom: '0.2rem' }}>CRAFTSMANSHIP</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>18 stitches-per-inch seam density & mother-of-pearl buttons.</p>
              </div>

              <div style={{ borderLeft: '2px solid var(--gold-primary)', paddingLeft: '1rem' }}>
                <HeartHandshake size={22} style={{ color: 'var(--gold-primary)', marginBottom: '0.4rem' }} />
                <h4 style={{ color: '#FFF', fontSize: '1rem', marginBottom: '0.2rem' }}>CONFIDENCE</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Flawless drape engineered for effortless modern presence.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
