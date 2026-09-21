import React from 'react';
import { X } from 'lucide-react';

export default function SizeGuideModal({ category, onClose }) {
  const isShirt = category === 'SHIRTS';

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '700px', padding: '2.5rem' }}
      >
        <button
          onClick={onClose}
          style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: '#FFF' }}
        >
          <X size={24} />
        </button>

        <span style={{ fontSize: '0.725rem', letterSpacing: '0.2em', color: 'var(--gold-primary)', fontWeight: '600' }}>
          SIZE & FIT MEASUREMENTS
        </span>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#FFF', marginBottom: '1rem' }}>
          {isShirt ? 'SHIRT SIZING GUIDE (INCHES & CM)' : 'T-SHIRT SIZING GUIDE (INCHES & CM)'}
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          All TRENDYTRADITION garments are pre-washed and cut for modern elegance. Measure around the fullest part of your chest with a tape measure kept horizontal.
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left',
            fontSize: '0.85rem',
            color: 'var(--text-primary)'
          }}>
            <thead>
              <tr style={{ background: 'var(--bg-tertiary)', borderBottom: '2px solid var(--border-gold)' }}>
                <th style={{ padding: '0.75rem 1rem' }}>SIZE</th>
                <th style={{ padding: '0.75rem 1rem' }}>CHEST (INCHES)</th>
                <th style={{ padding: '0.75rem 1rem' }}>SHOULDER (INCHES)</th>
                <th style={{ padding: '0.75rem 1rem' }}>LENGTH (INCHES)</th>
                {isShirt && <th style={{ padding: '0.75rem 1rem' }}>COLLAR (INCHES)</th>}
              </tr>
            </thead>
            <tbody>
              {isShirt ? (
                <>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: '700', color: 'var(--gold-primary)' }}>S (38)</td>
                    <td style={{ padding: '0.75rem 1rem' }}>38 - 40"</td>
                    <td style={{ padding: '0.75rem 1rem' }}>17.5"</td>
                    <td style={{ padding: '0.75rem 1rem' }}>28.5"</td>
                    <td style={{ padding: '0.75rem 1rem' }}>15.0"</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: '700', color: 'var(--gold-primary)' }}>M (40)</td>
                    <td style={{ padding: '0.75rem 1rem' }}>40 - 42"</td>
                    <td style={{ padding: '0.75rem 1rem' }}>18.0"</td>
                    <td style={{ padding: '0.75rem 1rem' }}>29.5"</td>
                    <td style={{ padding: '0.75rem 1rem' }}>15.5"</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: '700', color: 'var(--gold-primary)' }}>L (42)</td>
                    <td style={{ padding: '0.75rem 1rem' }}>42 - 44"</td>
                    <td style={{ padding: '0.75rem 1rem' }}>18.5"</td>
                    <td style={{ padding: '0.75rem 1rem' }}>30.5"</td>
                    <td style={{ padding: '0.75rem 1rem' }}>16.0"</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: '700', color: 'var(--gold-primary)' }}>XL (44)</td>
                    <td style={{ padding: '0.75rem 1rem' }}>44 - 46"</td>
                    <td style={{ padding: '0.75rem 1rem' }}>19.2"</td>
                    <td style={{ padding: '0.75rem 1rem' }}>31.5"</td>
                    <td style={{ padding: '0.75rem 1rem' }}>16.5"</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: '700', color: 'var(--gold-primary)' }}>XXL (46)</td>
                    <td style={{ padding: '0.75rem 1rem' }}>46 - 48"</td>
                    <td style={{ padding: '0.75rem 1rem' }}>20.0"</td>
                    <td style={{ padding: '0.75rem 1rem' }}>32.0"</td>
                    <td style={{ padding: '0.75rem 1rem' }}>17.0"</td>
                  </tr>
                </>
              ) : (
                <>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: '700', color: 'var(--gold-primary)' }}>S</td>
                    <td style={{ padding: '0.75rem 1rem' }}>38 - 40"</td>
                    <td style={{ padding: '0.75rem 1rem' }}>18.5"</td>
                    <td style={{ padding: '0.75rem 1rem' }}>27.5"</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: '700', color: 'var(--gold-primary)' }}>M</td>
                    <td style={{ padding: '0.75rem 1rem' }}>40 - 42"</td>
                    <td style={{ padding: '0.75rem 1rem' }}>19.5"</td>
                    <td style={{ padding: '0.75rem 1rem' }}>28.5"</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: '700', color: 'var(--gold-primary)' }}>L</td>
                    <td style={{ padding: '0.75rem 1rem' }}>42 - 44"</td>
                    <td style={{ padding: '0.75rem 1rem' }}>20.5"</td>
                    <td style={{ padding: '0.75rem 1rem' }}>29.5"</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: '700', color: 'var(--gold-primary)' }}>XL</td>
                    <td style={{ padding: '0.75rem 1rem' }}>44 - 46"</td>
                    <td style={{ padding: '0.75rem 1rem' }}>21.5"</td>
                    <td style={{ padding: '0.75rem 1rem' }}>30.5"</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: '700', color: 'var(--gold-primary)' }}>XXL</td>
                    <td style={{ padding: '0.75rem 1rem' }}>46 - 48"</td>
                    <td style={{ padding: '0.75rem 1rem' }}>22.5"</td>
                    <td style={{ padding: '0.75rem 1rem' }}>31.5"</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: '700', color: 'var(--gold-primary)' }}>XXXL</td>
                    <td style={{ padding: '0.75rem 1rem' }}>48 - 50"</td>
                    <td style={{ padding: '0.75rem 1rem' }}>23.5"</td>
                    <td style={{ padding: '0.75rem 1rem' }}>32.5"</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onClose} className="btn-primary" style={{ padding: '0.75rem 1.8rem' }}>
            GOT IT
          </button>
        </div>
      </div>
    </div>
  );
}
