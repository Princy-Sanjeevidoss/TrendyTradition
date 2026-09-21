import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroSection({ onShopShirts, onShopTshirts }) {
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=2000",
      tag: "AUTUMN / WINTER EDITORIAL",
      title: "TRADITION, REFINED.",
      subtitle: "Timeless shirts. Contemporary T-shirts. Effortless style.",
      modelInfo: "Featured: Giza Cotton Royal Oxford Shirt & 280 GSM Heavyweight Tee"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=2000",
      tag: "THE ESSENTIAL MENSWEAR",
      title: "MODERN SILHOUETTES.",
      subtitle: "Architectural T-shirts and tailored shirts crafted for confidence.",
      modelInfo: "Featured: Oversized Essential Tee in Stealth Black"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=2000",
      tag: "COASTAL LUXURY",
      title: "FRENCH RIVIERA LINEN.",
      subtitle: "100% Pure Normandy Flax Linen Shirts & Textured Resort Knit Polos.",
      modelInfo: "Featured: Pure Riviera Linen Shirt in Natural Sand"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section style={{
      position: 'relative',
      height: 'calc(100vh - 120px)',
      minHeight: '600px',
      maxHeight: '850px',
      overflow: 'hidden',
      backgroundColor: '#070809'
    }}>
      {/* Slides Background Images */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: idx === currentSlide ? 1 : 0,
            transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
            zIndex: 1
          }}
        >
          <img
            className="hero-ken-burns"
            src={slide.image}
            alt={slide.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 20%',
              filter: 'brightness(0.55) contrast(1.1) saturate(0.98)',
              transition: 'transform 7s ease-out'
            }}
          />
          {/* Subtle vignette gradient */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at center, rgba(11, 12, 14, 0.2) 0%, rgba(11, 12, 14, 0.85) 100%), linear-gradient(to top, rgba(11, 12, 14, 0.9) 0%, transparent 50%)'
          }} />
        </div>
      ))}

      {/* Hero Content Overlay */}
      <div className="container" style={{
        position: 'relative',
        zIndex: 10,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingTop: '2rem'
      }}>
        <div style={{ maxWidth: '820px' }}>
          {/* Category Tag */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'rgba(197, 160, 89, 0.12)',
            border: '1px solid var(--border-gold)',
            padding: '0.4rem 1rem',
            fontSize: '0.725rem',
            fontWeight: '600',
            letterSpacing: '0.22em',
            color: 'var(--gold-primary)',
            textTransform: 'uppercase',
            marginBottom: '1.5rem',
            animation: 'fadeIn 0.8s ease'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold-primary)' }} />
            {slides[currentSlide].tag}
          </div>

          {/* Hero Main Heading */}
          <h1 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.8rem, 6vw, 5.2rem)',
            fontWeight: '500',
            lineHeight: 1.05,
            color: '#FAF8F5',
            marginBottom: '1.25rem',
            letterSpacing: '-0.02em',
            textShadow: '0 4px 20px rgba(0,0,0,0.6)'
          }}>
            {slides[currentSlide].title}
          </h1>

          {/* Subheading */}
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(1.05rem, 2vw, 1.35rem)',
            fontWeight: '300',
            color: '#E0DFDC',
            marginBottom: '2.75rem',
            maxWidth: '650px',
            lineHeight: 1.6,
            letterSpacing: '0.02em'
          }}>
            {slides[currentSlide].subtitle}
          </p>

          {/* Dual Primary Buttons */}
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
            <button
              onClick={onShopShirts}
              className="btn-primary"
              style={{ padding: '1.2rem 2.5rem', fontSize: '0.85rem' }}
            >
              SHOP SHIRTS <ArrowRight size={16} />
            </button>

            <button
              onClick={onShopTshirts}
              className="btn-secondary"
              style={{ padding: '1.2rem 2.5rem', fontSize: '0.85rem' }}
            >
              SHOP T-SHIRTS <ArrowRight size={16} />
            </button>
          </div>

          {/* Featured Model Caption */}
          <div style={{
            marginTop: '3.5rem',
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            color: 'rgba(255, 255, 255, 0.5)',
            textTransform: 'uppercase',
            borderLeft: '2px solid var(--gold-primary)',
            paddingLeft: '0.75rem'
          }}>
            {slides[currentSlide].modelInfo}
          </div>
        </div>
      </div>

      {/* Carousel Navigation Indicators */}
      <div style={{
        position: 'absolute',
        bottom: '2.5rem',
        right: '3rem',
        zIndex: 20,
        display: 'flex',
        alignItems: 'center',
        gap: '1.25rem'
      }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              style={{
                width: i === currentSlide ? '32px' : '8px',
                height: '4px',
                backgroundColor: i === currentSlide ? 'var(--gold-primary)' : 'rgba(255, 255, 255, 0.3)',
                borderRadius: '2px',
                transition: 'all 0.4s ease'
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginLeft: '1rem' }}>
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#FFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#FFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
