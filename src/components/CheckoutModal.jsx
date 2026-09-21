import React, { useState } from 'react';
import { X, ShieldCheck, CreditCard, QrCode, Building, Wallet, Truck, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  checkoutProduct, // If direct Buy Now item
  totals,
  onCompleteOrder
}) {
  if (!isOpen) return null;

  const itemsToBuy = checkoutProduct
    ? [{
        id: checkoutProduct.id,
        name: checkoutProduct.name,
        category: checkoutProduct.category,
        selectedSize: checkoutProduct.selectedSize || 'M',
        selectedColor: checkoutProduct.selectedColor || checkoutProduct.colors[0]?.name,
        price: checkoutProduct.price,
        quantity: 1,
        image: checkoutProduct.images[0]
      }]
    : cart;

  const subtotal = itemsToBuy.reduce((a, c) => a + c.price * c.quantity, 0);
  const discount = totals?.discountAmount || 0;
  const delivery = subtotal >= 5000 || subtotal === 0 ? 0 : 150;
  const grandTotal = Math.max(0, subtotal - discount + delivery);

  // Form Fields
  const [formData, setFormData] = useState({
    fullName: 'Vikramaditya Sharma',
    email: 'vikram@example.com',
    phone: '+91 98765 43210',
    addressLine: 'Flat 402, Royal Residency',
    area: '10th Main Road, Indiranagar',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
    landmark: 'Near Metro Station'
  });

  const [paymentMethod, setPaymentMethod] = useState('UPI'); // UPI, CARD, NETBANKING, WALLET, COD
  const [upiId, setUpiId] = useState('vikram@okaxis');
  const [cardDetails, setCardDetails] = useState({ number: '4532 •••• •••• 8892', exp: '08/29', cvv: '•••' });
  const [bank, setBank] = useState('HDFC');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate payment processing delay
    setTimeout(() => {
      const orderId = `TT-${Math.floor(10000 + Math.random() * 90000)}`;
      const newOrder = {
        id: orderId,
        customerName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        date: new Date().toISOString(),
        status: 'ORDER PLACED',
        paymentMethod: paymentMethod === 'UPI' ? `UPI (${upiId})` : paymentMethod === 'CARD' ? 'Credit/Debit Card' : paymentMethod,
        paymentStatus: paymentMethod === 'COD' ? 'PENDING (COD)' : 'PAID',
        totalAmount: grandTotal,
        trackingNumber: `BD${Math.floor(1000000 + Math.random() * 9000000)}IN`,
        courier: 'BlueDart Express',
        estimatedDelivery: '3-4 Business Days',
        address: {
          addressLine: formData.addressLine,
          area: formData.area,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          landmark: formData.landmark
        },
        items: itemsToBuy
      };

      onCompleteOrder(newOrder);
      setPlacedOrderId(orderId);
      setIsSubmitting(false);
      setIsSuccess(true);

      // Trigger Luxury Celebration Confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C5A059', '#D4AF37', '#FAF8F5', '#121212']
        });
      } catch (err) {
        // fallback
      }
    }, 1500);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '980px', width: '92%', padding: 0 }}
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
          <div>
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--gold-primary)', fontWeight: '600' }}>
              SECURE 256-BIT ENCRYPTED CHECKOUT
            </span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#FFF' }}>
              TRENDYTRADITION ATELIER CHECKOUT
            </h3>
          </div>
          <button onClick={onClose} style={{ color: '#FFF' }}>
            <X size={24} />
          </button>
        </div>

        {isSuccess ? (
          /* Success Screen */
          <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
            <CheckCircle2 size={64} style={{ color: 'var(--gold-primary)', marginBottom: '1.5rem' }} />
            <span style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: 'var(--gold-primary)', fontWeight: '600' }}>
              ORDER SUCCESSFULLY PLACED
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: '#FFF', margin: '0.5rem 0 1rem 0' }}>
              THANK YOU FOR YOUR ORDER
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '1.5rem' }}>
              Your order ID is <strong style={{ color: 'var(--gold-primary)' }}>#{placedOrderId}</strong>. A confirmation SMS & Email has been sent to <strong>{formData.email}</strong>.
            </p>

            <div style={{
              background: 'var(--bg-tertiary)',
              border: '1px solid var(--border-gold)',
              padding: '1.5rem',
              maxWidth: '500px',
              margin: '0 auto 2.5rem auto',
              textAlign: 'left'
            }}>
              <h4 style={{ color: '#FFF', fontSize: '0.9rem', marginBottom: '0.5rem' }}>ESTIMATED DELIVERY</h4>
              <p style={{ color: 'var(--gold-primary)', fontWeight: '600' }}>BlueDart Express • 3-4 Business Days</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                Delivering to: {formData.addressLine}, {formData.city}, {formData.state} - {formData.pincode}
              </p>
            </div>

            <button
              onClick={() => {
                onClose();
              }}
              className="btn-primary"
            >
              RETURN TO STORE & TRACK ORDER
            </button>
          </div>
        ) : (
          /* Main Checkout Form */
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            {/* LEFT: Customer & Address Details */}
            <div style={{ padding: '2rem 2.5rem', borderRight: '1px solid var(--border-light)' }}>
              <h4 style={{ color: 'var(--gold-primary)', fontSize: '0.8rem', letterSpacing: '0.15em', marginBottom: '1.25rem' }}>
                1. CUSTOMER & DELIVERY DETAILS
              </h4>

              <div style={{ display: 'grid', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.65rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', color: '#FFF', fontSize: '0.9rem' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.65rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', color: '#FFF', fontSize: '0.9rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.65rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', color: '#FFF', fontSize: '0.9rem' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>Street Address / Flat No. *</label>
                  <input
                    type="text"
                    name="addressLine"
                    required
                    value={formData.addressLine}
                    onChange={handleChange}
                    style={{ width: '100%', padding: '0.65rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', color: '#FFF', fontSize: '0.9rem' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>Area / Locality *</label>
                    <input
                      type="text"
                      name="area"
                      required
                      value={formData.area}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.65rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', color: '#FFF', fontSize: '0.9rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>Landmark (Optional)</label>
                    <input
                      type="text"
                      name="landmark"
                      value={formData.landmark}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.65rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', color: '#FFF', fontSize: '0.9rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>City *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.65rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', color: '#FFF', fontSize: '0.85rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>State *</label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.65rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', color: '#FFF', fontSize: '0.85rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>Pincode *</label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      value={formData.pincode}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.65rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', color: '#FFF', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>
              </div>

              {/* PAYMENT GATEWAY SELECTION */}
              <h4 style={{ color: 'var(--gold-primary)', fontSize: '0.8rem', letterSpacing: '0.15em', marginTop: '2rem', marginBottom: '1rem' }}>
                2. SECURE PAYMENT GATEWAY (INDIA)
              </h4>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '1.25rem' }}>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('UPI')}
                  style={{
                    padding: '0.75rem 0.5rem',
                    border: paymentMethod === 'UPI' ? '1px solid var(--gold-primary)' : '1px solid var(--border-light)',
                    background: paymentMethod === 'UPI' ? 'rgba(197, 160, 89, 0.12)' : 'var(--bg-tertiary)',
                    color: paymentMethod === 'UPI' ? 'var(--gold-primary)' : '#FFF',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                >
                  <QrCode size={18} /> UPI / QR
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('CARD')}
                  style={{
                    padding: '0.75rem 0.5rem',
                    border: paymentMethod === 'CARD' ? '1px solid var(--gold-primary)' : '1px solid var(--border-light)',
                    background: paymentMethod === 'CARD' ? 'rgba(197, 160, 89, 0.12)' : 'var(--bg-tertiary)',
                    color: paymentMethod === 'CARD' ? 'var(--gold-primary)' : '#FFF',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                >
                  <CreditCard size={18} /> CARDS
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('COD')}
                  style={{
                    padding: '0.75rem 0.5rem',
                    border: paymentMethod === 'COD' ? '1px solid var(--gold-primary)' : '1px solid var(--border-light)',
                    background: paymentMethod === 'COD' ? 'rgba(197, 160, 89, 0.12)' : 'var(--bg-tertiary)',
                    color: paymentMethod === 'COD' ? 'var(--gold-primary)' : '#FFF',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                >
                  <Truck size={18} /> CASH ON DELIVERY
                </button>
              </div>

              {paymentMethod === 'UPI' && (
                <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', border: '1px solid var(--border-light)' }}>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.4rem' }}>Enter VPA / UPI ID (Google Pay, PhonePe, Paytm)</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="e.g. mobile@upi"
                    style={{ width: '100%', padding: '0.55rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', color: '#FFF', fontSize: '0.85rem' }}
                  />
                  <span style={{ fontSize: '0.675rem', color: 'var(--gold-primary)', marginTop: '0.4rem', display: 'block' }}>
                    Instant GPay/PhonePe notification trigger on submit
                  </span>
                </div>
              )}

              {paymentMethod === 'CARD' && (
                <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', border: '1px solid var(--border-light)', display: 'grid', gap: '0.6rem' }}>
                  <input
                    type="text"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                    placeholder="Card Number (Visa, MasterCard, RuPay)"
                    style={{ width: '100%', padding: '0.55rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', color: '#FFF', fontSize: '0.85rem' }}
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    <input
                      type="text"
                      value={cardDetails.exp}
                      placeholder="MM/YY"
                      style={{ padding: '0.55rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', color: '#FFF', fontSize: '0.85rem' }}
                    />
                    <input
                      type="password"
                      value={cardDetails.cvv}
                      placeholder="CVV"
                      style={{ padding: '0.55rem', background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', color: '#FFF', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'COD' && (
                <div style={{ background: 'rgba(197, 160, 89, 0.08)', padding: '1rem', border: '1px solid var(--border-gold)', color: 'var(--gold-primary)', fontSize: '0.8rem' }}>
                  Pay ₹{grandTotal.toLocaleString('en-IN')} in cash or via UPI QR to the BlueDart delivery partner upon receiving your package.
                </div>
              )}
            </div>

            {/* RIGHT: Order Summary & Place Order Button */}
            <div style={{ padding: '2rem 2.5rem', background: 'var(--bg-tertiary)', display: 'flex', flexDirection: 'column' }}>
              <h4 style={{ color: 'var(--gold-primary)', fontSize: '0.8rem', letterSpacing: '0.15em', marginBottom: '1.25rem' }}>
                ORDER SUMMARY ({itemsToBuy.reduce((a, c) => a + c.quantity, 0)} ITEMS)
              </h4>

              <div style={{ flexGrow: 1, overflowY: 'auto', maxHeight: '280px', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                {itemsToBuy.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
                    <img src={item.image || item.images[0]} alt={item.name} style={{ width: '50px', height: '65px', objectFit: 'cover' }} />
                    <div style={{ flexGrow: 1 }}>
                      <h5 style={{ color: '#FFF', fontSize: '0.85rem' }}>{item.name}</h5>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                        Size: {item.selectedSize} | Color: {item.selectedColor} | Qty: {item.quantity}
                      </span>
                    </div>
                    <span style={{ color: '#FFF', fontWeight: '700', fontSize: '0.85rem' }}>
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4CAF50' }}>
                    <span>Discount</span>
                    <span>-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                  <span>Express Delivery</span>
                  <span>{delivery === 0 ? <strong style={{ color: '#4CAF50' }}>FREE</strong> : `₹${delivery}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#FFF', fontSize: '1.25rem', fontWeight: '700', borderTop: '1px solid var(--border-light)', paddingTop: '0.75rem', marginTop: '0.4rem' }}>
                  <span>Total Payable</span>
                  <span style={{ color: 'var(--gold-primary)' }}>₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{ width: '100%', padding: '1.2rem 0', opacity: isSubmitting ? 0.7 : 1 }}
              >
                {isSubmitting ? 'PROCESSING PAYMENT...' : `PAY ₹${grandTotal.toLocaleString('en-IN')} & PLACE ORDER`}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.7rem', marginTop: '1rem' }}>
                <ShieldCheck size={14} style={{ color: 'var(--gold-primary)' }} /> Guaranteed Safe & Secure Checkout
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
