import React, { useState } from 'react';
import { X, ShieldCheck, Plus, Edit3, Trash2, Package, ShoppingBag, Users, TrendingUp, RefreshCw, AlertTriangle, Check } from 'lucide-react';

export default function AdminDashboard({
  isOpen,
  onClose,
  products,
  orders,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateStock,
  onUpdateOrderStatus,
  onResetDemoData
}) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('SALES'); // SALES, PRODUCTS, INVENTORY, ORDERS, CUSTOMERS
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // New Product Form State
  const [prodForm, setProdForm] = useState({
    name: '',
    category: 'SHIRTS',
    subCategory: 'Formal Shirts',
    price: 2999,
    originalPrice: 3599,
    collection: 'THE FORMAL EDIT',
    fit: 'Tailored Slim',
    fabric: '100% Egyptian Cotton',
    description: '',
    careInstructions: 'Machine wash cold.',
    availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isNewArrival: true,
    isFeatured: true,
    colorsText: 'Crisp White (#FFFFFF), Powder Blue (#B0C4DE)',
    imagesText: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf\nhttps://images.unsplash.com/photo-1620012253295-c15cc3e65df4'
  });

  // Calculate Sales Analytics Metrics
  const totalSales = orders.reduce((acc, o) => acc + o.totalAmount, 0);
  const totalOrdersCount = orders.length;
  const uniqueCustomersCount = new Set(orders.map(o => o.email)).size + 14;

  // Inventory Low Stock Check
  const lowStockItems = [];
  products.forEach(p => {
    Object.entries(p.stock || {}).forEach(([variant, count]) => {
      if (count <= 5) {
        lowStockItems.push({ productName: p.name, variant, count, id: p.id });
      }
    });
  });

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setProdForm({
      name: '',
      category: 'SHIRTS',
      subCategory: 'Formal Shirts',
      price: 2999,
      originalPrice: 3599,
      collection: 'THE FORMAL EDIT',
      fit: 'Tailored Slim',
      fabric: '100% Egyptian Cotton',
      description: '',
      careInstructions: 'Machine wash cold.',
      availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
      isNewArrival: true,
      isFeatured: true,
      colorsText: 'Crisp White (#FFFFFF), Powder Blue (#B0C4DE)',
      imagesText: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf\nhttps://images.unsplash.com/photo-1620012253295-c15cc3e65df4'
    });
    setShowProductModal(true);
  };

  const handleOpenEditModal = (p) => {
    setEditingProduct(p);
    setProdForm({
      name: p.name,
      category: p.category,
      subCategory: p.subCategory,
      price: p.price,
      originalPrice: p.originalPrice || p.price,
      collection: p.collection,
      fit: p.fit,
      fabric: p.fabric,
      description: p.description,
      careInstructions: p.careInstructions || '',
      availableSizes: p.availableSizes,
      isNewArrival: p.isNewArrival,
      isFeatured: p.isFeatured,
      colorsText: p.colors.map(c => `${c.name} (${c.hex})`).join(', '),
      imagesText: p.images.join('\n')
    });
    setShowProductModal(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    const parsedImages = prodForm.imagesText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const parsedColors = prodForm.colorsText
      .split(',')
      .map(item => {
        const match = item.match(/(.+)\((#.+)\)/);
        if (match) return { name: match[1].trim(), hex: match[2].trim() };
        return { name: item.trim(), hex: '#FFFFFF' };
      });

    const newStock = {};
    parsedColors.forEach(c => {
      prodForm.availableSizes.forEach(sz => {
        const key = `${c.name}-${sz}`;
        newStock[key] = editingProduct?.stock[key] || 15;
      });
    });

    const productPayload = {
      id: editingProduct ? editingProduct.id : `${prodForm.category.toLowerCase()}-${Date.now().toString().slice(-4)}`,
      name: prodForm.name,
      category: prodForm.category,
      subCategory: prodForm.subCategory,
      price: Number(prodForm.price),
      originalPrice: Number(prodForm.originalPrice),
      rating: editingProduct ? editingProduct.rating : 4.9,
      reviewsCount: editingProduct ? editingProduct.reviewsCount : 12,
      isNewArrival: prodForm.isNewArrival,
      isFeatured: prodForm.isFeatured,
      collection: prodForm.collection,
      fit: prodForm.fit,
      fabric: prodForm.fabric,
      description: prodForm.description,
      careInstructions: prodForm.careInstructions,
      availableSizes: prodForm.availableSizes,
      colors: parsedColors,
      images: parsedImages.length > 0 ? parsedImages : ["https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf"],
      stock: newStock
    };

    if (editingProduct) {
      onUpdateProduct(productPayload);
    } else {
      onAddProduct(productPayload);
    }

    setShowProductModal(false);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '1150px', width: '95%', padding: 0 }}
      >
        {/* Header */}
        <div style={{
          padding: '1.5rem 2.5rem',
          background: '#0F1114',
          borderBottom: '1px solid var(--border-gold)',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ShieldCheck size={26} style={{ color: 'var(--gold-primary)' }} />
            <div>
              <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--gold-primary)', fontWeight: '600' }}>
                EXECUTIVE BUSINESS PORTAL
              </span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#FFF', lineHeight: 1 }}>
                TRENDYTRADITION ADMIN DASHBOARD
              </h3>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={onResetDemoData}
              style={{
                border: '1px solid rgba(255, 82, 82, 0.4)',
                color: '#FF5252',
                fontSize: '0.7rem',
                padding: '0.4rem 0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                fontWeight: '600'
              }}
              title="Reset Catalog & Orders to initial seed"
            >
              <RefreshCw size={14} /> RESET DEMO DATA
            </button>

            <button onClick={onClose} style={{ color: '#FFF' }}>
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <div style={{
          display: 'flex',
          background: 'var(--bg-tertiary)',
          borderBottom: '1px solid var(--border-light)',
          padding: '0 2.5rem',
          gap: '1.5rem'
        }}>
          {[
            { id: 'SALES', label: 'SALES & ANALYTICS', icon: TrendingUp },
            { id: 'PRODUCTS', label: `PRODUCTS (${products.length})`, icon: Package },
            { id: 'INVENTORY', label: `INVENTORY MATRIX (${lowStockItems.length} LOW)`, icon: AlertTriangle },
            { id: 'ORDERS', label: `ORDERS (${orders.length})`, icon: ShoppingBag },
            { id: 'CUSTOMERS', label: 'CUSTOMERS', icon: Users }
          ].map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1.1rem 0',
                  color: isActive ? 'var(--gold-primary)' : 'var(--text-secondary)',
                  borderBottom: isActive ? '2px solid var(--gold-primary)' : '2px solid transparent',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  letterSpacing: '0.12em'
                }}
              >
                <IconComponent size={16} /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        <div style={{ padding: '2.5rem', maxHeight: '620px', overflowY: 'auto' }}>
          {/* SALES ANALYTICS */}
          {activeTab === 'SALES' && (
            <div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.5rem',
                marginBottom: '2.5rem'
              }}>
                <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-gold)', padding: '1.5rem' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--gold-primary)', fontWeight: '600', letterSpacing: '0.1em' }}>TOTAL REVENUE</span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: '#FFF', margin: '0.4rem 0' }}>
                    ₹{totalSales.toLocaleString('en-IN')}
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: '#4CAF50' }}>+18.4% from last month</span>
                </div>

                <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', padding: '1.5rem' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--gold-primary)', fontWeight: '600', letterSpacing: '0.1em' }}>TOTAL ORDERS</span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: '#FFF', margin: '0.4rem 0' }}>
                    {totalOrdersCount}
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Shirts & T-Shirts</span>
                </div>

                <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', padding: '1.5rem' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--gold-primary)', fontWeight: '600', letterSpacing: '0.1em' }}>ACTIVE CUSTOMERS</span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: '#FFF', margin: '0.4rem 0' }}>
                    {uniqueCustomersCount}
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Registered Profile Members</span>
                </div>

                <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', padding: '1.5rem' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--gold-primary)', fontWeight: '600', letterSpacing: '0.1em' }}>LOW STOCK VARIANTS</span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.4rem', color: lowStockItems.length > 0 ? '#FF5252' : '#FFF', margin: '0.4rem 0' }}>
                    {lowStockItems.length}
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Requires Reorder</span>
                </div>
              </div>

              {/* Best Selling Styles Breakdown */}
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#FFF', marginBottom: '1rem' }}>
                TOP PERFORMING MENSWEAR STYLES
              </h4>
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', padding: '1.5rem' }}>
                {products.slice(0, 4).map((p) => (
                  <div key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid var(--border-light)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <img src={p.images[0]} alt={p.name} style={{ width: '45px', height: '55px', objectFit: 'cover' }} />
                      <div>
                        <h5 style={{ color: '#FFF', fontSize: '0.95rem' }}>{p.name}</h5>
                        <span style={{ fontSize: '0.75rem', color: 'var(--gold-primary)' }}>{p.category} • {p.subCategory}</span>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ color: '#FFF', fontWeight: '700', fontSize: '1rem' }}>₹{p.price.toLocaleString('en-IN')}</span>
                      <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Rating: {p.rating} ★</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PRODUCTS TAB */}
          {activeTab === 'PRODUCTS' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#FFF' }}>
                  CATALOG MANAGEMENT
                </h4>
                <button
                  onClick={handleOpenAddModal}
                  className="btn-primary"
                  style={{ padding: '0.7rem 1.5rem' }}
                >
                  <Plus size={16} /> ADD NEW PRODUCT
                </button>
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', color: '#FFF', fontSize: '0.85rem' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-tertiary)', borderBottom: '2px solid var(--border-gold)', textAlign: 'left' }}>
                    <th style={{ padding: '0.75rem 1rem' }}>PRODUCT</th>
                    <th style={{ padding: '0.75rem 1rem' }}>CATEGORY</th>
                    <th style={{ padding: '0.75rem 1rem' }}>COLLECTION</th>
                    <th style={{ padding: '0.75rem 1rem' }}>PRICE</th>
                    <th style={{ padding: '0.75rem 1rem' }}>SIZES</th>
                    <th style={{ padding: '0.75rem 1rem' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                      <td style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img src={p.images[0]} alt={p.name} style={{ width: '40px', height: '50px', objectFit: 'cover' }} />
                        <div>
                          <strong>{p.name}</strong>
                          <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>ID: {p.id}</span>
                        </div>
                      </td>
                      <td style={{ padding: '0.75rem 1rem', color: 'var(--gold-primary)' }}>{p.category} ({p.subCategory})</td>
                      <td style={{ padding: '0.75rem 1rem' }}>{p.collection}</td>
                      <td style={{ padding: '0.75rem 1rem', fontWeight: '700' }}>₹{p.price.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '0.75rem 1rem' }}>{p.availableSizes.join(', ')}</td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button onClick={() => handleOpenEditModal(p)} style={{ color: 'var(--gold-primary)', padding: '4px' }} title="Edit Product">
                            <Edit3 size={18} />
                          </button>
                          <button onClick={() => onDeleteProduct(p.id)} style={{ color: '#FF5252', padding: '4px' }} title="Delete Product">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* INVENTORY MATRIX TAB */}
          {activeTab === 'INVENTORY' && (
            <div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#FFF', marginBottom: '1.5rem' }}>
                GRANULAR STOCK MATRIX (PRODUCT + SIZE + COLOR)
              </h4>

              {products.map((p) => (
                <div key={p.id} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', padding: '1.25rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img src={p.images[0]} alt={p.name} style={{ width: '40px', height: '50px', objectFit: 'cover' }} />
                      <div>
                        <strong style={{ color: '#FFF', fontSize: '1.05rem' }}>{p.name}</strong>
                        <span style={{ fontSize: '0.75rem', color: 'var(--gold-primary)', display: 'block' }}>{p.category} • {p.subCategory}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.75rem' }}>
                    {Object.entries(p.stock || {}).map(([variantKey, count]) => (
                      <div
                        key={variantKey}
                        style={{
                          background: count <= 5 ? 'rgba(255, 82, 82, 0.12)' : 'var(--bg-tertiary)',
                          border: count <= 5 ? '1px solid #FF5252' : '1px solid var(--border-light)',
                          padding: '0.75rem',
                          display: 'flex',
                          justify: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <div>
                          <span style={{ fontSize: '0.75rem', color: '#FFF', display: 'block', fontWeight: '600' }}>{variantKey}</span>
                          <span style={{ fontSize: '0.7rem', color: count <= 5 ? '#FF5252' : 'var(--text-secondary)' }}>
                            {count <= 5 ? 'LOW STOCK' : 'IN STOCK'}
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <button
                            onClick={() => onUpdateStock(p.id, variantKey, Math.max(0, count - 1))}
                            style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-light)', color: '#FFF', width: '24px', height: '24px', fontSize: '0.8rem' }}
                          >
                            -
                          </button>
                          <span style={{ color: 'var(--gold-primary)', fontWeight: '700', fontSize: '0.9rem', width: '24px', textAlign: 'center' }}>
                            {count}
                          </span>
                          <button
                            onClick={() => onUpdateStock(p.id, variantKey, count + 1)}
                            style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-light)', color: '#FFF', width: '24px', height: '24px', fontSize: '0.8rem' }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ORDERS TAB */}
          {activeTab === 'ORDERS' && (
            <div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#FFF', marginBottom: '1.5rem' }}>
                CUSTOMER ORDER MANAGEMENT
              </h4>

              {orders.map((ord) => (
                <div key={ord.id} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', padding: '1.5rem', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.75rem' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--gold-primary)', fontWeight: '700' }}>ORDER #{ord.id}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginLeft: '1rem' }}>
                        Customer: <strong>{ord.customerName}</strong> ({ord.email}, {ord.phone})
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>STATUS:</span>
                      <select
                        value={ord.status}
                        onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value)}
                        style={{
                          background: 'var(--bg-tertiary)',
                          border: '1px solid var(--border-gold)',
                          color: 'var(--gold-primary)',
                          padding: '0.4rem 0.8rem',
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}
                      >
                        <option value="ORDER PLACED">ORDER PLACED</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="PACKED">PACKED</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="OUT FOR DELIVERY">OUT FOR DELIVERY</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#FFF' }}>
                    <div>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '0.4rem' }}>
                        Shipping Address: {ord.address.addressLine}, {ord.address.city}, {ord.address.state} - {ord.address.pincode}
                      </p>
                      <span style={{ color: 'var(--gold-primary)', fontSize: '0.75rem' }}>
                        Payment: {ord.paymentMethod} ({ord.paymentStatus})
                      </span>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <strong style={{ fontSize: '1.1rem', color: '#FFF' }}>Total: ₹{ord.totalAmount.toLocaleString('en-IN')}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CUSTOMERS TAB */}
          {activeTab === 'CUSTOMERS' && (
            <div>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: '#FFF', marginBottom: '1.5rem' }}>
                REGISTERED CUSTOMER BASE
              </h4>
              <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', padding: '1.5rem' }}>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Showing customer profiles associated with active order history.</p>
                {orders.map((o) => (
                  <div key={o.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid var(--border-light)' }}>
                    <div>
                      <strong style={{ color: '#FFF' }}>{o.customerName}</strong>
                      <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{o.email} • {o.phone}</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ color: 'var(--gold-primary)', fontWeight: '600' }}>Order #{o.id}</span>
                      <span style={{ display: 'block', fontSize: '0.8rem', color: '#FFF' }}>₹{o.totalAmount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Popup for Add / Edit Product */}
        {showProductModal && (
          <div className="modal-backdrop" onClick={() => setShowProductModal(false)}>
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: '750px', padding: '2rem' }}
            >
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: '#FFF', marginBottom: '1.25rem' }}>
                {editingProduct ? 'EDIT PRODUCT' : 'ADD NEW MENSWEAR ITEM'}
              </h3>

              <form onSubmit={handleSaveProduct} style={{ display: 'grid', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>Product Name</label>
                  <input
                    type="text"
                    required
                    value={prodForm.name}
                    onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', color: '#FFF' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>Category (Primary Equal)</label>
                    <select
                      value={prodForm.category}
                      onChange={(e) => setProdForm({ ...prodForm, category: e.target.value, availableSizes: e.target.value === 'SHIRTS' ? ['S', 'M', 'L', 'XL', 'XXL'] : ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'] })}
                      style={{ width: '100%', padding: '0.6rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', color: '#FFF' }}
                    >
                      <option value="SHIRTS">SHIRTS</option>
                      <option value="T-SHIRTS">T-SHIRTS</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>Sub-Category</label>
                    <input
                      type="text"
                      required
                      value={prodForm.subCategory}
                      onChange={(e) => setProdForm({ ...prodForm, subCategory: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', color: '#FFF' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>Price (₹ INR)</label>
                    <input
                      type="number"
                      required
                      value={prodForm.price}
                      onChange={(e) => setProdForm({ ...prodForm, price: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', color: '#FFF' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>Original Price (MRP)</label>
                    <input
                      type="number"
                      value={prodForm.originalPrice}
                      onChange={(e) => setProdForm({ ...prodForm, originalPrice: e.target.value })}
                      style={{ width: '100%', padding: '0.6rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', color: '#FFF' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>Fabric & Fit Specifications</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <input
                      type="text"
                      placeholder="Fabric (e.g. 100% Giza Cotton)"
                      value={prodForm.fabric}
                      onChange={(e) => setProdForm({ ...prodForm, fabric: e.target.value })}
                      style={{ padding: '0.6rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', color: '#FFF' }}
                    />
                    <input
                      type="text"
                      placeholder="Fit (e.g. Tailored Slim)"
                      value={prodForm.fit}
                      onChange={(e) => setProdForm({ ...prodForm, fit: e.target.value })}
                      style={{ padding: '0.6rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', color: '#FFF' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>Colors (Comma separated: Color Name (#HEX))</label>
                  <input
                    type="text"
                    value={prodForm.colorsText}
                    onChange={(e) => setProdForm({ ...prodForm, colorsText: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', color: '#FFF' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>Image URLs (One per line)</label>
                  <textarea
                    rows={3}
                    value={prodForm.imagesText}
                    onChange={(e) => setProdForm({ ...prodForm, imagesText: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', color: '#FFF', fontFamily: 'monospace' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block' }}>Description</label>
                  <textarea
                    rows={2}
                    value={prodForm.description}
                    onChange={(e) => setProdForm({ ...prodForm, description: e.target.value })}
                    style={{ width: '100%', padding: '0.6rem', background: 'var(--bg-tertiary)', border: '1px solid var(--border-light)', color: '#FFF' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button type="submit" className="btn-primary" style={{ flexGrow: 1 }}>
                    SAVE PRODUCT TO CATALOG
                  </button>
                  <button type="button" onClick={() => setShowProductModal(false)} className="btn-secondary">
                    CANCEL
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
