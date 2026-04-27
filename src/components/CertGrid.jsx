import { useState } from 'react'

// Detect if a URL is a PDF (can't render in <img>)
const isPdf = (url) => url && url.toLowerCase().includes('.pdf')

export default function CertGrid({ certs, theme }) {
  const [selected, setSelected] = useState(null)

  if (!certs || !certs.length) return null

  return (
    <>
      <div>
        <h3 style={{ margin: '0 0 14px', fontSize: 12, fontWeight: 700, color: '#BBB', letterSpacing: 1.5, textTransform: 'uppercase' }}>
          Certifications ({certs.length})
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 10 }}>
          {certs.map(c => {
            const hasPdf    = isPdf(c.image_url)
            const hasImage  = c.image_url && !hasPdf
            const clickable = hasImage || hasPdf // both are "viewable" — just differently

            return (
              <div
                key={c.id}
                onClick={() => clickable && (hasPdf ? window.open(c.image_url, '_blank') : setSelected(c))}
                style={{
                  background: '#fff', borderRadius: 10,
                  border: '1px solid #EDEDED', padding: '12px 14px',
                  display: 'flex', alignItems: 'flex-start', gap: 11,
                  cursor: clickable ? 'pointer' : 'default',
                  transition: 'all 0.18s',
                }}
                onMouseOver={e => {
                  if (clickable) {
                    e.currentTarget.style.border = `1px solid ${(c.color || theme.accent)}55`
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = `0 6px 18px ${(c.color || theme.accent)}18`
                  }
                }}
                onMouseOut={e => {
                  e.currentTarget.style.border = '1px solid #EDEDED'
                  e.currentTarget.style.transform = 'none'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{
                  width: 34, height: 34, borderRadius: 9,
                  background: (c.color || theme.accent) + '18',
                  border: `1.5px solid ${(c.color || theme.accent)}44`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, fontSize: 13, color: c.color || theme.accent, fontWeight: 900,
                }}>
                  {hasPdf ? '📄' : hasImage ? '🖼' : '✓'}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: '0 0 2px', fontSize: 12.5, fontWeight: 700, color: '#111', lineHeight: 1.3 }}>
                    {c.title}
                  </p>
                  <p style={{ margin: 0, fontSize: 11, color: '#999' }}>
                    {c.issuer} · {c.date || c.date_issued}
                  </p>
                  {hasPdf && (
                    <p style={{ margin: '4px 0 0', fontSize: 10, color: c.color || theme.accent, fontWeight: 600 }}>
                      Open PDF ↗
                    </p>
                  )}
                  {hasImage && (
                    <p style={{ margin: '4px 0 0', fontSize: 10, color: c.color || theme.accent, fontWeight: 600 }}>
                      Click to view ↗
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Image-only modal — PDFs open in new tab instead */}
      {selected && (
        <CertModal cert={selected} theme={theme} onClose={() => setSelected(null)} />
      )}
    </>
  )
}

function CertModal({ cert, theme, onClose }) {
  // useEffect for keyboard + scroll lock
  // (using useState here was a bug in the original — corrected to useEffect)
  const { useEffect } = require('react')

  useEffect(() => {
    const h = e => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', h)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', h)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,0,0,0.72)', zIndex: 1000,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20, backdropFilter: 'blur(6px)',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff', borderRadius: 20,
          maxWidth: 760, width: '100%',
          boxShadow: '0 32px 80px rgba(0,0,0,0.3)',
          animation: 'modalPop 0.25s cubic-bezier(0.34,1.56,0.64,1)',
          overflow: 'hidden', maxHeight: '90vh', overflowY: 'auto',
        }}
      >
        <div style={{ height: 6, background: `linear-gradient(90deg,${cert.color || theme.accent},${cert.color || theme.accentAlt})` }} />
        <div style={{ padding: '20px 24px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ margin: '0 0 2px', fontSize: 15, fontWeight: 800, color: '#111' }}>{cert.title}</p>
            <p style={{ margin: 0, fontSize: 12, color: '#999' }}>{cert.issuer} · {cert.date || cert.date_issued}</p>
          </div>
          <button
            onClick={onClose}
            style={{ background: '#F3F4F6', border: 'none', borderRadius: '50%', width: 32, height: 32, cursor: 'pointer', fontSize: 16, color: '#666', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
          >✕</button>
        </div>
        <div style={{ padding: '0 24px 24px' }}>
          <img
            src={cert.image_url}
            alt={cert.title}
            style={{ width: '100%', borderRadius: 12, border: '1px solid #EDEDED', display: 'block' }}
          />
        </div>
      </div>
    </div>
  )
}