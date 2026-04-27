import { useState, useEffect } from 'react'

const isPdf = (url) => url && url.toLowerCase().includes('.pdf')

function CertModal({ cert, theme, onClose }) {
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
        <div style={{ height: 6, background: `linear-gradient(90deg,${cert.color || theme.accent},${cert.color || theme.accentAlt || theme.accent})` }} />
        <div style={{ padding: '20px 24px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ margin: '0 0 2px', fontSize: 16, fontWeight: 800, color: '#111' }}>{cert.title}</p>
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
          {cert.credential_url && (
            <a
              href={cert.credential_url}
              target="_blank" rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 14, padding: '10px 18px', borderRadius: 10, background: cert.color || theme.accent, color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: 13 }}
            >
              Verify Credential →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function CertGrid({ certs, theme }) {
  const [selected, setSelected] = useState(null)

  if (!certs || !certs.length) return null

  const accentColor = theme?.accent || '#D4607A'

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 12 }}>
        {certs.map(c => {
          const hasPdf = isPdf(c.image_url)
          const hasImage = c.image_url && !hasPdf
          const clickable = hasImage || hasPdf || c.credential_url

          return (
            <div
              key={c.id}
              onClick={() => {
                if (!clickable) return
                if (hasPdf) window.open(c.image_url, '_blank')
                else if (c.credential_url && !hasImage) window.open(c.credential_url, '_blank')
                else setSelected(c)
              }}
              style={{
                background: '#fff',
                borderRadius: 14,
                border: '1.5px solid #EDEDED',
                padding: '16px 18px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 14,
                cursor: clickable ? 'pointer' : 'default',
                transition: 'all 0.2s ease',
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseOver={e => {
                if (clickable) {
                  e.currentTarget.style.border = `1.5px solid ${(c.color || accentColor)}55`
                  e.currentTarget.style.transform = 'translateY(-3px)'
                  e.currentTarget.style.boxShadow = `0 8px 24px ${(c.color || accentColor)}18`
                }
              }}
              onMouseOut={e => {
                e.currentTarget.style.border = '1.5px solid #EDEDED'
                e.currentTarget.style.transform = 'none'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              {/* Left color strip */}
              <div style={{
                position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
                background: c.color || accentColor,
                borderRadius: '14px 0 0 14px',
              }} />

              {/* Icon */}
              <div style={{
                width: 40, height: 40, borderRadius: 11,
                background: (c.color || accentColor) + '18',
                border: `1.5px solid ${(c.color || accentColor)}44`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, fontSize: 16,
                marginLeft: 8,
              }}>
                {hasPdf ? '📄' : hasImage ? '🏆' : '✓'}
              </div>

              {/* Text */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ margin: '0 0 3px', fontSize: 13, fontWeight: 800, color: '#111', lineHeight: 1.3 }}>
                  {c.title}
                </p>
                <p style={{ margin: '0 0 5px', fontSize: 11.5, color: '#999' }}>
                  {c.issuer}
                </p>
                <p style={{ margin: 0, fontSize: 10.5, color: '#BBB', fontWeight: 600 }}>
                  {c.date || c.date_issued}
                </p>
                {clickable && (
                  <p style={{ margin: '5px 0 0', fontSize: 10, color: c.color || accentColor, fontWeight: 700 }}>
                    {hasPdf ? 'Open PDF ↗' : 'View Certificate ↗'}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {selected && (
        <CertModal cert={selected} theme={theme} onClose={() => setSelected(null)} />
      )}
    </>
  )
}