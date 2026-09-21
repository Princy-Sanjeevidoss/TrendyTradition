import React, { useState, useEffect } from 'react';
import { Search, User, Heart, ShoppingBag, Menu, X, ShieldCheck } from 'lucide-react';

export default function Navbar({
  activeNav,
  setActiveNav,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenAccount,
  onOpenAdmin,
  searchQuery,
  setSearchQuery,
  onCategorySelect
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'HOME', action: () => { setActiveNav('HOME'); window.scrollTo({ top: 0, behavior: 'smooth' }); } },
    { label: 'SHIRTS', action: () => { setActiveNav('SHIRTS'); onCategorySelect('SHIRTS'); } },
    { label: 'T-SHIRTS', action: () => { setActiveNav('T-SHIRTS'); onCategorySelect('T-SHIRTS'); } },
    { label: 'NEW ARRIVALS', action: () => { setActiveNav('NEW ARRIVALS'); onCategorySelect('NEW_ARRIVALS'); } },
    { label: 'COLLECTIONS', action: () => { setActiveNav('COLLECTIONS'); const el = document.getElementById('collections'); el?.scrollIntoView({ behavior: 'smooth' }); } },
    { label: 'ABOUT', action: () => { setActiveNav('ABOUT'); const el = document.getElementById('brand-story'); el?.scrollIntoView({ behavior: 'smooth' }); } },
    { label: 'CONTACT', action: () => { setActiveNav('CONTACT'); const el = document.getElementById('footer'); el?.scrollIntoView({ behavior: 'smooth' }); } },
  ];

  return (
    <>
      {/* Top Banner */}
      <div style={{
        background: 'linear-gradient(90deg, #121417 0%, #1F1B16 50%, #121417 100%)',
        borderBottom: '1px solid rgba(197, 160, 89, 0.2)',
        fontSize: '0.725rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        padding: '0.45rem 0',
        color: '#D4AF37',
        textAlign: 'center',
        fontWeight: '500'
      }}>
        COMPLIMENTARY EXPRESS SHIPPING & GIFT PACKAGING ACROSS INDIA • CODE: <strong>TRADITION10</strong> FOR 10% OFF
      </div>

      {/* Main Sticky Navbar */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 900,
        backgroundColor: isScrolled ? 'rgba(11, 12, 14, 0.95)' : 'rgba(11, 12, 14, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: isScrolled ? '1px solid var(--border-gold)' : '1px solid var(--border-light)',
        transition: 'all 0.3s ease',
        boxShadow: isScrolled ? '0 10px 30px rgba(0,0,0,0.5)' : 'none'
      }}>
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '80px'
        }}>
          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="mobile-menu-btn"
            style={{ color: '#FFF', display: 'none', background: 'transparent', border: 'none' }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Brand Logo */}
          <div
            onClick={() => { setActiveNav('HOME'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{ cursor: 'pointer', textAlign: 'left' }}
          >
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.85rem',
              fontWeight: '700',
              letterSpacing: '0.12em',
              color: 'var(--text-primary)',
              display: 'block',
              lineHeight: 1
            }}>
              TRENDY<span style={{ color: 'var(--gold-primary)' }}>TRADITION</span>
            </span>
            <span style={{
              fontSize: '0.55rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'var(--gold-primary)',
              display: 'block',
              marginTop: '0.2rem'
            }}>
              TRADITION, REFINED.
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="desktop-nav" style={{ display: 'flex', gap: '2rem' }} aria-label="Primary Navigation">
            {navItems.map((item) => {
              const isActive = activeNav === item.label;
              return (
                <button
                  key={item.label}
                  onClick={item.action}
                  style={{
                    color: isActive ? 'var(--gold-primary)' : 'var(--text-primary)',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    position: 'relative',
                    padding: '0.5rem 0',
                    transition: 'color 0.2s ease'
                  }}
                >
                  {item.label}
                  {isActive && (
                    <span style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '2px',
                      backgroundColor: 'var(--gold-primary)',
                      borderRadius: '1px'
                    }} />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              title="Search Products"
            >
              <Search size={20} />
            </button>

            {/* Admin Portal Quick Access */}
            <button
              onClick={onOpenAdmin}
              style={{
                color: 'var(--gold-primary)',
                border: '1px solid var(--border-gold)',
                padding: '0.35rem 0.65rem',
                fontSize: '0.65rem',
                letterSpacing: '0.1em',
                fontWeight: '600',
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem'
              }}
              title="Admin Portal"
              aria-label="Open Admin Dashboard"
            >
              <ShieldCheck size={14} /> ADMIN
            </button>

            {/* Account Icon */}
            <button
              onClick={onOpenAccount}
              style={{ color: 'var(--text-primary)' }}
              title="Customer Account"
            >
              <User size={20} />
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={onOpenWishlist}
              style={{ color: 'var(--text-primary)', position: 'relative' }}
              title="Wishlist"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-6px',
                  right: '-8px',
                  background: 'var(--gold-primary)',
                  color: '#000',
                  borderRadius: '50%',
                  width: '18px',
                  height: '18px',
                  fontSize: '0.65rem',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Icon */}
            <button
              onClick={onOpenCart}
              style={{
                background: 'rgba(197, 160, 89, 0.12)',
                border: '1px solid var(--border-gold)',
                color: 'var(--gold-primary)',
                padding: '0.5rem 0.9rem',
                borderRadius: '2px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: '600',
                fontSize: '0.8rem'
              }}
              title="Shopping Cart"
            >
              <ShoppingBag size={18} />
              <span>BAG ({cartCount})</span>
            </button>
          </div>
        </div>

        {/* Search Overlay Bar */}
        {searchOpen && (
          <div style={{
            background: 'var(--bg-tertiary)',
            borderTop: '1px solid var(--border-gold)',
            padding: '1rem 0',
            animation: 'fadeIn 0.2s ease'
          }}>
            <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Search size={20} style={{ color: 'var(--gold-primary)' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Shirts, T-Shirts, Fabrics, Formal or Linen..."
                autoFocus
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#FFF',
                  fontSize: '1rem',
                  fontFamily: 'var(--font-sans)'
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}
                >
                  CLEAR
                </button>
              )}
              <button
                onClick={() => setSearchOpen(false)}
                style={{ color: 'var(--gold-primary)', padding: '0.3rem' }}
              >
                <X size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div style={{
            background: 'var(--bg-secondary)',
            borderTop: '1px solid var(--border-light)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  item.action();
                  setMobileMenuOpen(false);
                }}
                style={{
                  textAlign: 'left',
                  color: activeNav === item.label ? 'var(--gold-primary)' : 'var(--text-primary)',
                  fontSize: '1rem',
                  fontWeight: '600',
                  letterSpacing: '0.15em'
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <style>{`
        @media (max-width: 992px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}
