import React, { useState } from 'react';
import { X, User, ShoppingBag, Heart, MapPin, LogOut, Check, ArrowRight } from 'lucide-react';

export default function CustomerAccountModal({
  isOpen,
  onClose,
  orders,
  wishlist,
  onTrackOrder,
  onRemoveFromWishlist
}) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('ORDERS'); // ORDERS, ADDRESSES, WISHLIST, PROFILE

  const userProfile = {
    name: "Vikramaditya Sharma",
    email: "vikram@example.com",
    phone: "+91 98765 43210",
    memberTier: "TRADITION CLUB - GOLD MEMBER",
    points: 1250
  };

  const savedAddresses = [
    {
      id: 1,
      type: "Home",
      line: "Flat 402, Royal Residency, 10th Main Road, Indiranagar",
      city: "Bengaluru, Karnataka - 560038",
      isDefault: true
    },
    {
      id: 2,
      type: "Office",
      line: "Level 8, Concorde Towers, UB City",
      city: "Bengaluru, Karnataka - 560001",
      isDefault: false
    }
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '900px', width: '92%', padding: 0 }}
      >
        {/* Header */}
        <div style={{
          padding: '1.5rem 2.5rem',
          background: 'var(--bg-tertiary)',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'var(--gold-primary)',
              color: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontFamily: 'var(--font-serif)',
              fontSize: '1.3rem'
            }}>
              VS
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#FFF' }}>
                {userProfile.name}
              </h3>
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: 'var(--gold-primary)', fontWeight: '600' }}>
                {userProfile.memberTier} ({userProfile.points} REWARD PTS)
              </span>
            </div>
          </div>

          <button onClick={onClose} style={{ color: '#FFF' }}>
            <X size={24} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr' }}>
          {/* Navigation Sidebar */}
          <div style={{
            background: 'var(--bg-tertiary)',
            borderRight: '1px solid var(--border-light)',
            padding: '1.5rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <button
              onClick={() => setActiveTab('ORDERS')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.8rem 1rem',
                color: activeTab === 'ORDERS' ? 'var(--gold-primary)' : 'var(--text-primary)',
                background: activeTab === 'ORDERS' ? 'rgba(197, 160, 89, 0.12)' : 'transparent',
                borderLeft: activeTab === 'ORDERS' ? '3px solid var(--gold-primary)' : '3px solid transparent',
                fontSize: '0.8rem',
                fontWeight: '600',
                letterSpacing: '0.1em'
              }}
            >
              <ShoppingBag size={18} /> ORDERS ({orders.length})
            </button>

            <button
              onClick={() => setActiveTab('WISHLIST')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.8rem 1rem',
                color: activeTab === 'WISHLIST' ? 'var(--gold-primary)' : 'var(--text-primary)',
                background: activeTab === 'WISHLIST' ? 'rgba(197, 160, 89, 0.12)' : 'transparent',
                borderLeft: activeTab === 'WISHLIST' ? '3px solid var(--gold-primary)' : '3px solid transparent',
                fontSize: '0.8rem',
                fontWeight: '600',
                letterSpacing: '0.1em'
              }}
            >
              <Heart size={18} /> WISHLIST ({wishlist.length})
            </button>

            <button
              onClick={() => setActiveTab('ADDRESSES')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.8rem 1rem',
                color: activeTab === 'ADDRESSES' ? 'var(--gold-primary)' : 'var(--text-primary)',
                background: activeTab === 'ADDRESSES' ? 'rgba(197, 160, 89, 0.12)' : 'transparent',
                borderLeft: activeTab === 'ADDRESSES' ? '3px solid var(--gold-primary)' : '3px solid transparent',
                fontSize: '0.8rem',
                fontWeight: '600',
                letterSpacing: '0.1em'
              }}
            >
              <MapPin size={18} /> ADDRESSES
            </button>

            <button
              onClick={() => setActiveTab('PROFILE')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.8rem 1rem',
                color: activeTab === 'PROFILE' ? 'var(--gold-primary)' : 'var(--text-primary)',
                background: activeTab === 'PROFILE' ? 'rgba(197, 160, 89, 0.12)' : 'transparent',
                borderLeft: activeTab === 'PROFILE' ? '3px solid var(--gold-primary)' : '3px solid transparent',
                fontSize: '0.8rem',
                fontWeight: '600',
                letterSpacing: '0.1em'
              }}
            >
              <User size={18} /> PROFILE SETTINGS
            </button>
          </div>

          {/* Main Content Area */}
          <div style={{ padding: '2rem 2.5rem', maxHeight: '550px', overflowY: 'auto' }}>
            {/* ORDERS TAB */}
            {activeTab === 'ORDERS' && (
              <div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#FFF', marginBottom: '1.25rem' }}>
                  YOUR ORDER HISTORY
                </h4>

                {orders.length === 0 ? (
                  <p style={{ color: 'var(--text-secondary)' }}>You haven't placed any orders yet.</p>
                ) : (
                  orders.map((ord) => (
                    <div
                      key={ord.id}
                      style={{
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-light)',
                        padding: '1.25rem',
                        marginBottom: '1rem'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
                        <div>
                          <span style={{ fontSize: '0.7rem', color: 'var(--gold-primary)', fontWeight: '700' }}>ORDER #{ord.id}</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginLeft: '0.75rem' }}>
                            {new Date(ord.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                        <span className="badge badge-gold">{ord.status}</span>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                        {ord.items.map((it, idx) => (
                          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#FFF' }}>
                            <span>{it.name} ({it.size} • {it.color}) × {it.quantity}</span>
                            <strong>₹{(it.price * it.quantity).toLocaleString('en-IN')}</strong>
                          </div>
                        ))}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-light)', paddingTop: '0.75rem' }}>
                        <span style={{ color: '#FFF', fontWeight: '700', fontSize: '1rem' }}>
                          Total: ₹{ord.totalAmount.toLocaleString('en-IN')}
                        </span>

                        <button
                          onClick={() => {
                            onClose();
                            onTrackOrder(ord);
                          }}
                          style={{
                            border: '1px solid var(--gold-primary)',
                            color: 'var(--gold-primary)',
                            padding: '0.4rem 0.9rem',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            letterSpacing: '0.1em'
                          }}
                        >
                          TRACK ORDER →
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* WISHLIST TAB */}
            {activeTab === 'WISHLIST' && (
              <div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#FFF', marginBottom: '1.25rem' }}>
                  SAVED WISHLIST ({wishlist.length})
                </h4>

                {wishlist.length === 0 ? (
                  <p style={{ color: 'var(--text-secondary)' }}>Your wishlist is empty.</p>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                    {wishlist.map((item) => (
                      <div key={item.id} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', padding: '0.85rem' }}>
                        <img src={item.images[0]} alt={item.name} style={{ width: '100%', height: '180px', objectFit: 'cover', marginBottom: '0.5rem' }} />
                        <h5 style={{ color: '#FFF', fontSize: '0.9rem', fontFamily: 'var(--font-serif)' }}>{item.name}</h5>
                        <p style={{ color: 'var(--gold-primary)', fontWeight: '700', fontSize: '0.85rem', marginBottom: '0.5rem' }}>₹{item.price.toLocaleString('en-IN')}</p>
                        <button
                          onClick={() => onRemoveFromWishlist(item)}
                          style={{ color: '#FF5252', fontSize: '0.7rem', fontWeight: '600' }}
                        >
                          REMOVE
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ADDRESSES TAB */}
            {activeTab === 'ADDRESSES' && (
              <div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#FFF', marginBottom: '1.25rem' }}>
                  SAVED ADDRESSES
                </h4>
                {savedAddresses.map((addr) => (
                  <div key={addr.id} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', padding: '1.25rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <strong style={{ color: 'var(--gold-primary)', fontSize: '0.9rem' }}>{addr.type}</strong>
                      {addr.isDefault && <span className="badge badge-gold">DEFAULT</span>}
                    </div>
                    <p style={{ color: '#FFF', fontSize: '0.85rem' }}>{addr.line}</p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{addr.city}</p>
                  </div>
                ))}
              </div>
            )}

            {/* PROFILE TAB */}
            {activeTab === 'PROFILE' && (
              <div>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#FFF', marginBottom: '1.25rem' }}>
                  MEMBER PROFILE
                </h4>
                <div style={{ display: 'grid', gap: '1rem', color: '#FFF', fontSize: '0.9rem' }}>
                  <div><strong>Full Name:</strong> {userProfile.name}</div>
                  <div><strong>Email Address:</strong> {userProfile.email}</div>
                  <div><strong>Mobile Phone:</strong> {userProfile.phone}</div>
                  <div><strong>Membership Status:</strong> <span style={{ color: 'var(--gold-primary)' }}>{userProfile.memberTier}</span></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
