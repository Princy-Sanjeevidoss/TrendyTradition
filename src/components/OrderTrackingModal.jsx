import React, { useState } from 'react';
import { X, Search, CheckCircle, Truck, Package, Clock, MapPin } from 'lucide-react';

export default function OrderTrackingModal({ isOpen, onClose, orders }) {
  if (!isOpen) return null;

  const [searchId, setSearchId] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(orders[0] || null);
  const [errorMsg, setErrorMsg] = useState('');

  const stages = [
    'ORDER PLACED',
    'CONFIRMED',
    'PACKED',
    'SHIPPED',
    'OUT FOR DELIVERY',
    'DELIVERED'
  ];

  const handleSearch = () => {
    const found = orders.find(
      o => o.id.toLowerCase() === searchId.trim().toLowerCase() ||
           o.email.toLowerCase() === searchId.trim().toLowerCase()
    );
    if (found) {
      setSelectedOrder(found);
      setErrorMsg('');
    } else {
      setErrorMsg('Order not found. Please check Order ID (e.g. TT-89421)');
    }
  };

  const getStageIndex = (status) => {
    const idx = stages.indexOf(status);
    return idx === -1 ? 0 : idx;
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '850px', width: '92%', padding: '2.5rem' }}
      >
        <button onClick={onClose} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: '#FFF' }}>
          <X size={24} />
        </button>

        <span style={{ fontSize: '0.725rem', letterSpacing: '0.2em', color: 'var(--gold-primary)', fontWeight: '600' }}>
          LIVE SHIPMENT LOGISTICS
        </span>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.2rem', color: '#FFF', marginBottom: '1.5rem' }}>
          TRACK YOUR ORDER
        </h3>

        {/* Order Search Bar */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
          <input
            type="text"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="Enter Order ID (e.g. TT-89421) or Email Address"
            style={{
              flexGrow: 1,
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-light)',
              color: '#FFF',
              padding: '0.75rem 1rem',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />
          <button
            onClick={handleSearch}
            className="btn-primary"
            style={{ padding: '0.75rem 1.8rem' }}
          >
            TRACK <Search size={16} />
          </button>
        </div>

        {errorMsg && <p style={{ color: '#FF5252', fontSize: '0.85rem', marginBottom: '1.5rem' }}>{errorMsg}</p>}

        {selectedOrder ? (
          <div>
            {/* Order Details Header */}
            <div style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-gold)',
              padding: '1.5rem',
              display: 'flex',
              justify: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '2.5rem'
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--gold-primary)', fontWeight: '600' }}>
                  ORDER #{selectedOrder.id}
                </span>
                <h4 style={{ color: '#FFF', fontSize: '1.1rem', marginTop: '0.2rem' }}>
                  Customer: {selectedOrder.customerName}
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                  Placed on {new Date(selectedOrder.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>
                  COURIER & TRACKING NO.
                </span>
                <strong style={{ color: '#FFF', fontSize: '0.9rem' }}>
                  {selectedOrder.courier} ({selectedOrder.trackingNumber || 'TT-EXPRESS'})
                </strong>
                <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--gold-primary)', marginTop: '0.2rem' }}>
                  Est. Delivery: {selectedOrder.estimatedDelivery || '3-4 Days'}
                </span>
              </div>
            </div>

            {/* Visual Step Timeline */}
            <div style={{ marginBottom: '3rem', position: 'relative', padding: '0 1rem' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${stages.length}, 1fr)`,
                position: 'relative',
                zIndex: 2
              }}>
                {stages.map((stg, i) => {
                  const currentIdx = getStageIndex(selectedOrder.status);
                  const isCompleted = i <= currentIdx;
                  const isCurrent = i === currentIdx;

                  return (
                    <div key={stg} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: isCompleted ? 'var(--gold-primary)' : 'var(--bg-tertiary)',
                        color: isCompleted ? '#000' : 'var(--text-secondary)',
                        border: isCurrent ? '3px solid #FFF' : '1px solid var(--border-light)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '700',
                        fontSize: '0.8rem',
                        marginBottom: '0.6rem',
                        transition: 'all 0.3s ease'
                      }}>
                        {isCompleted ? <CheckCircle size={18} /> : i + 1}
                      </div>

                      <span style={{
                        fontSize: '0.65rem',
                        letterSpacing: '0.08em',
                        fontWeight: isCurrent ? '700' : '500',
                        color: isCurrent ? 'var(--gold-primary)' : isCompleted ? '#FFF' : 'var(--text-secondary)',
                        textTransform: 'uppercase'
                      }}>
                        {stg}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Address & Items Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <div style={{ background: 'var(--bg-tertiary)', padding: '1.25rem', border: '1px solid var(--border-light)' }}>
                <h5 style={{ color: 'var(--gold-primary)', fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <MapPin size={16} /> DELIVERY ADDRESS
                </h5>
                <p style={{ color: '#FFF', fontSize: '0.85rem', lineHeight: 1.5 }}>
                  {selectedOrder.address.addressLine}<br />
                  {selectedOrder.address.area}<br />
                  {selectedOrder.address.city}, {selectedOrder.address.state} - {selectedOrder.address.pincode}<br />
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem' }}>Landmark: {selectedOrder.address.landmark}</span>
                </p>
              </div>

              <div style={{ background: 'var(--bg-tertiary)', padding: '1.25rem', border: '1px solid var(--border-light)' }}>
                <h5 style={{ color: 'var(--gold-primary)', fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                  ITEMS IN SHIPMENT
                </h5>
                {selectedOrder.items.map((it, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#FFF', marginBottom: '0.4rem' }}>
                    <span>{it.name} ({it.size} • {it.color}) × {it.quantity}</span>
                    <strong style={{ color: 'var(--gold-primary)' }}>₹{(it.price * it.quantity).toLocaleString('en-IN')}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p style={{ color: 'var(--text-secondary)' }}>Select or search for an order to view tracking details.</p>
        )}
      </div>
    </div>
  );
}
