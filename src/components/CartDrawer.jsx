import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, ShieldCheck } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQty,
  onRemoveItem,
  onProceedToCheckout
}) {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoApplied, setPromoApplied] = useState('');

  const rawSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = Math.round(rawSubtotal * (discountPercent / 100));
  const freeShippingThreshold = 5000;
  const deliveryFee = rawSubtotal >= freeShippingThreshold || rawSubtotal === 0 ? 0 : 150;
  const grandTotal = Math.max(0, rawSubtotal - discountAmount + deliveryFee);
  const progressToFreeShipping = Math.min(100, (rawSubtotal / freeShippingThreshold) * 100);

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'TRADITION10') {
      setDiscountPercent(10);
      setPromoApplied('TRADITION10 (10% OFF APPLIED)');
      setPromoError('');
    } else {
      setPromoError('Invalid coupon code. Try TRADITION10');
    }
  };

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg-tertiary)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <ShoppingBag size={20} style={{ color: 'var(--gold-primary)' }} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#FFF' }}>
              YOUR SHOPPING BAG ({cart.reduce((a, c) => a + c.quantity, 0)})
            </h3>
          </div>
          <button onClick={onClose} style={{ color: '#FFF' }}>
            <X size={22} />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div style={{
          background: 'rgba(197, 160, 89, 0.08)',
          borderBottom: '1px solid var(--border-gold)',
          padding: '0.85rem 1.5rem',
          fontSize: '0.75rem'
        }}>
          {rawSubtotal >= freeShippingThreshold ? (
            <span style={{ color: '#4CAF50', fontWeight: '600', letterSpacing: '0.05em' }}>
              ✓ CONGRATULATIONS! YOU UNLOCKED FREE EXPRESS SHIPPING
            </span>
          ) : (
            <span style={{ color: 'var(--gold-primary)', fontWeight: '500' }}>
              ADD <strong>₹{(freeShippingThreshold - rawSubtotal).toLocaleString('en-IN')}</strong> MORE FOR FREE EXPRESS SHIPPING
            </span>
          )}

          <div style={{
            width: '100%',
            height: '4px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '2px',
            marginTop: '0.5rem',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${progressToFreeShipping}%`,
              height: '100%',
              background: 'var(--gold-primary)',
              transition: 'width 0.4s ease'
            }} />
          </div>
        </div>

        {/* Items List */}
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
              <ShoppingBag size={48} style={{ color: 'var(--text-secondary)', marginBottom: '1rem', opacity: 0.4 }} />
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                Your bag is empty
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                Explore our refined collection of Shirts and T-Shirts.
              </p>
              <button onClick={onClose} className="btn-outline-gold">
                START SHOPPING
              </button>
            </div>
          ) : (
            cart.map((item, index) => (
              <div
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}-${index}`}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  paddingBottom: '1.25rem',
                  borderBottom: '1px solid var(--border-light)'
                }}
              >
                {/* Thumbnail */}
                <img
                  src={item.image || item.images[0]}
                  alt={item.name}
                  style={{
                    width: '80px',
                    height: '100px',
                    objectFit: 'cover',
                    border: '1px solid var(--border-light)'
                  }}
                />

                {/* Details */}
                <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: '#FFF', lineHeight: 1.2 }}>
                        {item.name}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(index)}
                        style={{ color: 'var(--text-secondary)', padding: '2px' }}
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                      <span>Size: <strong>{item.selectedSize}</strong></span> • <span>Color: <strong>{item.selectedColor}</strong></span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem' }}>
                    {/* Qty modifier */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid var(--border-light)',
                      background: 'var(--bg-tertiary)'
                    }}>
                      <button
                        onClick={() => onUpdateQty(index, item.quantity - 1)}
                        style={{ padding: '0.2rem 0.6rem', color: '#FFF', fontSize: '0.9rem' }}
                      >
                        -
                      </button>
                      <span style={{ padding: '0 0.6rem', fontSize: '0.85rem', fontWeight: '600', color: 'var(--gold-primary)' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQty(index, item.quantity + 1)}
                        style={{ padding: '0.2rem 0.6rem', color: '#FFF', fontSize: '0.9rem' }}
                      >
                        +
                      </button>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.95rem', fontWeight: '700', color: '#FFF' }}>
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div style={{
            padding: '1.5rem',
            borderTop: '1px solid var(--border-light)',
            background: 'var(--bg-tertiary)'
          }}>
            {/* Promo Code Input */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo Code (e.g. TRADITION10)"
                  style={{
                    flexGrow: 1,
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-light)',
                    color: '#FFF',
                    padding: '0.5rem 0.75rem',
                    fontSize: '0.8rem',
                    outline: 'none'
                  }}
                />
                <button
                  onClick={applyPromo}
                  style={{
                    background: 'var(--gold-primary)',
                    color: '#000',
                    padding: '0.5rem 1rem',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    letterSpacing: '0.1em'
                  }}
                >
                  APPLY
                </button>
              </div>
              {promoApplied && <p style={{ color: '#4CAF50', fontSize: '0.75rem', marginTop: '0.3rem' }}>{promoApplied}</p>}
              {promoError && <p style={{ color: '#FF5252', fontSize: '0.75rem', marginTop: '0.3rem' }}>{promoError}</p>}
            </div>

            {/* Calculations Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Subtotal</span>
                <span>₹{rawSubtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4CAF50' }}>
                  <span>Discount</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                <span>Delivery</span>
                <span>{deliveryFee === 0 ? <strong style={{ color: '#4CAF50' }}>FREE</strong> : `₹${deliveryFee}`}</span>
              </div>
              <div style={{
                display: 'flex',
                justify: 'space-between',
                color: '#FFF',
                fontSize: '1.15rem',
                fontWeight: '700',
                borderTop: '1px solid var(--border-light)',
                paddingTop: '0.6rem',
                marginTop: '0.2rem'
              }}>
                <span>Total Amount</span>
                <span style={{ color: 'var(--gold-primary)' }}>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout({ rawSubtotal, discountAmount, deliveryFee, grandTotal });
                }}
                className="btn-primary"
                style={{ width: '100%', padding: '1.1rem 0' }}
              >
                PROCEED TO CHECKOUT <ArrowRight size={18} />
              </button>

              <button
                onClick={onClose}
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  padding: '0.4rem 0'
                }}
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
