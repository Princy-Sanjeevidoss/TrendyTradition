import React from 'react';
import { ArrowRight, ShieldCheck, RefreshCw, Truck } from 'lucide-react';

export default function Footer({ onSelectCategory, onOpenTracking, onOpenAdmin }) {
  return (
    <footer id="footer" style={{
      backgroundColor: '#070809',
      borderTop: '1px solid var(--border-gold)',
      paddingTop: '5rem',
      paddingBottom: '2.5rem',
      color: 'var(--text-primary)'
    }}>
      <div className="container">
        {/* Top Newsletter & Guarantee Banner */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          paddingBottom: '4rem',
          borderBottom: '1px solid var(--border-light)'
        }}>
          <div>
            <span style={{ fontSize: '0.725rem', letterSpacing: '0.25em', color: 'var(--gold-primary)', fontWeight: '600', textTransform: 'uppercase' }}>
              THE PRIVATE CLUB
            </span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#FAF8F5', marginTop: '0.4rem', marginBottom: '1rem' }}>
              JOIN THE TRADITION
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', fontWeight: '300', marginBottom: '1.5rem', maxWidth: '440px' }}>
              Subscribe to receive private invitations to new seasonal drops, bespoke lookbook releases, and exclusive member privileges.
            </p>

            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to TRENDYTRADITION.'); }} style={{ display: 'flex', gap: '0.5rem', maxWidth: '440px' }} aria-label="Subscribe to newsletter">
              <input
                type="email"
                placeholder="Enter your email address"
                required
                style={{
                  flexGrow: 1,
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-light)',
                  color: '#FFF',
                  padding: '0.85rem 1rem',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-sans)',
                  outline: 'none'
                }}
              />
              <button type="submit" className="btn-primary" style={{ padding: '0.85rem 1.4rem' }}>
                JOIN <ArrowRight size={16} />
              </button>
            </form>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', border: '1px solid var(--border-light)' }}>
              <Truck size={24} style={{ color: 'var(--gold-primary)', marginBottom: '0.5rem' }} />
              <h5 style={{ color: '#FFF', fontSize: '0.9rem', marginBottom: '0.2rem' }}>COMPLIMENTARY SHIPPING</h5>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Express air delivery across all Indian pincodes.</p>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', border: '1px solid var(--border-light)' }}>
              <RefreshCw size={24} style={{ color: 'var(--gold-primary)', marginBottom: '0.5rem' }} />
              <h5 style={{ color: '#FFF', fontSize: '0.9rem', marginBottom: '0.2rem' }}>EASY 14-DAY RETURNS</h5>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Hassle-free size exchanges and doorstep pickups.</p>
            </div>
          </div>
        </div>

        {/* Middle Footer Navigation Links */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '3rem',
          padding: '4rem 0',
          borderBottom: '1px solid var(--border-light)'
        }}>
          {/* Brand Info */}
          <div>
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.8rem',
              fontWeight: '700',
              letterSpacing: '0.12em',
              color: 'var(--text-primary)',
              display: 'block',
              lineHeight: 1,
              marginBottom: '0.4rem'
            }}>
              TRENDY<span style={{ color: 'var(--gold-primary)' }}>TRADITION</span>
            </span>
            <span style={{
              fontSize: '0.6rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'var(--gold-primary)',
              display: 'block',
              marginBottom: '1.25rem'
            }}>
              TRADITION, REFINED.
            </span>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, maxWidth: '320px', fontWeight: '300' }}>
              Premium everyday menswear, refined with timeless style. Specializing in engineered Shirts and T-Shirts for modern gentlemen.
            </p>
          </div>

          {/* Shirts & T-Shirts Categories */}
          <div>
            <h5 style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--gold-primary)', fontWeight: '600', marginBottom: '1.25rem', textTransform: 'uppercase' }}>
              PRIMARY CATEGORIES
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <li><button onClick={() => onSelectCategory('SHIRTS')} style={{ color: 'inherit' }}>Formal Shirts</button></li>
              <li><button onClick={() => onSelectCategory('SHIRTS')} style={{ color: 'inherit' }}>Casual Shirts</button></li>
              <li><button onClick={() => onSelectCategory('SHIRTS')} style={{ color: 'inherit' }}>Linen Shirts</button></li>
              <li><button onClick={() => onSelectCategory('T-SHIRTS')} style={{ color: 'inherit' }}>Heavyweight 280 GSM Tees</button></li>
              <li><button onClick={() => onSelectCategory('T-SHIRTS')} style={{ color: 'inherit' }}>Polo T-Shirts</button></li>
              <li><button onClick={() => onSelectCategory('T-SHIRTS')} style={{ color: 'inherit' }}>Oversized T-Shirts</button></li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div>
            <h5 style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--gold-primary)', fontWeight: '600', marginBottom: '1.25rem', textTransform: 'uppercase' }}>
              CLIENT SERVICES
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <li><button onClick={onOpenTracking} style={{ color: 'var(--gold-primary)', fontWeight: '600' }}>Track Your Order</button></li>
              <li><a href="#shop-catalog" style={{ color: 'inherit' }}>Size Guide & Measurement</a></li>
              <li><a href="#brand-story" style={{ color: 'inherit' }}>Fabric & Care Guide</a></li>
              <li><a href="#footer" style={{ color: 'inherit' }}>Shipping & Customs</a></li>
              <li><button onClick={onOpenAdmin} style={{ color: 'inherit' }}>Admin Portal Access</button></li>
            </ul>
          </div>

          {/* Atelier Contact */}
          <div>
            <h5 style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--gold-primary)', fontWeight: '600', marginBottom: '1.25rem', textTransform: 'uppercase' }}>
              ATELIER HQ
            </h5>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1rem' }}>
              TRENDYTRADITION Flagship Store<br />
              100 Feet Road, Indiranagar<br />
              Bengaluru, KA 560038
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--gold-primary)', fontWeight: '600' }}>
              concierge@trendytradition.com<br />
              +91 1800 890 2026
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          paddingTop: '2rem',
          fontSize: '0.75rem',
          color: 'var(--text-secondary)',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            © 2026 TRENDYTRADITION ATELIER INDIA. ALL RIGHTS RESERVED.
          </div>

          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>PRIVACY POLICY</span>
            <span>TERMS OF SERVICE</span>
            <span>CSR & SUSTAINABILITY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
